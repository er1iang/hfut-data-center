var BMapLib = window.BMapLib = BMapLib || {};
(function () {
    var d, c = d = c || {version: "1.3.9"};
    c.guid = "$BAIDU$";
    (function () {
        c.dom = c.dom || {};
        c.event = c.event || {};
        c.lang = c.lang || {};
        c.browser = c.browser || {};
        c.dom.addClass = function (k, m) {
            k = c.dom.g(k);
            var f = m.split(/\s+/), e = k.className, j = " " + e + " ", h = 0, g = f.length;
            for (; h < g; h++) {
                if (j.indexOf(" " + f[h] + " ") < 0) {
                    e += (e ? " " : "") + f[h]
                }
            }
            k.className = e;
            return k
        };
        c.addClass = c.dom.addClass;
        c.dom.removeClass = function (l, m) {
            l = c.dom.g(l);
            var h = l.className.split(/\s+/), n = m.split(/\s+/), f, e = n.length, g, k = 0;
            for (; k < e; ++k) {
                for (g = 0, f = h.length; g < f; ++g) {
                    if (h[g] == n[k]) {
                        h.splice(g, 1);
                        break
                    }
                }
            }
            l.className = h.join(" ");
            return l
        };
        c.removeClass = c.dom.removeClass;
        c.dom.getComputedStyle = function (f, e) {
            f = c.dom._g(f);
            var h = c.dom.getDocument(f), g;
            if (h.defaultView && h.defaultView.getComputedStyle) {
                g = h.defaultView.getComputedStyle(f, null);
                if (g) {
                    return g[e] || g.getPropertyValue(e)
                }
            }
            return ""
        };
        c.dom.getStyle = function (f, e) {
            var h = c.dom;
            f = h.g(f);
            var g = f.style[e] || (f.currentStyle ? f.currentStyle[e] : "") || h.getComputedStyle(f, e);
            return g
        };
        c.getStyle = c.dom.getStyle;
        c.dom.getDocument = function (e) {
            e = c.dom.g(e);
            return e.nodeType == 9 ? e : e.ownerDocument || e.document
        };
        c.dom.g = function (e) {
            if ("string" == typeof e || e instanceof String) {
                return document.getElementById(e)
            } else {
                if (e && e.nodeName && (e.nodeType == 1 || e.nodeType == 9)) {
                    return e
                }
            }
            return null
        };
        c.g = c.G = c.dom.g;
        c.dom._g = function (e) {
            if (c.lang.isString(e)) {
                return document.getElementById(e)
            }
            return e
        };
        c._g = c.dom._g;
        c.lang.isString = function (e) {
            return "[object String]" == Object.prototype.toString.call(e)
        };
        c.isString = c.lang.isString;
        c.event._listeners = c.event._listeners || [];
        c.event.on = function (f, i, k) {
            i = i.replace(/^on/i, "");
            f = c.dom._g(f);
            var j = function (m) {
                k.call(f, m)
            }, e = c.event._listeners, h = c.event._eventFilter, l, g = i;
            i = i.toLowerCase();
            if (h && h[i]) {
                l = h[i](f, i, j);
                g = l.type;
                j = l.listener
            }
            if (f.addEventListener) {
                f.addEventListener(g, j, false)
            } else {
                if (f.attachEvent) {
                    f.attachEvent("on" + g, j)
                }
            }
            e[e.length] = [f, i, k, j, g];
            return f
        };
        c.on = c.event.on;
        c.event.un = function (g, j, f) {
            g = c.dom._g(g);
            j = j.replace(/^on/i, "").toLowerCase();
            var m = c.event._listeners, h = m.length, i = !f, l, k, e;
            while (h--) {
                l = m[h];
                if (l[1] === j && l[0] === g && (i || l[2] === f)) {
                    k = l[4];
                    e = l[3];
                    if (g.removeEventListener) {
                        g.removeEventListener(k, e, false)
                    } else {
                        if (g.detachEvent) {
                            g.detachEvent("on" + k, e)
                        }
                    }
                    m.splice(h, 1)
                }
            }
            return g
        };
        c.un = c.event.un;
        if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
            c.browser.ie = c.ie = document.documentMode || +RegExp["\x241"]
        }
        c.platform = c.platform || {};
        c.platform.isIphone = /iphone/i.test(navigator.userAgent);
        c.platform.isAndroid = /android/i.test(navigator.userAgent);
        c.platform.isIpad = /ipad/i.test(navigator.userAgent);
        c.isMobile = function () {
            return !!(c.platform.isIphone || c.platform.isIpad || c.platform.isAndroid)
        }
    })();
    /*!
     * iScroll v4.2.5 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
     * Released under MIT license, http://cubiq.org/license
     */
    (function (n, I) {
        var y = Math, r = I.createElement("div").style, D = (function () {
            var L = "t,webkitT,MozT,msT,OT".split(","), K, J = 0, m = L.length;
            for (; J < m; J++) {
                K = L[J] + "ransform";
                if (K in r) {
                    return L[J].substr(0, L[J].length - 1)
                }
            }
            return false
        })(), H = D ? "-" + D.toLowerCase() + "-" : "", q = w("transform"), B = w("transitionProperty"), p = w("transitionDuration"), s = w("transformOrigin"), F = w("transitionTimingFunction"), i = w("transitionDelay"), E = (/android/gi).test(navigator.appVersion), l = (/iphone|ipad/gi).test(navigator.appVersion), v = (/hp-tablet/gi).test(navigator.appVersion), o = w("perspective") in r, C = "ontouchstart" in n && !v, h = D !== false, j = w("transition") in r, k = "onorientationchange" in n ? "orientationchange" : "resize", f = C ? "touchstart" : "mousedown", x = C ? "touchmove" : "mousemove", g = C ? "touchend" : "mouseup", A = C ? "touchcancel" : "mouseup", e = (function () {
            if (D === false) {
                return false
            }
            var m = {
                "": "transitionend",
                webkit: "webkitTransitionEnd",
                Moz: "transitionend",
                O: "otransitionend",
                ms: "MSTransitionEnd"
            };
            return m[D]
        })(), u = (function () {
            return n.requestAnimationFrame || n.webkitRequestAnimationFrame || n.mozRequestAnimationFrame || n.oRequestAnimationFrame || n.msRequestAnimationFrame || function (m) {
                    return setTimeout(m, 1)
                }
        })(), t = (function () {
            return n.cancelRequestAnimationFrame || n.webkitCancelAnimationFrame || n.webkitCancelRequestAnimationFrame || n.mozCancelRequestAnimationFrame || n.oCancelRequestAnimationFrame || n.msCancelRequestAnimationFrame || clearTimeout
        })(), G = o ? " translateZ(0)" : "", z = function (K, m) {
            var L = this, J;
            L.wrapper = typeof K == "object" ? K : I.getElementById(K);
            L.wrapper.style.overflow = "hidden";
            L.scroller = L.wrapper.children[0];
            L.options = {
                hScroll: true,
                vScroll: true,
                x: 0,
                y: 0,
                bounce: true,
                bounceLock: false,
                momentum: true,
                lockDirection: true,
                useTransform: true,
                useTransition: false,
                topOffset: 0,
                checkDOMChanges: false,
                handleClick: true,
                hScrollbar: true,
                vScrollbar: true,
                fixedScrollbar: E,
                hideScrollbar: l,
                fadeScrollbar: l && o,
                scrollbarClass: "",
                zoom: false,
                zoomMin: 1,
                zoomMax: 4,
                doubleTapZoom: 2,
                wheelAction: "scroll",
                snap: false,
                snapThreshold: 1,
                onRefresh: null,
                onBeforeScrollStart: function (M) {
                    M.preventDefault()
                },
                onScrollStart: null,
                onBeforeScrollMove: null,
                onScrollMove: null,
                onBeforeScrollEnd: null,
                onScrollEnd: null,
                onTouchEnd: null,
                onDestroy: null,
                onZoomStart: null,
                onZoom: null,
                onZoomEnd: null
            };
            for (J in m) {
                L.options[J] = m[J]
            }
            L.x = L.options.x;
            L.y = L.options.y;
            L.options.useTransform = h && L.options.useTransform;
            L.options.hScrollbar = L.options.hScroll && L.options.hScrollbar;
            L.options.vScrollbar = L.options.vScroll && L.options.vScrollbar;
            L.options.zoom = L.options.useTransform && L.options.zoom;
            L.options.useTransition = j && L.options.useTransition;
            if (L.options.zoom && E) {
                G = ""
            }
            L.scroller.style[B] = L.options.useTransform ? H + "transform" : "top left";
            L.scroller.style[p] = "0";
            L.scroller.style[s] = "0 0";
            if (L.options.useTransition) {
                L.scroller.style[F] = "cubic-bezier(0.33,0.66,0.66,1)"
            }
            if (L.options.useTransform) {
                L.scroller.style[q] = "translate(" + L.x + "px," + L.y + "px)" + G
            } else {
                L.scroller.style.cssText += ";position:absolute;top:" + L.y + "px;left:" + L.x + "px"
            }
            if (L.options.useTransition) {
                L.options.fixedScrollbar = true
            }
            L.refresh();
            L._bind(k, n);
            L._bind(f);
            if (!C) {
                if (L.options.wheelAction != "none") {
                    L._bind("DOMMouseScroll");
                    L._bind("mousewheel")
                }
            }
            if (L.options.checkDOMChanges) {
                L.checkDOMTime = setInterval(function () {
                    L._checkDOMChanges()
                }, 500)
            }
        };
        z.prototype = {
            enabled: true,
            x: 0,
            y: 0,
            steps: [],
            scale: 1,
            currPageX: 0,
            currPageY: 0,
            pagesX: [],
            pagesY: [],
            aniTime: null,
            wheelZoomCount: 0,
            handleEvent: function (J) {
                var m = this;
                switch (J.type) {
                    case f:
                        if (!C && J.button !== 0) {
                            return
                        }
                        m._start(J);
                        break;
                    case x:
                        m._move(J);
                        break;
                    case g:
                    case A:
                        m._end(J);
                        break;
                    case k:
                        m._resize();
                        break;
                    case"DOMMouseScroll":
                    case"mousewheel":
                        m._wheel(J);
                        break;
                    case e:
                        m._transitionEnd(J);
                        break
                }
            },
            _checkDOMChanges: function () {
                if (this.moved || this.zoomed || this.animating || (this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) {
                    return
                }
                this.refresh()
            },
            _scrollbar: function (m) {
                var K = this, J;
                if (!K[m + "Scrollbar"]) {
                    if (K[m + "ScrollbarWrapper"]) {
                        if (h) {
                            K[m + "ScrollbarIndicator"].style[q] = ""
                        }
                        K[m + "ScrollbarWrapper"].parentNode.removeChild(K[m + "ScrollbarWrapper"]);
                        K[m + "ScrollbarWrapper"] = null;
                        K[m + "ScrollbarIndicator"] = null
                    }
                    return
                }
                if (!K[m + "ScrollbarWrapper"]) {
                    J = I.createElement("div");
                    if (K.options.scrollbarClass) {
                        J.className = K.options.scrollbarClass + m.toUpperCase()
                    } else {
                        J.style.cssText = "position:absolute;z-index:100;" + (m == "h" ? "height:7px;bottom:1px;left:2px;right:" + (K.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (K.hScrollbar ? "7" : "2") + "px;top:2px;right:1px")
                    }
                    J.style.cssText += ";pointer-events:none;" + H + "transition-property:opacity;" + H + "transition-duration:" + (K.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (K.options.hideScrollbar ? "0" : "1");
                    K.wrapper.appendChild(J);
                    K[m + "ScrollbarWrapper"] = J;
                    J = I.createElement("div");
                    if (!K.options.scrollbarClass) {
                        J.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + H + "background-clip:padding-box;" + H + "box-sizing:border-box;" + (m == "h" ? "height:100%" : "width:100%") + ";" + H + "border-radius:3px;border-radius:3px"
                    }
                    J.style.cssText += ";pointer-events:none;" + H + "transition-property:" + H + "transform;" + H + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + H + "transition-duration:0;" + H + "transform: translate(0,0)" + G;
                    if (K.options.useTransition) {
                        J.style.cssText += ";" + H + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"
                    }
                    K[m + "ScrollbarWrapper"].appendChild(J);
                    K[m + "ScrollbarIndicator"] = J
                }
                if (m == "h") {
                    K.hScrollbarSize = K.hScrollbarWrapper.clientWidth;
                    K.hScrollbarIndicatorSize = y.max(y.round(K.hScrollbarSize * K.hScrollbarSize / K.scrollerW), 8);
                    K.hScrollbarIndicator.style.width = K.hScrollbarIndicatorSize + "px";
                    K.hScrollbarMaxScroll = K.hScrollbarSize - K.hScrollbarIndicatorSize;
                    K.hScrollbarProp = K.hScrollbarMaxScroll / K.maxScrollX
                } else {
                    K.vScrollbarSize = K.vScrollbarWrapper.clientHeight;
                    K.vScrollbarIndicatorSize = y.max(y.round(K.vScrollbarSize * K.vScrollbarSize / K.scrollerH), 8);
                    K.vScrollbarIndicator.style.height = K.vScrollbarIndicatorSize + "px";
                    K.vScrollbarMaxScroll = K.vScrollbarSize - K.vScrollbarIndicatorSize;
                    K.vScrollbarProp = K.vScrollbarMaxScroll / K.maxScrollY
                }
                K._scrollbarPos(m, true)
            },
            _resize: function () {
                var m = this;
                setTimeout(function () {
                    m.refresh()
                }, E ? 200 : 0)
            },
            _pos: function (m, J) {
                if (this.zoomed) {
                    return
                }
                m = this.hScroll ? m : 0;
                J = this.vScroll ? J : 0;
                if (this.options.useTransform) {
                    this.scroller.style[q] = "translate(" + m + "px," + J + "px) scale(" + this.scale + ")" + G
                } else {
                    m = y.round(m);
                    J = y.round(J);
                    this.scroller.style.left = m + "px";
                    this.scroller.style.top = J + "px"
                }
                this.x = m;
                this.y = J;
                this._scrollbarPos("h");
                this._scrollbarPos("v")
            },
            _scrollbarPos: function (m, L) {
                var K = this, M = m == "h" ? K.x : K.y, J;
                if (!K[m + "Scrollbar"]) {
                    return
                }
                M = K[m + "ScrollbarProp"] * M;
                if (M < 0) {
                    if (!K.options.fixedScrollbar) {
                        J = K[m + "ScrollbarIndicatorSize"] + y.round(M * 3);
                        if (J < 8) {
                            J = 8
                        }
                        K[m + "ScrollbarIndicator"].style[m == "h" ? "width" : "height"] = J + "px"
                    }
                    M = 0
                } else {
                    if (M > K[m + "ScrollbarMaxScroll"]) {
                        if (!K.options.fixedScrollbar) {
                            J = K[m + "ScrollbarIndicatorSize"] - y.round((M - K[m + "ScrollbarMaxScroll"]) * 3);
                            if (J < 8) {
                                J = 8
                            }
                            K[m + "ScrollbarIndicator"].style[m == "h" ? "width" : "height"] = J + "px";
                            M = K[m + "ScrollbarMaxScroll"] + (K[m + "ScrollbarIndicatorSize"] - J)
                        } else {
                            M = K[m + "ScrollbarMaxScroll"]
                        }
                    }
                }
                K[m + "ScrollbarWrapper"].style[i] = "0";
                K[m + "ScrollbarWrapper"].style.opacity = L && K.options.hideScrollbar ? "0" : "1";
                K[m + "ScrollbarIndicator"].style[q] = "translate(" + (m == "h" ? M + "px,0)" : "0," + M + "px)") + G
            },
            _start: function (O) {
                var N = this, J = C ? O.touches[0] : O, K, m, P, M, L;
                if (!N.enabled) {
                    return
                }
                if (N.options.onBeforeScrollStart) {
                    N.options.onBeforeScrollStart.call(N, O)
                }
                if (N.options.useTransition || N.options.zoom) {
                    N._transitionTime(0)
                }
                N.moved = false;
                N.animating = false;
                N.zoomed = false;
                N.distX = 0;
                N.distY = 0;
                N.absDistX = 0;
                N.absDistY = 0;
                N.dirX = 0;
                N.dirY = 0;
                if (N.options.zoom && C && O.touches.length > 1) {
                    M = y.abs(O.touches[0].pageX - O.touches[1].pageX);
                    L = y.abs(O.touches[0].pageY - O.touches[1].pageY);
                    N.touchesDistStart = y.sqrt(M * M + L * L);
                    N.originX = y.abs(O.touches[0].pageX + O.touches[1].pageX - N.wrapperOffsetLeft * 2) / 2 - N.x;
                    N.originY = y.abs(O.touches[0].pageY + O.touches[1].pageY - N.wrapperOffsetTop * 2) / 2 - N.y;
                    if (N.options.onZoomStart) {
                        N.options.onZoomStart.call(N, O)
                    }
                }
                if (N.options.momentum) {
                    if (N.options.useTransform) {
                        K = getComputedStyle(N.scroller, null)[q].replace(/[^0-9\-.,]/g, "").split(",");
                        m = +(K[12] || K[4]);
                        P = +(K[13] || K[5])
                    } else {
                        m = +getComputedStyle(N.scroller, null).left.replace(/[^0-9-]/g, "");
                        P = +getComputedStyle(N.scroller, null).top.replace(/[^0-9-]/g, "")
                    }
                    if (m != N.x || P != N.y) {
                        if (N.options.useTransition) {
                            N._unbind(e)
                        } else {
                            t(N.aniTime)
                        }
                        N.steps = [];
                        N._pos(m, P);
                        if (N.options.onScrollEnd) {
                            N.options.onScrollEnd.call(N)
                        }
                    }
                }
                N.absStartX = N.x;
                N.absStartY = N.y;
                N.startX = N.x;
                N.startY = N.y;
                N.pointX = J.pageX;
                N.pointY = J.pageY;
                N.startTime = O.timeStamp || Date.now();
                if (N.options.onScrollStart) {
                    N.options.onScrollStart.call(N, O)
                }
                N._bind(x, n);
                N._bind(g, n);
                N._bind(A, n)
            },
            _move: function (Q) {
                var O = this, R = C ? Q.touches[0] : Q, M = R.pageX - O.pointX, K = R.pageY - O.pointY, m = O.x + M, S = O.y + K, N, L, J, P = Q.timeStamp || Date.now();
                if (O.options.onBeforeScrollMove) {
                    O.options.onBeforeScrollMove.call(O, Q)
                }
                if (O.options.zoom && C && Q.touches.length > 1) {
                    N = y.abs(Q.touches[0].pageX - Q.touches[1].pageX);
                    L = y.abs(Q.touches[0].pageY - Q.touches[1].pageY);
                    O.touchesDist = y.sqrt(N * N + L * L);
                    O.zoomed = true;
                    J = 1 / O.touchesDistStart * O.touchesDist * this.scale;
                    if (J < O.options.zoomMin) {
                        J = 0.5 * O.options.zoomMin * Math.pow(2, J / O.options.zoomMin)
                    } else {
                        if (J > O.options.zoomMax) {
                            J = 2 * O.options.zoomMax * Math.pow(0.5, O.options.zoomMax / J)
                        }
                    }
                    O.lastScale = J / this.scale;
                    m = this.originX - this.originX * O.lastScale + this.x, S = this.originY - this.originY * O.lastScale + this.y;
                    this.scroller.style[q] = "translate(" + m + "px," + S + "px) scale(" + J + ")" + G;
                    if (O.options.onZoom) {
                        O.options.onZoom.call(O, Q)
                    }
                    return
                }
                O.pointX = R.pageX;
                O.pointY = R.pageY;
                if (m > 0 || m < O.maxScrollX) {
                    m = O.options.bounce ? O.x + (M / 2) : m >= 0 || O.maxScrollX >= 0 ? 0 : O.maxScrollX
                }
                if (S > O.minScrollY || S < O.maxScrollY) {
                    S = O.options.bounce ? O.y + (K / 2) : S >= O.minScrollY || O.maxScrollY >= 0 ? O.minScrollY : O.maxScrollY
                }
                O.distX += M;
                O.distY += K;
                O.absDistX = y.abs(O.distX);
                O.absDistY = y.abs(O.distY);
                if (O.absDistX < 6 && O.absDistY < 6) {
                    return
                }
                if (O.options.lockDirection) {
                    if (O.absDistX > O.absDistY + 5) {
                        S = O.y;
                        K = 0
                    } else {
                        if (O.absDistY > O.absDistX + 5) {
                            m = O.x;
                            M = 0
                        }
                    }
                }
                O.moved = true;
                O._pos(m, S);
                O.dirX = M > 0 ? -1 : M < 0 ? 1 : 0;
                O.dirY = K > 0 ? -1 : K < 0 ? 1 : 0;
                if (P - O.startTime > 300) {
                    O.startTime = P;
                    O.startX = O.x;
                    O.startY = O.y
                }
                if (O.options.onScrollMove) {
                    O.options.onScrollMove.call(O, Q)
                }
            },
            _end: function (Q) {
                if (C && Q.touches.length !== 0) {
                    return
                }
                var O = this, W = C ? Q.changedTouches[0] : Q, R, V, K = {dist: 0, time: 0}, m = {
                    dist: 0,
                    time: 0
                }, N = (Q.timeStamp || Date.now()) - O.startTime, S = O.x, P = O.y, U, T, J, M, L;
                O._unbind(x, n);
                O._unbind(g, n);
                O._unbind(A, n);
                if (O.options.onBeforeScrollEnd) {
                    O.options.onBeforeScrollEnd.call(O, Q)
                }
                if (O.zoomed) {
                    L = O.scale * O.lastScale;
                    L = Math.max(O.options.zoomMin, L);
                    L = Math.min(O.options.zoomMax, L);
                    O.lastScale = L / O.scale;
                    O.scale = L;
                    O.x = O.originX - O.originX * O.lastScale + O.x;
                    O.y = O.originY - O.originY * O.lastScale + O.y;
                    O.scroller.style[p] = "200ms";
                    O.scroller.style[q] = "translate(" + O.x + "px," + O.y + "px) scale(" + O.scale + ")" + G;
                    O.zoomed = false;
                    O.refresh();
                    if (O.options.onZoomEnd) {
                        O.options.onZoomEnd.call(O, Q)
                    }
                    return
                }
                if (!O.moved) {
                    if (C) {
                        if (O.doubleTapTimer && O.options.zoom) {
                            clearTimeout(O.doubleTapTimer);
                            O.doubleTapTimer = null;
                            if (O.options.onZoomStart) {
                                O.options.onZoomStart.call(O, Q)
                            }
                            O.zoom(O.pointX, O.pointY, O.scale == 1 ? O.options.doubleTapZoom : 1);
                            if (O.options.onZoomEnd) {
                                setTimeout(function () {
                                    O.options.onZoomEnd.call(O, Q)
                                }, 200)
                            }
                        } else {
                            if (this.options.handleClick) {
                                O.doubleTapTimer = setTimeout(function () {
                                    O.doubleTapTimer = null;
                                    R = W.target;
                                    while (R.nodeType != 1) {
                                        R = R.parentNode
                                    }
                                    if (R.tagName != "SELECT" && R.tagName != "INPUT" && R.tagName != "TEXTAREA") {
                                        V = I.createEvent("MouseEvents");
                                        V.initMouseEvent("click", true, true, Q.view, 1, W.screenX, W.screenY, W.clientX, W.clientY, Q.ctrlKey, Q.altKey, Q.shiftKey, Q.metaKey, 0, null);
                                        V._fake = true;
                                        R.dispatchEvent(V)
                                    }
                                }, O.options.zoom ? 250 : 0)
                            }
                        }
                    }
                    O._resetPos(400);
                    if (O.options.onTouchEnd) {
                        O.options.onTouchEnd.call(O, Q)
                    }
                    return
                }
                if (N < 300 && O.options.momentum) {
                    K = S ? O._momentum(S - O.startX, N, -O.x, O.scrollerW - O.wrapperW + O.x, O.options.bounce ? O.wrapperW : 0) : K;
                    m = P ? O._momentum(P - O.startY, N, -O.y, (O.maxScrollY < 0 ? O.scrollerH - O.wrapperH + O.y - O.minScrollY : 0), O.options.bounce ? O.wrapperH : 0) : m;
                    S = O.x + K.dist;
                    P = O.y + m.dist;
                    if ((O.x > 0 && S > 0) || (O.x < O.maxScrollX && S < O.maxScrollX)) {
                        K = {dist: 0, time: 0}
                    }
                    if ((O.y > O.minScrollY && P > O.minScrollY) || (O.y < O.maxScrollY && P < O.maxScrollY)) {
                        m = {dist: 0, time: 0}
                    }
                }
                if (K.dist || m.dist) {
                    J = y.max(y.max(K.time, m.time), 10);
                    if (O.options.snap) {
                        U = S - O.absStartX;
                        T = P - O.absStartY;
                        if (y.abs(U) < O.options.snapThreshold && y.abs(T) < O.options.snapThreshold) {
                            O.scrollTo(O.absStartX, O.absStartY, 200)
                        } else {
                            M = O._snap(S, P);
                            S = M.x;
                            P = M.y;
                            J = y.max(M.time, J)
                        }
                    }
                    O.scrollTo(y.round(S), y.round(P), J);
                    if (O.options.onTouchEnd) {
                        O.options.onTouchEnd.call(O, Q)
                    }
                    return
                }
                if (O.options.snap) {
                    U = S - O.absStartX;
                    T = P - O.absStartY;
                    if (y.abs(U) < O.options.snapThreshold && y.abs(T) < O.options.snapThreshold) {
                        O.scrollTo(O.absStartX, O.absStartY, 200)
                    } else {
                        M = O._snap(O.x, O.y);
                        if (M.x != O.x || M.y != O.y) {
                            O.scrollTo(M.x, M.y, M.time)
                        }
                    }
                    if (O.options.onTouchEnd) {
                        O.options.onTouchEnd.call(O, Q)
                    }
                    return
                }
                O._resetPos(200);
                if (O.options.onTouchEnd) {
                    O.options.onTouchEnd.call(O, Q)
                }
            },
            _resetPos: function (K) {
                var m = this, L = m.x >= 0 ? 0 : m.x < m.maxScrollX ? m.maxScrollX : m.x, J = m.y >= m.minScrollY || m.maxScrollY > 0 ? m.minScrollY : m.y < m.maxScrollY ? m.maxScrollY : m.y;
                if (L == m.x && J == m.y) {
                    if (m.moved) {
                        m.moved = false;
                        if (m.options.onScrollEnd) {
                            m.options.onScrollEnd.call(m)
                        }
                    }
                    if (m.hScrollbar && m.options.hideScrollbar) {
                        if (D == "webkit") {
                            m.hScrollbarWrapper.style[i] = "300ms"
                        }
                        m.hScrollbarWrapper.style.opacity = "0"
                    }
                    if (m.vScrollbar && m.options.hideScrollbar) {
                        if (D == "webkit") {
                            m.vScrollbarWrapper.style[i] = "300ms"
                        }
                        m.vScrollbarWrapper.style.opacity = "0"
                    }
                    return
                }
                m.scrollTo(L, J, K || 0)
            },
            _wheel: function (N) {
                var L = this, M, K, J, m, O;
                if ("wheelDeltaX" in N) {
                    M = N.wheelDeltaX / 12;
                    K = N.wheelDeltaY / 12
                } else {
                    if ("wheelDelta" in N) {
                        M = K = N.wheelDelta / 12
                    } else {
                        if ("detail" in N) {
                            M = K = -N.detail * 3
                        } else {
                            return
                        }
                    }
                }
                if (L.options.wheelAction == "zoom") {
                    O = L.scale * Math.pow(2, 1 / 3 * (K ? K / Math.abs(K) : 0));
                    if (O < L.options.zoomMin) {
                        O = L.options.zoomMin
                    }
                    if (O > L.options.zoomMax) {
                        O = L.options.zoomMax
                    }
                    if (O != L.scale) {
                        if (!L.wheelZoomCount && L.options.onZoomStart) {
                            L.options.onZoomStart.call(L, N)
                        }
                        L.wheelZoomCount++;
                        L.zoom(N.pageX, N.pageY, O, 400);
                        setTimeout(function () {
                            L.wheelZoomCount--;
                            if (!L.wheelZoomCount && L.options.onZoomEnd) {
                                L.options.onZoomEnd.call(L, N)
                            }
                        }, 400)
                    }
                    return
                }
                J = L.x + M;
                m = L.y + K;
                if (J > 0) {
                    J = 0
                } else {
                    if (J < L.maxScrollX) {
                        J = L.maxScrollX
                    }
                }
                if (m > L.minScrollY) {
                    m = L.minScrollY
                } else {
                    if (m < L.maxScrollY) {
                        m = L.maxScrollY
                    }
                }
                if (L.maxScrollY < 0) {
                    L.scrollTo(J, m, 0)
                }
            },
            _transitionEnd: function (J) {
                var m = this;
                if (J.target != m.scroller) {
                    return
                }
                m._unbind(e);
                m._startAni()
            },
            _startAni: function () {
                var O = this, J = O.x, m = O.y, M = Date.now(), N, L, K;
                if (O.animating) {
                    return
                }
                if (!O.steps.length) {
                    O._resetPos(400);
                    return
                }
                N = O.steps.shift();
                if (N.x == J && N.y == m) {
                    N.time = 0
                }
                O.animating = true;
                O.moved = true;
                if (O.options.useTransition) {
                    O._transitionTime(N.time);
                    O._pos(N.x, N.y);
                    O.animating = false;
                    if (N.time) {
                        O._bind(e)
                    } else {
                        O._resetPos(0)
                    }
                    return
                }
                K = function () {
                    var P = Date.now(), R, Q;
                    if (P >= M + N.time) {
                        O._pos(N.x, N.y);
                        O.animating = false;
                        if (O.options.onAnimationEnd) {
                            O.options.onAnimationEnd.call(O)
                        }
                        O._startAni();
                        return
                    }
                    P = (P - M) / N.time - 1;
                    L = y.sqrt(1 - P * P);
                    R = (N.x - J) * L + J;
                    Q = (N.y - m) * L + m;
                    O._pos(R, Q);
                    if (O.animating) {
                        O.aniTime = u(K)
                    }
                };
                K()
            },
            _transitionTime: function (m) {
                m += "ms";
                this.scroller.style[p] = m;
                if (this.hScrollbar) {
                    this.hScrollbarIndicator.style[p] = m
                }
                if (this.vScrollbar) {
                    this.vScrollbarIndicator.style[p] = m
                }
            },
            _momentum: function (P, J, N, m, R) {
                var O = 0.0006, K = y.abs(P) / J, L = (K * K) / (2 * O), Q = 0, M = 0;
                if (P > 0 && L > N) {
                    M = R / (6 / (L / K * O));
                    N = N + M;
                    K = K * N / L;
                    L = N
                } else {
                    if (P < 0 && L > m) {
                        M = R / (6 / (L / K * O));
                        m = m + M;
                        K = K * m / L;
                        L = m
                    }
                }
                L = L * (P < 0 ? -1 : 1);
                Q = K / O;
                return {dist: L, time: y.round(Q)}
            },
            _offset: function (m) {
                var K = -m.offsetLeft, J = -m.offsetTop;
                while (m = m.offsetParent) {
                    K -= m.offsetLeft;
                    J -= m.offsetTop
                }
                if (m != this.wrapper) {
                    K *= this.scale;
                    J *= this.scale
                }
                return {left: K, top: J}
            },
            _snap: function (Q, P) {
                var N = this, M, L, O, K, J, m;
                O = N.pagesX.length - 1;
                for (M = 0, L = N.pagesX.length; M < L; M++) {
                    if (Q >= N.pagesX[M]) {
                        O = M;
                        break
                    }
                }
                if (O == N.currPageX && O > 0 && N.dirX < 0) {
                    O--
                }
                Q = N.pagesX[O];
                J = y.abs(Q - N.pagesX[N.currPageX]);
                J = J ? y.abs(N.x - Q) / J * 500 : 0;
                N.currPageX = O;
                O = N.pagesY.length - 1;
                for (M = 0; M < O; M++) {
                    if (P >= N.pagesY[M]) {
                        O = M;
                        break
                    }
                }
                if (O == N.currPageY && O > 0 && N.dirY < 0) {
                    O--
                }
                P = N.pagesY[O];
                m = y.abs(P - N.pagesY[N.currPageY]);
                m = m ? y.abs(N.y - P) / m * 500 : 0;
                N.currPageY = O;
                K = y.round(y.max(J, m)) || 200;
                return {x: Q, y: P, time: K}
            },
            _bind: function (K, J, m) {
                (J || this.scroller).addEventListener(K, this, !!m)
            },
            _unbind: function (K, J, m) {
                (J || this.scroller).removeEventListener(K, this, !!m)
            },
            destroy: function () {
                var m = this;
                m.scroller.style[q] = "";
                m.hScrollbar = false;
                m.vScrollbar = false;
                m._scrollbar("h");
                m._scrollbar("v");
                m._unbind(k, n);
                m._unbind(f);
                m._unbind(x, n);
                m._unbind(g, n);
                m._unbind(A, n);
                if (!m.options.hasTouch) {
                    m._unbind("DOMMouseScroll");
                    m._unbind("mousewheel")
                }
                if (m.options.useTransition) {
                    m._unbind(e)
                }
                if (m.options.checkDOMChanges) {
                    clearInterval(m.checkDOMTime)
                }
                if (m.options.onDestroy) {
                    m.options.onDestroy.call(m)
                }
            },
            refresh: function () {
                var L = this, N, K, m, J, O = 0, M = 0;
                if (L.scale < L.options.zoomMin) {
                    L.scale = L.options.zoomMin
                }
                L.wrapperW = L.wrapper.clientWidth || 1;
                L.wrapperH = L.wrapper.clientHeight || 1;
                L.minScrollY = -L.options.topOffset || 0;
                L.scrollerW = y.round(L.scroller.offsetWidth * L.scale);
                L.scrollerH = y.round((L.scroller.offsetHeight + L.minScrollY) * L.scale);
                L.maxScrollX = L.wrapperW - L.scrollerW;
                L.maxScrollY = L.wrapperH - L.scrollerH + L.minScrollY;
                L.dirX = 0;
                L.dirY = 0;
                if (L.options.onRefresh) {
                    L.options.onRefresh.call(L)
                }
                L.hScroll = L.options.hScroll && L.maxScrollX < 0;
                L.vScroll = L.options.vScroll && (!L.options.bounceLock && !L.hScroll || L.scrollerH > L.wrapperH);
                L.hScrollbar = L.hScroll && L.options.hScrollbar;
                L.vScrollbar = L.vScroll && L.options.vScrollbar && L.scrollerH > L.wrapperH;
                N = L._offset(L.wrapper);
                L.wrapperOffsetLeft = -N.left;
                L.wrapperOffsetTop = -N.top;
                if (typeof L.options.snap == "string") {
                    L.pagesX = [];
                    L.pagesY = [];
                    J = L.scroller.querySelectorAll(L.options.snap);
                    for (K = 0, m = J.length; K < m; K++) {
                        O = L._offset(J[K]);
                        O.left += L.wrapperOffsetLeft;
                        O.top += L.wrapperOffsetTop;
                        L.pagesX[K] = O.left < L.maxScrollX ? L.maxScrollX : O.left * L.scale;
                        L.pagesY[K] = O.top < L.maxScrollY ? L.maxScrollY : O.top * L.scale
                    }
                } else {
                    if (L.options.snap) {
                        L.pagesX = [];
                        while (O >= L.maxScrollX) {
                            L.pagesX[M] = O;
                            O = O - L.wrapperW;
                            M++
                        }
                        if (L.maxScrollX % L.wrapperW) {
                            L.pagesX[L.pagesX.length] = L.maxScrollX - L.pagesX[L.pagesX.length - 1] + L.pagesX[L.pagesX.length - 1]
                        }
                        O = 0;
                        M = 0;
                        L.pagesY = [];
                        while (O >= L.maxScrollY) {
                            L.pagesY[M] = O;
                            O = O - L.wrapperH;
                            M++
                        }
                        if (L.maxScrollY % L.wrapperH) {
                            L.pagesY[L.pagesY.length] = L.maxScrollY - L.pagesY[L.pagesY.length - 1] + L.pagesY[L.pagesY.length - 1]
                        }
                    }
                }
                L._scrollbar("h");
                L._scrollbar("v");
                if (!L.zoomed) {
                    L.scroller.style[p] = "0";
                    L._resetPos(400)
                }
            },
            scrollTo: function (m, P, O, N) {
                var M = this, L = m, K, J;
                M.stop();
                if (!L.length) {
                    L = [{x: m, y: P, time: O, relative: N}]
                }
                for (K = 0, J = L.length; K < J; K++) {
                    if (L[K].relative) {
                        L[K].x = M.x - L[K].x;
                        L[K].y = M.y - L[K].y
                    }
                    M.steps.push({x: L[K].x, y: L[K].y, time: L[K].time || 0})
                }
                M._startAni()
            },
            scrollToElement: function (m, K) {
                var J = this, L;
                m = m.nodeType ? m : J.scroller.querySelector(m);
                if (!m) {
                    return
                }
                L = J._offset(m);
                L.left += J.wrapperOffsetLeft;
                L.top += J.wrapperOffsetTop;
                L.left = L.left > 0 ? 0 : L.left < J.maxScrollX ? J.maxScrollX : L.left;
                L.top = L.top > J.minScrollY ? J.minScrollY : L.top < J.maxScrollY ? J.maxScrollY : L.top;
                K = K === undefined ? y.max(y.abs(L.left) * 2, y.abs(L.top) * 2) : K;
                J.scrollTo(L.left, L.top, K)
            },
            scrollToPage: function (K, J, M) {
                var L = this, m, N;
                M = M === undefined ? 400 : M;
                if (L.options.onScrollStart) {
                    L.options.onScrollStart.call(L)
                }
                if (L.options.snap) {
                    K = K == "next" ? L.currPageX + 1 : K == "prev" ? L.currPageX - 1 : K;
                    J = J == "next" ? L.currPageY + 1 : J == "prev" ? L.currPageY - 1 : J;
                    K = K < 0 ? 0 : K > L.pagesX.length - 1 ? L.pagesX.length - 1 : K;
                    J = J < 0 ? 0 : J > L.pagesY.length - 1 ? L.pagesY.length - 1 : J;
                    L.currPageX = K;
                    L.currPageY = J;
                    m = L.pagesX[K];
                    N = L.pagesY[J]
                } else {
                    m = -L.wrapperW * K;
                    N = -L.wrapperH * J;
                    if (m < L.maxScrollX) {
                        m = L.maxScrollX
                    }
                    if (N < L.maxScrollY) {
                        N = L.maxScrollY
                    }
                }
                L.scrollTo(m, N, M)
            },
            disable: function () {
                this.stop();
                this._resetPos(0);
                this.enabled = false;
                this._unbind(x, n);
                this._unbind(g, n);
                this._unbind(A, n)
            },
            enable: function () {
                this.enabled = true
            },
            stop: function () {
                if (this.options.useTransition) {
                    this._unbind(e)
                } else {
                    t(this.aniTime)
                }
                this.steps = [];
                this.moved = false;
                this.animating = false
            },
            zoom: function (m, N, M, L) {
                var J = this, K = M / J.scale;
                if (!J.options.useTransform) {
                    return
                }
                J.zoomed = true;
                L = L === undefined ? 200 : L;
                m = m - J.wrapperOffsetLeft - J.x;
                N = N - J.wrapperOffsetTop - J.y;
                J.x = m - m * K + J.x;
                J.y = N - N * K + J.y;
                J.scale = M;
                J.refresh();
                J.x = J.x > 0 ? 0 : J.x < J.maxScrollX ? J.maxScrollX : J.x;
                J.y = J.y > J.minScrollY ? J.minScrollY : J.y < J.maxScrollY ? J.maxScrollY : J.y;
                J.scroller.style[p] = L + "ms";
                J.scroller.style[q] = "translate(" + J.x + "px," + J.y + "px) scale(" + M + ")" + G;
                J.zoomed = false
            },
            isReady: function () {
                return !this.moved && !this.zoomed && !this.animating
            }
        };
        function w(m) {
            if (D === "") {
                return m
            }
            m = m.charAt(0).toUpperCase() + m.substr(1);
            return D + m
        }

        r = null;
        if (typeof exports !== "undefined") {
            exports.iScroll = z
        } else {
            n.iScroll = z
        }
    })(window, document);
    function b(f) {
        var f = window.event || f;
        f.preventDefault ? f.preventDefault() : f.returnValue = false;
        return false
    }

    window.LOCAL_SEARCH = "1";
    window.TRANSIT_ROUTE = "2";
    window.DRIVING_ROUTE = "3";
    function a(e) {
        this.map = e.map;
        this.projection = this.map.getMapType().getProjection();
        this.container = c.isString(e.container) ? document.getElementById(e.container) : e.container;
        this.type = e.type || LOCAL_SEARCH;
        this.enableAutoLocation = e.enableAutoLocation === false ? false : true;
        this.initialize()
    }

    a.prototype = {
        constructor: a, initialize: function () {
            this.container.innerHTML = this._getHtml();
            this._initDom();
            if (this.enableAutoLocation) {
                this._initLocalCity()
            }
            this._initService();
            this._initCityTab();
            this._bind();
            this.setType(this.type)
        }, _getHtml: function () {
            var e = ['<div id="BMapLib_searchBoxContent" class="BMapLib_schbox">', '<div id="BMapLib_normalBox" class="BMapLib_sc_t sc_box_bg">', '<div id="BMapLib_sc0">', '<table style="width:100%;" border="0" cellpadding="0" cellspacing="0">', "<tr>", "<td>", '<div id="BMapLib_cityTab" class="BMapLib_cityTab">', "<span>北京市</span>", '<em class="city_icon"></em>', "</div>", "</td>", '<td width="100%">', '<form id="BMapLib_formPoi" class="BMapLib_seBox"><input post_data-widget="quickdelete" id="BMapLib_PoiSearch" class="txtPoi" type="search"/><em id="btnPClear" class="BMapLib_xx"></em></form>', "</td>", "<td>", '<div class="BMapLib_sc_t_b sc_btn" id="BMapLib_sc_b0">百度一下</div>', "</td>", "</tr>", "</table>", "</div>", '<div id="BMapLib_sc1" style="display:none;">', '<table style="width:100%;" border="0" cellpadding="0" cellspacing="0">', "<tr>", "<td>", '<div id="BMapLib_sc_b1" class="BMapLib_sc_t_sw sc_btn">', '<div class="BMapLib_sc_t_sw1"></div>', "</div>", "</td>", '<td width="100%">', '<div class="BMapLib_dbseBox" style="margin-bottom: 5px;">', '<em class="BMapLib_ipt_icon BMapLib_txtSta"></em><input class="ipt_txt" type="search" id="BMapLib_txtNavS"/><em id="btnSClear" class="xx"></em>', "</div>", '<div class="BMapLib_dbseBox"><em class="BMapLib_ipt_icon BMapLib_txtEnd"></em><input class="ipt_txt" type="search" id="BMapLib_txtNavE"/><em id="btnEClear" class="xx"></em></div>', "</td>", "<td>", '<div class="BMapLib_sc_t_b sc_btn" id="BMapLib_sc_b2">', '<div class="BMapLib_sc_t_b1"></div>', "</div>", "</td>", "</tr>", "</table>", "</div>", "</div>", '<div id="BMapLib_tipBox">', "<div>", "</div>"].join("");
            return e
        }, _initDom: function () {
            this.dom = {
                searchBoxContent: c.g("BMapLib_searchBoxContent"),
                sc0: c.g("BMapLib_sc0"),
                sc1: c.g("BMapLib_sc1"),
                searchText: c.g("BMapLib_PoiSearch"),
                nSearchBtn: c.g("BMapLib_sc_b0"),
                startText: c.g("BMapLib_txtNavS"),
                endText: c.g("BMapLib_txtNavE"),
                hSearchBtn: c.g("BMapLib_sc_b2"),
                changeBtn: c.g("BMapLib_sc_b1"),
                formPoi: c.g("BMapLib_formPoi"),
                cityTab: c.g("BMapLib_cityTab").childNodes[0],
                tipBox: c.g("BMapLib_tipBox")
            };
            this.cityListSub = {}
        }, _initLocalCity: function () {
            var g = new BMap.LocalCity(), f = this.map, e = this.dom.cityTab;
            g.get(function (h) {
                var i = h.name;
                f.setCenter(i);
                e.innerHTML = i
            })
        }, _initService: function () {
            var f = this.map;
            this.localSearch = new BMap.LocalSearch(f, {
                renderOptions: {map: f}, onSearchComplete: function (g) {
                    var h = e.localSearch.getStatus();
                    if (h != BMAP_STATUS_SUCCESS) {
                        e.showTipBox(h)
                    } else {
                        if (g.city) {
                            e.setCityTabName(g.city)
                        }
                    }
                }
            });
            var e = this;
            this.transitRoute = new BMap.TransitRoute(f, {
                renderOptions: {map: f}, onSearchComplete: function () {
                    var g = e.transitRoute.getStatus();
                    if (g != BMAP_STATUS_SUCCESS) {
                        e.showTipBox(g)
                    }
                }
            });
            this.drivingRoute = new BMap.DrivingRoute(f, {
                renderOptions: {map: f, autoViewport: true},
                onSearchComplete: function () {
                    var g = e.drivingRoute.getStatus();
                    if (g != BMAP_STATUS_SUCCESS) {
                        e.showTipBox(g)
                    }
                }
            })
        }, _bind: function () {
            var e = "click", f = this;
            c.on(this.dom.nSearchBtn, e, function (g) {
                b(g);
                f.localSearchAction()
            });
            c.on(this.dom.changeBtn, e, function (g) {
                b(g);
                f.changeStartAndEnd()
            });
            this.dom.formPoi.onsubmit = function () {
                f.localSearchAction();
                return false
            };
            c.on(this.dom.cityTab, e, function (g) {
                f.showCityBox()
            });
            this.autoCompleteIni()
        }, localSearchAction: function () {
            this.reset();
            this.dom.searchText.blur();
            this.searchAC.hide();
            var e = this.dom.searchText.value;
            this.localSearch.search(e)
        }, transitRouteAction: function () {
            this.reset();
            var f = this.dom.startText.value, e = this.dom.endText.value;
            this.transitRoute.search(f, e)
        }, drivingRouteAction: function () {
            this.reset();
            var f = this.dom.startText.value, e = this.dom.endText.value;
            this.drivingRoute.search(f, e)
        }, showTipBox: function (e) {
            var g = "未搜索到准确的结果";
            switch (e) {
                case BMAP_STATUS_UNKNOWN_LOCATION:
                    g = "位置结果未知";
                    break;
                case BMAP_STATUS_UNKNOWN_ROUTE:
                    g = "导航结果未知";
                    break
            }
            var f = this.dom.tipBox;
            f.innerHTML = g;
            f.style.display = "block";
            window.setTimeout(function () {
                f.style.display = "none"
            }, 4000)
        }, changeStartAndEnd: function () {
            var e = this.dom.startText.value;
            this.dom.startText.value = this.dom.endText.value;
            this.dom.endText.value = e
        }, autoCompleteIni: function () {
            this.searchAC = new BMap.Autocomplete({
                input: this.dom.searchText,
                location: this.map,
                baseDom: this.dom.searchBoxContent
            });
            this.startAC = new BMap.Autocomplete({
                input: this.dom.startText,
                location: this.map,
                baseDom: this.dom.searchBoxContent
            });
            this.endAC = new BMap.Autocomplete({
                input: this.dom.endText,
                location: this.map,
                baseDom: this.dom.searchBoxContent
            })
        }, setType: function (e) {
            var f = this;
            switch (e) {
                case LOCAL_SEARCH:
                    this.showBox(0);
                    break;
                case TRANSIT_ROUTE:
                    this.showBox(1);
                    this.dom.hSearchBtn.onclick = function (g) {
                        b(g);
                        f.transitRouteAction()
                    };
                    break;
                case DRIVING_ROUTE:
                    this.showBox(1);
                    this.dom.hSearchBtn.onclick = function (g) {
                        b(g);
                        f.drivingRouteAction()
                    };
                    break
            }
        }, reset: function () {
            this.localSearch.clearResults();
            this.transitRoute.clearResults();
            this.drivingRoute.clearResults()
        }, showBox: function (e) {
            this.dom.sc0.style.display = e ? "none" : "block";
            this.dom.sc1.style.display = e ? "block" : "none"
        }, _initCityTab: function () {
            var o = this.citySelectDom = document.createElement("div");
            o.style.cssText = "position:absolute;left:0px;width:80%;background:#FAFAFA;left:10%;overflow:hidden;border:1px solid #8C8C8C;display:none;top:50%;";
            var h = "北京|131,上海|289,天津|332,重庆|132,安徽|23,福建|16,甘肃|6,广东|7,广西|17,贵州|24,海南|21,河北|25,黑龙江|2,河南|30,湖北|15,湖南|26,江苏|18,江西|31,吉林省|9,辽宁|19,内蒙古|22,宁夏|20,青海|11,山东|8,山西|10,陕西|27,四川|32,新疆|12,西藏|13,云南|28,浙江|29".split(",");
            var m = [];
            for (var f = 0; f < h.length; f++) {
                var n = h[f].split("|");
                m.push({name: n[0], code: n[1]})
            }
            var g = '<div style="height:40px;line-height:40px;background:#8C8C8C;color:#fff;padding-left:10px;font-size:12px;"><span style="float:left;">请选择具体城市</span><span style="float:right;padding:0 10px;" onclick="this.parentNode.parentNode.style.display=\'none\'">关闭</span></div><div style="overflow:hidden;width:100%;height:200px;position:relative;" id="BMapLib_scroll"><ul id = "BMapLib_cityList" style="list-style:none;padding:0px;margin:0px;">';
            for (var f = 0, e = m.length; f < e; f++) {
                g += '<li style="height:40px;line-height:40px;border-bottom:1px solid #999;font-size:14px;padding-left:20px;" type= "1" cityCode="' + m[f]["code"] + '" id="BMapLib_cityItem' + m[f]["code"] + '">' + m[f]["name"] + "</li>"
            }
            g += "</ul></div>";
            var k = this;
            o.innerHTML = g;
            document.body.appendChild(o);
            var j = true;
            this.cityList = c.g("BMapLib_cityList");
            this.myScroll = new iScroll("BMapLib_scroll", {
                desktopCompatibility: true,
                hScroll: false,
                hScrollbar: false,
                vScroll: true,
                vScrollbar: true
            });
            c.on(this.cityList, "click", function (p) {
                b(p);
                if (!j) {
                    return
                }
                j = false;
                window.setTimeout(function () {
                    j = true
                }, 500);
                var x = p.target;
                var r = x.getAttribute("type");
                if (r == 1) {
                    var u = x.getAttribute("cityCode");
                    if (k.cityListSub[u] && k.cityListSub[u].style.display != "none") {
                        k.cityListSub[u].style.display = "none"
                    } else {
                        if (window.localStorage && window.localStorage.getItem("BMapLib_city" + u)) {
                            var q = window.localStorage.getItem("BMapLib_city" + u);
                            k.selectCityCallback(JSON.parse(q))
                        } else {
                            k.request(u)
                        }
                    }
                    k.myScroll.refresh();
                    k.myScroll.scrollToElement(x, 600)
                } else {
                    if (r == 2) {
                        k.setCityTabName(x.innerHTML);
                        var l = x.getAttribute("geo");
                        var i = l.split(",");
                        var w = new BMap.Pixel(i[0], i[1]);
                        var v = k.projection.pointToLngLat(w);
                        k.map.centerAndZoom(v, 13);
                        k.hideCitySelect()
                    } else {
                        if (r == 3) {
                            var s = x.getAttribute("cityname");
                            k.map.centerAndZoom(s, 12);
                            k.setCityTabName(s);
                            k.hideCitySelect()
                        }
                    }
                }
            })
        }, setCityTabName: function (e) {
            this.dom.cityTab.innerHTML = e
        }, request: function (i) {
            var h = this;
            var f = (Math.random() * 100000).toFixed(0);
            window.baidu = window.baidu || {};
            window.baidu["_cbk" + f] = function (j) {
                if (window.localStorage && window.localStorage != null) {
                    window.localStorage.setItem("BMapLib_city" + i, JSON.stringify(j))
                }
                h.selectCityCallback(j);
                delete window.baidu["_cbk" + f]
            };
            var g = "http://map.baidu.com/?qt=sub_area_list&areacode=" + i + "&level=1&from=mapapi&ie=utf-8&l=12&callback=baidu._cbk" + f;
            var e = document.createElement("script");
            e.setAttribute("src", g);
            e.setAttribute("type", "text/javascript");
            e.setAttribute("charset", "utf-8");
            if (e.addEventListener) {
                e.addEventListener("load", function (k) {
                    var j = k.target;
                    j.parentNode.removeChild(j)
                }, false)
            } else {
                if (e.attachEvent) {
                    e.attachEvent("onreadystatechange", function (k) {
                        var j = window.event.srcElement;
                        if (j && (j.readyState == "loaded" || j.readyState == "complete")) {
                            j.parentNode.removeChild(j)
                        }
                    })
                }
            }
            setTimeout(function () {
                document.getElementsByTagName("head")[0].appendChild(e);
                e = null
            }, 1)
        }, selectCityCallback: function (r) {
            if (r.result.error != 0) {
                return
            }
            var e = r.content.sub, g = r.content.area_code, o = r.content.area_name;
            for (var h in this.cityListSub) {
                this.cityListSub[h].style.display = "none"
            }
            if (!this.cityListSub[g]) {
                var q = this.cityListSub[g] = document.createElement("li");
                var n = "<ul style='list-style:none;margin:0;padding:0;'>";
                var p = /北京|上海|天津|重庆/g;
                if (o.match(p)) {
                    n += "<li style='padding-left:30px;height:30px;line-height:30px;font-size:14px;border-bottom:1px solid #ccc;background:#f3f3f3;' type='3' cityname='" + o + "'>全市</li>"
                }
                for (var m = 0, f = e.length; m < f; m++) {
                    var k = e[m].geo.split("|")[2];
                    n += "<li style='padding-left:30px;height:30px;line-height:30px;font-size:14px;border-bottom:1px solid #ccc;background:#f3f3f3;' type='2' geo='" + k.substr(0, k.length - 1) + "'>" + e[m].area_name + "</li>"
                }
                n += "</ul>";
                q.innerHTML = n;
                this.cityList.insertBefore(q, c.g("BMapLib_cityItem" + g).nextSibling)
            } else {
                this.cityListSub[g].style.display = "block"
            }
        }, showCityBox: function () {
            this.citySelectDom.style.display = "block";
            this.citySelectDom.style.top = parseInt(document.body.scrollTop, 10) + 20 + "px";
            this.myScroll.refresh()
        }, hideCitySelect: function () {
            this.citySelectDom.style.display = "none"
        }
    };
    BMapLib.SearchControl = a
})();

