/*
 * Copyright (C) 2015 Apple Inc. All rights reserved.
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
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#include "config.h"
#include "Nodes.h"

#include "JSCJSValueInlines.h"
#include "JSModuleRecord.h"
#include "ModuleAnalyzer.h"

namespace JSC {

static RefPtr<ScriptFetchParameters> tryCreateAssertion(VM& vm, ImportAssertionListNode* assertionList)
{
    if (!assertionList)
        return nullptr;

    // Currently, only "type" is supported.
    std::optional<ScriptFetchParameters::Type> type;
    for (auto& [key, value] : assertionList->assertions()) {
        if (*key == vm.propertyNames->type)
            type = ScriptFetchParameters::parseType(value->impl());
    }

    if (type)
        return ScriptFetchParameters::create(type.value());
    return nullptr;
}

void ScopeNode::analyzeModule(ModuleAnalyzer& analyzer)
{
    m_statements->analyzeModule(analyzer);
}

void SourceElements::analyzeModule(ModuleAnalyzer& analyzer)
{
    // In the module analyzer phase, only module declarations are included in the top-level SourceElements.
    for (StatementNode* statement = m_head; statement; statement = statement->next()) {
        ASSERT(statement->isModuleDeclarationNode());
        static_cast<ModuleDeclarationNode*>(statement)->analyzeModule(analyzer);
    }
}

void ImportDeclarationNode::analyzeModule(ModuleAnalyzer& analyzer)
{
    analyzer.appendRequestedModule(m_moduleName->moduleName(), tryCreateAssertion(analyzer.vm(), assertionList()));
    for (auto* specifier : m_specifierList->specifiers()) {
        analyzer.moduleRecord()->addImportEntry(JSModuleRecord::ImportEntry {
            specifier->importedName() == analyzer.vm().propertyNames->timesIdentifier
                ? JSModuleRecord::ImportEntryType::Namespace : JSModuleRecord::ImportEntryType::Single,
            m_moduleName->moduleName(),
            specifier->importedName(),
            specifier->localName(),
        });
    }
}

void ExportAllDeclarationNode::analyzeModule(ModuleAnalyzer& analyzer)
{
    analyzer.appendRequestedModule(m_moduleName->moduleName(), tryCreateAssertion(analyzer.vm(), assertionList()));
    analyzer.moduleRecord()->addStarExportEntry(m_moduleName->moduleName());
}

void ExportDefaultDeclarationNode::analyzeModule(ModuleAnalyzer&)
{
}

void ExportLocalDeclarationNode::analyzeModule(ModuleAnalyzer&)
{
}

void ExportNamedDeclarationNode::analyzeModule(ModuleAnalyzer& analyzer)
{
    if (m_moduleName)
        analyzer.appendRequestedModule(m_moduleName->moduleName(), tryCreateAssertion(analyzer.vm(), assertionList()));

    for (auto* specifier : m_specifierList->specifiers()) {
        if (m_moduleName) {
            // export { v } from "mod"
            //
            // In this case, no local variable names are imported into the current module.
            // "v" indirectly points the binding in "mod".
            //
            // export * as v from "mod"
            //
            // If it is namespace export, we should use createNamespace.
            if (specifier->localName() == analyzer.vm().propertyNames->starNamespacePrivateName)
                analyzer.moduleRecord()->addExportEntry(JSModuleRecord::ExportEntry::createNamespace(specifier->exportedName(), m_moduleName->moduleName()));
            else
                analyzer.moduleRecord()->addExportEntry(JSModuleRecord::ExportEntry::createIndirect(specifier->exportedName(), specifier->localName(), m_moduleName->moduleName()));
        }
    }
}

} // namespace JSC
