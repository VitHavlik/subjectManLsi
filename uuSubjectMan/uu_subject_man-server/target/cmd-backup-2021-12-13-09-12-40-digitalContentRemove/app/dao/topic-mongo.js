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
  async get(id){
    let filter = {id: id};
    return await super.findOne(filter);
  }
  async update(topic){
    let filter = { id: topic.id };
    return await super.findOneAndUpdate(filter, topic, "NONE");
  }

  async remove(topicId){
    let filter = { id: topicId };
    return await super.deleteOne(filter);
  }

}

module.exports = TopicMongo;
