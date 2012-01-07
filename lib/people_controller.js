var mongoose = require('mongoose');

var PeopleController = function(){
   var PersonSchema = new mongoose.Schema({
         firstName: String,
         lastName: String,
         middleName: String
      });
   var Person = mongoose.model('Person', PersonSchema);

   function index(req, res){
      showAllPeople(req, res);
   }

   function createView(req, res){
      res.render('people/create');
   }

   function edit(req, res){
      var id = req.params.person;
      Person.findById(id, function(err, doc) {
         res.render('people/edit', {person: doc});
      });
   }

   function create(req, res){
      var person = new Person();
      person.firstName = req.body.person.firstName;
      person.lastName = req.body.person.lastName;
      person.middleName = req.body.person.middleName;
      person.save(function(err) {
         showAllPeople(req, res);
      });
   }

   function update(req, res){
      var id = req.body.person.id;
      Person.findById(id, function(err, doc) {
         doc.firstName = req.body.person.firstName;
         doc.lastName = req.body.person.lastName;
         doc.middleName = req.body.person.middleName;
         doc.save(function(err) {
            showAllPeople(req, res);
         });
      });
   }

   function destroy(req, res){
      var id = req.params.person;
      Person.findById(id, function(err, doc) {
            doc.remove(function(err) {
            res.send({});
         });
      });
   }

   function showAllPeople(req, res) {
      Person.find(function(err, people) {
         res.render('people/index', {people: people});
      });
   }

   return {
      index: index,
      new: createView,
      destroy: destroy,
      edit: edit,
      create: create,
      update: update
   };
};

module.exports = new PeopleController();

