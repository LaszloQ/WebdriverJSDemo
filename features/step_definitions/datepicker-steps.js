var expect = require( "chai" ).expect;
var until = require( "selenium-webdriver" ).until;

module.exports = function( driver ) {
  this.World = require( "../support/world.js" ).World;


  this.When(/^the (.*) page is opened$/, function( page, next ) {
    var driver = this.driver;

    if ( page === "home" ) {
      driver.get(baseUrl);
    } else {
      driver.get(baseUrl + page)
    }
    driver.getCurrentUrl()
      .then(function(url){
        expect(url).to.contain(baseUrl);
      })
      .then( function() {
        next();
      });
  });


  this.Then(/^the (.*) is clicked$/, function(element, next) {
    waitElementToBeLocatedAndVisible( eval(element), 5000, element + " missing").click()
      .then(function() {
        next();
      });
  });


  this.Then(/^the (.*) should be visible$/, function( element, next ) {
    waitElementToBeLocatedAndVisible( eval(element), 5000, element + " missing" )
      .then( function() {
        next();
      });
  });


  this.Then(/^today should be highlighted$/, function( next ) {
    var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var day = date.getDate();

    findXpath( month ).getText()   //making sure that the month is correct on the datepicker
      .then( function( result ) {
        expect( result ).to.equal( months[ date.getMonth() ] )
      })
    findXpath( year ).getText()  // making sure that the year is correct on the datepicker
      .then( function( result ) {
        expect( Number(result) ).to.equal( date.getFullYear() )
      })
    findXpaths( highlightedDaysInCalendar )  //making sure that there is only 1 highlighted day in the calendar
      .then( function( listOfHighlightedDates ) {
      })
    findXpath( "//td/a[.='" + day  +"']" ).getAttribute( 'class' )  //we are searching for the table data which includes our day and checking if it's highlighted
      .then( function( result ){
        expect( result ).to.contain( "highlight" )
      })
      .then( function() {
        next();
      });
  });

};
