/* global */
/* eslint one-var: 0 */

// -- Vendor modules

// -- Local modules

// -- Global constants (in the scope of this module)


// -- Public Methods -----------------------------------------------------------

export default {

  /**
   * Is a given value a string?
   *
   * @function (arg1)
   * @private
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.7
   */
  isString(obj) {
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
  isNumber(obj) {
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
  isLiteralObject(obj) {
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
  isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  },
};
