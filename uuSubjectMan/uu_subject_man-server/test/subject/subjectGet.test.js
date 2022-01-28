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

describe("Testing subject/get", () => {
  test("subject/get - HDS", async () => {
    expect.assertions(7);
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

    result = await TestHelper.executeGetCommand("subject/get", { id: result.id });

    expect(result.status).toEqual(200);
    expect(result.name).toBeDefined();
    expect(result.credits).toBeDefined();
    expect(result.goal).toBeDefined();
    expect(result.language).toBeDefined();
    expect(result.guarantor).toBeDefined();
    expect(result.teachers).toBeDefined();
  });

  test("subject/get - Error 1.1.1 ", async () => {
    expect.assertions(3);

    let dtoIn = {
      id: "Non existing id",
    };

    try {
      await TestHelper.executeGetCommand("subject/get", dtoIn);
    } catch (error) {
      //TODO
      //Code create u subject get?
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subject-man/subject/create/subjectGetDontExist`);
      expect(error.message).toEqual(`Searched subject do not exist.`);
    }
  });
  test("subject/get - Error 2.3.1 ", async () => {
    expect.assertions(3);

    let dtoIn = {};

    try {
      await TestHelper.executeGetCommand("subject/get", dtoIn);
    } catch (error) {
      //TODO
      //Code create u subject get?
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subject-man/subject/create/invalidDtoIn`);
      expect(error.message).toEqual(`DtoIn is not valid.`);
    }
  });

  test("subject/get - Error 2.2.1 ", async () => {
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

    result = await TestHelper.executeGetCommand("subject/get", {
      id: result.id,
      unsupportedKey: "Ve středu bude pršet",
    });

    expect(result.status).toEqual(200);

    expect(result.awid).toEqual(TestHelper.getAwid());

    expect(result.name).toBeDefined();
    expect(result.credits).toBeDefined();
    expect(result.goal).toBeDefined();
    expect(result.language).toBeDefined();
    expect(result.guarantor).toBeDefined();
    expect(result.teachers).toBeDefined();
    // expect(result.status).toEqual(200)
    // expect(typeof result.itemList[0].name).toBe("string")
    // expect(typeof result.itemList[0].credits).toBe("number")
    // expect(typeof result.itemList[0].goal).toBe("string")
    // expect(typeof result.itemList[0].language).toBe("string")
    // expect(typeof result.itemList[0].guarantor).toBe("string")
    // expect(Array.isArray(result.itemList[0].teachers)).toBe(true)
    // expect(Array.isArray(result.itemList[0].studyProgrammes)).toBe(true)
    // expect(result.uuAppErrorMap).toEqual({})
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
  test("subject/list - HDS", async () => {
    expect.assertions(9);

    result = await TestHelper.executeGetCommand("subject/list");

    expect(result.status).toEqual(200);
    expect(result.itemList.length).toBeGreaterThan(0);
    expect(result.itemList[0]).toHaveProperty("name");
    expect(result.itemList[0]).toHaveProperty("credits");
    expect(result.itemList[0]).toHaveProperty("goal");
    expect(result.itemList[0]).toHaveProperty("language");
    expect(result.itemList[0]).toHaveProperty("guarantor");
    expect(result.itemList[0]).toHaveProperty("teachers");
    expect(result.itemList[0]).toHaveProperty("studyProgrammes");
  });
});
