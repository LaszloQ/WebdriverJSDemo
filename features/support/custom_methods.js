var expect = require( "chai" ).expect;
var until = require( "selenium-webdriver" ).until;
var driver = require( "../support/world.js" ).getDriver( );
var webdriver = require( "selenium-webdriver" );
var datePicker = require( "../support/pages/datePicker" );
var baseUrl = require( "../support/helper_functions.js" ).baseUrl;
var registration  = require( "../support/pages/registration" );

var utils = {

  open: function( url ) {
   return driver.get( url );
  },


  expectUrlToEqual: function( expectedUrl ) {
    return driver.getCurrentUrl( )
      .then( function ( url ) {
        if ( expectedUrl === "/" ) {
          expect( url ).to.equal( baseUrl( ) );
        } else {
          expect( url ).to.equal( baseUrl( expectedUrl ) );
        }
      } );
  },


  click: function( xpath ) {
    return driver.wait( until.elementIsVisible ( driver.wait( until.elementLocated (
      webdriver.By.xpath( eval( xpath ) )
    ), 6000, xpath + " was not found" ) ) ).click( );
  },


  expectTextToMatch: function( xpath, text ) {
    return driver.wait( until.elementIsVisible ( driver.wait( until.elementLocated (
      webdriver.By.xpath( xpath )
    ), 6000, xpath + " was not found" ) ) ).getText( )
      .then( function( domText ) {
        expect( domText ).to.equal( String( text ) );
      } );
  },


  writeString: function( xpath, string, next ) {
    return driver.wait( until.elementIsVisible ( driver.wait( until.elementLocated (
      webdriver.By.xpath( xpath )
    ), 6000, xpath + " was not found" ) ) ).sendKeys( string );
  } ,


  deleteText: function( xpath ) {
    return driver.wait( until.elementIsVisible ( driver.wait( until.elementLocated (
      webdriver.By.xpath( eval( xpath ) )
    ), 6000, xpath + " was not found" ) ) ).clear( );
  },


  expectNumberOfElementsToBe: function( xpath , number ) {
    return driver.wait( until.elementsLocated(
      webdriver.By.xpath( xpath )
    ), 6000, xpath + " array was not found" )
      .then( function ( list ) {
        expect( list.length ).to.equal( number );
      } );
  },


};

module.exports = utils;
