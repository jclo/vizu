/* global document */
/* eslint indent: ["error", 2, { "VariableDeclarator": { "var": 1, "let": 1, "const": 2 } }] */
/* eslint one-var: 0, no-param-reassign: 0, max-len: [1, 130],
  no-unused-expressions: ["error", { "allowTernary": true }], no-underscore-dangle: 0,
  no-proto: 1, prefer-rest-params: 1, semi-style: 0, prefer-destructuring: 0 */

// -- Vendor modules

// -- Local modules
import Component from './component';

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
const explore = function(view, tag) {
  if (view.cList && view.cList[tag]) {
    return view;
  }
  const keys = Object.keys(view);
  for (let i = 0; i < keys.length; i++) {
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
const attachEvents = function(view) {
  /* eslint-disable no-unused-expressions */
  if (view.cList) {
    const keys = Object.keys(view.cList);
    let fn;

    for (let i = 0; i < keys.length; i++) {
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
const _createClass = (function() {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true;
      if ('value' in descriptor) {
        descriptor.writable = true;
      }
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) {
      defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
      /* istanbul ignore next */
      defineProperties(Constructor, staticProps);
    }
    return Constructor;
  };
}());

/**
 * Code reused from Babel
 */
const _possibleConstructorReturn = function(self, call) {
  if (!self) {
    /* istanbul ignore next */
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
};

/**
 * Code reused from Babel
 */
const _inherits = function(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    /* istanbul ignore next */
    throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });

  if (superClass) {
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
};

/**
 * Code reused from Babel
 */
const _classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    /* istanbul ignore next */
    throw new TypeError('Cannot call a class as a function');
  }
};

/**
 * Code reused from Babel
 */
const _subClass = function(SuperClass, m) {
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
const Vizu = {

  /**
   * Returns the version of this library.
   *
   * @method ()
   * @public
   * @param {}          -,
   * @returns {String}  returns the version of this library,
   */
  version() {
    return '{{lib:version}}';
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
  render(template, cList, el) {
    const keys = Object.prototype.toString.call(cList) === '[object Object]' ? Object.keys(cList) : []
        , view = {}
        ;
    let t;

    // Return null if the template is not a string:
    if (typeof template !== 'string') {
      return null;
    }

    // If no components, render the template as is:
    if (!cList) {
      if (el) {
        el.innerHTML = template;
      } else {
        Vizu.vdom
          ? (Vizu.vdom.window.document.body.innerHTML += template)
          : (document.body.innerHTML += template);
      }
      return null;
    }

    // This view includes components, render them:
    t = template;
    for (let i = 0; i < keys.length; i++) {
      const c = new cList[keys[i]]();
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
      // Attach the component to the body as the first child:
      el.innerHTML = t + el.innerHTML;
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
  replace(view, component) {
    let id
      , type
      ;

    // Check that view is an object with, at least, the properties cList and el:
    if (Object.prototype.toString.call(view) !== '[object Object]' || !view.cList || !view.el) {
      return;
    }

    // Check that component is an object:
    if (Object.prototype.toString.call(component) !== '[object Object]') {
      return;
    }

    // Process the new component:
    const newctag = Object.keys(component)[0];
    const newcname = newctag.replace(/[^a-zA-z0-9]/g, '');
    const newc = new component[newctag]();

    // Check if a component with the same name already exists in the view:
    const path = explore(view, newctag);
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
      const wrapper = Vizu.vdom
        ? Vizu.vdom.window.document.createElement('div')
        : document.createElement('div');

      const oldNode = Vizu.vdom
        ? Vizu.vdom.window.document.getElementById(id)
        : document.getElementById(id);

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
  createClass(methods) {
    // Check that methods is an object:
    if (Object.prototype.toString.call(methods) !== '[object Object]') {
      return null;
    }

    // Extract keys:
    const keys = Object.keys(methods);
    const o = [];
    for (let i = 0; i < keys.length; i++) {
      o.push({
        key: keys[i],
        value: methods[keys[i]],
      });
    }

    return _subClass(Component, o);
  },
};

export default Vizu;
