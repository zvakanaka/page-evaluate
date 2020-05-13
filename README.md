Monitor web pages for changes from Node.js

# Examples
 * [Price Change](./examples/price.md)
 * [New List Item](./examples/list.md)

# Window
Get the [jsdom](https://github.com/jsdom/jsdom) `window` object for a web page.

```javascript
const { window } = require('page-evaluate');
```

## Callback
```javascript
window(
  'https://example.com',
  function ({ document }) { // callback function
    const result = document.querySelector('h1').textContent;
    console.log(result); // logs 'Example Domain'
  }
);
```

## Promise
```javascript
window('https://example.com').then(({ document }) => {
  const result = document.querySelector('h1').textContent;
  console.log(result); // logs 'Example Domain'
});
```
## Async/Await
```javascript
const { document } = await window('https://example.com');
const result = document.querySelector('h1').textContent;
console.log(result); // logs 'Example Domain'
```
# Evaluate JavaScript
Evaluates a string of JavaScript on a web page and returns the output.

> Note: Sanitize any input, but this is safe - "fresh copies of all the JavaScript spec-provided globals [are] installed on window" - [jsdom readme](https://github.com/jsdom/jsdom#executing-scripts)

```javascript
const { evaluate } = require('page-evaluate');
```

## Callback
```javascript
evaluate(
  'https://example.com',
  `document.querySelector('h1').textContent`,
  function (result) { // callback function
    console.log(result); // logs 'Example Domain'
  }
);
```
## Promise
```javascript
evaluate('https://example.com',`document.querySelector('h1').textContent`)
  .then((result) => {
    console.log(result); // logs 'Example Domain'
  });
```

## Async/Await
```javascript
const result = await evaluate('https://example.com',
  `document.querySelector('h1').textContent`);

console.log(result); // logs 'Example Domain'
```

# Run Your Program on a Schedule with a Cron Job
Send an [email](./examples/list.md), turn on a light, etc. when a web page changes.
1) Get the path of [Node.js](https://github.com/nvm-sh/nvm#install--update-script) on your system with `$ which node`

2) Edit your cron jobs with: `$ crontab -e`  
(replace `/path/to/node` with the output from step 1)
```bash
NODE_PATH=/path/to/node

# Every 30 minutes (between 7am and 7pm, Mon-Sat)
*/30 7-19 * * 1-6 $NODE_PATH index.js >> /path/to/log.txt
<Put a new line at the end or it will not work>
```

> See [crontab.guru](https://crontab.guru/) for help and examples

# Dependencies
* [body-snatchers](https://github.com/zvakanaka/body-snatchers) (uses either [puppeteer](https://github.com/puppeteer/puppeteer/) or [node-fetch](https://github.com/node-fetch/node-fetch) to get pages)
* [jsdom](https://github.com/jsdom/jsdom)