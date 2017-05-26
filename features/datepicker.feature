Feature: Date picker

  Scenario: Making sure that the current day is highlighted on the datepicker
    Given http://demoqa.com/datepicker/ url is opened
    When the datePicker.Input is clicked
    Then the datePicker.Month should be visible
    And the calendar should display the current month
    And the calendar should display the current year
    Given one day is highlighted
    Then the highlighted day should be today
