Setup Selenium WebdriverJS + CucumberJS + Chai on Windows




Create a repository on Bitbucket or Github.
go to https://bitbucket.org/ 
create an account if you don’t have one
create a new repository and name it as you wish
enter the repository and click on “Clone” button. you will have two options available: HTTPS or SSH. Leave it on HTTPS and copy the link, which should looks something like this:


git clone https://LaszloKiss@bitbucket.org/LaszloKiss/webdriver.git




Clone the repository locally
open the Windows Command Prompt or GitBash(recommended)
GitBash is a prettier version and you can download it from https://git-scm.com/download/win
from GitBash go to the folder where you want to setup your testing environment: if you have a “Testing” folder in D:, just use the following command: cd D:/Testing
if your Gitbash is pointing to the desired folder, paste the git clone command that you copied from Bitbucket. If everything is correct, you should see “(master)” displayed after your directory path, because that is the branch that your are currently on




Download and Install Atom text editor
https://atom.io/
Open Atom
Open your Testing Folder in Atom (File > Add Project Folder)
Install a few Atom packages to make everything prettier:
Atom > Edit > Settings > Install > and search for:
atom-beautify (0.29.6)
atom-tenjs (0.13.2)
cucumber (0.5.0)






Install node JS
Download and install node JS - https://nodejs.org/en/download/
Restart the PC for Node to be available




Create package.json file
Open GitBash, go to your Testing folder and type “npm init” to create a package.json file in the directory. This file will display your installed dependencies and test run commands
Just follow the installation steps and write all the info that is required. An example file would look like this: (dependencies will be added only after you install the packages)


{
  "name": "webdriver_automation",
  "version": "1.0.0",
  "description": "Automation scripts in Javascript",
  "main": "index.js",
  "dependencies": {
    "chai": "^3.5.0",
    "chromedriver": "^2.25.1",
    "cucumber": "^1.3.1",
    "sanitize-filename": "^1.6.1",
    "selenium-webdriver": "^3.0.1"
  },
  "devDependencies": {},
  "scripts": {
    "Chrome": "chrome.sh && cucumber-js --"
  },
  "repository": {
    "type": "git",
    "url": "git+https://LaszloKiss@bitbucket.org/LaszloKiss/webdriver.git"
  },
  "keywords": [
    "webdriver",
    "automation"
  ],
  "author": "Laszlo Kiss",
  "license": "ISC",
  "homepage": "https://bitbucket.org/LaszloKiss/webdriver#readme"
}


	


Install Selenium WebdriverJS
If you’re in the desired folder in GitBash, use the following command to install selenium webdriver
“npm install selenium-webdriver --save”




Install Chromedriver
When selenium is finished, install the following packages the same way:
“npm install chromedriver --save“
download chromedriver and copy it to C:/Windows folder
https://sites.google.com/a/chromium.org/chromedriver/downloads




Install CucumberJS
“npm install cucumber --save”




Install Chai Mocha
“npm install chai --save” 




Install sanitize-filename
“npm install sanitize-filename --save”
If everything was installed correctly, your dependencies in package.json should look similar to the example above




Create folders
Open Atom and create the following folders:
right click on your “Testing” directory > New Folder > name it “features”. In this folder, you will store all your .feature files
under “features” create 2 folders : “support” & “step_definitions” In the step_definitions folder you will store all your -steps.js files






Add world.js and hooks.js in the support folder
in the “support” folder create a new file named “world.js” and paste the following code inside:


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

    // callback();
};

module.exports.World = World;
module.exports.getDriver = getDriver;


in the “support” folder create a new file named “hooks.js” and copy the following code inside:




var driver = require( "./world.js" ).getDriver();
var fs = require( "fs" );
var path = require( "path" );
var sanitize = require( "sanitize-filename" );

var myHooks = function() {

    this.After( function( scenario, callback ) {
        if ( scenario.isFailed() ) {
            this.driver.takeScreenshot().then( function( data ) {
                var base64Data = data.replace( /^data:image\/png;base64,/, "" );
                fs.writeFile( path.join( "screenshots", sanitize( scenario.getName() + ".png" ).replace( / /g, "_" ) ), base64Data, "base64", function( err ) {
                    if ( err ) {
                        console.log( err );
                    }
                } );
            } );
        }
        this.driver.manage().deleteAllCookies()
            .then( function() {
                callback();
            } );
    } );

    this.registerHandler( "AfterFeatures", function( event, callback ) {
        driver.quit();
        callback();
    } );

    this.setDefaultTimeout( 60 * 1000 ); // removes the default timeout

};

module.exports = myHooks;




Create a “.gitignore” file in the main directory
everything included in this file will be ignored when a push is made to Bitbucket
To ignore files or folders that shouldn’t be pushed to bitbucket, just copy the following lines inside the “.gitignore” file:
node_modules
npm-debug.log
screenshots
debug.log






 Change the test execution command
In the package.json file, the “scrips” object defines how you can run your tests. You can add several test commands here.
for now, to run the test on Chrome browser, write the following command: 
	"scripts": {
    		"Chrome": "chrome.sh && cucumber-js --"
 	 },


for this to work, you need to create a “chrome.sh” file in your main directory(“Testing”), write “set SELENIUM_BROWSER=chrome” inside the file and save it
if this is done, you can start the tests in GitBash with the following command:
npm run Chrome (this will run all tests in Chrome)
npm run Chrome  features/specifictest.feature (to run only test named “specifictest”)




Add environment variables (might be optional)
At first skip this step and see if everything works. If it doesn’t, return to this step!
Go to PC > Properties > Advanced System Settings > Advanced > Environment Variables… > System variables > find “Path” > Edit
you should at least see nodeJS available here
click on New and add paths for Cucumber, Chromedriver, or other drivers that you’ll be using
	






Create your first test 
inside the “features” folder create a file named “facebook.feature” and add the following code:


Feature: Open facebook
  This will check if tests are working

  Scenario:Visiting the Facebook website
  When I open facebook


inside the “step_definitions” folder create a file named “facebook-steps.js” and add the following code:


var expect = require( "chai" ).expect;
var until = require( "selenium-webdriver" ).until;


module.exports = function() {
  this.World = require( "../support/world.js" ).World;

  this.When(/^I open facebook$/, function( next ) {
    this.driver.get("https://www.facebook.com/")
    this.driver.sleep(1000)
      .then(function() {
        next();
      });
  });

};




Check if the test is properly working:
Open GitBash, go to your “Testing” directory and run the test execution command: “npm run Chrome”
if everything is ok, you should see a new chrome browser opening and accessing the Facebook homepage
if the test is passed, you can push everything to Bitbucket, for the setup to be saved. Make sure that you are in the “Testing” directory in GitBash and type the following commands:
git status (this will show all the modified files that are going to be commited)
git add -A  (this adds all the modified files to commit)
git commit -m “Initial setup”  (this will create a commit named “Initial setup”)
git push origin master (this will push your commit(s) to Bitbucket on the master branch)




Now that the setup is done, all you need to do next is to create your own test and run them. Documentation on the installed packages can be found on the following links:
https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs
https://github.com/cucumber/cucumber-js
http://chaijs.com/api/bdd/









