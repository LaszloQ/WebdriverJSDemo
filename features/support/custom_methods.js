var expect = require( "chai" ).expect;
var until = require( "selenium-webdriver" ).until;
var driver = require( "../support/world.js" ).getDriver( );
var webdriver = require( "selenium-webdriver" );
var datePicker = require( "../support/pages/datePicker" );
var baseUrl = require( "../support/helper_functions.js" ).baseUrl;

var utils = {

  open: function( url ) {
    driver.get( url );
  },


  expectUrlToEqual: function( expectedUrl ) {
    driver.getCurrentUrl( )
      .then( function ( url ) {
        if ( expectedUrl === "/" ) {
          expect( url ).to.equal( baseUrl( ) );
        } else {
          expect( url ).to.equal( baseUrl( expectedUrl ) );
        }
      } )
  },


  click: function( xpath ) {
    driver.wait( until.elementIsVisible ( driver.wait( until.elementLocated (
      webdriver.By.xpath( eval( xpath ) )
    ), 6000, xpath + " was not found" ) ) ).click( );
  },


  expectTextToMatch: function( xpath, text ) {
    driver.wait( until.elementIsVisible ( driver.wait( until.elementLocated (
      webdriver.By.xpath( xpath )
    ), 6000, xpath + " was not found" ) ) ).getText( )
      .then( function( domText ) {
        expect( domText ).to.equal( String( text ) );
      } )
  },


  writeString: function( xpath, string ) {
    driver.wait( until.elementIsVisible ( driver.wait( until.elementLocated (
      webdriver.By.xpath( xpath )
    ), 6000, xpath + " was not found" ) ) ).sendKeys( string );
  },


  deleteText: function( xpath ) {
    driver.wait( until.elementIsVisible ( driver.wait( until.elementLocated (
      webdriver.By.xpath( xpath )
    ), 6000, xpath + " was not found" ) ) ).clear( );
  },


  expectNumberOfElementsToBe: function( xpath , number ) {
    driver.wait( until.elementsLocated(
      webdriver.By.xpath( xpath )
    ), 6000, xpath + " array was not found" )
      .then( function ( list ) {
        expect( list.length ).to.equal( number );
      } )
  },


};

module.exports = utils;
