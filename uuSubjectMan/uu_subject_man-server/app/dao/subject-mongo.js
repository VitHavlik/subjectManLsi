"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SubjectMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({awid: 1, _id: 1}, {unique: true});
  }
  async create(subject) {
    return await super.insertOne(subject);
  }

  async list() {
    let filter = {};
    return await super.find(filter);
  }

  async listByStudyProgrammeId(studyProgrammeId) {
    let filter = {"studyProgrammes.studyProgrammeId": studyProgrammeId};
    return await super.find(filter);
  }

  async get(subjectId){
    let filter = {id: subjectId};
    return await super.findOne(filter);
  }

  async getWithTopics(subjectId){
    let aggregation = [
      {"$addFields":{
        "sbjId": {
          "$toString": "$_id"
        }
      }},
      {"$lookup":{
        "from": "topic",
        "localField": "sbjId",
        "foreignField": "subjectId",
        "as": "topics"
      }},
      {"$match":{
        "sbjId": subjectId
      }}
    ]
    return await super.aggregate(aggregation);
  }

  async update(subject){
    let filter = { id: subject.id };
    return await super.findOneAndUpdate(filter, subject, "NONE");
  }
}

module.exports = SubjectMongo;
