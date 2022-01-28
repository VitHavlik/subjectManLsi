const { TestHelper } = require("uu_appg01_server-test");
const USE_CASE = "topic/list";

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
    expect.assertions(5);
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
    await TestHelper.executePostCommand("topic/create", dtoIn);
    dtoIn = {
      subjectId: result.id,
    };

    result = await TestHelper.executeGetCommand(USE_CASE, dtoIn);

    expect(result.status).toEqual(200);
    expect(result.itemList.length).toBeGreaterThan(0);
    expect(typeof result.itemList[0].name).toBe("string");
    expect(typeof result.itemList[0].description).toBe("string");
    expect(result.uuAppErrorMap).toEqual({});
  });

  test(`${USE_CASE} - Warning`, async () => {
    expect.assertions(5);
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
    await TestHelper.executePostCommand("topic/create", dtoIn);

    dtoIn = {
      subjectId: result.id,
      unsupportedKey: "Ve středu bude pršet",
    };
    result = await TestHelper.executeGetCommand(USE_CASE, dtoIn);

    expect(result.status).toEqual(200);
    expect(result.itemList.length).toBeGreaterThan(0);
    expect(typeof result.itemList[0].name).toBe("string");
    expect(typeof result.itemList[0].description).toBe("string");
    expect(result.uuAppErrorMap).toEqual(
      expect.objectContaining({
        "uu-subject-man/topic/list/unsupportedKeys": expect.objectContaining({
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

    dtoIn = {
      subjectId: result.id,
      name: "TestTopic1",
      description: "ssss",
    };
    await TestHelper.executePostCommand("topic/create", dtoIn);

    dtoIn = {};

    try {
      await TestHelper.executeGetCommand(USE_CASE, dtoIn);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subject-man/topic/create/invalidDtoIn`);
      expect(error.message).toEqual(`DtoIn is not valid.`);
    }
  });
  //   test(`${USE_CASE} - no topic`, async () => {
  //     expect.assertions(3)
  //     let dtoIn = {
  //         name: "subjectName",
  //        description: "description",
  //        goal: "goal",
  //        credits: 2,
  //        language: "CZ",
  //        guarantor: "Marek Beránek",
  //        teachers: ["Pepa Tronek"]

  // };
  // let result = await TestHelper.executePostCommand("subject/create", dtoIn);

  //      dtoIn = {
  //         subjectId: result.id,
  //         name: "TestTopic1",
  //         description: "ssss"
  //     }
  //      await TestHelper.executePostCommand("topic/create", dtoIn);

  //      dtoIn = {

  //             subjectId: "61e43786104e272dd0c34a42"

  //     }

  //     try{
  //         await TestHelper.executeGetCommand(USE_CASE, dtoIn)
  //     }
  //     catch(error){

  //         expect(error.status).toEqual(400)
  //         expect(error.code).toEqual(`uu-subject-man/topic/create/invalidDtoIn`)
  //         expect(error.message).toEqual(`Topic dont exist`)
  //     }

  //   });
});
