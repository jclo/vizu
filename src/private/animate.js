/* global */
/* eslint one-var: 0, semi-style: 0, prefer-destructuring: 0 */

// -- Vendor modules

// -- Local modules
import _ from './overslash';
import u from './utilities';

// -- Global constants (in the scope of this module)


// -- Public Methods -----------------------------------------------------------

export default {

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
  extractArgs(...arg) {
    const nb = arg[0].length
        , args = arg[0]
        ;

    let duration
      , easing
      , callback
      ;

    switch (nb) {
      case 0:
        break;

      case 1:
        if (_.isNumber(args[0]) || args[0] === 'fast' || args[0] === 'slow') {
          duration = args[0];
        } else if (_.isString(args[0])) {
          easing = args[0];
        } else if (_.isFunction(args[0])) {
          callback = args[0];
        }
        break;

      case 2:
        if (_.isNumber(args[0]) || args[0] === 'fast' || args[0] === 'slow') {
          duration = args[0];
          if (_.isString(args[1])) {
            easing = args[1];
          } else if (_.isFunction(args[1])) {
            callback = args[1];
          }
        } else if (_.isString(args[0])) {
          easing = args[0];
          if (_.isFunction(args[1])) {
            callback = args[1];
          }
        }
        break;

      case 3:
        if (_.isNumber(args[0]) || args[0] === 'fast' || args[0] === 'slow') {
          duration = args[0];
        }
        if (_.isString(args[1])) {
          easing = args[1];
        }
        if (_.isFunction(args[2])) {
          callback = args[2];
        }
        break;

      /* istanbul ignore next */
      default:
        break;
    }
    return {
      duration,
      easing,
      callback,
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
  getProps(el, properties) {
    const keys = Object.keys(properties)
        , props = {}
        , names = []
        ;

    let name
      , i
      ;

    // Parse the properties:
    for (i = 0; i < keys.length; i++) {
      // Normalize the name of the property:
      name = u.normalizeCssPropertyName(keys[i]);
      // Check it is a valid CSS property:
      if (el.style[name]) {
        names.push(name);
        props[name] = {
          initial: parseFloat(el.style[name], 10),
          change: parseFloat(properties[keys[i]]) - parseFloat(el.style[name]),
          suffix: el.style[name].replace(/[0-9.]/g, ''),
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
  run(el, properties, easing, duration, delay, callback) {
    const props = this.getProps(el, properties)
        , elem = el
        ;

    let lapseOfTime = 0
      ;

    const timer = setInterval(() => {
      lapseOfTime += delay;
      if (lapseOfTime > duration) {
        clearInterval(timer);
        if (callback) callback();
      }
      // easing:
      for (let i = 0; i < props.name.length; i++) {
        elem.style[props.name[i]] = easing(
          lapseOfTime,
          props[props.name[i]].initial,
          props[props.name[i]].change,
          duration,
        ) + props[props.name[i]].suffix;
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
  swing(t, b, c, d) {
    return c * (0.5 - Math.cos(t / d * Math.PI) / 2) + b;
  }, /* eslint-enable no-mixed-operators */
}; /* eslint-enable no-underscore-dangle */
