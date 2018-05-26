/* global document */
/* eslint indent: ["error", 2, { "VariableDeclarator": { "var": 1, "let": 1, "const": 2 } }] */
/* eslint one-var: 0, semi-style: 0 */

// -- Vendor modules

// -- Local modules
import Vizu from './vizu';
import Anim from './private/animate';
import _ from './private/overslash';

// -- Global constants (in the scope of this module)


// -- Public Methods -----------------------------------------------------------

/**
* This class defines the web component.
*
* @namespace vizu
*/
class Component {
/**
 * Creates an unique ID for this component.
 *
 * @constructor ()
 * @public
 * @param {}          -,
 */
  constructor() {
    // Create an unique id for this component:
    this.id = `i${Math.random().toString(36).substr(2, 7)}`;
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
  getInitialState() {
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
  $(selector) {
    const cid = this.id
        , docu = Vizu.vdom ? Vizu.vdom.window.document : document
        ;

    let el;

    /**
     * Select a child element.
     *
     * @method (arg1)
     * @public
     * @param {String}    the selector,
     * @returns {Object}  returns this,
     * @since 0.0.8
     */
    const select = function(sel) {
      if (typeof sel === 'string' && this[0]) {
        const child = this[0].querySelector(sel);
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
    const selectChild = function(n) {
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
    const parent = function() {
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
    const firstParent = function() {
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
    const html = function(xmlString) {
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
    const empty = function() {
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
    const append = function(xmlString) {
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
    const prepend = function(xmlString) {
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
    const after = function(xmlString) {
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
    const before = function(xmlString) {
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
    const replaceWith = function(xmlString) {
      const oldChild = this[0]
          , parento   = oldChild.parentNode
          // , index    =  Array.prototype.indexOf.call(parent.children, oldChild)
          , wrapper  = docu.createElement('div')
          ;
      let newChild
        ;

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
    const text = function(texte) {
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
    const clone = function(deep) {
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
    const insertChildBefore = function(newChild, child) {
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
    const removeChild = function(child) {
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
    const replaceChild = function(newChild, child) {
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
    const children = function() {
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
    const childIndex = function() {
      let child = this[0]
        , index = 0
        ;
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
    const getRect = function() {
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
    const css = function(styleAttr, value) {
      const arr = typeof styleAttr === 'string' ? styleAttr.split('-') : [];
      let attr = '';

      // Convert style attribute name with '-' (ex.: 'font-size' to 'fontSize'):
      for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
          attr += arr[i];
        } else {
          attr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
      }

      if (!value) {
        // Get attribute:
        return this[0].style[attr];
      }

      // Set attribute:
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
    const getClassList = function() {
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
    const addClass = function(className) {
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
    const addClasses = function(classes) {
      if (Array.isArray(classes)) {
        for (let i = 0; i < classes.length; i++) {
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
    const removeClass = function(className) {
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
    const removeClasses = function(classes) {
      if (Array.isArray(classes)) {
        for (let i = 0; i < classes.length; i++) {
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
    const toggleClass = function(className) {
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
    const hasClass = function(className) {
      const list = this[0].classList.value.split(' ');

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
    const attr = function(attribute, value) {
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
    const removeAttr = function(attribute) {
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
    const animate = function(properties, ...args) {
      const DTIME = 400
          , FAST  = 200
          , SLOW  = 600
          , INC   = 10
          , elem  = this[0]
          , delay = INC
          ;

      // Is the argument properties an object?
      if (!_.isLiteralObject(properties)) {
        return this;
      }

      // Extract the optional arguments:
      const argus = Anim.extractArgs(args);

      // Set the duration:
      const duration = _.isNumber(argus.duration)
        ? argus.duration
        : (function(arg) {
          if (arg === 'fast') return FAST;
          if (arg === 'slow') return SLOW;
          return DTIME;
        }(argus.duration));

      // Set the easing (swing only for the time being):
      const easing = (Anim.easing && Anim.easing[argus.easing])
        ? Anim.easing[argus.easing]
        : Anim.swing;

      // Set the callback:
      const callback = argus.callback ? argus.callback : null;

      // Run the animation:
      Anim.run(elem, properties, easing, duration, delay, callback);

      // Test Mode:
      if (Vizu.vdom) {
        this.probe = {
          duration,
          easing: (Anim.easing && Anim.easing[argus.easing]) ? argus.easing : 'swing',
          callback,
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
    const on = function(event, listener) {
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
    const off = function(event, listener) {
      this[0].removeEventListener(event, listener);
      return this;
    };

    // -- Main
    if (selector) {
      // Selects the first element that matches the selector(s):
      el = docu.querySelector(`#${cid}`).querySelector(selector);
    } else {
      // Selects the entire 'web component':
      el = docu.querySelector(`#${cid}`);
    }

    return {
      0: el,
      id: el ? el.id : null,
      select,
      selectChild,
      parent,
      firstParent,
      html,
      empty,
      append,
      prepend,
      after,
      before,
      replaceWith,
      text,
      clone,
      insertChildBefore,
      removeChild,
      replaceChild,
      children,
      childIndex,
      getRect,
      css,
      getClassList,
      addClass,
      addClasses,
      removeClass,
      removeClasses,
      toggleClass,
      hasClass,
      attr,
      removeAttr,
      animate,
      on,
      off,
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
  events() {
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
  render() {
    /* istanbul ignore next */
    return `<div>${this.id}</div>`;
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
  get rendered() {
    let t;
    // Initializes:
    this.getInitialState();
    // Add an unique ID to this component:
    // let t = this.render().replace(/<div>/, `<div id="${this.id}">`);
    const co = this.render();
    if (co.match(/^\s*<div/)) {
      t = co.replace(/^\s*<div/, `<div id= "${this.id}"`);
    } else if (co.match(/^\s*<header/)) {
      t = co.replace(/^\s*<header/, `<header id= "${this.id}"`);
    } else if (co.match(/^\s*<footer/)) {
      t = co.replace(/^\s*<footer/, `<footer id= "${this.id}"`);
    } else {
      t = co;
    }

    if (this.cList) {
      // This component includes components, render them:
      this.components = {};
      const keys = Object.keys(this.cList);
      for (let i = 0; i < keys.length; i++) {
        const c = new this.cList[keys[i]]();
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
  get evented() {
    return this.events();
  }
}

export default Component;
