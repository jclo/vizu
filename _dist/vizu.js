/** ****************************************************************************
 * Vizu v0.0.10
 *
 * A Javascript View library for building web and hybrid mobile applications.
 * (you can download it from npm or github repositories)
 * Copyright (c) 2019 jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr/).
 * Released under the MIT license. You may obtain a copy of the License
 * at: http://www.opensource.org/licenses/mit-license.php).
 * ************************************************************************** */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Vizu = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vizu = _interopRequireDefault(require("./src/vizu"));

var _component = _interopRequireDefault(require("./src/component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Vizu: _vizu.default,
  Component: _component.default
};
exports.default = _default;
module.exports = exports.default;

},{"./src/component":2,"./src/vizu":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vizu = _interopRequireDefault(require("./vizu"));

var _animate = _interopRequireDefault(require("./private/animate"));

var _overslash = _interopRequireDefault(require("./private/overslash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// -- Global constants (in the scope of this module)
// -- Public Methods -----------------------------------------------------------

/**
* This class defines the web component.
*
* @namespace vizu
*/
var Component =
/*#__PURE__*/
function () {
  /**
   * Creates an unique ID for this component.
   *
   * @constructor ()
   * @public
   * @param {}          -,
   */
  function Component() {
    _classCallCheck(this, Component);

    // Create an unique id for this component:
    this.id = "i".concat(Math.random().toString(36).substr(2, 7));
    this.cList = null;
    this.components = null;
    this.props = {};
    this.props.options = {};
  }
  /**
   * Initialises the variables when the component is rendered.
   *
   * @method ()
   * @public
   * @param {}        -,
   * @returns {}      -,
   * @since 0.0.0
   */


  _createClass(Component, [{
    key: "getInitialState",
    value: function getInitialState() {
      // To avoid eslint error!
      this.props = {};
      this.props.options = {};
    }
    /**
     * Returns the the first element that matches the specified CSS selector(s).
     *
     * @method (arg1)
     * @public
     * @param {String}    the CSS selector(s),
     * @returns {Object}  returns the first element that matches a specified
     *                    CSS selector(s),
     * @since 0.0.0
     */

  }, {
    key: "$",
    value: function $(selector) {
      var cid = this.id,
          docu = _vizu.default.vdom ? _vizu.default.vdom.window.document : document;
      var el;
      /**
       * Select a child element.
       *
       * @method (arg1)
       * @public
       * @param {String}    the selector,
       * @returns {Object}  returns this,
       * @since 0.0.8
       */

      var select = function select(sel) {
        if (typeof sel === 'string' && this[0]) {
          var child = this[0].querySelector(sel);

          if (child) {
            this[0] = child;
          }
        }

        return this;
      };
      /**
       * Selects the specified child if it exists.
       *
       * @method (arg1)
       * @public
       * @param {Number}    the child index,
       * @returns {Object}  returns this,
       * @since 0.0.8
       */


      var selectChild = function selectChild(n) {
        if (Object.prototype.toString.call(n) === '[object Number]') {
          this[0] = this[0].children[n] ? this[0].children[n] : this[0];
        }

        return this;
      };
      /**
       * Returns to the parent element.
       *
       * @method ()
       * @public
       * @param {}          -,
       * @returns {Object}  returns this,
       * @since 0.0.8
       */


      var parent = function parent() {
        if (this.root) {
          // As a root parent is defined, we stop at it.
          if (this[0] !== this.root) {
            this[0] = this[0].parentNode;
          }
        } else {
          this[0] = this[0].parentNode;
        }

        return this;
      };
      /**
       * Returns to the root parent if defined.
       *
       * @method ()
       * @public
       * @param {}          -,
       * @returns {Object}  returns this,
       * @since 0.0.7
       */


      var firstParent = function firstParent() {
        if (this.root) {
          this[0] = this.root;
        }

        return this;
      };
      /**
       * Gets/Sets the HTML contents of the element,
       *
       * @method (arg1)
       * @public
       * @param {String}    the html contents to add,
       * @returns {String}  returns the node DOMString or this,
       * @since 0.0.0
       */


      var html = function html(xmlString) {
        if (xmlString) {
          this[0].innerHTML = xmlString;
          return this;
        }

        return this[0].innerHTML;
      };
      /**
       * Removes all the childs of the current node.
       *
       * @method ()
       * @public
       * @param {}          -,
       * @returns {Object}  returns this,
       * @since 0.0.4
       */


      var empty = function empty() {
        while (this[0].firstChild) {
          this[0].removeChild(this[0].firstChild);
        }

        return this;
      };
      /**
       * Appends an HTML string after the last child of the current node.
       *
       * @method (arg1)
       * @public
       * @param {String}    an HTML string,
       * @returns {Object}  returns this,
       * @since 0.0.4
       */


      var append = function append(xmlString) {
        if (typeof xmlString === 'string') {
          this[0].insertAdjacentHTML('beforeend', xmlString);
        }

        return this;
      };
      /**
       * Appends an HTML string before the first child of the current node.
       *
       * @method (arg1)
       * @public
       * @param {String}    an HTML string,
       * @returns {Object}  returns this,
       * @since 0.0.6
       */


      var prepend = function prepend(xmlString) {
        if (typeof xmlString === 'string') {
          this[0].insertAdjacentHTML('afterbegin', xmlString);
        }

        return this;
      };
      /**
       * Appends an HTML string after the current node.
       *
       * Nota: this method adds a node after the current node only if it is
       * a child node of this component. 'after' is forbidden on the root node.
       *
       * @method (arg1)
       * @public
       * @param {String}    an HTML string,
       * @returns {Object}  returns this,
       * @since 0.0.6
       */


      var after = function after(xmlString) {
        if (typeof xmlString === 'string' && this[0].id !== cid) {
          this[0].insertAdjacentHTML('afterend', xmlString);
        }

        return this;
      };
      /**
       * Appends an HTML string before the current node.
       *
       * Nota: this method adds a node before the current node only if it is
       * a child node of this component. 'before' is forbidden on the root node.
       *
       * @method (arg1)
       * @public
       * @param {String}    an HTML string,
       * @returns {Object}  returns this,
       * @since 0.0.6
       */


      var before = function before(xmlString) {
        if (typeof xmlString === 'string' && this[0].id !== cid) {
          this[0].insertAdjacentHTML('beforebegin', xmlString);
        }

        return this;
      };
      /**
       * Replaces the current node with the given DOMString.
       *
       * Nota: this method replaces the current node only if it is
       * a child node of this component. 'replaceWith' is forbidden on the root node.
       *
       * @method (arg1)
       * @public
       * @param {String}    an HTML string,
       * @returns {Object}  returns this,
       * @since 0.0.6
       */


      var replaceWith = function replaceWith(xmlString) {
        var oldChild = this[0],
            parento = oldChild.parentNode // , index    =  Array.prototype.indexOf.call(parent.children, oldChild)
        ,
            wrapper = docu.createElement('div');
        var newChild;

        if (typeof xmlString === 'string' && oldChild.id !== cid) {
          // Replace the old child by new one:
          wrapper.innerHTML = xmlString;
          newChild = wrapper.firstChild;
          parento.replaceChild(newChild, oldChild);
        }

        return this;
      };
      /**
       * Gets/Sets the text contents of the element,
       *
       * @method (arg1)
       * @public
       * @param {String}    the text contents to add,
       * @returns {String}  returns the text contents or this;,
       * @since 0.0.0
       */


      var text = function text(texte) {
        if (texte) {
          this[0].textContent = texte;
          return this;
        }

        return this[0].textContent;
      };
      /**
       * Clones the selected element.
       *
       * @method (arg1)
       * @public
       * @param {Boolean}   true clone with children, false without,
       * @returns {Object}  returns the cloned element,
       * @since 0.0.8
       */


      var clone = function clone(deep) {
        if (deep === true || deep === false) {
          return this[0].cloneNode(deep);
        }

        return this[0].cloneNode(true);
      };
      /**
       * Inserts a child element before another child element.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}    the new node element,
       * @param {Object}    the target node element,
       * @returns {Object}  returns this,
       * @since 0.0.8
       */


      var insertChildBefore = function insertChildBefore(newChild, child) {
        if (newChild) {
          this[0].insertBefore(newChild, child);
        }

        return this;
      };
      /**
       * Removed the passed-in child element.
       *
       * @method (arg1)
       * @public
       * @param {Object}    the child element to remove,
       * @returns {Object}  returns this,
       * @since 0.0.8
       */


      var removeChild = function removeChild(child) {
        if (child) {
          this[0].removeChild(child);
        }

        return this;
      };
      /**
       * Replaces a child by another.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}    the new node element,
       * @param {Object}    the node element to replace,
       * @returns {Object}  returns this,
       * @since 0.0.8
       */


      var replaceChild = function replaceChild(newChild, child) {
        if (newChild) {
          this[0].replaceChild(newChild, child);
        }

        return this;
      };
      /**
       * Returns the children.
       *
       * @method ()
       * @public
       * @param {}          -,
       * @returns {Object}  returns the children HTMLCollection,
       * @since 0.0.8
       */


      var children = function children() {
        return this[0].children;
      };
      /**
       * Returns the children position in the parent tree.
       *
       * @method ()
       * @public
       * @param {}          -,
       * @returns {Object}  returns the children position,
       * @since 0.0.8
       */


      var childIndex = function childIndex() {
        var child = this[0],
            index = 0;

        while (child !== null) {
          child = child.previousElementSibling;
          index += 1;
        }

        return index - 1;
      };
      /**
       * Returns the DOMRect object that bounds the contents of the range.
       *
       * @method ()
       * @public
       * @param {}          -,
       * @returns {Object}  returns the DOMRect object,
       * @since 0.0.8
       */


      var getRect = function getRect() {
        return this[0] ? this[0].getBoundingClientRect() : null;
      };
      /**
       * Gets/Sets the style attribute of the element,
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the style attribute,
       * @param {String}    the style attribute value,
       * @returns {String}  returns the style attribute value or this,
       * @since 0.0.3
       */


      var css = function css(styleAttr, value) {
        var arr = typeof styleAttr === 'string' ? styleAttr.split('-') : [];
        var attr = ''; // Convert style attribute name with '-' (ex.: 'font-size' to 'fontSize'):

        for (var i = 0; i < arr.length; i++) {
          if (i === 0) {
            attr += arr[i];
          } else {
            attr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
          }
        }

        if (!value) {
          // Get attribute:
          return this[0].style[attr];
        } // Set attribute:


        this[0].style[attr] = value;
        return this;
      };
      /**
       * Returns the DOMTokenList collection of the class attributes of the element.
       *
       * @method ()
       * @public
       * @param {}          -,
       * @returns {Object}  returns the DOMTokenList of the element,
       * @since 0.0.0
       */


      var getClassList = function getClassList() {
        return this[0].classList;
      };
      /**
       * Adds a class name to the element.
       *
       * @method (arg1)
       * @public
       * @param {String}    the class name to add,
       * @returns {Object}  returns this,
       * @since 0.0.0
       */


      var addClass = function addClass(className) {
        this[0].classList.add(className);
        return this;
      };
      /**
       * Adds a list of classes to the element.
       *
       * @method (arg1)
       * @public
       * @param {Array}     the list of classes to add,
       * @returns {Object}  returns this,
       * @since 0.0.8
       */


      var addClasses = function addClasses(classes) {
        if (Array.isArray(classes)) {
          for (var i = 0; i < classes.length; i++) {
            this[0].classList.add(classes[i]);
          }
        }

        return this;
      };
      /**
       * Removes a class name from the element.
       *
       * @method (arg1)
       * @public
       * @param {String}    the class name to remove,
       * @returns {Object}  returns this,
       * @since 0.0.0
       */


      var removeClass = function removeClass(className) {
        this[0].classList.remove(className);
        return this;
      };
      /**
       * Removes a list of classes from the element.
       *
       * @method (arg1)
       * @public
       * @param {Array}     the list of classes to remove,
       * @returns {Object}  returns this,
       * @since 0.0.8
       */


      var removeClasses = function removeClasses(classes) {
        if (Array.isArray(classes)) {
          for (var i = 0; i < classes.length; i++) {
            this[0].classList.remove(classes[i]);
          }
        }

        return this;
      };
      /**
       * Toggles a class name for the element.
       *
       * @method (arg1)
       * @public
       * @param {String}    the class name to add/remove,
       * @returns {Object}  returns this,
       * @since 0.0.0
       */


      var toggleClass = function toggleClass(className) {
        this[0].classList.toggle(className);
        return this;
      };
      /**
       * Checks if the element has the passed-in class.
       *
       * @method (arg1)
       * @public
       * @param {String}    the class name,
       * @returns {Boolean} returns true or false,
       * @since 0.0.8
       */


      var hasClass = function hasClass(className) {
        var list = this[0].classList.value.split(' ');

        if (Object.prototype.toString.call(className) === '[object String]' && list.indexOf(className) !== -1) {
          return true;
        }

        return false;
      };
      /**
       * Sets or Gets the specified attribute.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the attribute name,
       * @param {String}    the attribute value,
       * @returns {String}  returns the attribute value or this,
       * @since 0.0.6
       */


      var attr = function attr(attribute, value) {
        if (value) {
          this[0].setAttribute(attribute, value);
          return this;
        }

        return this[0].getAttribute(attribute);
      };
      /**
       * Removes the specified attribute.
       *
       * @method (arg1)
       * @public
       * @param {String}    the attribute name,
       * @returns {Object}  returns this,
       * @since 0.0.0
       */


      var removeAttr = function removeAttr(attribute) {
        if (attribute) {
          this[0].removeAttribute(attribute);
        }

        return this;
      };
      /**
       * Performs a custom animation of a set of CSS properties.
       *
       * @method (properties [, duration ] [, easing ] [, complete ])
       * @public
       * @param {Object}    An object of CSS properties,
       * @param {Number}    define how long the animation run,
       * @param {Easing}    the easing animation method,
       * @param {Function}  the function to call at completion,
       * @returns {Object}  returns this,
       * @since 0.0.7
       */


      var animate = function animate(properties) {
        var DTIME = 400,
            FAST = 200,
            SLOW = 600,
            INC = 10,
            elem = this[0],
            delay = INC; // Is the argument properties an object?

        if (!_overslash.default.isLiteralObject(properties)) {
          return this;
        } // Extract the optional arguments:


        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argus = _animate.default.extractArgs(args); // Set the duration:


        var duration = _overslash.default.isNumber(argus.duration) ? argus.duration : function (arg) {
          if (arg === 'fast') return FAST;
          if (arg === 'slow') return SLOW;
          return DTIME;
        }(argus.duration); // Set the easing (swing only for the time being):

        var easing = _animate.default.easing && _animate.default.easing[argus.easing] ? _animate.default.easing[argus.easing] : _animate.default.swing; // Set the callback:

        var callback = argus.callback ? argus.callback : null; // Run the animation:

        _animate.default.run(elem, properties, easing, duration, delay, callback); // Test Mode:


        if (_vizu.default.vdom) {
          this.probe = {
            duration: duration,
            easing: _animate.default.easing && _animate.default.easing[argus.easing] ? argus.easing : 'swing',
            callback: callback
          };
        }

        return this;
      };
      /**
       * Attachs an event listener to the current node.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the DOM event string,
       * @param {Function}  the listner function,
       * @returns {Object}  returns this,
       * @since 0.0.5
       */


      var on = function on(event, listener) {
        this[0].addEventListener(event, listener);
        return this;
      };
      /**
       * Removes an event listener from the current node.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the DOM event string,
       * @param {Function}  the listner function,
       * @returns {Object}  returns this,
       * @since 0.0.5
       */


      var off = function off(event, listener) {
        this[0].removeEventListener(event, listener);
        return this;
      }; // -- Main


      if (selector) {
        // Selects the first element that matches the selector(s):
        el = docu.querySelector("#".concat(cid)).querySelector(selector);
      } else {
        // Selects the entire 'web component':
        el = docu.querySelector("#".concat(cid));
      }

      return {
        0: el,
        id: el ? el.id : null,
        select: select,
        selectChild: selectChild,
        parent: parent,
        firstParent: firstParent,
        html: html,
        empty: empty,
        append: append,
        prepend: prepend,
        after: after,
        before: before,
        replaceWith: replaceWith,
        text: text,
        clone: clone,
        insertChildBefore: insertChildBefore,
        removeChild: removeChild,
        replaceChild: replaceChild,
        children: children,
        childIndex: childIndex,
        getRect: getRect,
        css: css,
        getClassList: getClassList,
        addClass: addClass,
        addClasses: addClasses,
        removeClass: removeClass,
        removeClasses: removeClasses,
        toggleClass: toggleClass,
        hasClass: hasClass,
        attr: attr,
        removeAttr: removeAttr,
        animate: animate,
        on: on,
        off: off
      };
    }
    /**
     * Attaches event(s) to the given node.
     *
     * @method (arg1, arg2)
     * @public
     * @param {String}    the DOM event name,
     * @param {Function}  the event listener,
     * @returns {Funtion} returns this,
     * @since 0.0.5
     */

    /* istanbul ignore next */

  }, {
    key: "events",
    value: function events() {
      // Just to avoid eslint error!
      return this;
    }
    /**
     * Returns the defined web component.
     *
     * @method ()
     * @public
     * @param {}          -,
     * @returns {String}  returns the web component,
     * @since 0.0.0
     */

  }, {
    key: "render",
    value: function render() {
      /* istanbul ignore next */
      return "<div>".concat(this.id, "</div>");
    }
    /**
     * Processes the web component to convert child(s) to plain HTML.
     *
     * @method ()
     * @private
     * @param {}          -,
     * @returns {String}  returns the web component,
     * @since 0.0.0
     */

  }, {
    key: "rendered",
    get: function get() {
      var t; // Initializes:

      this.getInitialState(); // Add an unique ID to this component:
      // let t = this.render().replace(/<div>/, `<div id="${this.id}">`);

      var co = this.render();

      if (co.match(/^\s*<div/)) {
        t = co.replace(/^\s*<div/, "<div id= \"".concat(this.id, "\""));
      } else if (co.match(/^\s*<header/)) {
        t = co.replace(/^\s*<header/, "<header id= \"".concat(this.id, "\""));
      } else if (co.match(/^\s*<footer/)) {
        t = co.replace(/^\s*<footer/, "<footer id= \"".concat(this.id, "\""));
      } else {
        t = co;
      }

      if (this.cList) {
        // This component includes components, render them:
        this.components = {};
        var keys = Object.keys(this.cList);

        for (var i = 0; i < keys.length; i++) {
          var c = new this.cList[keys[i]]();
          t = t.replace(keys[i], c.rendered);
          this.components[keys[i].replace(/[^a-zA-z0-9]/g, '')] = c;
        }
      } // Return the rendered web component:


      return t;
    }
    /**
     * Processes the web component events.
     *
     * @method ()
     * @private
     * @param {}          -,
     * @returns {}        -,
     * @since 0.0.5
     */

  }, {
    key: "evented",
    get: function get() {
      return this.events();
    }
  }]);

  return Component;
}();

var _default = Component;
exports.default = _default;
module.exports = exports.default;

},{"./private/animate":3,"./private/overslash":4,"./vizu":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _overslash = _interopRequireDefault(require("./overslash"));

var _utilities = _interopRequireDefault(require("./utilities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global */

/* eslint one-var: 0, semi-style: 0, prefer-destructuring: 0 */
// -- Vendor modules
// -- Local modules
// -- Global constants (in the scope of this module)
// -- Public Methods -----------------------------------------------------------
var _default = {
  /**
   * Extracts the optional argument of 'animate'.
   *
   * @function (arg1, arg2, arg3)
   * @private
   * @param {?}         duration, easing or callback,
   * @param {?}         easing or callback,
   * @param {Object}    the function to call at completion,
   * @returns {Object}  returns an object with the properties duration, easing
   *                    and callback,
   * @since 0.0.7
   */
  extractArgs: function extractArgs() {
    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    var nb = arg[0].length,
        args = arg[0];
    var duration, easing, callback;

    switch (nb) {
      case 0:
        break;

      case 1:
        if (_overslash.default.isNumber(args[0]) || args[0] === 'fast' || args[0] === 'slow') {
          duration = args[0];
        } else if (_overslash.default.isString(args[0])) {
          easing = args[0];
        } else if (_overslash.default.isFunction(args[0])) {
          callback = args[0];
        }

        break;

      case 2:
        if (_overslash.default.isNumber(args[0]) || args[0] === 'fast' || args[0] === 'slow') {
          duration = args[0];

          if (_overslash.default.isString(args[1])) {
            easing = args[1];
          } else if (_overslash.default.isFunction(args[1])) {
            callback = args[1];
          }
        } else if (_overslash.default.isString(args[0])) {
          easing = args[0];

          if (_overslash.default.isFunction(args[1])) {
            callback = args[1];
          }
        }

        break;

      case 3:
        if (_overslash.default.isNumber(args[0]) || args[0] === 'fast' || args[0] === 'slow') {
          duration = args[0];
        }

        if (_overslash.default.isString(args[1])) {
          easing = args[1];
        }

        if (_overslash.default.isFunction(args[2])) {
          callback = args[2];
        }

        break;

      /* istanbul ignore next */

      default:
        break;
    }

    return {
      duration: duration,
      easing: easing,
      callback: callback
    };
  },

  /**
   * Retrieves the CSS property values for the given node.
   *
   * @function (arg1, arg2)
   * @private
   * @param {Object}    the given node,
   * @param {Object}    the CSS properties to animate,
   * @returns {Object}  returns an object with the properties initial, change, suffix
   *                    per animated property,
   * @since 0.0.7
   */
  getProps: function getProps(el, properties) {
    var keys = Object.keys(properties),
        props = {},
        names = [];
    var name, i; // Parse the properties:

    for (i = 0; i < keys.length; i++) {
      // Normalize the name of the property:
      name = _utilities.default.normalizeCssPropertyName(keys[i]); // Check it is a valid CSS property:

      if (el.style[name]) {
        names.push(name);
        props[name] = {
          initial: parseFloat(el.style[name], 10),
          change: parseFloat(properties[keys[i]]) - parseFloat(el.style[name]),
          suffix: el.style[name].replace(/[0-9.]/g, '')
        };
      }
    }

    props.name = names;
    return props;
  },

  /**
   * Updates dynamically the CSS properties from their initial value to their final.
   *
   * @function (arg1, arg2, arg3, arg4, arg5, arg6)
   * @private
   * @param {Object}    the given node,
   * @param {Object}    the CSS properties to update,
   * @param {Function}  the easing method,
   * @param {Number}    the animation duration,
   * @param {Number}    the animation step,
   * @param {Function}  the function to call at the completion,
   * @returns {}        -,
   * @since 0.0.7
   */
  run: function run(el, properties, easing, duration, delay, callback) {
    var props = this.getProps(el, properties),
        elem = el;
    var lapseOfTime = 0;
    var timer = setInterval(function () {
      lapseOfTime += delay;

      if (lapseOfTime > duration) {
        clearInterval(timer);
        if (callback) callback();
      } // easing:


      for (var i = 0; i < props.name.length; i++) {
        elem.style[props.name[i]] = easing(lapseOfTime, props[props.name[i]].initial, props[props.name[i]].change, duration) + props[props.name[i]].suffix;
      }
    }, delay);
  },

  /**
   * The default easing method (if PicoQ.easing.e() aren't provided).
   *
   * @function (arg1, arg2, arg3, arg4)
   * @private
   * @param {Number}    the current lapse time,
   * @param {Number}    the initial CSS property value,
   * @param {Number}    the difference between the final and the initial value,
   * @param {Number}    the animation duration,
   * @returns {Number}  returns the value of the CSS property at the current lapse time,
   * @since 0.0.7
   */

  /* eslint-disable no-mixed-operators */
  swing: function swing(t, b, c, d) {
    return c * (0.5 - Math.cos(t / d * Math.PI) / 2) + b;
  }
};
/* eslint-enable no-underscore-dangle */

exports.default = _default;
module.exports = exports.default;

},{"./overslash":4,"./utilities":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* global */

/* eslint one-var: 0 */
// -- Vendor modules
// -- Local modules
// -- Global constants (in the scope of this module)
// -- Public Methods -----------------------------------------------------------
var _default = {
  /**
   * Is a given value a string?
   *
   * @function (arg1)
   * @private
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.7
   */
  isString: function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
  },

  /**
   * Is a given value a number?
   *
   * @function (arg1)
   * @private
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.7
   */
  isNumber: function isNumber(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
  },

  /**
   * Is a given variable a literal object?
   *
   * @function (arg1)
   * @private
   * @param {Object}    the object to test,
   * @returns {Boolean} returns true or false,
   * @since 0.0.7
   */
  isLiteralObject: function isLiteralObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },

  /**
   * Is a given variable a function?
   *
   * @function (arg1)
   * @private
   * @param {Object}    the object to test,
   * @returns {Boolean} returns true or false,
   * @since 0.0.7
   */
  isFunction: function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  }
};
exports.default = _default;
module.exports = exports.default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _overslash = _interopRequireDefault(require("./overslash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global */

/* eslint one-var: 0, semi-style: 0 */
// -- Vendor modules
// -- Local modules
// -- Global constants (in the scope of this module)
// -- Public Methods -----------------------------------------------------------
var _default = {
  /**
   * Normalizes the CSS properties.
   * (replace '-' between composite name by camelcase style).
   * Ex: font-size -> fontSize
   *
   * @function (arg1)
   * @private
   * @param {String}    the CSS property name,
   * @returns {String}  the normalized CSS property name,
   * @since 0.0.7
   */
  normalizeCssPropertyName: function normalizeCssPropertyName(name) {
    var arr = _overslash.default.isString(name) ? name.split('-') : [];
    var normalized = ''; // Convert name with '-' (ex.: 'font-size' to 'fontSize'):

    for (var i = 0; i < arr.length; i++) {
      if (i === 0) {
        normalized += arr[i];
      } else {
        normalized += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
    }

    return normalized;
  }
};
exports.default = _default;
module.exports = exports.default;

},{"./overslash":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("./component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// -- Global constants (in the scope of this module)
// -- Private Functions --------------------------------------------------------

/**
 * Returns the path of the matching Web Component.
 *
 * @function ()
 * @private
 * @param {Object}    the view object,
 * @param {String}    the tag defining a Web Component
 * @returns {Object}  the path of the matching Web Component,
 */
var explore = function explore(view, tag) {
  if (view.cList && view.cList[tag]) {
    return view;
  }

  var keys = Object.keys(view);

  for (var i = 0; i < keys.length; i++) {
    if (view[keys[i]].cList) {
      if (view[keys[i]].cList[tag]) {
        return view[keys[i]];
      }

      if (view[keys[i]].components) {
        return explore(view[keys[i]].components, tag);
      }
    }
  }

  return null;
};
/**
 * Attaches events to the rendered components.
 *
 * @function (arg1)
 * @private
 * @param {Object}    the view object,
 * @returns {}        -,
 */


var attachEvents = function attachEvents(view) {
  /* eslint-disable no-unused-expressions */
  if (view.cList) {
    var keys = Object.keys(view.cList);
    var fn;

    for (var i = 0; i < keys.length; i++) {
      if (!view.components) {
        // Extract components at the first level:
        fn = view[keys[i].replace(/[^a-zA-z0-9]/g, '')];
      } else {
        // Extract components at levels n + 1:
        fn = view.components[keys[i].replace(/[^a-zA-z0-9]/g, '')];
      } // Run Component events function:


      fn.evented; // Process sub components recursively:

      attachEvents(fn);
    }
  }
};
/* eslint-enable no-unused-expressions */

/**
 * Code reused from Babel
 */


var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;

      if ('value' in descriptor) {
        descriptor.writable = true;
      }

      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) {
      defineProperties(Constructor.prototype, protoProps);
    }

    if (staticProps) {
      /* istanbul ignore next */
      defineProperties(Constructor, staticProps);
    }

    return Constructor;
  };
}();
/**
 * Code reused from Babel
 */


var _possibleConstructorReturn = function _possibleConstructorReturn(self, call) {
  if (!self) {
    /* istanbul ignore next */
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === 'object' || typeof call === 'function') ? call : self;
};
/**
 * Code reused from Babel
 */


var _inherits = function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    /* istanbul ignore next */
    throw new TypeError("Super expression must either be null or a function, not ".concat(_typeof(superClass)));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (superClass) {
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
};
/**
 * Code reused from Babel
 */


var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    /* istanbul ignore next */
    throw new TypeError('Cannot call a class as a function');
  }
};
/**
 * Code reused from Babel
 */


var _subClass = function _subClass(SuperClass, m) {
  function SubClass() {
    _classCallCheck(this, SubClass);

    return _possibleConstructorReturn(this, (SubClass.__proto__ || Object.getPrototypeOf(SubClass)).apply(this, arguments));
  }

  _inherits(SubClass, SuperClass);

  _createClass(SubClass, m);

  return SubClass;
}; // -- Public Methods -----------------------------------------------------------

/**
* This library renders the View in the DOM.
*
* @namespace Vizu
*/


var Vizu = {
  /**
   * Returns the version of this library.
   *
   * @method ()
   * @public
   * @param {}          -,
   * @returns {String}  returns the version of this library,
   */
  version: function version() {
    return '0.0.10';
  },

  /**
   * Renders the View in the DOM.
   *
   * @method (arg1, arg2, arg3)
   * @public
   * @param {String}    the aggregated web components,
   * @param {Object}    the list of web components and their reference,
   * @param {Object}    the DOM element where the view (the aggregate of web components) is inserted,
   * @returns {Object}  returns the view object,
   * @since 0.0.0
   */
  render: function render(template, cList, el) {
    var keys = Object.prototype.toString.call(cList) === '[object Object]' ? Object.keys(cList) : [],
        view = {};
    var t; // Return null if the template is not a string:

    if (typeof template !== 'string') {
      return null;
    } // If no components, render the template as is:


    if (!cList) {
      if (el) {
        el.innerHTML = template;
      } else {
        Vizu.vdom ? Vizu.vdom.window.document.body.innerHTML += template : document.body.innerHTML += template;
      }

      return null;
    } // This view includes components, render them:


    t = template;

    for (var i = 0; i < keys.length; i++) {
      var c = new cList[keys[i]]();
      t = t.replace(keys[i], c.rendered);
      view[keys[i].replace(/[^a-zA-z0-9]/g, '')] = c;
    } // Attach cList:


    view.cList = keys.length > 0 ? cList : null; // Fill the DOM:

    if (el) {
      el.innerHTML = t;
    } else {
      el = Vizu.vdom ? Vizu.vdom.window.document.body : document.body; // Attach the component to the body as the first child:

      el.innerHTML = t + el.innerHTML;
    } // Attach event(s)
    // parse all components and for each component execute evented!


    attachEvents(view); // Attach parent element:

    view.el = el; // Return the rendered object (with a reference to all the web components):

    return view;
  },

  /**
   * Replaces a component with another component having the same tag.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}    the view object,
   * @param {Object}    the new component ({ '<Aaa />': 'new class' }),
   * @returns {}        -,
   * @since 0.0.0
   */
  replace: function replace(view, component) {
    var id, type; // Check that view is an object with, at least, the properties cList and el:

    if (Object.prototype.toString.call(view) !== '[object Object]' || !view.cList || !view.el) {
      return;
    } // Check that component is an object:


    if (Object.prototype.toString.call(component) !== '[object Object]') {
      return;
    } // Process the new component:


    var newctag = Object.keys(component)[0];
    var newcname = newctag.replace(/[^a-zA-z0-9]/g, '');
    var newc = new component[newctag](); // Check if a component with the same name already exists in the view:

    var path = explore(view, newctag);

    if (path) {
      // Get its id and remove it:
      if (path[newcname]) {
        id = path[newcname].id;
        path[newcname] = null;
        type = 1;
      } else {
        id = path.components[newcname].id;
        path.components[newcname] = null;
        type = 2;
      }

      path.cList[newctag] = null; // Get its id and clear it:

      var wrapper = Vizu.vdom ? Vizu.vdom.window.document.createElement('div') : document.createElement('div');
      var oldNode = Vizu.vdom ? Vizu.vdom.window.document.getElementById(id) : document.getElementById(id);
      wrapper.innerHTML = newc.rendered;
      oldNode.parentNode.replaceChild(wrapper.firstChild, oldNode); // Attach the new node to view:

      if (type === 1) {
        path[newcname] = newc;
      } else {
        path.components[newcname] = newc;
      }

      path.cList[newctag] = component[newctag];
    }
  },

  /**
   * Extends the class Component.
   *
   * @method (arg1)
   * @public
   * @param {Object}    the methods to add to Component,
   * @returns {Object}  returns the extended class component,
   * @since 0.0.3
   */
  createClass: function createClass(methods) {
    // Check that methods is an object:
    if (Object.prototype.toString.call(methods) !== '[object Object]') {
      return null;
    } // Extract keys:


    var keys = Object.keys(methods);
    var o = [];

    for (var i = 0; i < keys.length; i++) {
      o.push({
        key: keys[i],
        value: methods[keys[i]]
      });
    }

    return _subClass(_component.default, o);
  }
};
var _default = Vizu;
exports.default = _default;
module.exports = exports.default;

},{"./component":2}]},{},[1])(1)
});

//# sourceMappingURL=vizu.js.map
