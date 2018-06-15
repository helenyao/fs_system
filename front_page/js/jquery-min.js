(function(a) {
    if (typeof exports == "object" && typeof module == "object") {
        a(require("../../lib/codemirror"))
    } else {
        if (typeof define == "function" && define.amd) {
            define(["../../lib/codemirror"], a)
        } else {
            a(CodeMirror)
        }
    }
}
)(function(a) {
    a.defineMode("javascript", function(Z, aj) {
        var l = Z.indentUnit;
        var A = aj.statementIndent;
        var aA = aj.jsonld;
        var z = aj.json || aA;
        var g = aj.typescript;
        var au = aj.wordCharacters || /[\w$\xa1-\uffff]/;
        var ar = function() {
            function aQ(aS) {
                return {
                    type: aS,
                    style: "keyword"
                }
            }
            var aL = aQ("keyword a")
              , aJ = aQ("keyword b")
              , aI = aQ("keyword c");
            var aK = aQ("operator")
              , aO = {
                type: "atom",
                style: "atom"
            };
            var aM = {
                "if": aQ("if"),
                "while": aL,
                "with": aL,
                "else": aJ,
                "do": aJ,
                "try": aJ,
                "finally": aJ,
                "return": aI,
                "break": aI,
                "continue": aI,
                "new": aI,
                "delete": aI,
                "throw": aI,
                "debugger": aI,
                "var": aQ("var"),
                "const": aQ("var"),
                let: aQ("var"),
                "function": aQ("function"),
                "catch": aQ("catch"),
                "for": aQ("for"),
                "switch": aQ("switch"),
                "case": aQ("case"),
                "default": aQ("default"),
                "in": aK,
                "typeof": aK,
                "instanceof": aK,
                "true": aO,
                "false": aO,
                "null": aO,
                "undefined": aO,
                "NaN": aO,
                "Infinity": aO,
                "this": aQ("this"),
                module: aQ("module"),
                "class": aQ("class"),
                "super": aQ("atom"),
                yield: aI,
                "export": aQ("export"),
                "import": aQ("import"),
                "extends": aI
            };
            if (g) {
                var aR = {
                    type: "variable",
                    style: "variable-3"
                };
                var aN = {
                    "interface": aQ("interface"),
                    "extends": aQ("extends"),
                    constructor: aQ("constructor"),
                    "public": aQ("public"),
                    "private": aQ("private"),
                    "protected": aQ("protected"),
                    "static": aQ("static"),
                    string: aR,
                    number: aR,
                    bool: aR,
                    any: aR
                };
                for (var aP in aN) {
                    aM[aP] = aN[aP]
                }
            }
            return aM
        }();
        var P = /[+\-*&%=<>!?|~^]/;
        var aq = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
        function F(aL) {
            var aJ = false, aI, aK = false;
            while ((aI = aL.next()) != null) {
                if (!aJ) {
                    if (aI == "/" && !aK) {
                        return
                    }
                    if (aI == "[") {
                        aK = true
                    } else {
                        if (aK && aI == "]") {
                            aK = false
                        }
                    }
                }
                aJ = !aJ && aI == "\\"
            }
        }
        var S, G;
        function L(aK, aJ, aI) {
            S = aK;
            G = aI;
            return aJ
        }
        function U(aM, aK) {
            var aI = aM.next();
            if (aI == '"' || aI == "'") {
                aK.tokenize = R(aI);
                return aK.tokenize(aM, aK)
            } else {
                if (aI == "." && aM.match(/^\d+(?:[eE][+\-]?\d+)?/)) {
                    return L("number", "number")
                } else {
                    if (aI == "." && aM.match("..")) {
                        return L("spread", "meta")
                    } else {
                        if (/[\[\]{}\(\),;\:\.]/.test(aI)) {
                            return L(aI)
                        } else {
                            if (aI == "=" && aM.eat(">")) {
                                return L("=>", "operator")
                            } else {
                                if (aI == "0" && aM.eat(/x/i)) {
                                    aM.eatWhile(/[\da-f]/i);
                                    return L("number", "number")
                                } else {
                                    if (/\d/.test(aI)) {
                                        aM.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
                                        return L("number", "number")
                                    } else {
                                        if (aI == "/") {
                                            if (aM.eat("*")) {
                                                aK.tokenize = az;
                                                return az(aM, aK)
                                            } else {
                                                if (aM.eat("/")) {
                                                    aM.skipToEnd();
                                                    return L("comment", "comment")
                                                } else {
                                                    if (aK.lastType == "operator" || aK.lastType == "keyword c" || aK.lastType == "sof" || /^[\[{}\(,;:]$/.test(aK.lastType)) {
                                                        F(aM);
                                                        aM.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);
                                                        return L("regexp", "string-2")
                                                    } else {
                                                        aM.eatWhile(P);
                                                        return L("operator", "operator", aM.current())
                                                    }
                                                }
                                            }
                                        } else {
                                            if (aI == "`") {
                                                aK.tokenize = aB;
                                                return aB(aM, aK)
                                            } else {
                                                if (aI == "#") {
                                                    aM.skipToEnd();
                                                    return L("error", "error")
                                                } else {
                                                    if (P.test(aI)) {
                                                        aM.eatWhile(P);
                                                        return L("operator", "operator", aM.current())
                                                    } else {
                                                        if (au.test(aI)) {
                                                            aM.eatWhile(au);
                                                            var aL = aM.current()
                                                              , aJ = ar.propertyIsEnumerable(aL) && ar[aL];
                                                            return (aJ && aK.lastType != ".") ? L(aJ.type, aJ.style, aL) : L("variable", "variable", aL)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        function R(aI) {
            return function(aM, aK) {
                var aL = false, aJ;
                if (aA && aM.peek() == "@" && aM.match(aq)) {
                    aK.tokenize = U;
                    return L("jsonld-keyword", "meta")
                }
                while ((aJ = aM.next()) != null) {
                    if (aJ == aI && !aL) {
                        break
                    }
                    aL = !aL && aJ == "\\"
                }
                if (!aL) {
                    aK.tokenize = U
                }
                return L("string", "string")
            }
        }
        function az(aL, aK) {
            var aI = false, aJ;
            while (aJ = aL.next()) {
                if (aJ == "/" && aI) {
                    aK.tokenize = U;
                    break
                }
                aI = (aJ == "*")
            }
            return L("comment", "comment")
        }
        function aB(aL, aJ) {
            var aK = false, aI;
            while ((aI = aL.next()) != null) {
                if (!aK && (aI == "`" || aI == "$" && aL.eat("{"))) {
                    aJ.tokenize = U;
                    break
                }
                aK = !aK && aI == "\\"
            }
            return L("quasi", "string-2", aL.current())
        }
        var m = "([{}])";
        function aw(aO, aL) {
            if (aL.fatArrowAt) {
                aL.fatArrowAt = null
            }
            var aK = aO.string.indexOf("=>", aO.start);
            if (aK < 0) {
                return
            }
            var aN = 0
              , aJ = false;
            for (var aP = aK - 1; aP >= 0; --aP) {
                var aI = aO.string.charAt(aP);
                var aM = m.indexOf(aI);
                if (aM >= 0 && aM < 3) {
                    if (!aN) {
                        ++aP;
                        break
                    }
                    if (--aN == 0) {
                        break
                    }
                } else {
                    if (aM >= 3 && aM < 6) {
                        ++aN
                    } else {
                        if (au.test(aI)) {
                            aJ = true
                        } else {
                            if (/["'\/]/.test(aI)) {
                                return
                            } else {
                                if (aJ && !aN) {
                                    ++aP;
                                    break
                                }
                            }
                        }
                    }
                }
            }
            if (aJ && !aN) {
                aL.fatArrowAt = aP
            }
        }
        var b = {
            atom: true,
            number: true,
            variable: true,
            string: true,
            regexp: true,
            "this": true,
            "jsonld-keyword": true
        };
        function J(aN, aJ, aI, aM, aK, aL) {
            this.indented = aN;
            this.column = aJ;
            this.type = aI;
            this.prev = aK;
            this.info = aL;
            if (aM != null) {
                this.align = aM
            }
        }
        function s(aL, aK) {
            for (var aJ = aL.localVars; aJ; aJ = aJ.next) {
                if (aJ.name == aK) {
                    return true
                }
            }
            for (var aI = aL.context; aI; aI = aI.prev) {
                for (var aJ = aI.vars; aJ; aJ = aJ.next) {
                    if (aJ.name == aK) {
                        return true
                    }
                }
            }
        }
        function f(aM, aJ, aI, aL, aN) {
            var aO = aM.cc;
            D.state = aM;
            D.stream = aN;
            D.marked = null,
            D.cc = aO;
            D.style = aJ;
            if (!aM.lexical.hasOwnProperty("align")) {
                aM.lexical.align = true
            }
            while (true) {
                var aK = aO.length ? aO.pop() : z ? an : aG;
                if (aK(aI, aL)) {
                    while (aO.length && aO[aO.length - 1].lex) {
                        aO.pop()()
                    }
                    if (D.marked) {
                        return D.marked
                    }
                    if (aI == "variable" && s(aM, aL)) {
                        return "variable-2"
                    }
                    return aJ
                }
            }
        }
        var D = {
            state: null,
            column: null,
            marked: null,
            cc: null
        };
        function aa() {
            for (var aI = arguments.length - 1; aI >= 0; aI--) {
                D.cc.push(arguments[aI])
            }
        }
        function ae() {
            aa.apply(null, arguments);
            return true
        }
        function av(aJ) {
            function aI(aM) {
                for (var aL = aM; aL; aL = aL.next) {
                    if (aL.name == aJ) {
                        return true
                    }
                }
                return false
            }
            var aK = D.state;
            if (aK.context) {
                D.marked = "def";
                if (aI(aK.localVars)) {
                    return
                }
                aK.localVars = {
                    name: aJ,
                    next: aK.localVars
                }
            } else {
                if (aI(aK.globalVars)) {
                    return
                }
                if (aj.globalVars) {
                    aK.globalVars = {
                        name: aJ,
                        next: aK.globalVars
                    }
                }
            }
        }
        var q = {
            name: "this",
            next: {
                name: "arguments"
            }
        };
        function w() {
            D.state.context = {
                prev: D.state.context,
                vars: D.state.localVars
            };
            D.state.localVars = q
        }
        function x() {
            D.state.localVars = D.state.context.vars;
            D.state.context = D.state.context.prev
        }
        function aE(aJ, aK) {
            var aI = function() {
                var aN = D.state
                  , aL = aN.indented;
                if (aN.lexical.type == "stat") {
                    aL = aN.lexical.indented
                } else {
                    for (var aM = aN.lexical; aM && aM.type == ")" && aM.align; aM = aM.prev) {
                        aL = aM.indented
                    }
                }
                aN.lexical = new J(aL,D.stream.column(),aJ,null,aN.lexical,aK)
            };
            aI.lex = true;
            return aI
        }
        function h() {
            var aI = D.state;
            if (aI.lexical.prev) {
                if (aI.lexical.type == ")") {
                    aI.indented = aI.lexical.indented
                }
                aI.lexical = aI.lexical.prev
            }
        }
        h.lex = true;
        function r(aI) {
            function aJ(aK) {
                if (aK == aI) {
                    return ae()
                } else {
                    if (aI == ";") {
                        return aa()
                    } else {
                        return ae(aJ)
                    }
                }
            }
            return aJ
        }
        function aG(aI, aJ) {
            if (aI == "var") {
                return ae(aE("vardef", aJ.length), d, r(";"), h)
            }
            if (aI == "keyword a") {
                return ae(aE("form"), an, aG, h)
            }
            if (aI == "keyword b") {
                return ae(aE("form"), aG, h)
            }
            if (aI == "{") {
                return ae(aE("}"), y, h)
            }
            if (aI == ";") {
                return ae()
            }
            if (aI == "if") {
                if (D.state.lexical.info == "else" && D.state.cc[D.state.cc.length - 1] == h) {
                    D.state.cc.pop()()
                }
                return ae(aE("form"), an, aG, h, e)
            }
            if (aI == "function") {
                return ae(M)
            }
            if (aI == "for") {
                return ae(aE("form"), u, aG, h)
            }
            if (aI == "variable") {
                return ae(aE("stat"), aH)
            }
            if (aI == "switch") {
                return ae(aE("form"), an, aE("}", "switch"), r("{"), y, h, h)
            }
            if (aI == "case") {
                return ae(an, r(":"))
            }
            if (aI == "default") {
                return ae(r(":"))
            }
            if (aI == "catch") {
                return ae(aE("form"), w, r("("), af, r(")"), aG, h, x)
            }
            if (aI == "module") {
                return ae(aE("form"), w, H, x, h)
            }
            if (aI == "class") {
                return ae(aE("form"), V, h)
            }
            if (aI == "export") {
                return ae(aE("form"), aF, h)
            }
            if (aI == "import") {
                return ae(aE("form"), ag, h)
            }
            return aa(aE("stat"), an, r(";"), h)
        }
        function an(aI) {
            return Y(aI, false)
        }
        function aD(aI) {
            return Y(aI, true)
        }
        function Y(aJ, aL) {
            if (D.state.fatArrowAt == D.stream.start) {
                var aI = aL ? N : W;
                if (aJ == "(") {
                    return ae(w, aE(")"), at(i, ")"), h, r("=>"), aI, x)
                } else {
                    if (aJ == "variable") {
                        return aa(w, i, r("=>"), aI, x)
                    }
                }
            }
            var aK = aL ? j : ab;
            if (b.hasOwnProperty(aJ)) {
                return ae(aK)
            }
            if (aJ == "function") {
                return ae(M, aK)
            }
            if (aJ == "keyword c") {
                return ae(aL ? ak : ai)
            }
            if (aJ == "(") {
                return ae(aE(")"), ai, ay, r(")"), h, aK)
            }
            if (aJ == "operator" || aJ == "spread") {
                return ae(aL ? aD : an)
            }
            if (aJ == "[") {
                return ae(aE("]"), n, h, aK)
            }
            if (aJ == "{") {
                return ax(t, "}", null, aK)
            }
            if (aJ == "quasi") {
                return aa(Q, aK)
            }
            return ae()
        }
        function ai(aI) {
            if (aI.match(/[;\}\)\],]/)) {
                return aa()
            }
            return aa(an)
        }
        function ak(aI) {
            if (aI.match(/[;\}\)\],]/)) {
                return aa()
            }
            return aa(aD)
        }
        function ab(aI, aJ) {
            if (aI == ",") {
                return ae(an)
            }
            return j(aI, aJ, false)
        }
        function j(aI, aK, aM) {
            var aJ = aM == false ? ab : j;
            var aL = aM == false ? an : aD;
            if (aI == "=>") {
                return ae(w, aM ? N : W, x)
            }
            if (aI == "operator") {
                if (/\+\+|--/.test(aK)) {
                    return ae(aJ)
                }
                if (aK == "?") {
                    return ae(an, r(":"), aL)
                }
                return ae(aL)
            }
            if (aI == "quasi") {
                return aa(Q, aJ)
            }
            if (aI == ";") {
                return
            }
            if (aI == "(") {
                return ax(aD, ")", "call", aJ)
            }
            if (aI == ".") {
                return ae(al, aJ)
            }
            if (aI == "[") {
                return ae(aE("]"), ai, r("]"), h, aJ)
            }
        }
        function Q(aI, aJ) {
            if (aI != "quasi") {
                return aa()
            }
            if (aJ.slice(aJ.length - 2) != "${") {
                return ae(Q)
            }
            return ae(an, p)
        }
        function p(aI) {
            if (aI == "}") {
                D.marked = "string-2";
                D.state.tokenize = aB;
                return ae(Q)
            }
        }
        function W(aI) {
            aw(D.stream, D.state);
            return aa(aI == "{" ? aG : an)
        }
        function N(aI) {
            aw(D.stream, D.state);
            return aa(aI == "{" ? aG : aD)
        }
        function aH(aI) {
            if (aI == ":") {
                return ae(h, aG)
            }
            return aa(ab, r(";"), h)
        }
        function al(aI) {
            if (aI == "variable") {
                D.marked = "property";
                return ae()
            }
        }
        function t(aI, aJ) {
            if (aI == "variable" || D.style == "keyword") {
                D.marked = "property";
                if (aJ == "get" || aJ == "set") {
                    return ae(I)
                }
                return ae(K)
            } else {
                if (aI == "number" || aI == "string") {
                    D.marked = aA ? "property" : (D.style + " property");
                    return ae(K)
                } else {
                    if (aI == "jsonld-keyword") {
                        return ae(K)
                    } else {
                        if (aI == "[") {
                            return ae(an, r("]"), K)
                        }
                    }
                }
            }
        }
        function I(aI) {
            if (aI != "variable") {
                return aa(K)
            }
            D.marked = "property";
            return ae(M)
        }
        function K(aI) {
            if (aI == ":") {
                return ae(aD)
            }
            if (aI == "(") {
                return aa(M)
            }
        }
        function at(aK, aI) {
            function aJ(aM) {
                if (aM == ",") {
                    var aL = D.state.lexical;
                    if (aL.info == "call") {
                        aL.pos = (aL.pos || 0) + 1
                    }
                    return ae(aK, aJ)
                }
                if (aM == aI) {
                    return ae()
                }
                return ae(r(aI))
            }
            return function(aL) {
                if (aL == aI) {
                    return ae()
                }
                return aa(aK, aJ)
            }
        }
        function ax(aL, aI, aK) {
            for (var aJ = 3; aJ < arguments.length; aJ++) {
                D.cc.push(arguments[aJ])
            }
            return ae(aE(aI, aK), at(aL, aI), h)
        }
        function y(aI) {
            if (aI == "}") {
                return ae()
            }
            return aa(aG, y)
        }
        function T(aI) {
            if (g && aI == ":") {
                return ae(ad)
            }
        }
        function ad(aI) {
            if (aI == "variable") {
                D.marked = "variable-3";
                return ae()
            }
        }
        function d() {
            return aa(i, T, ac, X)
        }
        function i(aI, aJ) {
            if (aI == "variable") {
                av(aJ);
                return ae()
            }
            if (aI == "[") {
                return ax(i, "]")
            }
            if (aI == "{") {
                return ax(aC, "}")
            }
        }
        function aC(aI, aJ) {
            if (aI == "variable" && !D.stream.match(/^\s*:/, false)) {
                av(aJ);
                return ae(ac)
            }
            if (aI == "variable") {
                D.marked = "property"
            }
            return ae(r(":"), i, ac)
        }
        function ac(aI, aJ) {
            if (aJ == "=") {
                return ae(aD)
            }
        }
        function X(aI) {
            if (aI == ",") {
                return ae(d)
            }
        }
        function e(aI, aJ) {
            if (aI == "keyword b" && aJ == "else") {
                return ae(aE("form", "else"), aG, h)
            }
        }
        function u(aI) {
            if (aI == "(") {
                return ae(aE(")"), E, r(")"), h)
            }
        }
        function E(aI) {
            if (aI == "var") {
                return ae(d, r(";"), C)
            }
            if (aI == ";") {
                return ae(C)
            }
            if (aI == "variable") {
                return ae(v)
            }
            return aa(an, r(";"), C)
        }
        function v(aI, aJ) {
            if (aJ == "in" || aJ == "of") {
                D.marked = "keyword";
                return ae(an)
            }
            return ae(ab, C)
        }
        function C(aI, aJ) {
            if (aI == ";") {
                return ae(B)
            }
            if (aJ == "in" || aJ == "of") {
                D.marked = "keyword";
                return ae(an)
            }
            return aa(an, r(";"), B)
        }
        function B(aI) {
            if (aI != ")") {
                ae(an)
            }
        }
        function M(aI, aJ) {
            if (aJ == "*") {
                D.marked = "keyword";
                return ae(M)
            }
            if (aI == "variable") {
                av(aJ);
                return ae(M)
            }
            if (aI == "(") {
                return ae(w, aE(")"), at(af, ")"), h, aG, x)
            }
        }
        function af(aI) {
            if (aI == "spread") {
                return ae(af)
            }
            return aa(i, T)
        }
        function V(aI, aJ) {
            if (aI == "variable") {
                av(aJ);
                return ae(O)
            }
        }
        function O(aI, aJ) {
            if (aJ == "extends") {
                return ae(an, O)
            }
            if (aI == "{") {
                return ae(aE("}"), o, h)
            }
        }
        function o(aI, aJ) {
            if (aI == "variable" || D.style == "keyword") {
                if (aJ == "static") {
                    D.marked = "keyword";
                    return ae(o)
                }
                D.marked = "property";
                if (aJ == "get" || aJ == "set") {
                    return ae(c, M, o)
                }
                return ae(M, o)
            }
            if (aJ == "*") {
                D.marked = "keyword";
                return ae(o)
            }
            if (aI == ";") {
                return ae(o)
            }
            if (aI == "}") {
                return ae()
            }
        }
        function c(aI) {
            if (aI != "variable") {
                return aa()
            }
            D.marked = "property";
            return ae()
        }
        function H(aI, aJ) {
            if (aI == "string") {
                return ae(aG)
            }
            if (aI == "variable") {
                av(aJ);
                return ae(ah)
            }
        }
        function aF(aI, aJ) {
            if (aJ == "*") {
                D.marked = "keyword";
                return ae(ah, r(";"))
            }
            if (aJ == "default") {
                D.marked = "keyword";
                return ae(an, r(";"))
            }
            return aa(aG)
        }
        function ag(aI) {
            if (aI == "string") {
                return ae()
            }
            return aa(ap, ah)
        }
        function ap(aI, aJ) {
            if (aI == "{") {
                return ax(ap, "}")
            }
            if (aI == "variable") {
                av(aJ)
            }
            if (aJ == "*") {
                D.marked = "keyword"
            }
            return ae(k)
        }
        function k(aI, aJ) {
            if (aJ == "as") {
                D.marked = "keyword";
                return ae(ap)
            }
        }
        function ah(aI, aJ) {
            if (aJ == "from") {
                D.marked = "keyword";
                return ae(an)
            }
        }
        function n(aI) {
            if (aI == "]") {
                return ae()
            }
            return aa(aD, am)
        }
        function am(aI) {
            if (aI == "for") {
                return aa(ay, r("]"))
            }
            if (aI == ",") {
                return ae(at(ak, "]"))
            }
            return aa(at(aD, "]"))
        }
        function ay(aI) {
            if (aI == "for") {
                return ae(u, ay)
            }
            if (aI == "if") {
                return ae(an, ay)
            }
        }
        function ao(aJ, aI) {
            return aJ.lastType == "operator" || aJ.lastType == "," || P.test(aI.charAt(0)) || /[,.]/.test(aI.charAt(0))
        }
        return {
            startState: function(aJ) {
                var aI = {
                    tokenize: U,
                    lastType: "sof",
                    cc: [],
                    lexical: new J((aJ || 0) - l,0,"block",false),
                    localVars: aj.localVars,
                    context: aj.localVars && {
                        vars: aj.localVars
                    },
                    indented: 0
                };
                if (aj.globalVars && typeof aj.globalVars == "object") {
                    aI.globalVars = aj.globalVars
                }
                return aI
            },
            token: function(aK, aJ) {
                if (aK.sol()) {
                    if (!aJ.lexical.hasOwnProperty("align")) {
                        aJ.lexical.align = false
                    }
                    aJ.indented = aK.indentation();
                    aw(aK, aJ)
                }
                if (aJ.tokenize != az && aK.eatSpace()) {
                    return null
                }
                var aI = aJ.tokenize(aK, aJ);
                if (S == "comment") {
                    return aI
                }
                aJ.lastType = S == "operator" && (G == "++" || G == "--") ? "incdec" : S;
                return f(aJ, aI, S, G, aK)
            },
            indent: function(aO, aI) {
                if (aO.tokenize == az) {
                    return a.Pass
                }
                if (aO.tokenize != U) {
                    return 0
                }
                var aN = aI && aI.charAt(0)
                  , aL = aO.lexical;
                if (!/^\s*else\b/.test(aI)) {
                    for (var aK = aO.cc.length - 1; aK >= 0; --aK) {
                        var aP = aO.cc[aK];
                        if (aP == h) {
                            aL = aL.prev
                        } else {
                            if (aP != e) {
                                break
                            }
                        }
                    }
                }
                if (aL.type == "stat" && aN == "}") {
                    aL = aL.prev
                }
                if (A && aL.type == ")" && aL.prev.type == "stat") {
                    aL = aL.prev
                }
                var aM = aL.type
                  , aJ = aN == aM;
                if (aM == "vardef") {
                    return aL.indented + (aO.lastType == "operator" || aO.lastType == "," ? aL.info + 1 : 0)
                } else {
                    if (aM == "form" && aN == "{") {
                        return aL.indented
                    } else {
                        if (aM == "form") {
                            return aL.indented + l
                        } else {
                            if (aM == "stat") {
                                return aL.indented + (ao(aO, aI) ? A || l : 0)
                            } else {
                                if (aL.info == "switch" && !aJ && aj.doubleIndentSwitch != false) {
                                    return aL.indented + (/^(?:case|default)\b/.test(aI) ? l : 2 * l)
                                } else {
                                    if (aL.align) {
                                        return aL.column + (aJ ? 0 : 1)
                                    } else {
                                        return aL.indented + (aJ ? 0 : l)
                                    }
                                }
                            }
                        }
                    }
                }
            },
            electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
            blockCommentStart: z ? null : "/*",
            blockCommentEnd: z ? null : "*/",
            lineComment: z ? null : "//",
            fold: "brace",
            closeBrackets: "()[]{}''\"\"``",
            helperType: z ? "json" : "javascript",
            jsonldMode: aA,
            jsonMode: z
        }
    });
    a.registerHelper("wordChars", "javascript", /[\w$]/);
    a.defineMIME("text/javascript", "javascript");
    a.defineMIME("text/ecmascript", "javascript");
    a.defineMIME("application/javascript", "javascript");
    a.defineMIME("application/x-javascript", "javascript");
    a.defineMIME("application/ecmascript", "javascript");
    a.defineMIME("application/json", {
        name: "javascript",
        json: true
    });
    a.defineMIME("application/x-json", {
        name: "javascript",
        json: true
    });
    a.defineMIME("application/ld+json", {
        name: "javascript",
        jsonld: true
    });
    a.defineMIME("text/typescript", {
        name: "javascript",
        typescript: true
    });
    a.defineMIME("application/typescript", {
        name: "javascript",
        typescript: true
    })
});
