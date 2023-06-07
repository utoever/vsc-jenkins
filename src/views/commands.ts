import { env, Uri } from 'vscode';
import { ViewNode } from "./nodes";

export class CopyViewUrlCommand {

    execute = async (node: ViewNode) => {
        const url = node.getURL();
        await env.clipboard.writeText(url);
    }

}

export class OpenViewUrlCommand {

    execute = async (node: ViewNode) => {
        const url = node.getURL();
        const parsedUrl = Uri.parse(url);
        await env.openExternal(parsedUrl);
    }

}
