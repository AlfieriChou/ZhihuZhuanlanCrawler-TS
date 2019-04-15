"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("./client");
function GetPinnedArticlePidAndAuthor(columnName) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            if (columnName === "") {
                throw new Error('专栏名不能为空');
            }
            url = "https://zhuanlan.zhihu.com/api/columns/" + columnName + "/pinned-article";
            client_1.SendNewZhihuRequest(url)
                .then(function (res) {
                var ret = {
                    'type': res.data.type,
                    'id': res.data.id,
                    'updated': res.data.updated,
                    'created': res.data.created,
                    'title': res.data.title,
                    'image_url': res.data.image_url,
                    'url': res.data.url,
                    'excerpt': res.data.excerpt,
                    'author': res.data.author,
                };
                console.log(ret);
                return ret;
            })
                .catch(function (err) {
                throw err;
            });
            return [2 /*return*/];
        });
    });
}
function _getArticleListPidsByLimitAndOffset(columnName, limit, offset) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            if (columnName === "") {
                throw new Error('专栏名不能为空');
            }
            url = "https://zhuanlan.zhihu.com/api/columns/" + columnName + "/articles?limit=" + limit + "&offset=" + offset;
            console.log(url);
            return [2 /*return*/, client_1.SendNewZhihuRequest(url)
                    .then(function (res) {
                    var articleIds = new Set();
                    res.data.data.forEach(function (ele) {
                        articleIds.add(ele.id);
                    });
                    console.log('articleIds', articleIds);
                    return Promise.resolve(articleIds);
                })
                    .catch(function (err) {
                    return Promise.reject(err);
                })];
        });
    });
}
function GetArticlesListPids(columnName) {
    return __awaiter(this, void 0, void 0, function () {
        var limit, offset, url;
        return __generator(this, function (_a) {
            if (columnName === "") {
                throw new Error('专栏名不能为空');
            }
            limit = 20;
            offset = 0;
            url = "https://zhuanlan.zhihu.com/api/columns/" + columnName + "/articles?limit=" + limit + "&offset=" + offset;
            client_1.SendNewZhihuRequest(url)
                .then(function (res) {
                var articleIds = new Set();
                res.data.data.forEach(function (ele) {
                    articleIds.add(ele.id);
                });
                var tasks = [];
                for (offset = offset + limit; offset < res.data.paging.totals; offset += limit) {
                    var task = _getArticleListPidsByLimitAndOffset(columnName, limit, offset);
                    tasks.push(task);
                }
                Promise.all(tasks)
                    .then(function (res) {
                    console.log('res', res);
                })
                    .catch(function (err) {
                    throw err;
                });
            })
                .catch(function (err) {
                throw err;
            });
            return [2 /*return*/];
        });
    });
}
(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // GetPinnedArticlePidAndAuthor('OTalk')
            return [4 /*yield*/, GetArticlesListPids('OTalk')];
            case 1:
                // GetPinnedArticlePidAndAuthor('OTalk')
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
