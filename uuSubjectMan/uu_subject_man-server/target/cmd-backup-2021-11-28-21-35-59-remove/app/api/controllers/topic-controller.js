"use strict";
const TopicAbl = require("../../abl/topic-abl.js");

class TopicController {

  list(ucEnv) {
    return TopicAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return TopicAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.getSession());
  }

}

module.exports = new TopicController();
