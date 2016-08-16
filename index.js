"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var Account_1 = require('./lib/Account');
__export(require('./lib/Account'));
function account() {
    return new Account_1.Account();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = account;
