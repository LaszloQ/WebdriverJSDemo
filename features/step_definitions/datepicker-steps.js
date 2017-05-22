var expect = require( "chai" ).expect;
var until = require( "selenium-webdriver" ).until;
var driver = require( "../support/world.js" ).getDriver();
var baseUrl = require( "../support/helper_functions.js" ).baseUrl;
var datePicker = require( "../support/pages/datePicker" );
var date = new Date();

module.exports = function( ) {
  this.World = require( "../support/world.js" ).World;


  this.When(/^the (.*) page is opened$/, function( path ) {
    if ( path === "home" ) {
      return driver.get( baseUrl( ) );
    } else {
      return driver.get( baseUrl( path ) )
    }
  });


  this.Then(/^the (.*) is clicked$/, function( element ) {
    return waitElementToBeLocatedAndVisible( eval(element), 5000, element + " missing" ).click( );
  });


  this.Then(/^the (.*) should be visible$/, function( element ) {
    return waitElementToBeLocatedAndVisible( eval( element ), 5000, element + " missing" );
  });


  this.Then(/^the calendar should display the current month$/, function( ) {
    var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    return expectTextToEqual( datePicker.Month, months[ date.getMonth() ] );
  });


  this.Then(/^the calendar should display the current year$/, function ( ) {
    return findXpath( datePicker.Year ).getText()
      .then( function( result ) {
        expect( Number( result ) ).to.equal( date.getFullYear( ) )
      });
  });


  this.Then(/^one day is highlighted$/, function( ) {
    return findXpaths( datePicker.HighlightedDays )
      .then( function( result ) {
        expect( result.length ).to.equal( 1 );
      });
  });


  this.Then(/^the highlighted day should be today$/, function( ) {
    var day = date.getDate( );

    return findXpath( "//td/a[.='" + day  +"']" ).getAttribute( 'class' )  //we are searching for the table data which is today and checking if it's highlighted
      .then( function( result ){
        expect( result ).to.contain( "highlight" )
      })
  });

};
