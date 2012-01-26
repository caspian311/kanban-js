Feature: Stories
   Managing user stories

   Scenario: User can view, add, edit, and remove user stories
      Given I have a release named "Release 1.0"
         And I have a release named "Release 2.0"
         And I have a release named "Release 3.0"
      When I go to the "stories" page
      Then I should see "Stories"
         And I should see "No stories have been entered yet"
      When I follow "Enter a new story"
      Then I should see "Create"
         And I should see the following options in the "release" dropdown:
         | Release 1.0  |
         | Release 2.0  |
         | Release 3.0  |
      When I fill in "name" with "story name"
         And I fill in "description" with "this is the story description"
         And I select "Release 2.0" from the "release" dropdown
         And I press "Create new story"
      Then I should be on the "stories" page
         And I should see "story name"
         And I should see "this is the story description"
         And I should see "Release 2.0"
         And I should see "TODAY"
      When I follow "Edit story"
      Then I should see the following options in the "release" dropdown:
         | Release 1.0  |
         | Release 2.0  |
         | Release 3.0  |
      When I fill in "name" with "different name"
         And I fill in "description" with "blah blah blah"
         And I select "Release 3.0" from the "release" dropdown
         And I press "Update story"
      Then I should be on the "stories" page
         And I should see "different name"
         And I should see "blah blah blah"
         And I should see "Release 3.0"
         And I should see "TODAY"
         And I should not see "story name"
         And I should not see "this is the story description"
         And I should not see "Release 2.0"
      When I follow "Remove story"
      Then I should be on the "stories" page
         And I should see "No stories have been entered yet"
         And I should not see "different name"
         And I should not see "blah blah blah"

