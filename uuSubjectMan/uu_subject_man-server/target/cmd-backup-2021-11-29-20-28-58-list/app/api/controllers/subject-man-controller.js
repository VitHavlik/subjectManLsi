"use strict";
const SubjectManAbl = require("../../abl/subject-man-abl.js");

class SubjectManController {
  init(ucEnv) {
    return SubjectManAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new SubjectManController();
