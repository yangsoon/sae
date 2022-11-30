import * as core from '@serverless-devs/core';
import { ConfigMap } from '../common/type'

export default class ConfigMapCmd {
    saeClient: core.popCore.ROAClient
    constructor(client: core.popCore.ROAClient) {
        this.saeClient = client;
    }

    async add(configMap: ConfigMap) {
        this.saeClient.createConfigMap(configMap);
    }
}