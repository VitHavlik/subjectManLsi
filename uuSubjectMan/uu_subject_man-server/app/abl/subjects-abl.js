"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subjects-error.js");

const WARNINGS = {

};

class SubjectsAbl {

  constructor() {
    this.validator = Validator.load();
    // this.dao = DaoFactory.getDao("subjects");
  }

  async createSubject(awid, dtoIn) {
    
  }

  async listSubjects(awid, dtoIn) {
    
  }

}

module.exports = new SubjectsAbl();
