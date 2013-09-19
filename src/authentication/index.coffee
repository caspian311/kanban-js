passport = require 'passport'
passport_local = require 'passport-local'
app = require('express')()
authenticate_request = require './authenticate_request'
login_validator = require './login_validator'
user_serialization = require './user_serialization'

passport.serializeUser user_serialization.serialize
passport.deserializeUser user_serialization.deserialize

strategy = new passport_local.Strategy login_validator.validate_login
passport.use strategy

app.use passport.initialize()
app.use passport.session()
app.use authenticate_request

module.exports = app
