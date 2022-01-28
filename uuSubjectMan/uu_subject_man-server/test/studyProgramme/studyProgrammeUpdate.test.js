const { TestHelper } = require("uu_appg01_server-test");
const USE_CASE = "studyProgramme/create";

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

describe("Testing studyProgramme/update", () => {
  test("studyProgramme/update - HDS", async () => {
    expect.assertions(9);

    let dtoIn = {
      name: "Softwarový vývoj 2",
      description: "-",
      degree: "bachelor",
      credits: 180,
      languages: "CZ",
      forms: "part-time",
    };
    let result = await TestHelper.executePostCommand("studyProgramme/create", dtoIn);
    dtoIn = {
      id: result.id,
      name: "Softwarový vývoj 3",
      description: "-",
      degree: "bachelor",
      credits: 18,
      languages: "CZ",
      forms: "part-time",
    };

    result = await TestHelper.executePostCommand("studyProgramme/update", dtoIn);

    expect(result.status).toEqual(200);
    expect(result.uuAppErrorMap).toEqual({});
    expect(result.awid).toEqual(TestHelper.getAwid());

    expect(result.description).toEqual(dtoIn.description);
    expect(result.name).toEqual(dtoIn.name);
    expect(result.degree).toEqual(dtoIn.degree);
    expect(result.credits).toEqual(dtoIn.credits);
    expect(result.language).toEqual(dtoIn.language);
    expect(result.forms).toEqual(dtoIn.forms);
  });

  test("studyProgramme/update - Warning 2.2.1", async () => {
    expect.assertions(9);

    let dtoIn = {
      name: "Softwarový vývoj 2",
      description: "-",
      degree: "bachelor",
      credits: 180,
      languages: "CZ",
      forms: "part-time",
    };
    let result = await TestHelper.executePostCommand("studyProgramme/create", dtoIn);
    dtoIn = {
      id: result.id,
      name: "Softwarový vývoj 3",
      description: "-",
      degree: "bachelor",
      credits: 18,
      languages: "CZ",
      forms: "part-time",
      unsupportedKey: "Ve středu bude pršet",
    };

    result = await TestHelper.executePostCommand("studyProgramme/update", dtoIn);

    expect(result.status).toEqual(200);
    expect(result.awid).toEqual(TestHelper.getAwid());

    expect(result.description).toEqual(dtoIn.description);
    expect(result.name).toEqual(dtoIn.name);
    expect(result.degree).toEqual(dtoIn.degree);
    expect(result.credits).toEqual(dtoIn.credits);
    expect(result.language).toEqual(dtoIn.language);
    expect(result.forms).toEqual(dtoIn.forms);

    expect(result.uuAppErrorMap).toEqual(
      expect.objectContaining({
        "uu-subject-man/studyProgramme/create/unsupportedKeys": expect.objectContaining({
          type: expect.stringContaining("warning"),
          message: expect.stringContaining("DtoIn contains unsupported keys."),
          paramMap: expect.objectContaining({
            unsupportedKeyList: expect.arrayContaining(["$.unsupportedKey"]),
          }),
        }),
      })
    );
  });

  test("studyProgramme/update - Error 1.3.1", async () => {
    expect.assertions(3);
    let dtoIn = {
      name: "Softwarový vývoj 2",
      description: "-",
      degree: "bachelor",
      credits: 180,
      languages: "CZ",
      forms: "part-time",
    };
    let result = await TestHelper.executePostCommand("studyProgramme/create", dtoIn);

    dtoIn = {
      id: result.id,
      name: "Softwarový vývoj 3",
      description: "-",
      degree: "bachelor",
      credits: 18,
      languages: 2,
      forms: "part-time",
    };

    try {
      result = await TestHelper.executePostCommand("studyProgramme/update", dtoIn);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subject-man/studyProgramme/create/invalidDtoIn`);
      expect(error.message).toEqual(`DtoIn is not valid.`);
    }
  });
});
