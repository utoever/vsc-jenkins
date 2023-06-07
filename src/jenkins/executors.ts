import Jenkins from "jenkins";

export class JenkinsExecutor {

    protected client: Jenkins;

    constructor(client: Jenkins) {
        this.client = client;
    }

    getInfo = (): Promise<any> => this.client.info();

    getView = (name: string): Promise<any> => this.client.view.get(name);

    getJob = (name: string): Promise<any> => this.client.job.get(name);

    getBuild = (name: string, build_number: number): Promise<any> => this.client.build.get(name, build_number);

    getNodeList = (): Promise<any> => this.client.node.list();

}
