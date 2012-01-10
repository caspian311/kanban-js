require 'rubygems'
require 'rspec'
require 'bundler/setup'
require 'capybara/cucumber'
$LOAD_PATH.push File.dirname(__FILE__)

require 'something_module'

Capybara.configure do |config|
   config.app_host = 'localhost:1337'
   config.run_server = false
   config.default_driver = :selenium
end

World(SomethingModule)
