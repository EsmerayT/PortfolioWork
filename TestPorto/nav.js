var ronner;
!function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.Blazy = t()
}(this, function() {
    "use strict";
    var p, l, v, u, y = "srcset";
    return function(e) {
        if (!document.querySelectorAll) {
            var s = document.createStyleSheet();
            document.querySelectorAll = function(e, t, o, n, r) {
                for (r = document.all,
                t = [],
                o = (e = e.replace(/\[for\b/gi, "[htmlFor").split(",")).length; o--; ) {
                    for (s.addRule(e[o], "k:v"),
                    n = r.length; n--; )
                        r[n].currentStyle.k && t.push(r[n]);
                    s.removeRule(0)
                }
                return t
            }
        }
        var o = this
          , t = o._util = {};
        t.elements = [],
        t.destroyed = !0,
        o.options = e || {},
        o.options.error = o.options.error || !1,
        o.options.offset = o.options.offset || 100,
        o.options.root = o.options.root || document,
        o.options.success = o.options.success || !1,
        o.options.selector = o.options.selector || ".b-lazy",
        o.options.separator = o.options.separator || "|",
        o.options.containerClass = o.options.container,
        o.options.container = !!o.options.containerClass && document.querySelectorAll(o.options.containerClass),
        o.options.errorClass = o.options.errorClass || "b-error",
        o.options.breakpoints = o.options.breakpoints || !1,
        o.options.loadInvisible = o.options.loadInvisible || !1,
        o.options.successClass = o.options.successClass || "b-loaded",
        o.options.validateDelay = o.options.validateDelay || 25,
        o.options.saveViewportOffsetDelay = o.options.saveViewportOffsetDelay || 50,
        o.options.srcset = o.options.srcset || "data-srcset",
        o.options.src = p = o.options.src || "data-src",
        u = Element.prototype.closest,
        v = 1 < window.devicePixelRatio,
        (l = {}).top = 0 - o.options.offset,
        l.left = 0 - o.options.offset,
        o.revalidate = function() {
            n(o)
        }
        ,
        o.load = function(e, t) {
            var o = this.options;
            e && void 0 === e.length ? i(e, t, o) : k(e, function(e) {
                i(e, t, o)
            })
        }
        ,
        o.destroy = function() {
            var t = o._util;
            o.options.container && k(o.options.container, function(e) {
                C(e, "scroll", t.validateT)
            }),
            C(window, "scroll", t.validateT),
            C(window, "resize", t.validateT),
            C(window, "resize", t.saveViewportOffsetT),
            t.count = 0,
            t.elements.length = 0,
            t.destroyed = !0
        }
        ,
        t.validateT = A(function() {
            r(o)
        }, o.options.validateDelay, o),
        t.saveViewportOffsetT = A(function() {
            f(o.options.offset)
        }, o.options.saveViewportOffsetDelay, o),
        f(o.options.offset),
        k(o.options.breakpoints, function(e) {
            if (e.width >= window.screen.width)
                return p = e.src,
                !1
        }),
        setTimeout(function() {
            n(o)
        })
    }
    ;
    function n(e) {
        var t = e._util;
        t.elements = function(e) {
            for (var t = [], o = e.root.querySelectorAll(e.selector), n = o.length; n--; t.unshift(o[n]))
                ;
            return t
        }(e.options),
        t.count = t.elements.length,
        t.destroyed && (t.destroyed = !1,
        e.options.container && k(e.options.container, function(e) {
            b(e, "scroll", t.validateT)
        }),
        b(window, "resize", t.saveViewportOffsetT),
        b(window, "resize", t.validateT),
        b(window, "scroll", t.validateT)),
        r(e)
    }
    function r(e) {
        for (var t = e._util, o = 0; o < t.count; o++) {
            var n = t.elements[o];
            (s(n, e.options) || Q(n, e.options.successClass)) && (e.load(n),
            t.elements.splice(o, 1),
            t.count--,
            o--)
        }
        0 === t.count && e.destroy()
    }
    function s(e, t) {
        var o = e.getBoundingClientRect();
        if (t.container && u) {
            var n = e.closest(t.containerClass);
            if (n) {
                var r = n.getBoundingClientRect();
                if (d(r, l)) {
                    var s = r.top - t.offset
                      , i = r.right + t.offset
                      , a = r.bottom + t.offset
                      , c = r.left - t.offset;
                    return d(o, {
                        top: s > l.top ? s : l.top,
                        right: i < l.right ? i : l.right,
                        bottom: a < l.bottom ? a : l.bottom,
                        left: c > l.left ? c : l.left
                    })
                }
                return !1
            }
        }
        return d(o, l)
    }
    function d(e, t) {
        return e.right >= t.left && e.bottom >= t.top && e.left <= t.right && e.top <= t.bottom
    }
    function i(e, t, o) {
        if (!Q(e, o.successClass) && (t || o.loadInvisible || 0 < e.offsetWidth && 0 < e.offsetHeight)) {
            var n = _(e, p) || _(e, o.src);
            if (n) {
                var r = n.split(o.separator)
                  , s = r[v && 1 < r.length ? 1 : 0]
                  , i = _(e, o.srcset)
                  , a = m(e, "img")
                  , c = e.parentNode
                  , l = c && m(c, "picture");
                if (a || void 0 === e.src) {
                    var u = new Image
                      , d = function() {
                        o.error && o.error(e, "invalid"),
                        w(e, o.errorClass),
                        C(u, "error", d),
                        C(u, "load", f)
                    }
                      , f = function() {
                        a ? l || h(e, s, i) : e.style.backgroundImage = 'url("' + s + '")',
                        g(e, o),
                        C(u, "load", f),
                        C(u, "error", d)
                    };
                    l && (u = e,
                    k(c.getElementsByTagName("source"), function(e) {
                        j(e, y, o.srcset)
                    })),
                    b(u, "error", d),
                    b(u, "load", f),
                    h(u, s, i)
                } else
                    e.src = s,
                    g(e, o)
            } else
                m(e, "video") ? (k(e.getElementsByTagName("source"), function(e) {
                    j(e, "src", o.src)
                }),
                e.load(),
                g(e, o)) : (o.error && o.error(e, "missing"),
                w(e, o.errorClass))
        }
    }
    function g(t, e) {
        w(t, e.successClass),
        e.success && e.success(t),
        c(t, e.src),
        c(t, e.srcset),
        k(e.breakpoints, function(e) {
            c(t, e.src)
        })
    }
    function j(e, t, o) {
        var n = _(e, o);
        n && (a(e, t, n),
        c(e, o))
    }
    function h(e, t, o) {
        o && a(e, y, o),
        e.src = t
    }
    function a(e, t, o) {
        e.setAttribute(t, o)
    }
    function _(e, t) {
        return e.getAttribute(t)
    }
    function c(e, t) {
        e.removeAttribute(t)
    }
    function m(e, t) {
        return e.nodeName.toLowerCase() === t
    }
    function Q(e, t) {
        return -1 !== (" " + e.className + " ").indexOf(" " + t + " ")
    }
    function w(e, t) {
        Q(e, t) || (e.className += " " + t)
    }
    function f(e) {
        l.bottom = (window.innerHeight || document.documentElement.clientHeight) + e,
        l.right = (window.innerWidth || document.documentElement.clientWidth) + e
    }
    function b(e, t, o) {
        e.attachEvent ? e.attachEvent && e.attachEvent("on" + t, o) : e.addEventListener(t, o, {
            capture: !1,
            passive: !0
        })
    }
    function C(e, t, o) {
        e.detachEvent ? e.detachEvent && e.detachEvent("on" + t, o) : e.removeEventListener(t, o, {
            capture: !1,
            passive: !0
        })
    }
    function k(e, t) {
        if (e && t)
            for (var o = e.length, n = 0; n < o && !1 !== t(e[n], n); n++)
                ;
    }
    function A(t, o, n) {
        var r = 0;
        return function() {
            var e = +new Date;
            e - r < o || (r = e,
            t.apply(n, arguments))
        }
    }
}),
(ronner = window.ronner || {}).blazy = {},
function(e) {
    var t, s, i, a, o = !1;
    function n() {
        "objectFit"in document.createElement("div").style == !1 && jQuery("img.b-lazy").each(function(e, t) {
            var o = jQuery("<div></div>");
            jQuery(t.attributes).each(function() {
                -1 !== jQuery.inArray(this.nodeName, ["class", "data-src"]) && o.attr(this.nodeName, this.nodeValue)
            }),
            jQuery(t).replaceWith(o)
        })
    }
    function r() {
        var o, n, r;
        s = jQuery(this),
        i = s.attr("data-preview").split("|"),
        a = 0,
        s.attr("data-preview").length && (s.find(".b-preview").length ? c() : (s.append('<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" class="projects__image b-lazy b-loaded b-preview">'),
        o = i,
        n = c,
        r = 0,
        jQuery.each(o, function(e, t) {
            jQuery("<img>").attr("src", t).on("load", function() {
                ++r === o.length && n()
            })
        })))
    }
    function c() {
        window.clearTimeout(o),
        s.find(".b-preview").attr("src", i[a]),
        a = a < i.length - 1 ? ++a : 0,
        o = window.setTimeout(c, 250)
    }
    function l() {
        window.clearTimeout(o),
        s.find(".b-preview").remove(),
        o = !1
    }
    e.init = function() {
        n(),
        "ontouchstart"in window == 0 && jQuery("[data-preview]").on("mouseenter", r).on("mouseleave", l),
        t = new Blazy({
            offset: 50
        })
    }
    ,
    e.revalidate = function() {
        t && (n(),
        t.revalidate())
    }
    ,
    e.load = function(e) {
        t && t.load(e)
    }
}(ronner.blazy),
(ronner = window.ronner || {}).filter = {},
function(e) {
    function t() {
        jQuery(".projects__list, .projects__table").addClass("is-loading"),
        jQuery(".projects__filters").removeClass("projects__filters--is-active"),
        jQuery(".projects__filter").not(this).removeClass("projects__filter--is-active"),
        jQuery(this).toggleClass("projects__filter--is-active"),
        window.setTimeout(function() {
            var o = [];
            jQuery(".projects__item").removeClass("is-hidden"),
            jQuery(".projects__filter--is-active").each(function(e, t) {
                o.push('[data-filters*="' + jQuery(t).val() + '"]')
            }),
            o.length && (jQuery(".projects__filters").addClass("projects__filters--is-active"),
            jQuery(".projects__item:not(" + o.join(",") + ")").addClass("is-hidden")),
            jQuery(".projects__list, .projects__table").removeClass("is-loading"),
            ronner.blazy.revalidate()
        }, 300)
    }
    function o() {
        jQuery(".projects__list, .projects__table").addClass("is-hidden"),
        jQuery(this).prop("checked") ? jQuery(".projects__list").removeClass("is-hidden") : jQuery(".projects__table").removeClass("is-hidden"),
        ronner.blazy.revalidate()
    }
    ronner.filter.init = function() {
        jQuery("body").on("mouseenter", ".content__tags a", function() {
            var e = jQuery(this).attr("data-id");
            jQuery('.content__tags span[data-parent="' + e + '"]').addClass("active")
        }).on("mouseleave", ".content__tags a", function() {
            var e = jQuery(this).attr("data-id");
            jQuery('.content__tags span[data-parent="' + e + '"]').removeClass("active")
        }),
        jQuery("body").on("click", "button.projects__filter", t),
        jQuery("body").on("change", ".projects__toggle input", o),
        jQuery(".no-touch button.projects__filter").on("mouseenter", function(e) {
            jQuery(".projects__filter--is-active").length || jQuery(".projects__filters").addClass("projects__filters--is-active")
        }),
        jQuery(".no-touch button.projects__filter").on("mouseleave", function(e) {
            jQuery(".projects__filter--is-active").length || jQuery(".projects__filters").removeClass("projects__filters--is-active")
        }),
        document.location.hash && jQuery('button.projects__filter[value="' + document.location.hash.substr(1) + '"]').trigger("click")
    }
}(),
(ronner = window.ronner || {}).navigation = {},
ronner.navigation.init = function() {
    jQuery(".navigation__toggle").on("click", function(e) {
        jQuery("html").toggleClass("has-open-navigation"),
        jQuery(".header").css("top", jQuery("body").is(".admin-bar") ? document.documentElement.clientWidth < 782 ? 46 : 32 : 0),
        e.preventDefault()
    }),
    jQuery(".language__link").on("click", function(e) {
        var t = jQuery(this).attr("data-language");
        jQuery(".language").attr("class", "language language--is-" + t)
    }),
    jQuery(".footer__branding a").on("click", function(e) {
        jQuery("#newsletter").is(".newsletter--is-open") ? jQuery("#newsletter").removeClass("newsletter--is-open") : jQuery("#newsletter").addClass("newsletter--is-open").find('input[type="email"]').get(0).focus(),
        e.preventDefault()
    }),
    jQuery(".featured__project__video").each(function(e, t) {
        jQuery(t).on("mouseenter", function() {
            this.play()
        }).on("mouseleave", function() {
            this.pause()
        }).trigger("mouseleave")
    })
}
,
(ronner = window.ronner || {}).scroll = {},
function(e) {
    var t, o, n, s, r, i, a, c, l, u, d, f, p, v, y, g, j, h, _, m, Q;
    function w() {
        y = s.outerHeight(),
        h = i.outerHeight(),
        v = o.height(),
        u = t.height(),
        _ = a.outerHeight(),
        j = jQuery("body").is(".admin-bar") ? document.documentElement.clientWidth < 782 ? 46 : 32 : 0
    }
    function b() {
        if (d = t.scrollTop(),
        p = f - d,
        g = parseInt(s.css("top")) + p,
        h - y < d ? s.addClass("has-background") : s.removeClass("has-background"),
        d <= 0) {
            var e = j;
            s.css("top", e),
            a.css("top", e + y)
        } else if (0 < p) {
            e = j < g ? j : g;
            s.css("top", e),
            a.css("top", e + y)
        } else if (p < 0 && d + u < v - y) {
            e = Math.abs(g) > y ? -y : g;
            e = Math.max(e, -(y - j)),
            s.css("top", e),
            a.css("top", e + y)
        }
        if (c.length && !m) {
            var o = d + _ + j
              , n = (o = d < f ? o + y : o,
            !1)
              , r = !1;
            l.each(function(e, t) {
                jQuery(t).offset().top < o && (r = jQuery(t).attr("id"),
                n = jQuery(t))
            }),
            r && r !== Q && (k(n),
            Q = r)
        }
        f = d
    }
    function C(e) {
        var t = jQuery(this).attr("href")
          , o = jQuery(t)
          , n = o.offset().top - _ - j + 22;
        n = n < d ? n - y : n,
        n = jQuery(this).parent().prev().length ? n : 0,
        jQuery("html, body").stop().animate({
            scrollTop: n
        }, 300, function() {
            m = !1
        }),
        k(o),
        m = !0,
        e.preventDefault()
    }
    function k(e) {
        e && (c.removeClass("toc__link--is-current").filter('[href="#' + e.attr("id") + '"]').addClass("toc__link--is-current"),
        s.css({
            background: e.css("backgroundColor"),
            color: e.css("color")
        }),
        a.css({
            background: e.css("backgroundColor"),
            color: e.css("color")
        }),
        n.css("background", e.css("backgroundColor")),
        r.css("background", e.css("backgroundColor")))
    }
    ronner.scroll.init = function() {
        t = jQuery(window),
        o = jQuery(document),
        n = jQuery("body"),
        s = jQuery(".header"),
        r = jQuery(".header__navigation"),
        l = jQuery(".content__item"),
        a = jQuery(".is-submenu"),
        i = jQuery(".is-intro"),
        c = jQuery(".toc__link"),
        Q = m = _ = h = j = g = y = v = p = f = d = u = 0,
        t.on("resize", w).trigger("resize"),
        t.on("scroll", b).trigger("scroll"),
        c.on("click", C)
    }
}(),
(ronner = window.ronner || {}).toggle = {},
ronner.toggle.init = function() {
    jQuery(".project__toggle").on("click", function(e) {
        var t = jQuery(window).scrollTop();
        jQuery(".project__content").is(".project__content--is-toggled") ? (jQuery(".project__content").removeClass("project__content--is-toggled"),
        jQuery(this).text(jQuery(this).attr("data-toggle-less"))) : (jQuery(".project__content").addClass("project__content--is-toggled"),
        jQuery(this).text(jQuery(this).attr("data-toggle-more"))),
        jQuery(window).scrollTop(t),
        e.preventDefault()
    })
}
,
jQuery(function() {
    var e = window.ronner || {};
    for (var t in e)
        "init"in e[t] && e[t].init()
});