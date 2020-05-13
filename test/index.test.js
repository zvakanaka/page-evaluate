const { expect } = require('chai');

const { evaluate, window, getWindow } = require('../index');

const BASE_URL = 'http://localhost:7777';
const TEST_PAGE_1 = 'site-list.html';
const TEST_PAGE_2 = 'site-list-single.html';
const TEST_PAGE_3 = 'site-list-none.html';
const TEST_PAGE_4 = 'site-list-several-js.html';

describe('evaluate', () => {
  it('(async) should be able to eval custom javascript on the page then receive the result', async () => {
    const result = await evaluate(`${BASE_URL}/${TEST_PAGE_1}`, 'document.body.textContent');
    expect(typeof result, 'typeof `result` should equal string').to.equal('string');
    
    const expectedStartStr = 'Sites';
    expect(result.trim().startsWith(expectedStartStr), `'result' should start with '${expectedStartStr}'`).to.equal(true);
  });

  it('(callback) should be able to eval custom javascript on the page then receive the result', (done) => {
    evaluate(`${BASE_URL}/${TEST_PAGE_1}`, 'document.body.textContent', function(result) {
      expect(typeof result, 'typeof `result` should equal string').to.equal('string');
      
      const expectedStartStr = 'Sites';
      expect(result.trim().startsWith(expectedStartStr), `'result' should start with '${expectedStartStr}'`).to.equal(true);
      done();
    });
  });
});

describe('window', () => {
  it('(async) should be able to use the document object in Node.js for a given page', async () => {
    const { document } = await window(`${BASE_URL}/${TEST_PAGE_1}`);
    expect(typeof document, 'typeof `document` should equal string').to.equal('object');
    
    const liCount = document.querySelectorAll('li').length;
    expect(liCount >= 2, `'liCount' should be 2 or more`).to.equal(true);
  });

  it('(callback) should be able to use the document object in Node.js for a given page', (done) => {
    getWindow(`${BASE_URL}/${TEST_PAGE_1}`, function({document}) {
      // const { document } = window;
      expect(typeof document, 'typeof `document` should equal string').to.equal('object');
      
      const liCount = document.querySelectorAll('li').length;
      expect(liCount >= 2, `'liCount' should be 2 or more`).to.equal(true);
      done();
    });
  });
});