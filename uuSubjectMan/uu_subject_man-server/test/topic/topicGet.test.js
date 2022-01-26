// const { TestHelper } = require("uu_appg01_server-test");
// const USE_CASE = "topic/create"

// beforeAll(async () => {
//   await TestHelper.setup();
//   await TestHelper.initUuSubAppInstance();
//   await TestHelper.createUuAppWorkspace();
// });
// beforeEach(async () => {
//     //Turned off auth, profiles are not set up yet
//     await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
//   });

// afterAll(async () => {
//   await TestHelper.teardown();
// });

// describe("Testing topic/get", () => {
//   test("topic/list - HDS", async () => {
//     expect.assertions(5)
 
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
//     result = await TestHelper.executePostCommand("topic/create", dtoIn);
//     dtoIn = {
//         subjectId: result.id,
       
//     }

//     result = await TestHelper.executeGetCommand("topic/list", dtoIn);
 
//     expect(result.status).toEqual(200)
//     expect(result.itemList.length).toBeGreaterThan(0)
//     expect(result.itemList[0]).toHaveProperty("name")
//     expect(result.itemList[0]).toHaveProperty("description")

//     expect(result.itemList[0]).toHaveProperty("digitalContents")
         
//   });

  
  

 

// });
