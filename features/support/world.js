var fs = require( "fs" );
var expect = require( "chai" ).expect;
var webdriver = require( "selenium-webdriver" );
var platform = process.env.PLATFORM || "chrome";
var until = require( "selenium-webdriver" ).until;


var buildChromeDriver = function() {
    return new webdriver.Builder().
    withCapabilities( webdriver.Capabilities.chrome() ).
    build();
};

var buildFirefoxDriver = function() {
    return new webdriver.Builder().
    withCapabilities( webdriver.Capabilities.firefox() ).
    build();
};

var buildSafariDriver = function() {
    return new webdriver.Builder().
    withCapabilities( webdriver.Capabilities.safari() ).
    build();
};

var buildIEDriver = function() {
    return new webdriver.Builder().
    withCapabilities( webdriver.Capabilities.ie() ).
    build();
};

switch ( platform ) {
    case "firefox":
        var driver = buildFirefoxDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().setScriptTimeout( 15000 );
        // driver.manage().window().setSize( 1920, 1080 )
        break;
    case "safari":
        var driver = buildSafariDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().setScriptTimeout( 15000 );
        break;
    case "ie":
        var driver = buildIEDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().setScriptTimeout( 15000 );
        break;
    default:
        var driver = buildChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().setScriptTimeout( 15000 );
}

var getDriver = function() {
    return driver;
};

var World = function World( callback ) {

    var defaultTimeout = 20000;
    var screenshotPath = "screenshots";

    this.webdriver = webdriver;
    this.driver = driver;

    if ( !fs.existsSync( screenshotPath ) ) {
        fs.mkdirSync( screenshotPath );
    }

    this.waitFor = function( cssLocator, timeout ) {
        var waitTimeout = timeout || defaultTimeout;
        return driver.wait( function() {
            return driver.isElementPresent( {
                css: cssLocator
            } );
        }, waitTimeout );
    };

    findXpath = function(path) {
      return driver.findElement(webdriver.By.xpath(path));
    };

    findXpaths = function(path) {
      return driver.findElements(webdriver.By.xpath(path));
    };

    waitElement = function(path, time, msg) {
      return driver.wait(until.elementLocated(webdriver.By.xpath(path)), time, msg )
    };

    waitElements = function(path, time, msg) {
      return driver.wait(until.elementsLocated(webdriver.By.xpath(path)), time, msg )
    };

    waitElementToBeVisible = function(path, time, msg) {
      return driver.wait(until.elementIsVisible(driver.findElement(webdriver.By.xpath(path))), time, msg )
    };

    waitElementToNotBeVisible = function(path) {
      return driver.wait(until.elementIsNotVisible(driver.findElement(webdriver.By.xpath(path))))
    };

    waitElementToBeLocatedAndVisible = function (path, time, msg) {
      return driver.wait(until.elementIsVisible(driver.wait(until.elementLocated(webdriver.By.xpath(path)), time, msg )), time, msg)
    };

    waitTitle = function (title, timeout) {
      return driver.wait(until.titleIs(title), timeout)
    };

    waitText = function(path, text, timeout) {
      return driver.wait(until.elementTextIs(findXpath(path), text), timeout)
    };

    expectTextToEqual = function( path, text) {
      waitElementToBeLocatedAndVisible( path, 5000, path + " not found" ).getText()
        .then(function( result ){
          expect( result ).to.equal( text );
        })
    };

};

module.exports.World = World;
module.exports.getDriver = getDriver;
