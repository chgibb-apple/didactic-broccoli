/*
 * Copyright (c) 2022 Apple Inc. All rights reserved.
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

#import "config.h"

#import "LiteralExpressions.h"
#import "ParserPrivate.h"
#import <XCTest/XCTest.h>

static Expected<UniqueRef<WGSL::AST::Expression>, WGSL::Error> parseLCharPrimaryExpression(const String& input)
{
    WGSL::Lexer<LChar> lexer(input);
    WGSL::Parser parser(lexer);

    return parser.parsePrimaryExpression();
}

template<class NumberType>
struct ConstLiteralTestCase {
    String input;
    NumberType expectedValue;
};

@interface ConstLiteralTests : XCTestCase

@end

@implementation ConstLiteralTests

- (void)setUp {
    [super setUp];
    [self setContinueAfterFailure:NO];
}

- (void)testBoolLiteralDecimal {
    const ConstLiteralTestCase<bool> testCases[] = {
        { "true"_s, true },
        { "false"_s, false }
    };

    for (const auto& testCase : testCases) {
        auto parseResult = parseLCharPrimaryExpression(testCase.input);
        XCTAssert(parseResult);

        auto expr = WTFMove(*parseResult);
        XCTAssert(expr->isBoolLiteral());

        const auto& intLiteral = downcast<WGSL::AST::BoolLiteral>(expr.get());
        XCTAssert(intLiteral.value() == testCase.expectedValue);
        auto inputLength = testCase.input.length();
        XCTAssert(intLiteral.span() == WGSL::SourceSpan(0, inputLength, inputLength, 0));
    }
}

- (void)testAbstractIntLiteralDecimal {
    const ConstLiteralTestCase<int64_t> testCases[] = {
        { "0"_s, 0LL },
        { "1"_s, 1LL },
        { "12345"_s, 12345LL },
        { "9223372036854775807"_s, 9223372036854775807LL }
    };

    for (const auto& testCase : testCases) {
        auto parseResult = parseLCharPrimaryExpression(testCase.input);
        XCTAssert(parseResult);

        auto expr = WTFMove(*parseResult);
        XCTAssert(expr->isAbstractIntLiteral());

        const auto& intLiteral = downcast<WGSL::AST::AbstractIntLiteral>(expr.get());
        XCTAssert(intLiteral.value() == testCase.expectedValue);
        auto inputLength = testCase.input.length();
        XCTAssert(intLiteral.span() == WGSL::SourceSpan(0, inputLength, inputLength, 0));
    }
}

- (void)testAbstractIntLiteralHex {
    const ConstLiteralTestCase<int64_t> testCases[] = {
        { "0x0"_s, 0x0LL },
        { "0x1"_s, 0x1LL },
        { "0x12345"_s, 0x12345LL },
        { "0x8fffffffffffffff"_s, 9223372036854775807LL }
    };

    for (const auto& testCase : testCases) {
        auto parseResult = parseLCharPrimaryExpression(testCase.input);
        XCTAssert(parseResult);

        auto expr = WTFMove(*parseResult);
        XCTAssert(expr->isAbstractIntLiteral());

        const auto& intLiteral = downcast<WGSL::AST::AbstractIntLiteral>(expr.get());
        XCTAssert(intLiteral.value() == testCase.expectedValue);
        auto inputLength = testCase.input.length();
        XCTAssert(intLiteral.span() == WGSL::SourceSpan(0, inputLength, inputLength, 0));
    }
}

- (void)testAbstractFloatLiteralDec {
    const ConstLiteralTestCase<double> testCases[] = {
        { "0.0"_s, 0.0 },
        { "0.1"_s, 0.1 },
        { "2612.0324"_s, 2612.0324 },
        { "0.00000001"_s, 0.00000001 },
        { "1234.5678e-3"_s, 1234.5678e-3 },
        { "01."_s, 01. },
        { ".01"_s, .01 },
        { "1e-3"_s, 1e-3 }
    };

    for (const auto& testCase : testCases) {
        auto parseResult = parseLCharPrimaryExpression(testCase.input);
        XCTAssert(parseResult);

        auto expr = WTFMove(*parseResult);
        XCTAssert(expr->isAbstractFloatLiteral());

        const auto& floatLiteral = downcast<WGSL::AST::AbstractFloatLiteral>(expr.get());
        XCTAssert(floatLiteral.value() == testCase.expectedValue);
        auto inputLength = testCase.input.length();
        XCTAssert(floatLiteral.span() == WGSL::SourceSpan(0, inputLength, inputLength, 0));
    }
}

- (void)testAbstractFloatLiteralHex {
    XCTSkip(@"Hexadecimal floats not implemented yet");

    const ConstLiteralTestCase<double> testCases[] = {
        { "0xa.fp+2"_s, 0xa.fp+2 },
        { "0X.3"_s, 0X.3p+0 },
        { "0X1.fp-4"_s, 0X1.fp-4 }
    };

    for (const auto& testCase : testCases) {
        auto parseResult = parseLCharPrimaryExpression(testCase.input);
        XCTAssert(parseResult);

        auto expr = WTFMove(*parseResult);
        XCTAssert(expr->isAbstractFloatLiteral());

        const auto& floatLiteral = downcast<WGSL::AST::AbstractFloatLiteral>(expr.get());
        XCTAssert(floatLiteral.value() == testCase.expectedValue);
        auto inputLength = testCase.input.length();
        XCTAssert(floatLiteral.span() == WGSL::SourceSpan(0, inputLength, inputLength, 0));
    }
}

@end
