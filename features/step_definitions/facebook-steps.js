var expect = require( "chai" ).expect;
var until = require( "selenium-webdriver" ).until;


module.exports = function() {
  this.World = require( "../support/world.js" ).World;

  this.When(/^I open facebook$/, function( next ) {
    this.driver.get("http://www.globalsqa.com/demo-site/");
    waitElementToBeLocatedAndVisible("//input", 3000, "Missing").click()
      .then(function() {
        next();
      });
  });

};
