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
      When I follow "Remove story"
      Then I should be on the "stories" page
         And I should not see "story name"
         And I should not see "this is the story description"
         And I should see "No stories have been entered yet"

