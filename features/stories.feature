Feature: Stories
   Managing user stories

   Scenario: User can view, add, edit, and remove user stories
      When I go to the "stories" page
      Then I should see "Stories"
         And I should see "No stories have been entered yet"
      When I follow "Enter a new story"
      Then I should see "Create"
      When I fill in "name" with "story name"
         And I fill in "description" with "this is the story description"
         And I press "Create new story"
      Then I should be on the "stories" page
         And I should see "story name"
         And I should see "this is the story description"
         And I should see "TODAY"
      When I follow "Edit story"
         And I fill in "name" with "different name"
         And I fill in "description" with "blah blah blah"
         And I press "Update story"
      Then I should be on the "stories" page
         And I should see "different name"
         And I should see "blah blah blah"
         And I should see "TODAY"
         And I should not see "story name"
         And I should not see "this is the story description"
      When I follow "Remove story"
      Then I should be on the "stories" page
         And I should see "No stories have been entered yet"
         And I should not see "different name"
         And I should not see "blah blah blah"

   Scenario: User can associate a story with a release
      Given I have a release name "Release 1.0"
         And I have a release name "Release 2.0"
         And I have a release name "Release 3.0"
      When I go to the "stories" page
         And I follow "Enter a new story"
      Then I should see the following options in the "release" dropdown:
         | Release 1.0  |
         | Release 2.0  |
         | Release 3.0  |

