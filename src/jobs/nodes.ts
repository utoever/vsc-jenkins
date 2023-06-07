import { ExtensionContext, TreeItem, TreeItemCollapsibleState } from 'vscode';
import { BuildNode, BuildsNode } from "../builds/views";
import { ResourceType } from "../explorer/enums";
import { ExplorerNode } from '../explorer/views';
import { Job } from "../jobs/models";
import { ViewsNode } from "../views/nodes";

export class JobNode extends ExplorerNode {

    constructor(context: ExtensionContext, protected job: Job) {
        super(context);
    }

    // getBuilds = (): Promise<BuildNode[]> => this.job.getBuildsList()
    //     .then(builds => builds.map(build => new BuildNode(this.context, build)));

    getURL = (): string => this.job.getURL();

    getBuilds = (): Promise<BuildsNode> => this.job.getBuilds()
        .then(builds => new BuildsNode(this.context, builds));

    getViews = (): Promise<ViewsNode> => this.job.getViews()
        .then(views => new ViewsNode(this.context, views));

    getJob = (): Promise<ExplorerNode[]> => {
        const promises = [];
        if(this.job.hasBuilds())
            promises.push(this.getBuilds())
        if(this.job.hasViews())
            promises.push(this.getViews())

        return Promise.all(promises);
    }

    getChildren(): Promise<ExplorerNode[]> {
        this.resetChildren();

        this.children = this.getJob();
        return this.children;
    }

    getTreeItem(): TreeItem {
        const item = new TreeItem(this.job.getName(), TreeItemCollapsibleState.Collapsed);
        item.contextValue = ResourceType.Job;
        const color = this.job.getColor();
        if (color !== undefined)
            item.iconPath = this.context.asAbsolutePath(this.job.getIconPath());
        return item;
    }

}
