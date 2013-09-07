Feature: login
   Scenario: login as an unregistered user
      Given I am an unregistered user
      When I go to the login page
      And I login with incorrect credentials
      Then I should see "Invalid credentials"
