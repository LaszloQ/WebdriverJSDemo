var expect = require( "chai" ).expect;
var until = require( "selenium-webdriver" ).until;


module.exports = function() {
  this.World = require( "../support/world.js" ).World;

  this.When(/^I open facebook$/, function( next ) {
    this.driver.get("https://www.facebook.com/")
    this.driver.sleep(1000)
      .then(function() {
        next();
      });
  });

};
