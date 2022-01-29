
var devConfig = require("C:\\Users\\Vita\\unicorn\\subjectman\\SubjectMan\\uuSubjectMan\\uu_subject_man-hi\\env\\development.json").uu5Environment;
var config = require("C:\\Users\\Vita\\unicorn\\subjectman\\SubjectMan\\uuSubjectMan\\uu_subject_man-hi\\env\\production.json").uu5Environment || {};
if (devConfig) for (var k in devConfig) config[k] = devConfig[k];
window.UU5 = { Environment: config };
