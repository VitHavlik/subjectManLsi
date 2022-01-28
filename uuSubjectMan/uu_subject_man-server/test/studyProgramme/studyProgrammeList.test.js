const { TestHelper } = require("uu_appg01_server-test");
const USE_CASE = "studyProgramme/list";

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
      name: "Softwarový vývoj 2",
      description: "-",
      degree: "bachelor",
      credits: 180,
      languages: "CZ",
      forms: "part-time",
    };
    await TestHelper.executePostCommand("studyProgramme/create", dtoIn);

    let result = await TestHelper.executeGetCommand(USE_CASE);

    expect(result.status).toEqual(200);
    expect(result.itemList.length).toBeGreaterThan(0);
    expect(typeof result.itemList[0].name).toBe("string");
    expect(typeof result.itemList[0].description).toBe("string");
    expect(typeof result.itemList[0].degree).toBe("string");
    expect(typeof result.itemList[0].credits).toBe("number");
    expect(typeof result.itemList[0].languages).toBe("string");
    expect(typeof result.itemList[0].forms).toBe("string");
    expect(result.uuAppErrorMap).toEqual({});
  });
});
