import { ExtensionContext, commands, window } from 'vscode';
import { WorkspaceConfigurator } from "./conf/configurators";
import { JenkinsConfigError } from "./exceptions";
import { JenkinsExecutor } from "./jenkins/executors";
import { CopyJobUrlCommand, OpenJobUrlCommand } from "./jobs/commands";
import { NodesProvider } from "./nodes/providers";
import { System } from "./system/models";
import { SystemProvider } from "./system/providers";
import { SystemNode } from "./system/views";
import { CopyViewUrlCommand, OpenViewUrlCommand } from "./views/commands";
import { ViewsProvider } from "./views/providers";

import Jenkins from "jenkins";

export function activate(context: ExtensionContext) {
    const configuration = WorkspaceConfigurator.getConfiguration();
    const url = configuration.get<string>("url");

    if (!url)
        throw new JenkinsConfigError("Jenkins URL not provided. Specify url in settings.");

    const jenkins = new Jenkins({
        baseUrl: url
    });

    const executor = new JenkinsExecutor(jenkins)
    const systemNode = new SystemNode(context, new System(executor));

    const openJobUrlCommand = new OpenJobUrlCommand();
    const openViewUrlCommand = new OpenViewUrlCommand();
    const copyJobUrlCommand = new CopyJobUrlCommand();
    const copyViewUrlCommand = new CopyViewUrlCommand();

    let openJob = commands.registerCommand("jenkins.openJobUrlToClipboard", openJobUrlCommand.execute);
    let openView = commands.registerCommand("jenkins.openViewUrlToClipboard", openViewUrlCommand.execute);
    let jobCopy = commands.registerCommand("jenkins.copyJobUrlToClipboard", copyJobUrlCommand.execute);
    let viewCopy = commands.registerCommand("jenkins.copyViewUrlToClipboard", copyViewUrlCommand.execute);

    context.subscriptions.push(openJob);
    context.subscriptions.push(openView);
    context.subscriptions.push(jobCopy);
    context.subscriptions.push(viewCopy);

    // const jenkins  = jenkins({ baseUrl: url, promisify: true, crumbIssuer: true });
    const nodesNode = systemNode.getNodes();
    const viewsNode = systemNode.getViews();

    const systemProvider = new SystemProvider(context, systemNode);
    const nodesProvider = new NodesProvider(context, nodesNode);
    const viewsProvider = new ViewsProvider(context, viewsNode);
    window.registerTreeDataProvider("jenkins.views.system", systemProvider);
    window.registerTreeDataProvider("jenkins.views.nodes", nodesProvider);
    window.registerTreeDataProvider("jenkins.views.views", viewsProvider);
}

export function deactivate() {
}
