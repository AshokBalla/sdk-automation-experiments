Feature: making payments
    
    Scenario: Enter Valid Payment Amount
        When the user enters a valid payment amount 100
        
    Scenario: Enter invalid payment
        When the user enter a  payment amount of -50 is entered and submit is hit 
        
    Scenario: Enter Large Payment Amount
        When the user enter a payment amount of 9999999999 is entered and submit is hit 
       
    Scenario: Enter zero as payment 
        When the user enter a payment amount of 0 is entered and submit is hit 
        
    Scenario: Enter decimal as payment 
        When the user enter a payment amount of 45.55 is entered and submit is hit 
       
    Scenario: Enter negatice decimal as payment
        When the user enter a payment amount of -45.55 is entered and submit is hit 

    Scenario: Validate Zero Decimal Payment Amount
        When the user enter a payment amount of 0.0 is entered and submit is hit 
       
    Scenario: Enter Alphabetic Payment Amount
        When the user enter a payment amount of abc is entered and submit is hit 
       
    Scenario: Enter Alphanumeric Payment Amount
        When the user enter a payment amount of abc123 is entered and submit is hit 
  
    Scenario: Enter Special Characters Payment Amount
        When the user enter a payment amount of !@#$% is entered and submit is hit 
        
    Scenario: Enter Name on the account With only numbers
        When the user enter a name on the account only numbers

    Scenario: Enter Name on the account With only special characters
        When the user enter the a name on the account only special characters

    Scenario: Enter Name on the account With special characters alphabets numbers
        When the user enter the name on the account only special characters alphabets numbers

    Scenario: Enter Name on the account large number    
        When the user enter the name on the account largenumber

    Scenario: Enter large Account number
        When the user enter the large account number

    Scenario: Validate Failure Payment Amount
        When the user validate failure payment

    Scenario: validate ach accountname
        When the user enter a payment amount without ACH account name
        
    Scenario: Enter large Account number test
        When the user enter a payment amout with ACH  account number
    
    Scenario: validate routhing number
        When the user enter a pyment amout without ACH  routhing number

    Scenario: validate empty name
        When the user validate empty name

    Scenario: validate empty account number
        When the user validate empty accountnumber

     Scenario: validate empty routing number
        When the user validate empty routing number

    Scenario: Apikey testApikeyValidation
        When the user validate invalid apikey

    Scenario: Apikey testApikeyValidation
        When the user validate missing apikey

    Scenario: Apikey testApikeyValidation test
        When the user validates non-string API key

