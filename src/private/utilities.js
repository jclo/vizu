/* global */
/* eslint one-var: 0, semi-style: 0 */

// -- Vendor modules

// -- Local modules
import _ from './overslash';

// -- Global constants (in the scope of this module)


// -- Public Methods -----------------------------------------------------------

export default {

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
  normalizeCssPropertyName(name) {
    const arr = _.isString(name) ? name.split('-') : []
        ;

    let normalized = ''
      ;

    // Convert name with '-' (ex.: 'font-size' to 'fontSize'):
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        normalized += arr[i];
      } else {
        normalized += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
    }
    return normalized;
  },
};
