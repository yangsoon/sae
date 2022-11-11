import logger from '../common/logger';

export default class ExecConnector {
    public appName: string;
    public instanceName: string;
    public region: string;
    public saeClient: any;
    public socket: any;

    constructor({ appName, instanceName, region, saeClient }) {
        this.appName = appName;
        this.instanceName = instanceName;
        this.region = region;
        this.saeClient = saeClient;
    }

    public async Exec() {
        logger.info('Enter `exit` to open the link on the server side to exit (recommended), or execute `control + ]` to force the client to exit');
        await new Promise(async (resolve) => {
            const hooks = {
                onStdout: (msg) => process.stdout.write(msg.toString()),
                onStderr: (msg) => process.stderr.write(msg.toString()),
                onClose: () => process.exit(0),
                onError: (e) => {
                    process.stderr.write(e.toString());
                    process.stdin.setRawMode(false);
                    resolve(e);
                },
            };
            const conn = await this.saeClient.instanceExec(this.region, this.appName, this.instanceName, hooks);
            if (process.stdin.isPaused()) {
                logger.debug('In the running state, switch an explicitly paused stream to flow mode');
                process.stdin.resume();
            }

            process.stdin.setEncoding('ascii');
            process.stdin.on('data', (chunk: string) => {
                for (const ch of chunk) {
                    // control + ] 退出
                    if (ch.charCodeAt(0) === 29) {
                        conn?.close();
                        process.exit(0);
                    }
                }
                conn.sendMessage(chunk);
            });
        });
    }

    public connect() {

    }
}