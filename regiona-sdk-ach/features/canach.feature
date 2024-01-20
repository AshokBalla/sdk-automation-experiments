Feature: RegionA ACH Payments

  Background:
    Given the user is on the RegionA ACH payment page

  @positive @happy-path
  Scenario: Valid RegionA ACH payment with correct data
    When the user fills valid payment details
    And submits the payment
    Then the payment should be processed successfully

  @negative @validation
  Scenario: Minimum amount too small (0.01 rejected)
    When the user fills payment with amount "0.01"
    And submits the payment
    Then an error message should be displayed

  @positive @boundary
  Scenario: Maximum valid amount payment
    When the user fills payment with amount "999999.99"
    And submits the payment
    Then the payment should be processed successfully

  @positive @format
  Scenario: Valid account number with leading zeros
    When the user fills payment with account number "0000000016"
    And submits the payment
    Then the payment should be processed successfully

  @positive @format
  Scenario: Valid institution number format
    When the user fills payment with institution number "123"
    And submits the payment
    Then the payment should be processed successfully

  @positive @format
  Scenario: Valid transit number format
    When the user fills payment with transit number "12210"
    And submits the payment
    Then the payment should be processed successfully

  @negative @validation
  Scenario: Empty amount field
    When the user leaves amount field empty
    And submits the payment
    Then an error message should be displayed

  @negative @validation
  Scenario: Zero amount payment
    When the user fills payment with amount "0"
    And submits the payment
    Then an error message should be displayed

  @negative @validation
  Scenario: Negative amount payment
    When the user fills payment with amount "-100"
    And submits the payment
    Then an error message should be displayed

  @negative @validation
  Scenario: Invalid amount format
    When the user fills payment with amount "abc"
    And submits the payment
    Then an error message should be displayed

  @negative @validation
  Scenario: Empty account name
    When the user leaves account name field empty
    And submits the payment
    Then an error message should be displayed

  @negative @validation
  Scenario: Empty account number
    When the user leaves account number field empty
    And submits the payment
    Then an error message should be displayed

  @negative @validation
  Scenario: Invalid account number format
    When the user fills payment with account number "abc123"
    And submits the payment
    Then an error message should be displayed

  @negative @validation
  Scenario: Empty institution number
    When the user leaves institution number field empty
    And submits the payment
    Then an error message should be displayed

  @negative @validation
  Scenario: Invalid institution number format
    When the user fills payment with institution number "12"
    And submits the payment
    Then an error message should be displayed

  @negative @validation
  Scenario: Empty transit number
    When the user leaves transit number field empty
    And submits the payment
    Then an error message should be displayed

  @negative @validation
  Scenario: Invalid transit number format
    When the user fills payment with transit number "123"
    And submits the payment
    Then an error message should be displayed

  @negative @validation
  Scenario: Invalid email format
    When the user fills payment with invalid email "invalid-email"
    And submits the payment
    Then an error message should be displayed

  @negative @validation
  Scenario: Empty email field
    When the user leaves email field empty
    And submits the payment
    Then an error message should be displayed

  @negative @boundary
  Scenario: Amount exceeding maximum limit
    When the user fills payment with amount "1000000.00"
    And submits the payment
    Then an error message should be displayed

  @negative @boundary
  Scenario: Very long account name
    When the user fills payment with very long account name
    And submits the payment
    Then an error message should be displayed

  @negative @boundary
  Scenario: Very long account number
    When the user fills payment with very long account number
    And submits the payment
    Then an error message should be displayed

  @coverage @error-handling
  Scenario: Check error message functionality
    When the user checks for error message "validation error"
    Then an error message should be displayed
    And the system should handle the error gracefully

  @coverage @error-handling
  Scenario: Check error message with specific text
    When the user checks for error message "invalid amount"
    Then an error message should be displayed
    And the system should handle the error gracefully

  @coverage @validation
  Scenario: Test invalid amount format handling
    When the user tests with invalid amount format "xyz"
    Then the system should handle the error gracefully

  @coverage @validation
  Scenario: Test invalid account number format handling
    When the user tests with invalid account number format "abc"
    Then the system should handle the error gracefully

  @coverage @validation
  Scenario: Test invalid institution number format handling
    When the user tests with invalid institution number format "12"
    Then the system should handle the error gracefully

  @coverage @legacy
  Scenario: Legacy validation test
    Given the user validate regiona ach
    Then the payment should be processed successfully