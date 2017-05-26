Feature: Registration

  Scenario: The user performs a registration using valid data
    Given http://demoqa.com/registration/ url is opened
    * Max is written in the registration.firstName field
    * Kellerman is written in the registration.lastName field
    And the registration.maritalStatus.single is clicked
    And the registration.hobby.cricket is clicked
    And the registration.country.romania is clicked
    And the registration.birth.month.may is clicked
    And the registration.birth.day[21] is clicked
    And the registration.birth.year[1988] is clicked
    * 1234567890 is written in the registration.phone field
    * Selenium0020 is written in the registration.username field
    * laszlo6@yopmail.com is written in the registration.email field
    * /Users/laszlokiss/Desktop/webdriver.png is written in the registration.uploadPicture field
    * Hello, I'm a tester is written in the registration.description field
    * 12345678 is written in the registration.password field
    * 12345678 is written in the registration.passwordConfirm field
    When the registration.submit is clicked
    Then the registration.confirmation should be visible
