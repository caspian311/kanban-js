When /^I go to the "([^"]*)" page$/  do |page|
   visit path_to(page)
end

Then /^I should see "([^"]*)"$/ do |text|
   page.should have_content(text)
end

And /^I don't fill in anything$/ do
end

And /^I fill in "([^"]*)" with "([^"]*)"$/ do |field, value|
   fill_in(field, :with => value)
end

And /^I press "([^"]*)"$/ do |button|
   click_button(button)
end
