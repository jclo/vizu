/* global document */
/* eslint indent: ["error", 2, { "VariableDeclarator": { "var": 1, "let": 1, "const": 2 } }] */
/* eslint one-var: 0 */
// -- Vendor modules

// -- Local modules
import Vizu from './vizu';

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
  $(el) {
    const that = this
        , docu = Vizu.vdom ? Vizu.vdom.window.document : document
        ;

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
    const getElement = function() {
      if (el) {
        // Returns the the first element that matches the selector(s):
        return docu.querySelector(`#${that.id}`).querySelector(el);
      }
      // Return the entire 'web component':
      return docu.querySelector(`#${that.id}`);
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
        getElement().innerHTML = xmlString;
        return this;
      }
      return getElement().innerHTML;
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
      const node = getElement();
      while (node.firstChild) {
        node.removeChild(node.firstChild);
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
        getElement().insertAdjacentHTML('beforeend', xmlString);
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
        getElement().insertAdjacentHTML('afterbegin', xmlString);
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
      const elem = getElement();
      if (typeof xmlString === 'string' && elem.id !== that.id) {
        elem.insertAdjacentHTML('afterend', xmlString);
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
      const elem = getElement();
      if (typeof xmlString === 'string' && elem.id !== that.id) {
        getElement().insertAdjacentHTML('beforebegin', xmlString);
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
      const oldChild = getElement()
          , parent   = oldChild.parentNode
          // , index    =  Array.prototype.indexOf.call(parent.children, oldChild)
          , wrapper  = docu.createElement('div')
          ;
      let newChild
        ;

      if (typeof xmlString === 'string' && oldChild.id !== that.id) {
        // Replace the old child by new one:
        wrapper.innerHTML = xmlString;
        newChild = wrapper.firstChild;
        parent.replaceChild(newChild, oldChild);
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
        getElement().textContent = texte;
        return this;
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
        return getElement().style[attr];
      }

      // Set attribute:
      getElement().style[attr] = value;
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
      return getElement().classList;
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
      getElement().classList.add(className);
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
      getElement().classList.remove(className);
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
      getElement().classList.toggle(className);
      return this;
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
        getElement().setAttribute(attribute, value);
        return this;
      }
      return getElement().getAttribute(attribute);
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
        getElement().removeAttribute(attribute);
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
      getElement().addEventListener(event, listener);
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
      getElement().removeEventListener(event, listener);
      return this;
    };

    return {
      id: getElement() ? getElement().id : null,
      getElement,
      html,
      empty,
      append,
      prepend,
      after,
      before,
      replaceWith,
      text,
      css,
      getClassList,
      addClass,
      removeClass,
      toggleClass,
      attr,
      removeAttr,
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
  /* istanbul ignore next */
  render() {
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
    this.events();
  }
}

export default Component;
