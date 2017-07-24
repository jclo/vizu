(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Vizu = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _component = require('./src/component');

var _component2 = _interopRequireDefault(_component);

var _vizu = require('./src/vizu');

var _vizu2 = _interopRequireDefault(_vizu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Component: _component2.default, Vizu: _vizu2.default };
module.exports = exports['default'];

},{"./src/component":2,"./src/vizu":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global document */
/* eslint indent: ["error", 2, { "VariableDeclarator": { "var": 1, "let": 1, "const": 2 } }] */
/* eslint one-var: 0 */
// -- Vendor modules

// -- Local modules


var _vizu = require('./vizu');

var _vizu2 = _interopRequireDefault(_vizu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -- Global constants (in the scope of this module)

// -- Global variables (in the scope of this module)


// -- Private Functions --------------------------------------------------------


// -- Public Methods -----------------------------------------------------------

/**
* This class defines the web component.
*
* @namespace vizu
*/
var Component = function () {
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
    this.id = 'i' + Math.random().toString(36).substr(2, 7);
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
    key: 'getInitialState',
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
    key: '$',
    value: function $(el) {
      var that = this;

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
      var getElement = function getElement() {
        if (el) {
          // Returns the the first element that matches the selector(s):
          return _vizu2.default.vdom ? _vizu2.default.vdom.window.document.querySelector('#' + that.id).querySelector(el)
          /* istanbul ignore next */
          : document.querySelector('#' + that.id).querySelector(el);
        }
        // Return the entire 'web component':
        return _vizu2.default.vdom ? _vizu2.default.vdom.window.document.querySelector('#' + that.id)
        /* istanbul ignore next */
        : document.querySelector('#' + that.id);
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
        return getElement().classList;
      };

      /**
       * Adds a class name to the element.
       *
       * @method (arg1)
       * @public
       * @param {String}    the class name to add,
       * @returns {}        -,
       * @since 0.0.0
       */
      var addClass = function addClass(className) {
        getElement().classList.add(className);
      };

      /**
       * Removes a class name to the element.
       *
       * @method (arg1)
       * @public
       * @param {String}    the class name to remove,
       * @returns {}        -,
       * @since 0.0.0
       */
      var removeClass = function removeClass(className) {
        getElement().classList.remove(className);
      };

      /**
       * Toggles a class name for the element.
       *
       * @method (arg1)
       * @public
       * @param {String}    the class name to add/remove,
       * @returns {}        -,
       * @since 0.0.0
       */
      var toggleClass = function toggleClass(className) {
        getElement().classList.toggle(className);
      };

      /**
       * Gets/Sets the HTML contents of the element,
       *
       * @method (arg1)
       * @public
       * @param {String}    the html contents to add,
       * @returns {}        -,
       * @since 0.0.0
       */
      var html = function html(htmlstring) {
        if (htmlstring) {
          getElement().innerHTML = htmlstring;
        }
        return getElement().innerHTML;
      };

      /**
       * Gets/Sets the text contents of the element,
       *
       * @method (arg1)
       * @public
       * @param {String}    the text contents to add,
       * @returns {}        -,
       * @since 0.0.0
       */
      var text = function text(texte) {
        if (texte) {
          getElement().textContent = texte;
        }
        return getElement().textContent;
      };

      /**
       * Gets/Sets the style attribute of the element,
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the style attribute,
       * @param {String}    the style attribute value,
       * @returns {String}  undefined or the style attribute value,
       * @since 0.0.3
       */
      var css = function css(styleAttr, value) {
        var arr = typeof styleAttr === 'string' ? styleAttr.split('-') : [];
        var attr = '';

        // Convert style attribute name with '-' (ex.: 'font-size' to 'fontSize'):
        for (var i = 0; i < arr.length; i++) {
          if (i === 0) {
            attr += arr[i];
          } else {
            attr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
          }
        }

        if (!value) {
          // Get attribute:
          return getElement().style[attr];
        }

        // Set attribute:
        getElement().style[attr] = value;
        return undefined;
      };

      /**
       * Removes all the childs of the current node.
       *
       * @method ()
       * @public
       * @param {}          -,
       * @returns {}        -,
       * @since 0.0.4
       */
      var empty = function empty() {
        var node = getElement();
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
      };

      /**
       * Appends an HTML string after the last child of the current node.
       *
       * @method (arg1)
       * @public
       * @param {String}    an HTML string,
       * @returns {}        -,
       * @since 0.0.4
       */
      var append = function append(htmlstring) {
        getElement().insertAdjacentHTML('beforeend', htmlstring);
      };

      /**
       * Attachs an event listener to the current node.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the DOM event string,
       * @param {Function}  the listner function,
       * @returns {}        -,
       * @since 0.0.5
       */
      var on = function on(event, listener) {
        getElement().addEventListener(event, listener);
      };

      /**
       * Removes an event listener from the current node.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the DOM event string,
       * @param {Function}  the listner function,
       * @returns {}        -,
       * @since 0.0.5
       */
      var off = function off(event, listener) {
        getElement().removeEventListener(event, listener);
      };

      return {
        id: getElement() ? getElement().id : null,
        getElement: getElement,
        getClassList: getClassList,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        html: html,
        text: text,
        css: css,
        empty: empty,
        append: append,
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
    key: 'events',
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
    /* istanbul ignore next */

  }, {
    key: 'render',
    value: function render() {
      return '<div>' + this.id + '</div>';
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
    key: 'rendered',
    get: function get() {
      var t = void 0;
      // Initializes:
      this.getInitialState();
      // Add an unique ID to this component:
      // let t = this.render().replace(/<div>/, `<div id="${this.id}">`);
      var co = this.render();
      if (co.match(/^\s*<div/)) {
        t = co.replace(/^\s*<div/, '<div id= "' + this.id + '"');
      } else if (co.match(/^\s*<header/)) {
        t = co.replace(/^\s*<header/, '<header id= "' + this.id + '"');
      } else if (co.match(/^\s*<footer/)) {
        t = co.replace(/^\s*<footer/, '<footer id= "' + this.id + '"');
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
      }
      // Return the rendered web component:
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
    key: 'evented',
    get: function get() {
      this.events();
    }
  }]);

  return Component;
}();

exports.default = Component;
module.exports = exports['default'];

},{"./vizu":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global document */
/* eslint indent: ["error", 2, { "VariableDeclarator": { "var": 1, "let": 1, "const": 2 } }] */
/* eslint one-var: 0, no-param-reassign: 0, max-len: [1, 130],
  no-unused-expressions: ["error", { "allowTernary": true }], no-underscore-dangle: 0,
  no-proto: 1, prefer-rest-params: 1 */

// -- Vendor modules

// -- Local modules


var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Global constants (in the scope of this module)

// -- Global variables (in the scope of this module)


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
    var fn = void 0;

    for (var i = 0; i < keys.length; i++) {
      if (!view.components) {
        // Extract components at the first level:
        fn = view[keys[i].replace(/[^a-zA-z0-9]/g, '')];
      } else {
        // Extract components at levels n + 1:
        fn = view.components[keys[i].replace(/[^a-zA-z0-9]/g, '')];
      }
      // Run Component events function:
      fn.evented;
      // Process sub components recursively:
      attachEvents(fn);
    }
  }
}; /* eslint-enable no-unused-expressions */

/**
 * Code reused from Babel
 */
var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;
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
  return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === 'object' || typeof call === 'function') ? call : self;
};

