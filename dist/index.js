"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@serverless-devs/core"));
// @ts-ignore
var core_1 = require("@serverless-devs/core");
var client_1 = __importDefault(require("./lib/client"));
var utils = __importStar(require("./lib/utils"));
var inputHandler = __importStar(require("./lib/input-handler"));
var outputHandler = __importStar(require("./lib/output-handler"));
var HELP = __importStar(require("./lib/help"));
var logger_1 = __importDefault(require("./common/logger"));
var oss_service_1 = __importDefault(require("./lib/oss.service"));
var cache_1 = require("./common/cache");
var write_file_1 = __importDefault(require("./lib/write-file"));
var exec_1 = __importDefault(require("./cmd/exec"));
var lodash = core.lodash;
var getLink = function (changeOrderId) { return "\u67E5\u770B\u8BE6\u60C5\uFF1A\nhttps://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId; };
var SaeComponent = /** @class */ (function () {
    function SaeComponent() {
    }
    SaeComponent.prototype.sync = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, _a, isHelp, appName, namespaceId, region, credentials, data, vm, app, res, configs, configYmlPath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args;
                        return [4 /*yield*/, inputHandler.handlerSyncInputs(args)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, appName = _a.appName, namespaceId = _a.namespaceId, region = _a.region;
                        if (isHelp) {
                            core.help(HELP.SYNC);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 4:
                        data = _b.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName);
                            return [2 /*return*/];
                        }
                        vm = core_1.spinner("\u5BFC\u51FA\u914D\u7F6E");
                        app = data['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 5:
                        res = _b.sent();
                        write_file_1.default.access = inputs.project.access;
                        write_file_1.default.projectName = inputs.project.projectName;
                        return [4 /*yield*/, utils.getSyncConfig(inputs, res)];
                    case 6:
                        configs = _b.sent();
                        return [4 /*yield*/, write_file_1.default.writeSYml(process.cwd(), configs, region, app['namespaceId'], appName)];
                    case 7:
                        configYmlPath = _b.sent();
                        vm.stop();
                        logger_1.default.success("\u914D\u7F6E\u6587\u4EF6\u5DF2\u6210\u529F\u4E0B\u8F7D\uFF1A" + configYmlPath);
                        return [2 /*return*/, { configs: configs, configYmlPath: configYmlPath }];
                }
            });
        });
    };
    SaeComponent.prototype.rescale = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _a, isHelp, replicas, appName, namespaceId, region, credentials, data, appId, vm, orderId, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, inputHandler.handlerReScaleInputs(args, application)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, replicas = _a.replicas, appName = _a.appName, namespaceId = _a.namespaceId, region = _a.region;
                        if (isHelp) {
                            core.help(HELP.RESCALE);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 4:
                        data = _b.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName);
                            return [2 /*return*/];
                        }
                        appId = data['Data']['Applications'][0]['AppId'];
                        vm = core_1.spinner("\u5E94\u7528\u6269\u7F29\u5BB9");
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, client_1.default.saeClient.rescaleApplication(appId, replicas)];
                    case 6:
                        orderId = _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + error_1);
                        return [2 /*return*/];
                    case 8:
                        if (lodash.isEmpty(orderId)) {
                            vm.stop();
                            logger_1.default.success('replicas无变动');
                            return [2 /*return*/];
                        }
                        // 检查状态
                        vm.text = "\u5E94\u7528\u6269\u7F29\u5BB9" + appName + "..." + getLink(orderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 9:
                        _b.sent();
                        vm.stop();
                        logger_1.default.success('完成应用扩缩容');
                        return [2 /*return*/];
                }
            });
        });
    };
    // empty commander
    SaeComponent.prototype.plan = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {}];
            });
        });
    };
    SaeComponent.prototype.start = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _a, isHelp, assumeYes, appName, namespaceId, region, credentials, data, startStatus, ex_1, appId, vm, orderId, error_2, data2, app, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, inputHandler.handlerStartInputs(args, application)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, assumeYes = _a.assumeYes, appName = _a.appName, namespaceId = _a.namespaceId, region = _a.region;
                        if (isHelp) {
                            core.help(HELP.START);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 4:
                        data = _b.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName);
                            return [2 /*return*/];
                        }
                        if (!!assumeYes) return [3 /*break*/, 8];
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, outputHandler.startPlan()];
                    case 6:
                        startStatus = _b.sent();
                        if (startStatus !== 'assumeYes') {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        ex_1 = _b.sent();
                        if ((ex_1 === null || ex_1 === void 0 ? void 0 : ex_1.name) === 'CatchableError') {
                            throw ex_1;
                        }
                        // 异常：不作处理兜底
                        logger_1.default.debug("error: " + ex_1.message);
                        return [3 /*break*/, 8];
                    case 8:
                        appId = data['Data']['Applications'][0]['AppId'];
                        vm = core_1.spinner("\u542F\u52A8\u5E94\u7528");
                        _b.label = 9;
                    case 9:
                        _b.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, client_1.default.saeClient.startApplication(appId)];
                    case 10:
                        orderId = _b.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_2 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + error_2);
                        return [2 /*return*/];
                    case 12:
                        // 检查状态
                        vm.text = "\u542F\u52A8\u5E94\u7528" + appName + "..." + getLink(orderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 13:
                        _b.sent();
                        vm.stop();
                        logger_1.default.success('已启动应用');
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 14:
                        data2 = _b.sent();
                        app = data2['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 15:
                        res = _b.sent();
                        res.componentType = "sae";
                        return [2 /*return*/, res];
                }
            });
        });
    };
    SaeComponent.prototype.stop = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _a, isHelp, assumeYes, appName, namespaceId, region, credentials, data, stopStatus, ex_2, appId, vm, orderId, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, inputHandler.handlerStopInputs(args, application)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, assumeYes = _a.assumeYes, appName = _a.appName, namespaceId = _a.namespaceId, region = _a.region;
                        if (isHelp) {
                            core.help(HELP.STOP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 4:
                        data = _b.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName);
                            return [2 /*return*/];
                        }
                        if (!!assumeYes) return [3 /*break*/, 8];
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, outputHandler.stopPlan()];
                    case 6:
                        stopStatus = _b.sent();
                        if (stopStatus !== 'assumeYes') {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        ex_2 = _b.sent();
                        if ((ex_2 === null || ex_2 === void 0 ? void 0 : ex_2.name) === 'CatchableError') {
                            throw ex_2;
                        }
                        // 异常：不作处理兜底
                        logger_1.default.debug("error: " + ex_2.message);
                        return [3 /*break*/, 8];
                    case 8:
                        appId = data['Data']['Applications'][0]['AppId'];
                        vm = core_1.spinner("\u505C\u6B62\u5E94\u7528" + appName + "...");
                        _b.label = 9;
                    case 9:
                        _b.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, client_1.default.saeClient.stopApplication(appId)];
                    case 10:
                        orderId = _b.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_3 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + error_3);
                        return [2 /*return*/];
                    case 12:
                        // 检查状态
                        vm.text = "\u505C\u6B62\u5E94\u7528" + appName + "..." + getLink(orderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 13:
                        _b.sent();
                        vm.stop();
                        logger_1.default.success('已停止应用');
                        return [2 /*return*/];
                }
            });
        });
    };
    SaeComponent.prototype.info = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _a, isHelp, outputFile, appName, namespaceId, region, credentials, data, app, res, cache;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, inputHandler.handlerInfoInputs(args, application)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, outputFile = _a.outputFile, appName = _a.appName, namespaceId = _a.namespaceId, region = _a.region;
                        if (isHelp) {
                            core.help(HELP.INFO);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 4:
                        data = _b.sent();
                        if (!(data['Data']['Applications'].length === 0)) return [3 /*break*/, 5];
                        logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                        return [3 /*break*/, 9];
                    case 5:
                        app = data['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 6:
                        res = _b.sent();
                        res.componentType = "sae";
                        if (!outputFile) return [3 /*break*/, 8];
                        cache = {};
                        try {
                            cache = core.fse.readJsonSync(outputFile);
                        }
                        catch (_e) {
                            /**/
                        }
                        cache[appName] = res;
                        return [4 /*yield*/, core.fse.outputFile(outputFile, JSON.stringify(cache, null, 2))];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [2 /*return*/, res];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    SaeComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var appId, configPath, args, props, application, slb, appName, region, credentials, _a, isHelp, useLocal, useRemote, updateRemote, remoteAppId, change, namespaceId, remoteData, app, app, lastProps, app, orderList, changeOrder, _i, changeOrder_1, order, vm, applicationObject, changeOrderId, res, error_4, obj, e_1, needBindSlb, result, file, oss;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, inputHandler.checkInputs(inputs)];
                    case 1:
                        _b.sent();
                        configPath = core.lodash.get(inputs, 'path.configPath');
                        args = inputs.args, props = inputs.props;
                        application = props.application, slb = props.slb;
                        appName = application.appName, region = application.region;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, inputHandler.parseCommand(args)];
                    case 4:
                        _a = _b.sent(), isHelp = _a.isHelp, useLocal = _a.useLocal, useRemote = _a.useRemote;
                        updateRemote = false;
                        remoteAppId = null;
                        change = {};
                        if (isHelp) {
                            core.help(HELP.DEPLOY);
                            return [2 /*return*/];
                        }
                        // 设置Namespace
                        return [4 /*yield*/, utils.handleEnv(application, credentials)];
                    case 5:
                        // 设置Namespace
                        _b.sent();
                        return [4 /*yield*/, utils.formatSlb(slb, application.port)];
                    case 6:
                        // 设置slb
                        slb = _b.sent();
                        namespaceId = application.namespaceId;
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 7:
                        remoteData = _b.sent();
                        if (!useLocal) return [3 /*break*/, 8];
                        if (remoteData['Data']['Applications'].length > 0) {
                            updateRemote = true;
                        }
                        return [3 /*break*/, 13];
                    case 8:
                        if (!useRemote) return [3 /*break*/, 10];
                        if (remoteData['Data']['Applications'].length === 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                            return [2 /*return*/];
                        }
                        app = remoteData['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 9: return [2 /*return*/, _b.sent()];
                    case 10:
                        if (!(remoteData['Data']['Applications'].length > 0)) return [3 /*break*/, 13];
                        return [4 /*yield*/, utils.getDiff(application, slb, remoteData['Data']['Applications'][0], credentials, configPath)];
                    case 11:
                        change = _b.sent();
                        updateRemote = change['updateRemote'];
                        if (!!updateRemote) return [3 /*break*/, 13];
                        app = remoteData['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 12: return [2 /*return*/, _b.sent()];
                    case 13:
                        lastProps = lodash.cloneDeep(props);
                        if (!(remoteData['Data']['Applications'].length > 0)) return [3 /*break*/, 15];
                        app = remoteData['Data']['Applications'][0];
                        remoteAppId = app.AppId;
                        return [4 /*yield*/, client_1.default.saeClient.listChangeOrders(app.AppId, '')];
                    case 14:
                        orderList = _b.sent();
                        changeOrder = orderList['Data']['ChangeOrderList'];
                        for (_i = 0, changeOrder_1 = changeOrder; _i < changeOrder_1.length; _i++) {
                            order = changeOrder_1[_i];
                            if (lodash.isEqual(order['Status'], 1)) {
                                logger_1.default.info("\u5F53\u524D\u5E94\u7528\u6709\u6B63\u5728\u6267\u884C\u7684\u53D8\u66F4\u5355\u3002" + getLink(order['ChangeOrderId']));
                                return [2 /*return*/];
                            }
                        }
                        _b.label = 15;
                    case 15:
                        vm = core_1.spinner('上传代码...');
                        return [4 /*yield*/, utils.handleCode(application, credentials, configPath)];
                    case 16:
                        applicationObject = _b.sent();
                        return [4 /*yield*/, inputHandler.setDefault(applicationObject)];
                    case 17:
                        _b.sent();
                        if (!updateRemote) return [3 /*break*/, 33];
                        appId = remoteAppId;
                        _b.label = 18;
                    case 18:
                        _b.trys.push([18, 31, , 32]);
                        if (!change['needDeploy']) return [3 /*break*/, 21];
                        return [4 /*yield*/, client_1.default.saeClient.updateApplication(applicationObject)];
                    case 19:
                        res = _b.sent();
                        changeOrderId = res['Data']['ChangeOrderId'];
                        // 检查应用部署状态
                        vm.text = "\u5E94\u7528\u6B63\u5728\u90E8\u7F72..." + getLink(changeOrderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 20:
                        _b.sent();
                        _b.label = 21;
                    case 21:
                        if (!change['needRescale']) return [3 /*break*/, 24];
                        return [4 /*yield*/, client_1.default.saeClient.rescaleApplication(remoteAppId, applicationObject.Replicas)];
                    case 22:
                        changeOrderId = _b.sent();
                        // 检查应用部署状态
                        vm.text = "\u5E94\u7528\u6269\u7F29\u5BB9..." + getLink(changeOrderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 23:
                        _b.sent();
                        _b.label = 24;
                    case 24:
                        if (!change['needUpdateSecurityGroup']) return [3 /*break*/, 27];
                        return [4 /*yield*/, client_1.default.saeClient.updateSecurityGroup(remoteAppId, applicationObject.securityGroupId)];
                    case 25:
                        changeOrderId = _b.sent();
                        // 检查应用部署状态
                        vm.text = "\u66F4\u65B0\u5E94\u7528\u5B89\u5168\u7EC4..." + getLink(changeOrderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 26:
                        _b.sent();
                        _b.label = 27;
                    case 27:
                        if (!change['needRescaleVertically']) return [3 /*break*/, 30];
                        return [4 /*yield*/, client_1.default.saeClient.rescaleVertically(remoteAppId, applicationObject.Cpu, applicationObject.Memory)];
                    case 28:
                        changeOrderId = _b.sent();
                        // 检查应用部署状态
                        vm.text = "\u66F4\u6539\u5E94\u7528\u5B9E\u4F8B\u89C4\u683C..." + getLink(changeOrderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 29:
                        _b.sent();
                        _b.label = 30;
                    case 30: return [3 /*break*/, 32];
                    case 31:
                        error_4 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + error_4);
                        return [2 /*return*/];
                    case 32: return [3 /*break*/, 38];
                    case 33:
                        _b.trys.push([33, 37, , 38]);
                        vm.text = "\u521B\u5EFA\u5E94\u7528 ...";
                        return [4 /*yield*/, client_1.default.saeClient.createApplication(applicationObject)];
                    case 34:
                        obj = _b.sent();
                        appId = obj['Data']['AppId'];
                        changeOrderId = obj['Data']['ChangeOrderId'];
                        applicationObject.AppId = appId;
                        // 检查应用部署状态
                        vm.text = "\u5E94\u7528\u6B63\u5728\u90E8\u7F72..." + getLink(changeOrderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 35:
                        _b.sent();
                        return [4 /*yield*/, cache_1.writeCreatCache({
                                region: region,
                                appName: appName,
                                configPath: configPath,
                                accountID: credentials.AccountID,
                            }, { appId: appId })];
                    case 36:
                        _b.sent();
                        return [3 /*break*/, 38];
                    case 37:
                        e_1 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + e_1);
                        return [2 /*return*/];
                    case 38:
                        if (!!lodash.isEmpty(slb)) return [3 /*break*/, 42];
                        return [4 /*yield*/, utils.slbDiff(slb, appId)];
                    case 39:
                        needBindSlb = _b.sent();
                        if (!needBindSlb) return [3 /*break*/, 42];
                        // 绑定SLB
                        vm.text = "\u90E8\u7F72 slb ... ";
                        return [4 /*yield*/, client_1.default.saeClient.bindSLB(slb, appId)];
                    case 40:
                        changeOrderId = _b.sent();
                        // 检查应用部署状态
                        vm.text = "\u6B63\u5728\u7ED1\u5B9Aslb..." + getLink(changeOrderId);
                        return [4 /*yield*/, utils.checkStatus(appId, 'CoBindSlb')];
                    case 41:
                        _b.sent();
                        _b.label = 42;
                    case 42:
                        vm.stop();
                        return [4 /*yield*/, outputHandler.output(appName, namespaceId)];
                    case 43:
                        result = _b.sent();
                        if (!lodash.isEmpty(result.accessLink)) {
                            logger_1.default.success("\u90E8\u7F72\u6210\u529F\uFF0C\u8BF7\u901A\u8FC7\u4EE5\u4E0B\u5730\u5740\u8BBF\u95EE\u60A8\u7684\u5E94\u7528\uFF1Ahttp://" + result.accessLink);
                        }
                        /**
                         * 缓存记录上一次部署细节
                         */
                        return [4 /*yield*/, cache_1.writeDeployCache({
                                region: region,
                                appName: appName,
                                configPath: configPath,
                                accountID: credentials.AccountID,
                            }, lastProps)];
                    case 44:
                        /**
                         * 缓存记录上一次部署细节
                         */
                        _b.sent();
                        return [4 /*yield*/, utils.file2delete(region, application, credentials)];
                    case 45:
                        file = _b.sent();
                        if (!file.filename) return [3 /*break*/, 47];
                        vm.text = "\u5220\u9664 oss \u6587\u4EF6 ... ";
                        oss = new oss_service_1.default({ bucket: file.bucketName, region: region, credentials: credentials });
                        return [4 /*yield*/, oss.deleteFile(file.filename)];
                    case 46:
                        _b.sent();
                        _b.label = 47;
                    case 47:
                        logger_1.default.success('应用详细信息如下：');
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SaeComponent.prototype.remove = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _b, isHelp, assumeYes, appName, namespaceId, region, credentials, data, app, res, removeStatus, ex_3, appId, vm, orderId, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, inputHandler.handlerRmInputs(args, application)];
                    case 1:
                        _b = _c.sent(), isHelp = _b.isHelp, assumeYes = _b.assumeYes, appName = _b.appName, namespaceId = _b.namespaceId, region = _b.region;
                        if (isHelp) {
                            core.help(HELP.REMOVE);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential((_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 2:
                        credentials = _c.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 4:
                        data = _c.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName);
                            return [2 /*return*/];
                        }
                        app = data['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 5:
                        res = _c.sent();
                        if (!!assumeYes) return [3 /*break*/, 9];
                        _c.label = 6;
                    case 6:
                        _c.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, outputHandler.removePlan(res)];
                    case 7:
                        removeStatus = _c.sent();
                        if (removeStatus !== 'assumeYes') {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        ex_3 = _c.sent();
                        if ((ex_3 === null || ex_3 === void 0 ? void 0 : ex_3.name) === 'CatchableError') {
                            throw ex_3;
                        }
                        // 异常：不作处理兜底
                        logger_1.default.debug("error: " + ex_3.message);
                        return [3 /*break*/, 9];
                    case 9:
                        appId = app['AppId'];
                        vm = core_1.spinner("\u5220\u9664\u5E94\u7528" + appName + "...");
                        _c.label = 10;
                    case 10:
                        _c.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, client_1.default.saeClient.deleteApplication(appId)];
                    case 11:
                        orderId = _c.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        error_5 = _c.sent();
                        vm.stop();
                        logger_1.default.error("" + error_5);
                        return [2 /*return*/];
                    case 13: return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 14:
                        _c.sent();
                        vm.stop();
                        logger_1.default.success('删除成功');
                        return [2 /*return*/];
                }
            });
        });
    };
    SaeComponent.prototype.exec = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _a, isHelp, appName, instanceName, region, credentials, saeClient, connector;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, inputHandler.handlerExecInputs(args, application)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, appName = _a.appName, instanceName = _a.instanceName, region = _a.region;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        saeClient = _b.sent();
                        if (isHelp) {
                            core.help(HELP.RESCALE);
                        }
                        connector = new exec_1.default({ appName: appName, instanceName: instanceName, region: region, saeClient: saeClient });
                        return [4 /*yield*/, connector.Exec()];
                    case 4: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return SaeComponent;
}());
exports.default = SaeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLGFBQWE7QUFDYiw4Q0FBZ0Q7QUFFaEQsd0RBQWtDO0FBQ2xDLGlEQUFxQztBQUNyQyxnRUFBb0Q7QUFDcEQsa0VBQXNEO0FBQ3RELCtDQUFtQztBQUNuQywyREFBcUM7QUFDckMsa0VBQW9DO0FBQ3BDLHdDQUFtRTtBQUNuRSxnRUFBeUM7QUFDekMsb0RBQXVDO0FBRS9CLElBQUEsTUFBTSxHQUFLLElBQUksT0FBVCxDQUFVO0FBRXhCLElBQU0sT0FBTyxHQUFHLFVBQUMsYUFBYSxJQUFLLE9BQUEsOEdBQ3dDLGFBQWUsRUFEdkQsQ0FDdUQsQ0FBQztBQUczRjtJQUFBO0lBeWFBLENBQUM7SUF4YU8sMkJBQUksR0FBVixVQUFXLE1BQWtCOzs7Ozs7d0JBQ25CLElBQUksR0FBSyxNQUFNLEtBQVgsQ0FBWTt3QkFDeUIscUJBQU0sWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBckYsS0FBMkMsU0FBMEMsRUFBbkYsTUFBTSxZQUFBLEVBQUUsT0FBTyxhQUFBLEVBQUUsV0FBVyxpQkFBQSxFQUFFLE1BQU0sWUFBQTt3QkFDNUMsSUFBSSxNQUFNLEVBQUU7NEJBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3JCLHNCQUFPO3lCQUNSO3dCQUNtQixxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUE3RCxXQUFXLEdBQUcsU0FBK0M7d0JBQ25FLHFCQUFNLGdCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsRUFBQTs7d0JBQTlD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