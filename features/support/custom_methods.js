var expect = require( "chai" ).expect;
var until = require( "selenium-webdriver" ).until;
var driver = require( "../support/world.js" ).getDriver();
var webdriver = require( "selenium-webdriver" );
var datePicker = require( "../support/pages/datePicker" );

var selenium = {

  click: function( xpath ) {
    driver.wait( until.elementIsVisible (
      driver.wait(until.elementLocated (
        webdriver.By.xpath( eval( xpath ) )
      ), 6000, xpath + " was not found" )
    )).click( );
  },


}

module.exports = selenium;
