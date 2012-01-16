Feature: Navigation
   All links and general workflow should work

   @wip
   Scenario: User can navigate to the various manage resource links and back
      When I go to the "home" page
         And I follow "Manage releases"
      Then I should be on the "releases" page
      When I follow "Back"
      Then I should be on the "home" page
      When I follow "Manage stoires"
      Then I should be on the "stories" page
      When I follow "Back"
      Then I should be on the "home" page

