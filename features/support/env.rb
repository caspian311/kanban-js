require 'rubygems'
require 'mongo'
require 'rspec'
require 'bundler/setup'
require 'capybara/cucumber'
$LOAD_PATH.push File.dirname(__FILE__)

require 'something_module'

Capybara.register_driver :selenium do |app|
   Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.default_selector = :css
Capybara.default_driver = :selenium
Capybara.app_host = 'localhost:1337'
Capybara.run_server = false

Before do
   db = Mongo::Connection.new.db("kanban-js")
   db.collection("stories").remove
   db.collection("releases").remove
end

World(SomethingModule)
