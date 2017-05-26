var baseUrl     = require( "../support/helper_functions.js" ).baseUrl;
var date        = new Date();
var datePicker  = require( "../support/pages/datePicker" );
var driver      = require( "../support/world.js" ).getDriver();
var expect      = require( "chai" ).expect;
var until       = require( "selenium-webdriver" ).until;
var utils       = require( "../support/custom_methods" );


module.exports = function( ) {
  this.World = require( "../support/world.js" ).World;


  this.Given( /^(.*) url is opened$/, function( path ) {
    return utils.open( path );
  } );


  this.Then(/^the (.*) is clicked$/, function( element ) {
    return utils.click( element );
  } );


  this.Then(/^the (.*) should be visible$/, function( element ) {
    return waitElementToBeLocatedAndVisible( eval( element ) , 5000, element + " missing" );
  } );


  this.Then(/^the calendar should display the current month$/, function( ) {
    var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    return utils.expectTextToMatch( datePicker.Month,  months[ date.getMonth() ]  );
  } );


  this.Then(/^the calendar should display the current year$/, function ( ) {
    return utils.expectTextToMatch( datePicker.Year, date.getFullYear() );
  });


  this.Then(/^one day is highlighted$/, function( ) {
    return utils.expectNumberOfElementsToBe( datePicker.HighlightedDays, 1 )
  } );


  this.Then(/^the highlighted day should be today$/, function( ) {
    var day = date.getDate( );

    return findXpath( "//td/a[.='" + day  +"']" ).getAttribute( 'class' )  //we are searching for the table data which is today and checking if it's highlighted
      .then( function( result ){
        expect( result ).to.contain( "highlight" )
      } );
  } );

};
