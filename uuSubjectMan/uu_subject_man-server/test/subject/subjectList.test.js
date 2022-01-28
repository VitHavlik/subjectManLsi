const { TestHelper } = require("uu_appg01_server-test");
const USE_CASE = "subject/list";

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

    result = await TestHelper.executeGetCommand("subject/list");

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
});
