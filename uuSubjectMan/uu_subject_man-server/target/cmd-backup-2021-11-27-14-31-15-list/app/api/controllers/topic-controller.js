"use strict";
const TopicAbl = require("../../abl/topic-abl.js");

class TopicController {

  create(ucEnv) {
    return TopicAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new TopicController();
