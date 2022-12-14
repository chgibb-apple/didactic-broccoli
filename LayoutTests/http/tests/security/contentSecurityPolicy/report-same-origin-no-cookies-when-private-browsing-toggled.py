#!/usr/bin/env python3

import sys

sys.stdout.write(
    'Content-Security-Policy: img-src \'none\'; report-uri /security/contentSecurityPolicy/resources/save-report.py\r\n'
    'Content-Type: text/html\r\n\r\n'
    '<!DOCTYPE html>\n'
    '<html>\n'
    '<body>\n'
    '<script>\n'
    '    // Normal browsing mode\n'
    '    var xhr = new XMLHttpRequest();\n'
    '    xhr.open("GET", "/cookies/resources/setCookies.cgi", false);\n'
    '    xhr.setRequestHeader("X-SET-COOKIE", "hello=world;path=/");\n'
    '    xhr.send(null);\n'
    '\n'
    '    if (window.testRunner)\n'
    '        testRunner.setPrivateBrowsingEnabled_DEPRECATED(true);\n'
    '</script>\n'
    '\n'
    '<!-- This image will generate a CSP violation report. -->\n'
    '<img src="/security/resources/abe.png">\n'
    '\n'
    '<script src="resources/go-to-echo-report.js"></script>\n'
    '</body>\n'
    '</html>\n'
)