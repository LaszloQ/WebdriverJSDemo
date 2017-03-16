* Running the tests:
  **npm run Chrome** to run the tests on Chrome browser. The config for test execution command can be found in *package.json*. You can include any test execution command under "scripts".

* **/features/support/hooks.js** contains the test hooks. Current setup will take a screenshot if the scenario is failed and will delete the cookies and will close the browser after running the scenarios.

* **/features/support/world.js** contains the setup for webdriver builders, screen size and time out configuration, depending on browser type. It also contains custom functions for most webdriver actions, like finding or waiting for elements. This is to use a shorter syntax on step definitions.
  
* **Most used functions from world.js**:

 * *findXpath( xpath )* - replaces findElement and accepts the xpath string as parameter - use this only if the element should be instantly available

 * *waitElementToBeLocatedAndVisible( xpath, timeout, errormsg )* - this will locate an element and wait until it is visible. xpath requires the xpath string, timeout determines the maximum waiting time to find the element and errormsg will be displayed if the searched element was not found in time. - use this whenever you're waiting for an element to be displayed (slowest, but safest method)

 * *expectTextToEqual( path, text )* - will wait until an element is found, apply a getText( ) method and expect the result to equal with the used text parameter. Example on facebook:  expectTextToEqual( "//h1", "Facebook" ) - this will fail if the text of Facebook's header is not actually "Facebook". For all the custom functions, please consult world.js

* **/features/support/helper_functions** contains a function to return the base url - use this wherever you open or check the url. Write here any other functions that might be used in several tests 

* **/features/support/pages/** contains all locators