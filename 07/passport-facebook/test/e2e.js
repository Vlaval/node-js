'use strict';

// java -jar selenium.jar

const wd = require('selenium-webdriver');
const config = require('config');
const By = wd.By;
const assert = require('assert');

describe('facebook', function() {
  let client, app, server;

  before(async () => {
    client = await new wd.Builder()
      .usingServer('http://localhost:4444/wd/hub')
      .forBrowser('chrome')
      .build();

    app = require('..');
    server = app.listen(3000);
  });

  after(async () => {
    server.close();
    await client.quit();
  });

  const isElementPresent = async selector => {
    const elements = await client.findElements(selector);
    return elements.length > 0;
  }

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  it('logs in', async function() {

    await client.get(config.server.siteHost + '/login/facebook');

    await client.findElement(By.id('email')).sendKeys(config.providers.facebook.test.login);
    await client.findElement(By.id('pass')).sendKeys(config.providers.facebook.test.password, wd.Key.RETURN);
    await sleep(2000);
    let needConfirm;
    await client.wait(async function() {
       needConfirm = await isElementPresent(By.name('__CONFIRM__'));
       if (needConfirm) return true;

       let url = await client.getCurrentUrl();
       if (url.startsWith(config.server.siteHost)) {
         return true;
       }
    });
    await sleep(2000);
    if (needConfirm) {
      await client.findElement(By.name('__CONFIRM__')).click();

      await client.wait(async function() {
         let url = await client.getCurrentUrl();
         if (url.startsWith(config.server.siteHost)) {
           return true;
         }
      });
    }
    let el = await isElementPresent(By.css('form[action="/logout"]'));
    await sleep(2000);
    assert(el, true);
  });
});
