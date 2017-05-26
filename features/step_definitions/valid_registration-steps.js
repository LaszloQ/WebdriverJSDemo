var baseUrl       = require( "../support/helper_functions.js" ).baseUrl;
var driver        = require( "../support/world.js" ).getDriver();
var expect        = require( "chai" ).expect;
var registration  = require( "../support/pages/registration" );
var until         = require( "selenium-webdriver" ).until;
var utils         = require( "../support/custom_methods" );


module.exports = function( ) {
  this.World = require( "../support/world.js" ).World;

  this.Then(/^(.*) is written in the (.*) field$/, function ( text, field, next ) {
    utils.writeString( eval( field ), text )
      .then( function( ) {
        next();
      } );
  } );

};
