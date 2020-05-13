# Send an Email When a New Item is Added to a List

```javascript
const { window } = require('page-evaluate');
const { write, exists } = require('fs-sync-utils')
const { send } = require('emailjs-gmail')(process.env.GMAIL_USERNAME, process.env.GMAIL_PASSWORD);

// E.g. contents: [{href: 'https://...', name: 'Example 1'}, ...]
const listItemsFromLastRun = exists('./list-items.json')
  ? require('./list-items.json')
  : [];

const url = 'https://example.com';

window(url).then(({ document }) => {
  // store list items on page in an array
  const listItems = Array.from(document.querySelectorAll('li'))
    .map(li => ({
      href: li.href,
      title: li.textContent,
      time: new Date().toString() 
    }));

  // create an array of any list items that were not in the last run
  const newListItems = listItems.filter(newListItem => {
    return !listItemsFromLastRun
      .map(li => li.href)
      .includes(newListItem.href)
  });

  // send a message if there are any new items
  if (newListItems.length > 0) {
    send('5555555555@txt.att.net',
      `There are ${newListItems.length} new items at ${url}!`);
  }

  // overwrite file every time
  write('./list-items.json', JSON.stringify(listItems, null, 2));
});