/**
 * Code reused from Babel
 */
var _inherits = function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    /* istanbul ignore next */
    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    } });

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
};

// -- Public Methods -----------------------------------------------------------

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
    return '0.0.5';
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
    var t = void 0;

    // Return null if the template is not a string:
    if (typeof template !== 'string') {
      return null;
    }

    // If no components, render the template as is:
    if (!cList) {
      if (el) {
        el.innerHTML = template;
      } else {
        Vizu.vdom ? Vizu.vdom.window.document.body.innerHTML += template : document.body.innerHTML += template;
      }
      return null;
    }

    // This view includes components, render them:
    t = template;
    for (var i = 0; i < keys.length; i++) {
      var c = new cList[keys[i]]();
      t = t.replace(keys[i], c.rendered);
      view[keys[i].replace(/[^a-zA-z0-9]/g, '')] = c;
    }
    // Attach cList:
    view.cList = keys.length > 0 ? cList : null;

    // Fill the DOM:
    if (el) {
      el.innerHTML = t;
    } else {
      el = Vizu.vdom ? Vizu.vdom.window.document.body : document.body;
      el.innerHTML = +t;
    }

    // Attach event(s)
    // parse all components and for each component execute evented!
    attachEvents(view);

    // Attach parent element:
    view.el = el;

    // Return the rendered object (with a reference to all the web components):
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
    var id = void 0,
        type = void 0;

    // Check that view is an object with, at least, the properties cList and el:
    if (Object.prototype.toString.call(view) !== '[object Object]' || !view.cList || !view.el) {
      return;
    }

    // Check that component is an object:
    if (Object.prototype.toString.call(component) !== '[object Object]') {
      return;
    }

    // Process the new component:
    var newctag = Object.keys(component)[0];
    var newcname = newctag.replace(/[^a-zA-z0-9]/g, '');
    var newc = new component[newctag]();

    // Check if a component with the same name already exists in the view:
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
      path.cList[newctag] = null;

      // Get its id and clear it:
      var wrapper = Vizu.vdom ? Vizu.vdom.window.document.createElement('div') : document.createElement('div');

      var oldNode = Vizu.vdom ? Vizu.vdom.window.document.getElementById(id) : document.getElementById(id);

      wrapper.innerHTML = newc.rendered;
      oldNode.parentNode.replaceChild(wrapper.firstChild, oldNode);

      // Attach the new node to view:
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
    }

    // Extract keys:
    var keys = Object.keys(methods);
    var o = [];
    for (var i = 0; i < keys.length; i++) {
      o.push({
        key: keys[i],
        value: methods[keys[i]]
      });
    }

    return _subClass(_component2.default, o);
  }
};

exports.default = Vizu;
module.exports = exports['default'];

},{"./component":2}]},{},[1])(1)
});

//# sourceMappingURL=vizu.js.map
