/* global document */
/* eslint one-var: 0, no-param-reassign: 0, max-len: [1, 110],
  no-unused-expressions: ["error", { "allowTernary": true }] */

// -- Vendor modules

// -- Local modules

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
      el.innerHTML = +t;
    }
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
};

export default Vizu;
