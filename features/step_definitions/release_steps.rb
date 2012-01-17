
Given /^I have a release name "([^"]*)"$/ do |name|
   release = { :name => name }
   db = Mongo::Connection.new.db("kanban-js")
   db.collection("releases").insert release
end

