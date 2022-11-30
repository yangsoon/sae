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
    SaeComponent.prototype.configmap = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, props, isHelp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = inputs.args, props = inputs.props;
                        return [4 /*yield*/, inputHandler.handlerConfigMapInputs(args, namespace, configMaps, application)];
                    case 1:
                        isHelp = (_a.sent()).isHelp;
                        if (isHelp) {
                            core.help(HELP.REMOVE);
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return SaeComponent;
}());
exports.default = SaeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLGFBQWE7QUFDYiw4Q0FBZ0Q7QUFFaEQsd0RBQWtDO0FBQ2xDLGlEQUFxQztBQUNyQyxnRUFBb0Q7QUFDcEQsa0VBQXNEO0FBQ3RELCtDQUFtQztBQUNuQywyREFBcUM7QUFDckMsa0VBQW9DO0FBQ3BDLHdDQUFtRTtBQUNuRSxnRUFBeUM7QUFJakMsSUFBQSxNQUFNLEdBQUssSUFBSSxPQUFULENBQVU7QUFFeEIsSUFBTSxPQUFPLEdBQUcsVUFBQyxhQUFhLElBQUssT0FBQSw4R0FDd0MsYUFBZSxFQUR2RCxDQUN1RCxDQUFDO0FBRzNGO0lBQUE7SUE0YUEsQ0FBQztJQTNhTywyQkFBSSxHQUFWLFVBQVcsTUFBa0I7Ozs7Ozt3QkFDbkIsSUFBSSxHQUFLLE1BQU0sS0FBWCxDQUFZO3dCQUN5QixxQkFBTSxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUFyRixLQUEyQyxTQUEwQyxFQUFuRixNQUFNLFlBQUEsRUFBRSxPQUFPLGFBQUEsRUFBRSxXQUFXLGlCQUFBLEVBQUUsTUFBTSxZQUFBO3dCQUM1QyxJQUFJLE1BQU0sRUFBRTs0QkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDckIsc0JBQU87eUJBQ1I7d0JBQ21CLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTdELFdBQVcsR0FBRyxTQUErQzt3QkFDbkUscUJBQU0sZ0JBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBOUMsU0FBOEMsQ0FBQzt3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