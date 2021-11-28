"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SubjectMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({awid: 1, _id: 1}, {unique: true});
  }
  async create(subject) {
    return await super.insertOne(subject);
  }
  async list(awid) {
    return await super.find({ awid });
  }
  async get(subjectId){
    let filter = {id: subjectId};
    return await super.findOne(filter);
  }
  async update(subject){
    console.log(subject);
    let filter = { id: subject.id };
    return await super.findOneAndUpdate(filter, subject, "NONE");
  }

}

module.exports = SubjectMongo;
