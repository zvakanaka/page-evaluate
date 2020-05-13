const { getBody } = require('body-snatchers');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = {
  evaluate,
  getWindow: window,
  window
};

/**
 * Evaluate a string of JavaScript for a web page and return that output.
 * @see https://github.com/jsdom/jsdom#executing-scripts
 * @param {string} url Page to fetch
 * @param {string} evalStr JavaScript string to evaluate against page
 * @param {function} [callback = null] Called with result of evalStr
 * @param {boolean} useJavaScript Whether to fetch page using JavaScript
 * @returns {*} Return value of the evalStr
 * @async
 */
async function evaluate (url, evalStr, callback, useJavaScript) {
  const pageBody = await getBody(url, useJavaScript);

  const { window } = new JSDOM(pageBody, { runScripts: 'outside-only' });
  const evalReturnValue = window.eval(evalStr);

  if (callback) {
    callback(evalReturnValue);
  }

  return evalReturnValue;
}

/**
 * Get the jsdom `window` object for a web page.
 * @param {string} url Page to fetch
 * @param {function} [callback = null] Called with `window` object of the page
 * @param {boolean} useJavaScript Whether to fetch page using JavaScript
 * @returns {*} Return window
 * @async
 */
async function window (url, callback = null, useJavaScript) {
  const pageBody = await getBody(url, useJavaScript);

  const dom = new JSDOM(pageBody);
  const { window } = dom;

  if (callback) {
    callback(window);
  }

  return window;
}
