"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/topic-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
};

class TopicAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
  }

  async create(awid, dtoIn) {
    //HDS 1.1
    let validationResult = this.validator.validate("topicCreateDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    let dtoOut;
    let foundSubject;

    //HDS 3
    try {
      foundSubject = await this.dao.get(dtoIn.subjectId)
    }
    catch (err) {
      return err;
    }
    if(!foundSubject)
      throw new Errors.Create.TopicFindSubjectOnCreateFailed({ uuAppErrorMap }); 


    //HDS 4
    if(foundSubject.topics === undefined)
      ///HDS 4.A.1  
      foundSubject.topics = [];
    else
      //HDS 4.B
      foundSubject.topics.push({
        name: dtoIn.name,
        description: dtoIn.description
      });

    // HDS 5
    try {
      console.log(foundSubject);
      dtoOut = await this.dao.update(foundSubject);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.TopicDaoCreateFailed({ uuAppErrorMap }, err);
      }
      return err
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

}

module.exports = new TopicAbl();
