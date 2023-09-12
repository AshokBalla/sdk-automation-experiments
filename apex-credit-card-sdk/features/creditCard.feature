Feature: Validate payment amount entry
        
    Scenario: Enter valid payment amount with amex card
        When the user enters a valid payment amount with amex card

    Scenario: Enter valid payment amount with visa card
        When the user enters a valid payment amount with visa card

    Scenario: Enter zero as payment amount
        When the user enters payment as 0
    
    Scenario: Enter large payment amount 
        When the user enters the payment amount -50  

    Scenario: Enter invalid payment amount 9999999999
        When the user enters the payment amount 9999999999
       
    Scenario: Enter invalid payment amount 45.55
        When the user enters the payment amount 45.55

    Scenario: Enter invalid payment amount -45.55
        When the user enters the payment amount -45.55

    Scenario: Enter invalid payment amount 0.0
        When the user enters the payment amount 0.0

    Scenario: Enter Alphabetic payment  
        When the user enter the payment alphabetic abc
        
    Scenario: Enter Alpahnewmeric payment
        When the user enter the payment abc123
       

    Scenario: Enter Special Charactors payment
        When the user enter the payment !@#$%
       

    Scenario: Enter Name on the Card with special characters
        When the user enter the nameoncard !@#$%

    Scenario: Name on the Card with only Numbers
        When the user enter the nameoncard only numbers

    Scenario: Name on the Card with Numbers Alphabets special characters
        When the user enter the nameoncard alphabetic special numbers

    Scenario: Enter payment amount 102 to test generic decline
        When the user enters valid credentials with 102 as the amount
        
    Scenario: Enter payment amount of 193 to test insufficent funds
        When the user enters valid credentials with 193 as the amount
       
    Scenario: Enter payment amount of 194 to test SOCKET_ERROR 
        When the user enters valid credentials with 194 as the amount

    Scenario: Enter payment amount of 889986 to test SOCKET_ERROR 
        When the user enters valid credentials with 889986 as the amount
        

    Scenario: Enter payment amount of 889987 to test SOCKET_ERROR
        When the user enters valid credentials with 889987 as the amount
        

    Scenario: Enter payment amount of 888888 with visa
        When the user enters valid credentials with 888888 as the amount
        

    Scenario: Enter payment amount 102 to test generic decline with amex
        When the user enters valid credentials with 102 as the amount with amex card
        

    Scenario: Enter payment amount of 193 to test insufficent funds with amex
        When the user enters valid credentials with 193 as the amount with amex card
        

    Scenario: Enter payment amount of 194 to test SOCKET_ERROR with amex
        When the user enters valid credentials with 194 as the amount with amex card
        

    Scenario: Enter payment amount of 889986 to test SOCKET_ERROR with amex
        When the user enters valid credentials with 889986 as the amount with amex card
       

    Scenario: Enter payment amount of 889987 to test SOCKET_ERROR with amex
        When the user enters valid credentials with 889987 as the amount with amex card
       

    Scenario: Enter payment amount of 888888  with amex
        When the user enters valid credentials with 888888 as the amount with amex card

        
    Scenario: Enter payment amount 102 to test generic decline with mastercard
        When the user enters valid credentials with 102 as the amount with mastercard card
        

    Scenario: Enter payment amount of 193 to test insufficent funds with mastercard
        When the user enters valid credentials with 193 as the amount with mastercard card
        

    Scenario: Enter payment amount of 194 to test SOCKET_ERROR with mastercard
        When the user enters valid credentials with 194 as the amount with mastercard card
        

    Scenario: Enter payment amount of 889986 to test SOCKET_ERROR with mastercard
        When the user enters valid credentials with 889986 as the amount with mastercard card
        

    Scenario: Enter payment amount of 889987 to test SOCKET_ERROR with mastercard
        When the user enters valid credentials with 889987 as the amount with mastercard card
        

    Scenario: Enter payment amount of 888888 to with mastercard
        When the user enters valid credentials with 888888 as the amount with mastercard card
        

    Scenario: Enter payment amount 102 to test generic decline with discover
        When the user enters valid credentials with 102 as the amount with discover card
        

    Scenario: Enter payment amount of 193 to test insufficent funds with discover
        When the user enters valid credentials with 193 as the amount with discover card
       

    Scenario: Enter payment amount of 194 to test SOCKET_ERROR with discover
        When the user enters valid credentials with 194 as the amount with discover card
        

    Scenario: Enter payment amount of 889986 to test SOCKET_ERROR with discover
        When the user enters valid credentials with 889986 as the amount with discover card
        

    Scenario: Enter payment amount of 889987 to test SOCKET_ERROR with discover
        When the user enters valid credentials with 889987 as the amount with discover card
        

    Scenario: Enter payment amount of 888888 with discover
        When the user enters valid credentials with 888888 as the amount with discover card

    Scenario: Invalid API key test
        When the user validate invalid apikey
      
    Scenario: Missing apikey
        When the user validate missing apikey
        
    Scenario: Non-string API key validation
        When the user validates non-string API key
    
    Scenario: Country validation
        When the user validate Country
        
    Scenario: Test missing CVV field validation
        When the user submits payment without CVV
       

    Scenario: Test missing expiration field validation
        When the user submits payment without expiration date
       

    Scenario: Test combined credit card with separate CVV validation
        When the user submits payment with combined credit card and separate CVV
       

    Scenario: Test combined credit card with separate expiration validation
        When the user submits payment with combined credit card and separate expiration
   

        