import { JenkinsExecutor } from "../jenkins/executors";
import { Nodes } from "../nodes/models";
import { Views } from "../views/models";

export class System {

    constructor(private executor: JenkinsExecutor) {}

    getViews = (): Promise<Views> => this.executor.getInfo()
        .then(info => new Views(info.views, this.executor));

    getNodes = (): Promise<Nodes> => this.executor.getNodeList()
        .then(nodelist => new Nodes(nodelist, this.executor));

}
