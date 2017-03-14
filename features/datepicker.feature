Feature: Date picker

  Scenario: Selecting a date on the date picker
    Given the /datepicker/ page is opened
    When the datePickerInput is clicked
    Then the datePicker should be visible
    And today should be highlighted
