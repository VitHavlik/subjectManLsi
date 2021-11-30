"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TopicMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({awid: 1, _id: 1}, {unique: true});
  }
  async create(topic) {
    return await super.insertOne(topic);
  }
  async listBySubjectId(subjectId){
    let filter = {subjectId: subjectId};
    return await super.find(filter);
  }
  async update(topic){
    let filter = { id: subject.id };
    return await super.findOneAndUpdate(filter, topic, "NONE");
  }

}

module.exports = TopicMongo;
