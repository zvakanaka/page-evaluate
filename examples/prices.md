# Send an Email When Price Drops Below a Certain Amount

```javascript
const { window } = require('page-evaluate');
const { send } = require('emailjs-gmail')(process.env.GMAIL_USERNAME, process.env.GMAIL_PASSWORD);

const DESIRED_PRICE = 50; 

window('https://example.com').then(({ document }) => {
  // grab the value of the price element on the page
  const price = document.querySelector('.price').textContent;
  // check if the price is low enough
  if (Number(price) <= DESIRED_PRICE) {
    // send an email
    send('5555555555@txt.att.net',
      `Your wildest dream is only $${price} now!`);
  }
});
```
