var fs = require( "fs" );
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
    // case "ANDROID":
    //     var driver = buildAndroidDriver();
    //     break;
    case "FIREFOX":
        var driver = buildFirefoxDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().setScriptTimeout( 15000 );
        // driver.manage().window().setSize( 1920, 1080 )
        break;
    case "SAFARI":
        var driver = buildSafariDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().setScriptTimeout( 15000 );
        // driver.manage().window().setSize( 1920, 1080 )
        break;
    case "IE":
        var driver = buildIEDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().setScriptTimeout( 15000 );
        // driver.manage().window().setSize( 1920, 1080 )
        break;
    default:
        var driver = buildChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().setScriptTimeout( 15000 );
        // driver.manage().window().setSize( 1920, 1080 )
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

    this.findXpath = function(path) {
      return driver.findElement(webdriver.By.xpath(path));
    };

    this.findXpaths = function(path) {
      return driver.findElements(webdriver.By.xpath(path));
    };

    this.waitElement = function(path, time, msg) {
      return driver.wait(until.elementLocated(webdriver.By.xpath(path)), time, msg )
    };

    this.waitElements = function(path, time, msg) {
      return driver.wait(until.elementsLocated(webdriver.By.xpath(path)), time, msg )
    };


    // callback();
};

module.exports.World = World;
module.exports.getDriver = getDriver;
