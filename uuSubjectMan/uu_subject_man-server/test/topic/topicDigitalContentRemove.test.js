const { TestHelper } = require("uu_appg01_server-test");
const USE_CASE = "topic/digitalContentRemove";

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
    expect.assertions(4);

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
    let topicId = result.id;
    dtoIn = {
      id: result.id,
      name: "New digital content",
      link: "dawdasdwa",
      type: "video",
    };
    result = await TestHelper.executePostCommand("topic/digitalContentAdd", dtoIn);
    dtoIn = {
      id: topicId,
      digitalContentId: result.digitalContents[0].id,
    };

    result = await TestHelper.executePostCommand("topic/digitalContentRemove", dtoIn);

    expect(result.status).toEqual(200);
    expect(result.uuAppErrorMap).toEqual({});
    expect(result.awid).toEqual(TestHelper.getAwid());

    expect(result.digitalContents.length).toBe(0);
  });
  test(`${USE_CASE} - Warning`, async () => {
    expect.assertions(4);

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
    let topicId = result.id;
    dtoIn = {
      id: result.id,
      name: "New digital content",
      link: "dawdasdwa",
      type: "video",
    };
    result = await TestHelper.executePostCommand("topic/digitalContentAdd", dtoIn);
    dtoIn = {
      id: topicId,
      digitalContentId: result.digitalContents[0].id,
      unsupportedKey: "Ve středu bude pršet",
    };

    result = await TestHelper.executePostCommand("topic/digitalContentRemove", dtoIn);

    expect(result.status).toEqual(200);

    expect(result.awid).toEqual(TestHelper.getAwid());

    expect(result.digitalContents.length).toBe(0);

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
    result = await TestHelper.executePostCommand("topic/create", dtoIn);

    dtoIn = {
      id: result.id,
      name: "New digital content",
      link: "dawdasdwa",
      type: "video",
    };
    result = await TestHelper.executePostCommand("topic/digitalContentAdd", dtoIn);

    dtoIn = {
      id: result.digitalContents[0].id,
      digitalContentId: 1,
    };
    try {
      result = await TestHelper.executePostCommand("topic/digitalContentRemove", dtoIn);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subject-man/topic/create/invalidDtoIn`);
      expect(error.message).toEqual(`DtoIn is not valid.`);
    }
  });
  test(`${USE_CASE} - Error no topic`, async () => {
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
    result = await TestHelper.executePostCommand("topic/create", dtoIn);

    dtoIn = {
      id: result.id,
      name: "New digital content",
      link: "dawdasdwa",
      type: "video",
    };
    result = await TestHelper.executePostCommand("topic/digitalContentAdd", dtoIn);

    dtoIn = {
      id: "",
      digitalContentId: result.digitalContents[0].id,
    };
    try {
      await TestHelper.executePostCommand("topic/digitalContentRemove", dtoIn);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subject-man/topic/create/topicDontExist`);
      expect(error.message).toEqual(`Searched topic do not exist.`);
    }
  });
  test(`${USE_CASE} - Error no digital content`, async () => {
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
    result = await TestHelper.executePostCommand("topic/create", dtoIn);

    dtoIn = {
      id: result.id,
      name: "New digital content",
      link: "dawdasdwa",
      type: "video",
    };
    await TestHelper.executePostCommand("topic/digitalContentAdd", dtoIn);

    dtoIn = {
      id: result.id,
      digitalContentId: "",
    };
    try {
      await TestHelper.executePostCommand("topic/digitalContentRemove", dtoIn);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subject-man/topic/create/digitalContentDontExist`);
      expect(error.message).toEqual(`Searched digital content dont exist.`);
    }
  });
});
