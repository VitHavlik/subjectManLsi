// workaround for pnpm which generates NODE_PATH into node_modules\.bin\*.cmd files
// - without it debugging wouldn't work because the resolving of files would behave differently when
// run via "npm test" (cmd line) vs. "node node_modules\...\jest-cli\bin\jest.js" (IDE debug)
require("uu_appg01_devkit/src/config/jest-pnpm-node-path-fix.js");

module.exports = {
  "testEnvironment": "node",
  "rootDir": "C:\\Users\\Vita\\unicorn\\subjectman\\SubjectMan\\uuSubjectMan\\uu_subject_man-server",
  "setupFiles": [
    "C:\\Users\\Vita\\unicorn\\subjectman\\SubjectMan\\uuSubjectMan\\uu_subject_man-server\\node_modules\\uu_appg01_devkit\\src\\config\\jest-node-config-profiles.js"
  ],
  "setupFilesAfterEnv": [
    "C:\\Users\\Vita\\unicorn\\subjectman\\SubjectMan\\uuSubjectMan\\uu_subject_man-server\\node_modules\\uu_appg01_devkit\\src\\config\\jest-node-default-timeout.js"
  ],
  "testPathIgnorePatterns": [
    "/node_modules/",
    "<rootDir>/dist.*",
    "<rootDir>/public/",
    "<rootDir>/target/",
    "/templates/",
    "/test\\.js$"
  ],
  "coverageDirectory": "C:\\Users\\Vita\\unicorn\\subjectman\\SubjectMan\\uuSubjectMan\\uu_subject_man-server\\target\\coverage",
  "coverageReporters": []
}