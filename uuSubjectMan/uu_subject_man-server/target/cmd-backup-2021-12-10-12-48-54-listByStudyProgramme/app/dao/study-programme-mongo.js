"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class StudyProgrammeMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({awid: 1, _id: 1}, {unique: true});
  }
  async create(studyProgramme) {
    return await super.insertOne(studyProgramme);
  }

  async list() {
    return await super.find({});
  }

  async get(studyProgrammeId) {
    let filter = {id: studyProgrammeId};
    return await super.findOne(filter);
  }

  async getWithSubjects(studyProgrammeId){
    let aggregation = [
      {"$addFields":{
        "stprgId": {
          "$toString": "$_id"
        }
      }},
      {"$lookup":{
        "from": "subject",
        "localField": "stprgId",
        "foreignField": "studyProgrammeId",
        "as": "subjects"
      }},
      {"$match":{
        "stprgId": studyProgrammeId
      }}
    ]
    return await super.aggregate(aggregation);
  }

  async update(studyProgramme){
    let filter = { id: studyProgramme.id };
    return await super.findOneAndUpdate(filter, studyProgramme, "NONE");
  }
}

module.exports = StudyProgrammeMongo;
