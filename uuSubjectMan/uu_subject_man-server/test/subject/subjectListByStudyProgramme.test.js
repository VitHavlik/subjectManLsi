const { TestHelper } = require("uu_appg01_server-test");
const USE_CASE = "subject/listByStudyProgramme";

beforeAll(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
});
beforeEach(async () => {
  //Turned off auth, profiles are not set up yet
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe(`Testing ${USE_CASE}`, () => {
  test(`${USE_CASE} - HDS`, async () => {
    expect.assertions(9);
    let dtoIn = {
      name: "subjectName",
      description: "description",
      goal: "goal",
      credits: 2,
      language: "CZ",
      guarantor: "Marek Beránek",
      teachers: ["Pepa Tronek"],
    };
    let result = await TestHelper.executePostCommand("subject/create", dtoIn);
    let subjectId = result.id;
    dtoIn = {
      name: "Softwarový vývoj 2",
      description: "-",
      degree: "bachelor",
      credits: 180,
      languages: "CZ",
      forms: "part-time",
    };
    result = await TestHelper.executePostCommand("studyProgramme/create", dtoIn);
    let studyProgrammeId = result.id;
    dtoIn = {
      studyProgrammeId,
      semester: 2,
      id: subjectId,
    };

    await TestHelper.executePostCommand("subject/assignSubject", dtoIn);
    dtoIn = {
      studyProgrammeId,
    };

    result = await TestHelper.executeGetCommand("subject/listByStudyProgramme", dtoIn);

    expect(result.status).toEqual(200);
    expect(typeof result.itemList[0].name).toBe("string");
    expect(typeof result.itemList[0].credits).toBe("number");
    expect(typeof result.itemList[0].goal).toBe("string");
    expect(typeof result.itemList[0].language).toBe("string");
    expect(typeof result.itemList[0].guarantor).toBe("string");
    expect(Array.isArray(result.itemList[0].teachers)).toBe(true);
    expect(Array.isArray(result.itemList[0].studyProgrammes)).toBe(true);
    expect(result.uuAppErrorMap).toEqual({});
  });

  test(`${USE_CASE} - Warning`, async () => {
    expect.assertions(9);
    let dtoIn = {
      name: "subjectName",
      description: "description",
      goal: "goal",
      credits: 2,
      language: "CZ",
      guarantor: "Marek Beránek",
      teachers: ["Pepa Tronek"],
    };
    let result = await TestHelper.executePostCommand("subject/create", dtoIn);
    let subjectId = result.id;
    dtoIn = {
      name: "Softwarový vývoj 2",
      description: "-",
      degree: "bachelor",
      credits: 180,
      languages: "CZ",
      forms: "part-time",
    };
    result = await TestHelper.executePostCommand("studyProgramme/create", dtoIn);
    let studyProgrammeId = result.id;
    dtoIn = {
      studyProgrammeId,
      semester: 2,
      id: subjectId,
    };

    await TestHelper.executePostCommand("subject/assignSubject", dtoIn);
    dtoIn = {
      studyProgrammeId,
      unsupportedKey: "unsupported key",
    };

    result = await TestHelper.executeGetCommand("subject/listByStudyProgramme", dtoIn);

    expect(result.status).toEqual(200);
    expect(typeof result.itemList[0].name).toBe("string");
    expect(typeof result.itemList[0].credits).toBe("number");
    expect(typeof result.itemList[0].goal).toBe("string");
    expect(typeof result.itemList[0].language).toBe("string");
    expect(typeof result.itemList[0].guarantor).toBe("string");
    expect(Array.isArray(result.itemList[0].teachers)).toBe(true);
    expect(Array.isArray(result.itemList[0].studyProgrammes)).toBe(true);
    expect(result.uuAppErrorMap).toEqual(
      expect.objectContaining({
        "uu-subject-man/subject/create/unsupportedKeys": expect.objectContaining({
          type: expect.stringContaining("warning"),
          message: expect.stringContaining("DtoIn contains unsupported keys."),
          paramMap: expect.objectContaining({
            unsupportedKeyList: expect.arrayContaining(["$.unsupportedKey"]),
          }),
        }),
      })
    );
  });

  test(`${USE_CASE} - Error`, async () => {
    expect.assertions(3);
    let dtoIn = {
      name: "subjectName",
      description: "description",
      goal: "goal",
      credits: 2,
      language: "CZ",
      guarantor: "Marek Beránek",
      teachers: ["Pepa Tronek"],
    };
    let result = await TestHelper.executePostCommand("subject/create", dtoIn);
    let subjectId = result.id;
    dtoIn = {
      name: "Softwarový vývoj 2",
      description: "-",
      degree: "bachelor",
      credits: 180,
      languages: "CZ",
      forms: "part-time",
    };
    result = await TestHelper.executePostCommand("studyProgramme/create", dtoIn);

    dtoIn = {
      studyProgrammeId: result.id,
      semester: 2,
      id: subjectId,
    };

    await TestHelper.executePostCommand("subject/assignSubject", dtoIn);
    dtoIn = {};

    try {
      await TestHelper.executeGetCommand("subject/listByStudyProgramme", dtoIn);
    } catch (error) {
      //TODO
      //Code create u studyProgramme get?
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subject-man/subject/create/invalidDtoIn`);
      expect(error.message).toEqual(`DtoIn is not valid.`);
    }
  });
});
