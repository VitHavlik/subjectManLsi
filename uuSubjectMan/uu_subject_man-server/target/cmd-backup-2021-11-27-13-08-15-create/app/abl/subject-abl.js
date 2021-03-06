"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
};
const AUTHORITIES_PROFILE = "Authorities"

class SubjectAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
  }

  async create(awid, dtoIn, session, authorizationResult) {
    // HDS 1
    let validationResult = this.validator.validate("subjectCreateDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    let dtoOut
    dtoIn.awid = awid
    // HDS 3
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();
    // HDS 4
    try {
      dtoOut = await this.dao.create(dtoIn)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.SubjectDaoCreateFailed({ uuAppErrorMap }, e);
      }
      return err
    }
    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

  async list(awid, dtoIn, session, authorizationResult) {

    let uuAppErrorMap;
    let dtoOut;
    // HDS 4
    try {
      dtoOut = await this.dao.list(awid);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.SubjectListFailed({ uuAppErrorMap }, e);
      }
      return err
    }
    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut
  }

  

}

module.exports = new SubjectAbl();
