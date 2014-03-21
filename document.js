(function() {
  var $, Document;

  Document = function(s) {
    if (!s || s === document) {
      return document;
    }
    if (typeof s === 'function') {
      document.ready(s);
      void 0;
    }
    this.init = function(s) {
      var s0;
      if (s === document) {
        return s;
      }
      if (s === 'html') {
        return document.documentElement;
      }
      if (s === 'head') {
        return document.head;
      }
      if (s === 'body') {
        return document.body;
      }
      if (s.indexOf(',' === -1)) {
        s0 = s[0];
        s = s.substr(1);
        if (s0 === '#') {
          return this.byId(s);
        } else if (s0 === '.') {
          return this.byClass(s);
        } else {
          return this.byTag(s0 + s);
        }
      }
      return this.bySelectors(s);
    };
    this.byId = function(s) {
      return document.getElementById(s);
    };
    this.byClass = function(s) {
      return document.getElementsByClassName(s);
    };
    this.byTag = function(s) {
      return document.getElementsByTagName(s);
    };
    this.bySelectors = function(ss) {
      var i, list, selectors;
      selectors = ss.split(",");
      list = [];
      i = selectors.length - 1;
      while (i >= 0) {
        list.push(this.bySelector(selectors[i]));
        i--;
      }
      return list;
    };
    this.bySelector = function(s) {
      var s0;
      s0 = s[0];
      s = s.substr(1);
      if (s0 === '#') {
        return this.byId(s);
      } else if (s0 === '.') {
        return this.byClass(s);
      } else {
        return false;
      }
    };
    return this.init(s);
  };

  HTMLDocument.prototype.ready = function(f) {
    return document.onreadystatechange = function() {
      if (document.readyState === "complete") {
        return f();
      }
    };
  };

  Element.prototype.html = function(v) {
    if (!v) {
      return this.innerHTML;
    }
    this.innerHTML = "" + v;
    return this;
  };

  Element.prototype.val = function(v) {
    if (!v) {
      return this.value;
    }
    this.value = v;
    return this;
  };

  Element.prototype.attr = function(k, v) {
    if (!v) {
      return this.getAttribute(k);
    }
    this.setAttribute(k, v);
    return this;
  };

  Element.prototype.clear = function() {
    while (this.firstChild) {
      this.firstChild.remove();
    }
    return this;
  };

  NodeList.prototype.clear = function() {
    var el, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      el.clear();
    }
    return this;
  };

  Element.prototype.addClass = function(c) {
    this.className += " " + c + " ";
    return this;
  };

  NodeList.prototype.addClass = function(c) {
    var el, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      el.addClass();
    }
    return this;
  };

  Element.prototype.removeClass = function(c) {
    var r;
    r = new RegExp("\\s" + c + '\\s?', 'gi');
    this.className = (" " + this.className).replace(r, '');
    if (this.className[0] === ' ') {
      this.className = this.className.substr(1);
    }
    return this;
  };

  NodeList.prototype.removeClass = function(c) {
    var el, i;
    i = this.length - 1;
    while (i >= 0) {
      el = this[i];
      el.removeClass(c);
      i--;
    }
    return this;
  };

  Element.prototype.hasClass = function(c) {
    return this.className.split(" ").indexOf(c) !== -1;
  };

  Element.prototype.show = function() {
    return this.style.display = '';
  };

  NodeList.prototype.show = function() {
    var el, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      el.show();
    }
    return this;
  };

  Element.prototype.hide = function() {
    return this.style.display = 'none';
  };

  NodeList.prototype.hide = function() {
    var el, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      el.hide();
    }
    return this;
  };

  Element.prototype.css = function(k, v) {
    if (!k) {
      return this.style;
    }
    if (!v) {
      if (this.style.hasOwnProperty(k)) {
        return this.style[k];
      }
    }
    k = k.toCamelCase();
    if (this.style.hasOwnProperty(k)) {
      this.style[k] = v;
    }
    return this;
  };

  NodeList.prototype.css = function(k, v) {
    var el, _i, _len;
    if (!v) {
      return void 0;
    }
    k = k.toCamelCase();
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      el.css(k, v);
    }
    return this;
  };

  String.prototype.toCamelCase = function() {
    return this.toLowerCase().replace(/-(.)/g, function(m, g) {
      return g.toUpperCase();
    });
  };

  Element.prototype.on = function(evt, callback) {
    this.addEventListener(evt, callback);
    return this;
  };

  NodeList.prototype.on = function(evt, callback) {
    var el, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      el.addEventListener(evt, callback);
    }
    return this;
  };

  $ = Document;

  window.$ = $;

}).call(this);
