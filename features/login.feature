Feature: login
   Scenario: attempt to login as an unregistered user
      Given I am an unregistered user
      When I go to the login page
      And I login with incorrect credentials
      Then I should see "Invalid credentials"

   Scenario: login as a registered user
      Given I am a registered user
      When I go to the login page
      And I login with correct credentials
      Then I should see a welcome message

   Scenario: register a new user
      Given I am an unregistered user
      When I go to the registration page
      And I fill in my registration information
      And I login with the newly created user
      Then I should see a new user welcome message
