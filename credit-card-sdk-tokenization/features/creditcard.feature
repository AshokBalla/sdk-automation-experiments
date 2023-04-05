Feature: Credit Card SDK Tokenization

  Background:
    Given the user is on the credit card payment page

  @positive @tokenization
  Scenario: Valid credit card payment with tokenization
    When the user enters a valid payment amount "100" with card details
    And submits the payment
    Then the payment should be tokenized successfully

  @positive @tokenization
  Scenario: Validate tokenize message for successful payment
    When the user validates tokenization for amount "100" with card details
    Then the tokenize message should be displayed

  @negative @validation
  Scenario: Negative amount payment
    When the user enters a payment amount of "-50" and submit is hit
    Then an error message should be displayed

  @negative @validation
  Scenario: Negative decimal amount payment
    When the user enters a payment amount of "-45.55" and submit is hit
    Then an error message should be displayed

  @negative @validation
  Scenario: Large payment amount exceeding maximum
    When the user enters a payment amount of "9999999999" and submit is hit
    Then an error message should be displayed

  @negative @validation
  Scenario: Zero amount payment
    When the user enters a payment amount of "0" and submit is hit
    Then an error message should be displayed

  @negative @validation
  Scenario: Zero decimal amount payment
    When the user enters a payment amount of "0.0" and submit is hit
    Then an error message should be displayed

  @negative @validation
  Scenario: Invalid amount format - alphabetic
    When the user enters a payment amount of "abc" and submit is hit
    Then an error message should be displayed

  @negative @validation
  Scenario: Invalid amount format - alphanumeric
    When the user enters a payment amount of "abc123" and submit is hit
    Then an error message should be displayed

  @negative @validation
  Scenario: Invalid amount format - special characters
    When the user enters a payment amount of "!@#$%" and submit is hit
    Then an error message should be displayed

  @negative @validation
  Scenario: Invalid amount format - decimal
    When the user enters a payment amount of "45.55" and submit is hit
    Then an error message should be displayed

  @negative @validation
  Scenario: Missing amount validation
    When the user tests with missing amount validation
    Then an error message should be displayed

  @negative @validation
  Scenario: Invalid amount validation
    When the user tests with invalid amount format "xyz"
    Then an error message should be displayed

  @negative @api-key
  Scenario: Invalid API key validation
    When the user validates invalid apikey
    Then an error message should be displayed

  @negative @api-key
  Scenario: Missing API key validation
    When the user validates missing apikey
    Then an error message should be displayed

  @negative @api-key
  Scenario: Non-string API key validation
    When the user validates non-string API key
    Then an error message should be displayed

  @negative @transaction
  Scenario: Transaction failure scenario
    When the user tests transaction failure with amount "102"
    Then a failure message should be displayed

  @positive @login
  Scenario: Valid login
    When the user logs in with valid credentials
    Then the login should be successful

  @negative @login
  Scenario: Invalid login
    When the user logs in with invalid credentials
    Then an error message should be displayed

  @negative @card-validation
  Scenario: Invalid card number validation
    When the user tests with invalid card number "1234567890123456"
    Then an error message should be displayed

  @negative @card-validation
  Scenario: Invalid CVV validation
    When the user tests with invalid CVV "12"
    Then an error message should be displayed

  @negative @card-validation
  Scenario: Invalid expiry date validation
    When the user tests with invalid expiry date "13/25"
    Then an error message should be displayed

  @negative @card-validation
  Scenario: Invalid card name validation
    When the user tests with invalid card name ""
    Then an error message should be displayed

  @negative @card-validation
  Scenario: Invalid billing zip validation
    When the user tests with invalid billing zip "123"
    Then an error message should be displayed

