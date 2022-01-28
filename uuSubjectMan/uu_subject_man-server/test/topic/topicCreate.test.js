const { TestHelper } = require("uu_appg01_server-test");
const USE_CASE = "topic/create";

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

describe("Testing topic/create", () => {
  test("topic/create - HDS", async () => {
    expect.assertions(6);

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

    dtoIn = {
      subjectId: result.id,
      name: "TestTopic1",
      description: "ssss",
    };
    result = await TestHelper.executePostCommand("topic/create", dtoIn);

    expect(result.status).toEqual(200);
    expect(result.uuAppErrorMap).toEqual({});
    expect(result.awid).toEqual(TestHelper.getAwid());

    expect(result.description).toEqual(dtoIn.description);
    expect(result.name).toEqual(dtoIn.name);

    expect(result.digitalContents).toBeDefined();
  });
  test("topic/create - Warning 2.2.1", async () => {
    expect.assertions(6);

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

    dtoIn = {
      subjectId: result.id,
      name: "TestTopic1",
      description: "ssss",
      unsupportedKey: "Ve středu bude pršet",
    };
    result = await TestHelper.executePostCommand("topic/create", dtoIn);

    expect(result.status).toEqual(200);

    expect(result.awid).toEqual(TestHelper.getAwid());

    expect(result.description).toEqual(dtoIn.description);
    expect(result.name).toEqual(dtoIn.name);

    expect(result.digitalContents).toBeDefined();

    expect(result.uuAppErrorMap).toEqual(
      expect.objectContaining({
        "uu-subject-man/topic/create/unsupportedKeys": expect.objectContaining({
          type: expect.stringContaining("warning"),
          message: expect.stringContaining("DtoIn contains unsupported keys."),
          paramMap: expect.objectContaining({
            unsupportedKeyList: expect.arrayContaining(["$.unsupportedKey"]),
          }),
        }),
      })
    );
  });
  test("topic/create - Error 2.3.1", async () => {
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

    dtoIn = {
      subjectId: result.id,
      name: 123,
      description: "ssss",
    };
    try {
      await TestHelper.executePostCommand("topic/create", dtoIn);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subject-man/topic/create/invalidDtoIn`);
      expect(error.message).toEqual(`DtoIn is not valid.`);
    }
  });
});
