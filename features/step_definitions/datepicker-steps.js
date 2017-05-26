var baseUrl       = require( "../support/helper_functions.js" ).baseUrl;
var date          = new Date();
var datePicker    = require( "../support/pages/datePicker" );
var driver        = require( "../support/world.js" ).getDriver();
var expect        = require( "chai" ).expect;
var registration  = require( "../support/pages/registration" );
var until         = require( "selenium-webdriver" ).until;
var utils         = require( "../support/custom_methods" );


module.exports = function( ) {
  this.World = require( "../support/world.js" ).World;


  this.Given(/^(.*) url is opened$/, function( path, next ) {
    utils.open( path )
      .then( function( ) {
        next();
      } );
  } );


  this.Then(/^the (.*) is clicked$/, function( element, next ) {
    utils.click( element )
      .then( function( ) {
        next();
      } );
  } );


  this.Then(/^the (.*) should be visible$/, function( element, next ) {
    waitElementToBeLocatedAndVisible( eval( element ) , 5000, element + " missing" )
     .then( function( ) {
       next();
     } );
  } );


  this.Then(/^the calendar should display the current month$/, function( next ) {
    var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    utils.expectTextToMatch( datePicker.Month,  months[ date.getMonth() ]  )
      .then( function( ) {
        next();
      } );
  } );


  this.Then(/^the calendar should display the current year$/, function ( next ) {
    utils.expectTextToMatch( datePicker.Year, date.getFullYear() )
      .then( function( ) {
        next();
      } );
  } );


  this.Then(/^one day is highlighted$/, function( next ) {
    utils.expectNumberOfElementsToBe( datePicker.HighlightedDays, 1 )
      .then( function( ) {
        next();
      } );
  } );


  this.Then(/^the highlighted day should be today$/, function( next ) {
    var day = date.getDate( );

    findXpath( "//td/a[.='" + day  +"']" ).getAttribute( 'class' )  //we are searching for the table data which is today and checking if it's highlighted
      .then( function( result ){
        expect( result ).to.contain( "highlight" )
      } )
      .then( function( ) {
        next();
      } );
  } );

};
