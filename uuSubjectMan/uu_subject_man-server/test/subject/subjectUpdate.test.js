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

describe("Testing subject/update", () => {
  test("subject/update - HDS", async () => {
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

    dtoIn = {
      id: result.id,
      name: "subjectName",
      description: "description",
      goal: "goal",
      credits: 105,
      language: "CZ",
      guarantor: "Marek Beránek",
      teachers: ["Pepa Tronek"],
    };
    result = await TestHelper.executePostCommand("subject/update", dtoIn);

    expect(result.status).toEqual(200);
    expect(result.uuAppErrorMap).toEqual({});
    expect(result.awid).toEqual(TestHelper.getAwid());

    expect(result.description).toEqual(dtoIn.description);
    expect(result.goal).toEqual(dtoIn.goal);
    expect(result.credits).toEqual(dtoIn.credits);
    expect(result.language).toEqual(dtoIn.language);
    expect(result.guarantor).toEqual(dtoIn.guarantor);
    expect(result.teachers).toEqual(dtoIn.teachers);
  });
  test("subject/update - Warning 2.2.1", async () => {
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

    dtoIn = {
      id: result.id,
      name: "subjectName",
      description: "description",
      goal: "goal",
      credits: 105,
      language: "CZ",
      guarantor: "Marek Beránek",
      teachers: ["Pepa Tronek"],
      unsupportedKey: "unsupported key",
    };
    result = await TestHelper.executePostCommand("subject/update", dtoIn);

    expect(result.status).toEqual(200);

    expect(result.awid).toEqual(TestHelper.getAwid());

    expect(result.description).toEqual(dtoIn.description);
    expect(result.goal).toEqual(dtoIn.goal);
    expect(result.credits).toEqual(dtoIn.credits);
    expect(result.language).toEqual(dtoIn.language);
    expect(result.guarantor).toEqual(dtoIn.guarantor);
    expect(result.teachers).toEqual(dtoIn.teachers);

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

  test("subject/update - Error 1.3.1", async () => {
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
      id: result.id,
      name: "subjectName",
      description: "description",
      goal: "goal",
      credits: 2,
      language: 3,
      guarantor: "Marek Beránek",
      teachers: ["Pepa Tronek"],
    };

    try {
      result = await TestHelper.executePostCommand("subject/update", dtoIn);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.code).toEqual(`uu-subject-man/subject/create/invalidDtoIn`);
      expect(error.message).toEqual(`DtoIn is not valid.`);
    }
  });
});
