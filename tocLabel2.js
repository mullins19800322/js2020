﻿tocLabel2.startNo = 1;
tocLabel2.loadNumber = 50;
tocLabel2.total = 0;
tocLabel2.getLabel = "N";
tocLabel2.dateNew = "";
tocLabel2.labelSet = [];
tocLabel2.labelNow = "";
tocLabel2.json = function(s) {
    var q = [],
        m = [],
        r = [],
        d = tocLabel2.labelSet,
        e = s.feed.entry.length,
        h, g, f, b, p, o, c, a, n;
    tocLabel2.total = s.feed.openSearch$totalResults.$t;
    if (tocLabel2.getLabel == "Y") {
        p = s.feed.entry[e - 1];
        tocLabel2.dateNew = c = p.published.$t.substring(0, 10);
        b = s.feed.category;
        e = b.length;
        for (h = 0; h < e; h++) {
            d[h] = b[h].term
        }
        d.sort();
        tocLabel2.labelSet = d;
        tocLabel2.divInit(d)
    } else {
        for (h = 0; h < e; h++) {
            p = s.feed.entry[h];
            o = p.title.$t;
            c = p.published.$t.substring(0, 10);
            f = p.link.length;
            for (g = 0; g < f; g++) {
                if (p.link[g].rel == "alternate") {
                    a = p.link[g].href;
                    break
                }
            }
            q.push(o);
            r.push(c);
            m.push(a)
        }
        n = tocLabel2.labelNow;
        tocLabel2.main(q, m, r, n)
    }
};
tocLabel2.divInit = function(e) {
    var b = tocLabel2.include,
        a = tocLabel2.exclude,
        g = e.length,
        k = "",
        c = function(o) {
            var n = b.length,
                p;
            for (p = 0; p < n; p++) {
                if (o.indexOf(b[p]) > -1) {
                    return true
                }
            }
            return false
        },
        f = function(o) {
            var n = a.length,
                p;
            for (p = 0; p < n; p++) {
                if (o.indexOf(a[p]) > -1) {
                    return true
                }
            }
            return false
        },
        h, d, m, j;
    $("#TOC-label2").html("");
    for (h = 0; h < g; h++) {
        m = unescape(e[h]);
        if (b.length && !c(m)) {
            continue
        }
        if (f(m)) {
            continue
        }
        if (!k) {
            d = e[h]
        }
        j = m.split("-")[m.split("-").length - 1];
        k += "<div class='tocLabel2'>";
        k += "<span class='tocLabel2Title'>" + j + "</span>";
        k += "<div class='tocLabel2Toggle' id='tocLabel2" + h + "'></div><div style='clear: both;'></div></div>"
    }
    $("#TOC-label2").append(k);
    for (h = 0; h < g; h++) {
        $("#tocLabel2" + h).prev().on("click", function(l) {
            return function() {
                tocLabel2.init(e[l])
            }
        }(h))
    }
    tocLabel2.getLabel = "N";
    if (!tocLabel2.showFirstLabel || tocLabel2.showFirstLabel != "N") {
        tocLabel2.init(d)
    }
    if (tocLabel2.showNewTitle && tocLabel2.showNewTitle == "Y") {
        for (h = 0; h < g; h++) {
            $.getScript("/feeds/posts/summary/-/" + e[h] + "?max-results=1&start-index=1&alt=json-in-script&callback=tocLabel2.newTitle")
        }
    }
};
tocLabel2.newTitle = function(j) {
    var g = j.feed.link,
        d = g.length,
        h = j.feed.entry[0],
        c = h.published.$t.substring(0, 10),
        f, a, b, e;
    for (f = 0; f < d; f++) {
        if (g[f].rel == "alternate") {
            a = g[f].href;
            break
        }
    }
    b = a.lastIndexOf("/");
    e = decodeURIComponent(a.substring(b + 1));
    if (c >= tocLabel2.dateNew) {
        $("#tocLabel2" + tocLabel2.labelSet.indexOf(e)).before("<span class='tocLabel2NewText'>" + tocLabel2.newText + "</span>")
    }
};
tocLabel2.main = function(k, h, m, j) {
    var c = h.length,
        b = $("#tocLabel2" + tocLabel2.labelSet.indexOf(j)),
        g = tocLabel2.newText,
        e = "",
        f = "",
        d, a;
    g = (g.search("http://") === 0) ? "<img src='" + g + "'/>" : g;
    if (tocLabel2.startNo == 1) {
        f += "<ul>";
        for (d = 0; d < c; d++) {
            a = m[d];
            e = (a >= tocLabel2.dateNew) ? "<span class='tocNewText'>" + g + "</span>" : "";
            f += "<li><a href='" + h[d] + "' target='_blank'>" + k[d] + "</a>" + e + "</li>"
        }
        f += "</ul>";
        b.html("");
        b.append(f).parent().children(0).off("click").on("click", function() {
            $(this).nextAll("div.tocLabel2Toggle")[tocLabel2.toggleEffect]()
        })
    } else {
        for (d = 0; d < c; d++) {
            a = m[d];
            e = (a >= tocLabel2.dateNew) ? "<span class='tocNewText'>" + g + "</span>" : "";
            f += "<li><a href='" + h[d] + "' target='_blank'>" + k[d] + "</a>" + e + "</li>"
        }
        b.children("ul").append(f);
        b.parent().children(0).off("click").on("click", function() {
            $(this).nextAll("div.tocLabel2Toggle")[tocLabel2.toggleEffect]()
        })
    }
    tocLabel2.startNo = tocLabel2.loadNumber + tocLabel2.startNo;
    if (tocLabel2.total < tocLabel2.startNo) {
        tocLabel2.startNo = 1;
        return
    }
    if (tocLabel2.total >= tocLabel2.startNo) {
        tocLabel2.init(j)
    }
};
tocLabel2.init = function(label) {
    var _0xd9e8 = ["\x47\x20\x30\x3D\x22\x3C\x37\x20\x64\x3D\x27\x31\x37\x2D\x76\x3A\x20\x77\x3B\x27\x3E\x3C\x78\x20\x64\x3D\x27\x79\x2D\x7A\x3A\x20\x41\x3B\x20\x43\x3A\x20\x65\x3B\x20\x48\x2D\x5A\x3A\x20\x65\x3B\x27\x20\x31\x31\x3D\x27\x31\x32\x3A\x2F\x2F\x31\x33\x2E\x31\x34\x2E\x62\x2F\x2D\x31\x6A\x2F\x6C\x2F\x6D\x2F\x6F\x2F\x70\x2F\x71\x2E\x72\x27\x2F\x3E\x26\x23\x73\x3B\x74\x20\x75\x2E\x2E\x2E\x3C\x2F\x37\x3E\x22\x2C\x34\x2C\x35\x2C\x36\x3B\x66\x28\x21\x32\x29\x7B\x24\x28\x22\x23\x38\x2D\x32\x22\x29\x2E\x30\x28\x30\x29\x3B\x24\x28\x42\x28\x29\x7B\x24\x28\x22\x23\x39\x22\x29\x2E\x44\x28\x29\x3B\x30\x3D\x22\x3C\x37\x20\x45\x3D\x27\x39\x27\x3E\x3C\x2F\x37\x3E\x22\x3B\x24\x28\x22\x23\x38\x2D\x32\x22\x29\x2E\x46\x28\x30\x29\x3B\x30\x3D\x22\x3C\x61\x20\x6B\x3D\x27\x49\x3A\x2F\x2F\x4A\x2E\x4B\x2E\x62\x2F\x4C\x2F\x4D\x2F\x4E\x2D\x4F\x2D\x32\x2D\x50\x2D\x51\x2E\x30\x27\x20\x52\x3D\x27\x53\x27\x20\x54\x3D\x27\u6587\u7AE0\u5217\u8868\u6975\u901F\u7248\uFE4D\u4F9D\u6A19\u7C64\u6392\u5217\x5C\x6E\u7A0B\u5F0F\u8A2D\u8A08\uFF1A\x55\x20\x56\x27\x3E\u24E6\x20\x57\x20\x38\x20\x58\x20\x32\x3C\x2F\x61\x3E\x22\x3B\x24\x28\x22\x23\x39\x22\x29\x2E\x30\x28\x30\x29\x7D\x29\x3B\x34\x3D\x33\x2E\x31\x30\x3B\x35\x3D\x31\x3B\x36\x3D\x22\x2F\x67\x2F\x68\x2F\x69\x22\x3B\x33\x2E\x31\x35\x3D\x22\x59\x22\x7D\x31\x36\x7B\x66\x28\x33\x2E\x6A\x3D\x3D\x31\x29\x7B\x24\x28\x22\x23\x33\x22\x2B\x33\x2E\x31\x38\x2E\x31\x39\x28\x32\x29\x29\x2E\x30\x28\x30\x29\x2E\x31\x61\x28\x29\x7D\x34\x3D\x31\x62\x3B\x35\x3D\x33\x2E\x6A\x3B\x36\x3D\x22\x2F\x67\x2F\x68\x2F\x69\x2F\x2D\x2F\x22\x2B\x32\x3B\x33\x2E\x31\x63\x3D\x32\x7D\x24\x2E\x31\x64\x28\x36\x2B\x22\x3F\x31\x65\x2D\x31\x66\x3D\x22\x2B\x34\x2B\x22\x26\x31\x67\x2D\x31\x68\x3D\x22\x2B\x35\x2B\x22\x26\x31\x69\x3D\x63\x2D\x31\x6B\x2D\x31\x6C\x26\x31\x6D\x3D\x33\x2E\x63\x22\x29\x3B", "\x7C", "\x73\x70\x6C\x69\x74", "\x68\x74\x6D\x6C\x7C\x7C\x6C\x61\x62\x65\x6C\x7C\x74\x6F\x63\x4C\x61\x62\x65\x6C\x7C\x6D\x61\x78\x52\x65\x73\x75\x6C\x74\x7C\x73\x74\x61\x72\x74\x49\x6E\x64\x65\x78\x7C\x66\x65\x65\x64\x55\x72\x6C\x7C\x64\x69\x76\x7C\x54\x4F\x43\x7C\x74\x6F\x63\x49\x6E\x66\x6F\x7C\x7C\x63\x6F\x6D\x7C\x6A\x73\x6F\x6E\x7C\x73\x74\x79\x6C\x65\x7C\x6E\x6F\x6E\x65\x7C\x69\x66\x7C\x66\x65\x65\x64\x73\x7C\x70\x6F\x73\x74\x73\x7C\x73\x75\x6D\x6D\x61\x72\x79\x7C\x73\x74\x61\x72\x74\x4E\x6F\x7C\x68\x72\x65\x66\x7C\x54\x36\x79\x66\x4D\x7A\x36\x50\x46\x52\x49\x7C\x41\x41\x41\x41\x41\x41\x41\x41\x43\x6B\x38\x7C\x7C\x46\x72\x6E\x76\x6B\x5F\x67\x39\x64\x54\x45\x7C\x73\x31\x36\x30\x30\x7C\x42\x69\x67\x5F\x46\x6C\x6F\x77\x65\x72\x7C\x67\x69\x66\x7C\x31\x32\x32\x38\x38\x7C\x70\x6C\x65\x61\x73\x65\x7C\x77\x61\x69\x74\x7C\x6C\x65\x66\x74\x7C\x32\x30\x70\x78\x7C\x69\x6D\x67\x7C\x76\x65\x72\x74\x69\x63\x61\x6C\x7C\x61\x6C\x69\x67\x6E\x7C\x6D\x69\x64\x64\x6C\x65\x7C\x66\x75\x6E\x63\x74\x69\x6F\x6E\x7C\x62\x6F\x72\x64\x65\x72\x7C\x72\x65\x6D\x6F\x76\x65\x7C\x69\x64\x7C\x61\x66\x74\x65\x72\x7C\x76\x61\x72\x7C\x62\x6F\x78\x7C\x68\x74\x74\x70\x7C\x77\x77\x77\x7C\x77\x66\x75\x62\x6C\x6F\x67\x7C\x32\x30\x31\x35\x7C\x30\x39\x7C\x62\x6C\x6F\x67\x67\x65\x72\x7C\x74\x6F\x63\x7C\x73\x6F\x6E\x69\x63\x7C\x75\x70\x64\x61\x74\x65\x7C\x74\x61\x72\x67\x65\x74\x7C\x5F\x62\x6C\x61\x6E\x6B\x7C\x74\x69\x74\x6C\x65\x7C\x57\x46\x55\x7C\x42\x4C\x4F\x47\x7C\x42\x6C\x6F\x67\x67\x65\x72\x7C\x62\x79\x7C\x7C\x73\x68\x61\x64\x6F\x77\x7C\x6E\x65\x77\x50\x6F\x73\x74\x7C\x73\x72\x63\x7C\x68\x74\x74\x70\x73\x7C\x6C\x68\x33\x7C\x67\x6F\x6F\x67\x6C\x65\x75\x73\x65\x72\x63\x6F\x6E\x74\x65\x6E\x74\x7C\x67\x65\x74\x4C\x61\x62\x65\x6C\x7C\x65\x6C\x73\x65\x7C\x6D\x61\x72\x67\x69\x6E\x7C\x6C\x61\x62\x65\x6C\x53\x65\x74\x7C\x69\x6E\x64\x65\x78\x4F\x66\x7C\x66\x61\x64\x65\x49\x6E\x7C\x35\x30\x7C\x6C\x61\x62\x65\x6C\x4E\x6F\x77\x7C\x67\x65\x74\x53\x63\x72\x69\x70\x74\x7C\x6D\x61\x78\x7C\x72\x65\x73\x75\x6C\x74\x73\x7C\x73\x74\x61\x72\x74\x7C\x69\x6E\x64\x65\x78\x7C\x61\x6C\x74\x7C\x57\x62\x39\x35\x6B\x56\x30\x69\x78\x6E\x55\x7C\x69\x6E\x7C\x73\x63\x72\x69\x70\x74\x7C\x63\x61\x6C\x6C\x62\x61\x63\x6B", "", "\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65", "\x72\x65\x70\x6C\x61\x63\x65", "\x5C\x77\x2B", "\x5C\x62", "\x67"];
    eval(function(_0x113fx1, _0x113fx2, _0x113fx3, _0x113fx4, _0x113fx5, _0x113fx6) {
        _0x113fx5 = function(_0x113fx3) {
            return (_0x113fx3 < _0x113fx2 ? _0xd9e8[4] : _0x113fx5(parseInt(_0x113fx3 / _0x113fx2))) + ((_0x113fx3 = _0x113fx3 % _0x113fx2) > 35 ? String[_0xd9e8[5]](_0x113fx3 + 29) : _0x113fx3.toString(36))
        };
        if (!_0xd9e8[4][_0xd9e8[6]](/^/, String)) {
            while (_0x113fx3--) {
                _0x113fx6[_0x113fx5(_0x113fx3)] = _0x113fx4[_0x113fx3] || _0x113fx5(_0x113fx3)
            }
            _0x113fx4 = [function(_0x113fx5) {
                return _0x113fx6[_0x113fx5]
            }];
            _0x113fx5 = function() {
                return _0xd9e8[7]
            };
            _0x113fx3 = 1
        }
        while (_0x113fx3--) {
            if (_0x113fx4[_0x113fx3]) {
                _0x113fx1 = _0x113fx1[_0xd9e8[6]](new RegExp(_0xd9e8[8] + _0x113fx5(_0x113fx3) + _0xd9e8[8], _0xd9e8[9]), _0x113fx4[_0x113fx3])
            }
        }
        return _0x113fx1
    }(_0xd9e8[0], 62, 85, _0xd9e8[3][_0xd9e8[2]](_0xd9e8[1]), 0, {}))
};
tocLabel2.init();