"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/topic-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
};

class TopicAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("topic");
  }
  async create(awid, dtoIn, session) {
    // HDS 1
    let validationResult = this.validator.validate("topicCreateDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    let dtoOut
    dtoIn.awid = awid
    // HDS 2
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();
    // HDS 3
    dtoIn.digitalContent = [];
    // HDS 4
    try {
      dtoOut = await this.dao.create(dtoIn)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.TopicDaoCreateFailed({ uuAppErrorMap }, err);
      }
      return err
    }
    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

  async list(awid, dtoIn) {
    //HDS 1.1
    let validationResult = this.validator.validate("topicListDtoInType", dtoIn);
    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.listUnsupportedKeys.code, Errors.List.InvalidDtoIn);
    let dtoOut;
    //HDS 3
    try {
      dtoOut = await this.dao.listBySubjectId(dtoIn.subjectId)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.List.TopicListFailed({ uuAppErrorMap }, err);
      }
      return err;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

}

module.exports = new TopicAbl();
