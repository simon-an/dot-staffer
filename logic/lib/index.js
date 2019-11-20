"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var workshop_1 = require("./workshop");
exports.magic = workshop_1.magic;
exports.simpleMagic = workshop_1.simpleMagic;
exports.validateInput = workshop_1.validateInput;
var helpers_1 = require("./helpers");
exports.assignDiscusser = helpers_1.assignDiscusser;
exports.assignCriticicers = helpers_1.assignCriticicers;
exports.forceAssignDiscusser = helpers_1.forceAssignDiscusser;
__export(require("./vote-transformer"));
