"use strict";
const TopicAbl = require("../../abl/topic-abl.js");

class TopicController {

  update(ucEnv) {
    return TopicAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  remove(ucEnv) {
    return TopicAbl.remove(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return TopicAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return TopicAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.getSession());
  }

}

module.exports = new TopicController();
