const { TestHelper } = require("uu_appg01_server-test");
const USE_CASE = "subject/create";

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

describe("Testing subject/create", () => {
  test("subject/assignSubject - HDS", async () => {
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

    dtoIn = {
      studyProgrammeId: result.id,
      semester: 2,
      id: subjectId,
    };

    result = await TestHelper.executePostCommand("subject/assignSubject", dtoIn);

    expect(result.status).toEqual(200);
    expect(typeof result.name).toBe("string");
    expect(typeof result.credits).toBe("number");
    expect(typeof result.goal).toBe("string");
    expect(typeof result.language).toBe("string");
    expect(typeof result.guarantor).toBe("string");
    expect(Array.isArray(result.teachers)).toBe(true);
    expect(Array.isArray(result.studyProgrammes)).toBe(true);
    expect(result.uuAppErrorMap).toEqual({});
  });

  test("subject/assignSubject - Warning", async () => {
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

    dtoIn = {
      studyProgrammeId: result.id,
      semester: 2,
      id: subjectId,
      unsupportedKey: "Unsupported key",
    };

    result = await TestHelper.executePostCommand("subject/assignSubject", dtoIn);

    expect(result.status).toEqual(200);
    expect(typeof result.name).toBe("string");
    expect(typeof result.credits).toBe("number");
    expect(typeof result.goal).toBe("string");
    expect(typeof result.language).toBe("string");
    expect(typeof result.guarantor).toBe("string");
    expect(Array.isArray(result.teachers)).toBe(true);
    expect(Array.isArray(result.studyProgrammes)).toBe(true);
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
  test("subject/assignSubject - Error", async () => {
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
      semester: "some string",
      id: subjectId,
    };
    try {
      result = await TestHelper.executePostCommand("subject/assignSubject", dtoIn);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subject-man/subject/create/invalidDtoIn`);
      expect(error.message).toEqual(`DtoIn is not valid.`);
    }
  });
});
