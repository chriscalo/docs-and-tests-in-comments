/**
 * This is a description
 *
 * Can you believe it?
 *
 * ```js
 * isInteger(5); // => true
 * ```
 */


/**
 * A quite wonderful function.
 * @param {object} - privacy gown
 * @param {object} - security
 * @returns {survival}
 */
function protection(cloak, dagger) {
  
}

/**
 * This is a description
 *
 * Can you believe it?
 *
 * ```js
 * isInteger(5); // => true
 * ```
 */
function foo() {
}

/**
 * @private
 * @example
 * isInteger(5)     // => true
 * isInteger(5.0)   // => true
 * isInteger(-5)    // => true
 * isInteger(3.14)  // => false
 * isInteger('foo') // => false
 * isInteger(NaN)   // => false
 */
function isInteger(x) {
  return x === Math.floor(x);
}

/**
 * @private
 * @benchmarks
 * isInteger(123456789)     // using Math.floor
 * isIntegerLike(123456789) // using RegExp: ^\d+$
 */
function isIntegerLike(x) {
  return (/^\d+$/).test(String(x));
}
