"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var web = require('web-request');
var base = 'https://bank.simple.com';
var Account = (function () {
    function Account() {
    }
    Account.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Account().login(username, password);
        });
    };
    Account.prototype.getCSRF = function () {
        return __awaiter(this, void 0, Promise, function* () {
            var result = yield web.get(base, { jar: true });
            var _a = /<meta name="_csrf" content="(.*)">/.exec(result.content), token = _a[1];
            return token;
        });
    };
    Account.prototype.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var form = {
                username: username,
                password: password,
                _csrf: yield this.getCSRF(),
            };
            var response = yield web.post(base + "/signin", { jar: true }, form);
            if (response.statusCode !== 303)
                throw new Error("Login failed: " + response.statusCode + " " + response.statusMessage);
            return this;
        });
    };
    Account.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield web.get(base + "/signout", { jar: true });
        });
    };
    Account.prototype.card = function () {
        return __awaiter(this, void 0, void 0, function* () {
            return web.json(base + "/card", { jar: true });
        });
    };
    Account.prototype.balance = function () {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield web.json(base + "/account/balances", { jar: true });
            result.total /= 10000;
            result.safe_to_spend /= 10000;
            return result;
        });
    };
    Account.prototype.external = function () {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield web.json(base + "/linked-accounts", { jar: true });
            return result.accounts;
        });
    };
    Account.prototype.transactions = function () {
        return __awaiter(this, void 0, void 0, function* () {
            return web.json(base + "/transactions/data", { jar: true });
        });
    };
    return Account;
}());
exports.Account = Account;
