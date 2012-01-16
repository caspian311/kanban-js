Feature: Releases
   Managing user releases

   Scenario: User can view, add, edit, and remove user releases
      When I go to the "releases" page
      Then I should see "Releases"
         And I should see "No releases have been entered yet"
      When I follow "Enter a new release"
      Then I should see "Create"
      When I fill in "name" with "release name"
         And I press "Create new release"
      Then I should be on the "releases" page
         And I should see "release name"
         And I should see "TODAY"
      When I follow "Edit release"
         And I fill in "name" with "different name"
         And I press "Update release"
      Then I should be on the "releases" page
         And I should see "different name"
         And I should see "TODAY"
         And I should not see "release name"
      When I follow "Remove release"
      Then I should be on the "releases" page
         And I should see "No releases have been entered yet"
         And I should not see "different name"

