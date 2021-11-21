"use strict";
const SubjectsAbl = require("../../abl/subjects-abl.js");

class SubjectsController {

  listSubjects(ucEnv) {
    return SubjectsAbl.listSubjects(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SubjectsController();
