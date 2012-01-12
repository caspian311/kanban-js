When /^I go to the "([^"]*)" page$/  do |page|
   visit path_to(page)
end

When /^I follow "([^"]*)"$/ do |text|
   click_link text
end

When /^I don't fill in anything$/ do
end

When /^I fill in "([^"]*)" with "([^"]*)"$/ do |field, value|
   fill_in field, :with => value
end

When /^I press "([^"]*)"$/ do |button|
   click_button button
end

Then /^I should see "([^"]*)"$/ do |text|
   if text == "TODAY"
      text = DateTime.now.strftime "%m/%d/%Y"
   end

   page.should have_content(text)
end

Then /^I should not see "([^"]*)"$/ do |text|
   page.should_not have_content(text)
end

Then /^I should be on the "([^"]*)" page$/ do |page|
   uri = URI.parse(current_url)
   uri.path.should == path_to(page)
end

