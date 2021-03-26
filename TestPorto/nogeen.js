!function(s) {
    var e, t, n, c = s.$LAB, m = "UseLocalXHR", p = "AlwaysPreserveOrder", g = "AllowDuplicates", _ = "CacheBust", v = "BasePath", w = /^[^?#]*\//.exec(location.href)[0], x = /^\w+\:\/\/\/?[^\/]+/.exec(w)[0], b = document.head || document.getElementsByTagName("head"), r = s.opera && "[object Opera]" == Object.prototype.toString.call(s.opera) || "MozAppearance"in document.documentElement.style, i = document.createElement("script"), S = "boolean" == typeof i.preload, j = S || i.readyState && "uninitialized" == i.readyState, E = !j && !0 === i.async, a = !j && !E && !r;
    function h(e) {
        return "[object Function]" == Object.prototype.toString.call(e)
    }
    function O(e) {
        return "[object Array]" == Object.prototype.toString.call(e)
    }
    function A(e, t) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n]);
        return t
    }
    function B(e) {
        for (var t = !1, n = 0; n < e.scripts.length; n++)
            e.scripts[n].ready && e.scripts[n].exec_trigger && (t = !0,
            e.scripts[n].exec_trigger(),
            e.scripts[n].exec_trigger = null);
        return t
    }
    function L(e, t, n, r) {
        e.onload = e.onreadystatechange = function() {
            e.readyState && "complete" != e.readyState && "loaded" != e.readyState || t[n] || (e.onload = e.onreadystatechange = null,
            r())
        }
    }
    function C(e) {
        e.ready = e.finished = !0;
        for (var t = 0; t < e.finished_listeners.length; t++)
            e.finished_listeners[t]();
        e.ready_listeners = [],
        e.finished_listeners = []
    }
    s.$LAB = function e() {
        var r, t = {}, d = j || a, i = [], y = {};
        function f(e, t, n, r) {
            var i, s, c, a, o, l, u, d, f, p, h = function() {
                t.finished_cb(t, n)
            };
            t.src = (c = t.src,
            a = e[v],
            o = /^\w+\:\/\//,
            /^\/\/\/?/.test(c) ? c = location.protocol + c : o.test(c) || "/" == c.charAt(0) || (c = (a || "") + c),
            o.test(c) ? c : ("/" == c.charAt(0) ? x : w) + c),
            t.real_src = t.src + (e[_] ? (/\?.*$/.test(t.src) ? "&_" : "?_") + ~~(1e9 * Math.random()) + "=" : ""),
            y[t.src] || (y[t.src] = {
                items: [],
                finished: !1
            }),
            s = y[t.src].items,
            e[g] || 0 == s.length ? (i = s[s.length] = {
                ready: !1,
                finished: !1,
                ready_listeners: [function() {
                    t.ready_cb(t, function() {
                        !function(e, t, n) {
                            var r;
                            function i() {
                                null != r && (r = null,
                                C(n))
                            }
                            y[t.src].finished || (e[g] || (y[t.src].finished = !0),
                            r = n.elem || document.createElement("script"),
                            t.type && (r.type = t.type),
                            t.charset && (r.charset = t.charset),
                            L(r, n, "finished", i),
                            n.elem ? n.elem = null : n.text ? (r.onload = r.onreadystatechange = null,
                            r.text = n.text) : r.src = t.real_src,
                            b.insertBefore(r, b.firstChild),
                            n.text && i())
                        }(e, t, i)
                    })
                }
                ],
                finished_listeners: [h]
            },
            l = e,
            u = t,
            d = i,
            f = r ? function() {
                i.ready = !0;
                for (var e = 0; e < i.ready_listeners.length; e++)
                    i.ready_listeners[e]();
                i.ready_listeners = []
            }
            : function() {
                C(i)
            }
            ,
            p = r,
            setTimeout(function() {
                var e, t, n = u.real_src;
                if ("item"in b) {
                    if (!b[0])
                        return void setTimeout(arguments.callee, 25);
                    b = b[0]
                }
                e = document.createElement("script"),
                u.type && (e.type = u.type),
                u.charset && (e.charset = u.charset),
                p ? j ? (d.elem = e,
                S ? (e.preload = !0,
                e.onpreload = f) : e.onreadystatechange = function() {
                    "loaded" == e.readyState && f()
                }
                ,
                e.src = n) : p && 0 == n.indexOf(x) && l[m] ? ((t = new XMLHttpRequest).onreadystatechange = function() {
                    4 == t.readyState && (t.onreadystatechange = function() {}
                    ,
                    d.text = t.responseText + "\n//@ sourceURL=" + n,
                    f())
                }
                ,
                t.open("GET", n),
                t.send()) : (e.type = "text/cache-script",
                L(e, d, "ready", function() {
                    b.removeChild(e),
                    f()
                }),
                e.src = n,
                b.insertBefore(e, b.firstChild)) : (e.src = (E && (e.async = !1),
                L(e, d, "finished", f),
                n),
                b.insertBefore(e, b.firstChild))
            }, 0)) : (i = s[0]).finished ? h() : i.finished_listeners.push(h)
        }
        function n() {
            var i, s, c = A(t, {}), a = [], e = 0, o = !1;
            function l(e, t) {
                e.ready = !0,
                e.exec_trigger = t,
                r()
            }
            function u(e, t) {
                e.ready = e.finished = !0,
                e.exec_trigger = null;
                for (var n = 0; n < t.scripts.length; n++)
                    if (!t.scripts[n].finished)
                        return;
                t.finished = !0,
                r()
            }
            function r() {
                for (; e < a.length; )
                    if (h(a[e]))
                        try {
                            a[e++]()
                        } catch (e) {}
                    else {
                        if (!a[e].finished) {
                            if (B(a[e]))
                                continue;
                            break
                        }
                        e++
                    }
                e == a.length && (s = o = !1)
            }
            return {
                script: (i = {
                    script: function() {
                        for (var e = 0; e < arguments.length; e++)
                            !function(e, t) {
                                var n;
                                O(e) || (t = [e]);
                                for (var r = 0; r < t.length; r++)
                                    s && s.scripts || a.push(s = {
                                        scripts: [],
                                        finished: !0
                                    }),
                                    h(e = t[r]) && (e = e()),
                                    e && (O(e) ? ((n = [].slice.call(e)).unshift(r, 1),
                                    [].splice.apply(t, n),
                                    r--) : ("string" == typeof e && (e = {
                                        src: e
                                    }),
                                    e = A(e, {
                                        ready: !1,
                                        ready_cb: l,
                                        finished: !1,
                                        finished_cb: u
                                    }),
                                    s.finished = !1,
                                    s.scripts.push(e),
                                    f(c, e, s, d && o),
                                    o = !0,
                                    c[p] && i.wait()))
                            }(arguments[e], arguments[e]);
                        return i
                    },
                    wait: function() {
                        if (0 < arguments.length) {
                            for (var e = 0; e < arguments.length; e++)
                                a.push(arguments[e]);
                            s = a[a.length - 1]
                        } else
                            s = !1;
                        return r(),
                        i
                    }
                }).script,
                wait: i.wait,
                setOptions: function(e) {
                    return A(e, c),
                    i
                }
            }
        }
        return t[m] = !0,
        t[p] = !1,
        t[g] = !1,
        t[_] = !1,
        t[v] = "",
        r = {
            setGlobalDefaults: function(e) {
                return A(e, t),
                r
            },
            setOptions: function() {
                return n().setOptions.apply(null, arguments)
            },
            script: function() {
                return n().script.apply(null, arguments)
            },
            wait: function() {
                return n().wait.apply(null, arguments)
            },
            queueScript: function() {
                return i[i.length] = {
                    type: "script",
                    args: [].slice.call(arguments)
                },
                r
            },
            queueWait: function() {
                return i[i.length] = {
                    type: "wait",
                    args: [].slice.call(arguments)
                },
                r
            },
            runQueue: function() {
                for (var e, t = r, n = i.length; 0 <= --n; )
                    t = t[(e = i.shift()).type].apply(null, e.args);
                return t
            },
            noConflict: function() {
                return s.$LAB = c,
                r
            },
            sandbox: function() {
                return e()
            }
        }
    }(),
    e = "addEventListener",
    t = "DOMContentLoaded",
    null == document.readyState && document[e] && (document.readyState = "loading",
    document[e](t, n = function() {
        document.removeEventListener(t, n, !1),
        document.readyState = "complete"
    }
    , !1))
}(this),
document.documentElement.className = document.documentElement.className.replace("no-js", "js"),
document.documentElement.className += "ontouchstart"in window ? " touch" : " no-touch",
$LAB.script("https://code.jquery.com/jquery-3.4.1.min.js").wait().script(s);