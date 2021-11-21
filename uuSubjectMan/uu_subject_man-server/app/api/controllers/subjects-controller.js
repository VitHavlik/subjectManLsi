"use strict";
const SubjectsAbl = require("../../abl/subjects-abl.js");

class SubjectsController {

  createSubject(ucEnv) {
    return SubjectsAbl.createSubject(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  listSubjects(ucEnv) {
    return SubjectsAbl.listSubjects(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new SubjectsController();
