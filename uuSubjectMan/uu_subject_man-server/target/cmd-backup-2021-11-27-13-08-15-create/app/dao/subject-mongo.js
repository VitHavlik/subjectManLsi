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

}

module.exports = SubjectMongo;
