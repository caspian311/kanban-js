
Given /^I have a release named "([^"]*)"$/ do |name|
   date = DateTime.now
   time = Time.utc(date.year, date.month, date.day)
   release = { 
      :name => name, 
      :createdOn => time,
      :modifiedOn => time
   }
   db = Mongo::Connection.new.db("kanban-js")
   db.collection("releases").insert release
end

