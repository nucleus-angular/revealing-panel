module.exports = {
  name: 'revealing panel',

  //need to wait for dalekjs action moveTo to be included in stable build
  /*'should show content on mouseenter': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .moveTo('[data-ut="hover"] .handle')
    .wait(500)
      .assert.visible('[data-ut="hover"] .content', 'content is visible')
    .done();
  },

  'should hide content on mouseleave': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .moveTo('[data-ut="hover"] .handle')
    //need to make sure the mouse enter the content area in order for the mouseleave event to be triggered
    .moveTo('[data-ut="hover"] .content')
    .wait(500)
    .moveTo('body')
    .wait(500)
      .assert.notVisible('[data-ut="hover"] .content', 'content is not visible')
    .done();
  },*/

  'should open from the right by default': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="defaults"] .handle')
      .assert.visible('[data-ut="defaults"] .content', 'content is visible')
      .assert.css('[data-ut="defaults"] .content', 'top', '0px', 'top is 0')
      .assert.css('[data-ut="defaults"] .content', 'right', '0px', 'right is 0')
      .assert.css('[data-ut="defaults"] .content', 'bottom', '0px', 'bottom is 0')
      .assert.css('[data-ut="defaults"] .content', 'left', 'auto', 'left is auto')
    .done();
  },

  'should open from the left': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="left"] .handle')
      .assert.visible('[data-ut="left"] .content', 'content is visible')
      .assert.css('[data-ut="left"] .content', 'top', '0px', 'top is 0')
      .assert.css('[data-ut="left"] .content', 'right', 'auto', 'right is auto')
      .assert.css('[data-ut="left"] .content', 'bottom', '0px', 'bottom is 0')
      .assert.css('[data-ut="left"] .content', 'left', '0px', 'left is 0')
    .done();
  },

  'should open from the right': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="right"] .handle')
      .assert.visible('[data-ut="right"] .content', 'content is visible')
      .assert.css('[data-ut="right"] .content', 'top', '0px', 'top is 0')
      .assert.css('[data-ut="right"] .content', 'right', '0px', 'right is 0')
      .assert.css('[data-ut="right"] .content', 'bottom', '0px', 'bottom is 0')
      .assert.css('[data-ut="right"] .content', 'left', 'auto', 'left is auto')
    .done();
  },

  'should open from the top': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="top"] .handle')
      .assert.visible('[data-ut="top"] .content', 'content is visible')
      .assert.css('[data-ut="top"] .content', 'top', '0px', 'top is 0')
      .assert.css('[data-ut="top"] .content', 'right', '0px', 'right is 0')
      .assert.css('[data-ut="top"] .content', 'bottom', 'auto', 'bottom is auto')
      .assert.css('[data-ut="top"] .content', 'left', '0px', 'left is 0')
    .done();
  },

  'should open from the bottom': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="bottom"] .handle')
      .assert.visible('[data-ut="bottom"] .content', 'content is visible')
      .assert.css('[data-ut="bottom"] .content', 'top', 'auto', 'top is auto')
      .assert.css('[data-ut="bottom"] .content', 'right', '0px', 'right is 0')
      .assert.css('[data-ut="bottom"] .content', 'bottom', '0px', 'bottom is 0')
      .assert.css('[data-ut="bottom"] .content', 'left', '0px', 'left is 0')
    .done();
  },

  'should open in the center': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="center"] .handle')
    .wait(300)
      .assert.visible('[data-ut="center"] .content', 'content is visible')
      .assert.css('[data-ut="center"] .content', 'top', '476px', 'top is 476px')
      .assert.css('[data-ut="center"] .content', 'right', 'auto', 'right is auto')
      .assert.css('[data-ut="center"] .content', 'bottom', 'auto', 'bottom is auto')
      .assert.css('[data-ut="center"] .content', 'left', '640px', 'left is 640px')
    .done();
  },

  'should close on escape key': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="close-on-escape"] .handle')
    .sendKeys('body', '\uE00C')
    .wait(500)
      .assert.notVisible('[data-ut="close-on-escape"] .content', 'content is not visible')
    .done();
  },

  'should not close on escape key': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="dont-close-on-escape"] .handle')
    .sendKeys('body', '\uE00C')
    .wait(500)
      .assert.visible('[data-ut="dont-close-on-escape"] .content', 'content is visible')
    .done();
  },

  'should close on clicking overlay': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="close-on-overlay-click"] .handle')
    .wait(500)
    .click('[data-ut="close-on-overlay-click"] .site-overlay')
    .wait(500)
      .assert.notVisible('[data-ut="close-on-overlay-click"] .content', 'content is not visible')
    .done();
  },

  'should not close on click overlay': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="dont-close-on-overlay-click"] .handle')
    .wait(500)
    .click('[data-ut="dont-close-on-overlay-click"] .site-overlay')
    .wait(500)
      .assert.visible('[data-ut="dont-close-on-overlay-click"] .content', 'content is not visible')
    .done();
  },

  'should has overlay': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="has-overlay"] .handle')
    .wait(300)
      .assert.visible('[data-ut="has-overlay"] .site-overlay', 'has overlay')
    .done();
  },

  'should not have overlay': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="no-overlay"] .handle')
    .wait(300)
      .assert.doesntExist('[data-ut="no-overlay"] .site-overlay', 'no overlay')
    .done();
  },

  'should be able to load content for revealing panel from an external template': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="content-external-template"] .handle')
    .wait(300)
      .assert.text('[data-ut="content-external-template"] .content', 'This is from an external file', 'content loaded from external template')
    .done();
  }
}