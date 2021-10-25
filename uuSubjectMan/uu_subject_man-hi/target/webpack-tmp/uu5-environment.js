
var devConfig = require("C:\\Programovani\\VSCODE\\uun_project_team_repo_BPMI21WPT18\\uuSubjectMan\\uu_subject_man-hi\\env\\development.json").uu5Environment;
var config = require("C:\\Programovani\\VSCODE\\uun_project_team_repo_BPMI21WPT18\\uuSubjectMan\\uu_subject_man-hi\\env\\production.json").uu5Environment || {};
if (devConfig) for (var k in devConfig) config[k] = devConfig[k];
window.UU5 = { Environment: config };
