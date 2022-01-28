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

describe("Testing studyProgramme/get", () => {
  test("studyProgramme/get - HDS", async () => {
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

    result = await TestHelper.executeGetCommand("studyProgramme/get", { id: result.id });

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

  test("studyProgramme/get - Error 1.1.1 ", async () => {
    expect.assertions(3);

    let dtoIn = {
      id: "Non existing id",
    };

    try {
      await TestHelper.executeGetCommand("studyProgramme/get", dtoIn);
    } catch (error) {
      //TODO
      //Code create u studyProgramme get?
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subject-man/studyProgramme/create/studyProgrammeDoNotExist`);
      expect(error.message).toEqual(`Searched studyProgramme do not exist.`);
    }
  });
  test("studyProgramme/get - Error 2.3.1 ", async () => {
    expect.assertions(3);

    let dtoIn = {};

    try {
      await TestHelper.executeGetCommand("studyProgramme/get", dtoIn);
    } catch (error) {
      //TODO
      //Code create u studyProgramme get?
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subject-man/studyProgramme/create/invalidDtoIn`);
      expect(error.message).toEqual(`DtoIn is not valid.`);
    }
  });

  test("studyProgramme/get -Warning 2.2.1 ", async () => {
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

    result = await TestHelper.executeGetCommand("studyProgramme/get", {
      id: result.id,
      unsupportedKey: "Ve středu bude pršet",
    });

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
  test("studyProgramme/list - HDS", async () => {
    expect.assertions(8);

    let result = await TestHelper.executeGetCommand("studyProgramme/list");

    expect(result.status).toEqual(200);
    expect(result.itemList.length).toBeGreaterThan(0);
    expect(typeof result.itemList[0].name).toBe("string");
    expect(typeof result.itemList[0].description).toBe("string");
    expect(typeof result.itemList[0].degree).toBe("string");
    expect(typeof result.itemList[0].credits).toBe("number");
    expect(typeof result.itemList[0].languages).toBe("string");
    expect(typeof result.itemList[0].forms).toBe("string");
  });
});
