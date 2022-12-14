/*
 * Copyright (C) 2020-2022 Apple Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. AND ITS CONTRIBUTORS ``AS IS''
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL APPLE INC. OR ITS CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */

#include "config.h"
#include <JavaScriptCore/DisallowVMEntry.h>
#include <JavaScriptCore/InitializeThreading.h>
#include <JavaScriptCore/VM.h>

namespace TestWebKitAPI {

using JSC::DisallowVMEntry;
using JSC::JSLockHolder;
using JSC::HeapType;
using JSC::VM;

static void enterScope(VM& vm, unsigned entryCount, unsigned remainingEntries)
{
    DisallowVMEntry disallowVMEntry(vm);
    EXPECT_EQ(vm.disallowVMEntryCount, entryCount);

    if (--remainingEntries)
        enterScope(vm, entryCount + 1, remainingEntries);

    EXPECT_EQ(vm.disallowVMEntryCount, entryCount);
}

TEST(JavaScriptCore_DisallowVMEntry, NestedScopes)
{
    WTF::initializeMainThread();
    JSC::initialize();

    VM& vm = VM::create(HeapType::Large).leakRef();
    {
        JSLockHolder locker(vm);
        EXPECT_EQ(vm.disallowVMEntryCount, 0u);
        enterScope(vm, 1, 10);
        EXPECT_EQ(vm.disallowVMEntryCount, 0u);
    }
}

TEST(JavaScriptCore_DisallowVMEntry, CopyConstruction)
{
    WTF::initializeMainThread();
    JSC::initialize();

    VM& vm = VM::create(HeapType::Large).leakRef();
    {
        JSLockHolder locker(vm);
        EXPECT_EQ(vm.disallowVMEntryCount, 0u);

        {
            DisallowVMEntry disallowVMEntry(vm);
            EXPECT_EQ(vm.disallowVMEntryCount, 1u);
            {
                DisallowVMEntry disallowVMEntry2(disallowVMEntry);
                EXPECT_EQ(vm.disallowVMEntryCount, 2u);
            }
            EXPECT_EQ(vm.disallowVMEntryCount, 1u);
        }

        EXPECT_EQ(vm.disallowVMEntryCount, 0u);
    }
}

TEST(JavaScriptCore_DisallowVMEntry, CopyAssignment)
{
    WTF::initializeMainThread();
    JSC::initialize();

    VM& vm = VM::create(HeapType::Large).leakRef();
    {
        JSLockHolder locker(vm);
        EXPECT_EQ(vm.disallowVMEntryCount, 0u);

        {
            DisallowVMEntry disallowVMEntry(vm);
            EXPECT_EQ(vm.disallowVMEntryCount, 1u);
            {
                DisallowVMEntry disallowVMEntry2 = disallowVMEntry;
                EXPECT_EQ(vm.disallowVMEntryCount, 2u);

                disallowVMEntry = disallowVMEntry2;
                EXPECT_EQ(vm.disallowVMEntryCount, 2u);
            }
            EXPECT_EQ(vm.disallowVMEntryCount, 1u);
        }

        EXPECT_EQ(vm.disallowVMEntryCount, 0u);
    }
}

} // namespace TestWebKitAPI
