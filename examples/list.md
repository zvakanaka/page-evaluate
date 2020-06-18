# Send an Email When a New Item is Added to a List

```javascript
const { window } = require('page-evaluate');
const { write, exists } = require('fs-sync-utils')
const { send } = require('emailjs-gmail')(process.env.GMAIL_USERNAME, process.env.GMAIL_PASSWORD);

const url = process.env.SCRAPE_URL;
const emailToAddress = process.env.EMAIL_TO;
// e.g. contents: [{href: 'https://...', name: 'Example 1'}, ...]
const listItemsFileName = process.env.LIST_ITEMS_FILENAME || './list-items.json';
const listItemsQuerySelector = process.env.LIST_ITEM_QUERY_SELECTOR;
const listItemLinkSelector = process.env.LINK_QUERY_SELECTOR || 'a';

const listItemsFromLastRunFileExists = exists(listItemsFileName);
const listItemsFromLastRun = listItemsFromLastRunFileExists
  ? require(listItemsFileName)
  : [];

window(url).then(({ document }) => {  
  // store list items on page in an array
  const listItems = Array.from(document.querySelectorAll(listItemsQuerySelector))
  .map(el => {
    const a = el.querySelector(listItemLinkSelector);
    let itemUrl = '';
    if (a) {
      const middleSlash = url.endsWith('/') || a.href.startsWith('/')
        ? '' 
        : '/';
      itemUrl = a.href.startsWith('http')
        ? a.href 
        : `${url}${middleSlash}${a.href}`
          .replace('//', '/'); // replace double slash with single slash
    }
    return {
      url: itemUrl,
      title: el.textContent,
      time: new Date().toString() // 1st seen at
    };
  });
  
  // create an array of any list items that were not in the last run
  const newListItems = listItems.filter(newListItem => {
    return !listItemsFromLastRun
      .map(item => item.url)
      .includes(newListItem.url)
  });

  console.log(`${new Date().toString()} - Found ${newListItems.length}/${listItems.length} new list items`)

  // send a message if there are any new items
  if (listItemsFromLastRunFileExists && newListItems.length > 0) {
    send(emailToAddress, `There are ${newListItems.length} new items at ${url}`);
  }

  // overwrite file every time
  write(listItemsFileName, JSON.stringify(listItems, null, 2));
});
