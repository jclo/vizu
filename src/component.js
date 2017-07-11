/* global document */
/* eslint indent: ["error", 2, { "VariableDeclarator": { "var": 1, "let": 1, "const": 2 } }] */
/* eslint one-var: 0 */
// -- Vendor modules

// -- Local modules
import Vizu from './vizu';

// -- Global constants (in the scope of this module)

// -- Global variables (in the scope of this module)


// -- Private Functions --------------------------------------------------------


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
    const that = this;

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
        return Vizu.vdom
          ? Vizu.vdom.window.document.querySelector(`#${that.id}`).querySelector(el)
          /* istanbul ignore next */
          : document.querySelector(`#${that.id}`).querySelector(el);
      }
      // Return the entire 'web component':
      return Vizu.vdom
        ? Vizu.vdom.window.document.querySelector(`#${that.id}`)
        /* istanbul ignore next */
        : document.querySelector(`#${that.id}`);
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
     * @returns {}        -,
     * @since 0.0.0
     */
    const addClass = function(className) {
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
    const removeClass = function(className) {
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
    const toggleClass = function(className) {
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
    const html = function(htmlstring) {
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
    const text = function(texte) {
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
    const empty = function() {
      const node = getElement();
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
    const append = function(htmlstring) {
      getElement().insertAdjacentHTML('beforeend', htmlstring);
    };

    return {
      id: getElement() ? getElement().id : null,
      getElement,
      getClassList,
      addClass,
      removeClass,
      toggleClass,
      html,
      text,
      css,
      empty,
      append,
    };
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
   * @public
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
}

export default Component;
