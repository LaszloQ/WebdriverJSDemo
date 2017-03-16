Feature: Date picker

  Scenario: Making sure that the current day is highlighted on the datepicker
    Given the /datepicker/ page is opened
    When the datePickerInput is clicked
    Then the datePicker should be visible
    And the calendar should display the current month
    And the calendar should display the current year
    Given one day is highlighted
    Then the highlighted day should be today
