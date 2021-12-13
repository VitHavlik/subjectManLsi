"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/study-programme-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
};

class StudyProgrammeAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("studyProgramme");
  }

  async create(awid, dtoIn, session) {
    // HDS 2
    let validationResult = this.validator.validate("studyProgrammeCreateDtoInType", dtoIn);
    // HDS 2.2, 2.3 A 2.2.1, A. 2.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    let dtoOut
    // HDS 3
    dtoIn.awid = awid
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();
    dtoIn.state = "init";
    try {
      dtoOut = await this.dao.create(dtoIn)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.StudyProgrammeDaoCreateFailed({ uuAppErrorMap }, err);
      }
      return err
    }
    // HDS 4
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

  async list(awid, dtoIn) {
    let uuAppErrorMap = {};
    let dtoOut;

    try {
      dtoOut = await this.dao.list(awid);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.List.StudyProgrammeDaoListFailed({ uuAppErrorMap }, err);
      }
      return err
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut
  }

  async get(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("studyProgrammeGetDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Get.InvalidDtoIn);

    let dtoOut;

    try {
      dtoOut = await this.dao.get(dtoIn.id);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Get.StudyProgrammeDaoGetFailed({ uuAppErrorMap }, err);
      }
      return err
    }

    if (!dtoOut)
      throw new Errors.Get.StudyProgrammeDoNotExist({ uuAppErrorMap });

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut
  }

  async update(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("studyProgrammeUpdateDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Update.InvalidDtoIn);

    let dtoOut
    try {
      dtoOut = await this.dao.update(dtoIn);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Update.StudyProgrammeDaoUpdateFailed({ uuAppErrorMap }, err);
      }
      return err
    }
    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

}

module.exports = new StudyProgrammeAbl();
