var should = require('should');
var util = require('util');

var Data = require('../../lib/data');

var _data = new Data();

var ReleasesModel = require('../../lib/models/releasesModel');
var testObject = new ReleasesModel(_data);

describe('ReleasesModel', function() {
   beforeEach(function(done) {
      _data.Release.find(function(err, docs){
         docs.forEach(function(doc) {
            doc.remove();
         });
         done();
      });
   });

   describe('#listAll', function() {
      it('should return all releases', function(done) {
         var release1 = new _data.Release();
         release1.name = 'test1';
         release1.save();
         
         var release2 = new _data.Release();
         release2.name = 'test2';
         release2.save();
         
         testObject.listAll(function(releases) {
            releases.should.have.property('length');
            releases.length.should.equal(2);
            releases[0].name.should.equal('test1');
            releases[1].name.should.equal('test2');

            done();
         });
      });
   });

   describe('#deleteRelease', function() {
      it('should delete the specified release', function(done) {
         var release1 = new _data.Release();
         release1.name = 'test1';
         release1.save();
         var idOfReleaseToDelete = release1.id
         
         var release2 = new _data.Release();
         release2.name = 'test2';
         release2.save();

         testObject.deleteRelease(idOfReleaseToDelete, function() {
            _data.Release.find(function(err, releases) {
               releases.should.have.property('length');
               releases.length.should.equal(1);
               releases[0].name.should.equal('test2');

               done();
            });
         });
      });
   });

   describe('#save', function() {
      it('should save the given release', function(done) {
         var release1 = new _data.Release();
         release1.name = 'test123';
         
         testObject.save(release1, function() {
            _data.Release.find(function(err, releases) {
               releases.should.have.property('length');
               releases.length.should.equal(1);
               releases[0].name.should.equal('test123');

               done();
            });
         });
      });
   });

   describe('#update', function() {
      it('should update the given release', function(done) {
         var release1 = new _data.Release();
         release1.name = 'test123';
         release1.save();
         var idOfRelease = release1.id;
         
         release1.name = 'test345';

         testObject.update(release1, function() {
            _data.Release.findById(idOfRelease, function(err, release) {
               release.should.have.property('name');
               release.name.should.equal('test345');

               done();
            });
         });
      });
   });

   describe('#findById', function() {
      it('should return the release with the specified id', function(done) {
         var release1 = new _data.Release();
         release1.name = 'test1';
         release1.save();
         
         var release2 = new _data.Release();
         release2.name = 'test2';
         release2.save();
         var idOfReleaseToFind = release2.id;

         testObject.findById(idOfReleaseToFind, function(release) {
            release.should.have.property("name");
            release.name.should.equal("test2");
            done();
         });
      });
   });
});

