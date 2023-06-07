import { env, Uri } from 'vscode';
import { JobNode } from "./nodes";

export class CopyJobUrlCommand {

    execute = async (node: JobNode) => {
        const url = node.getURL();
        await env.clipboard.writeText(url);
    }

}

export class OpenJobUrlCommand {

    execute = async (node: JobNode) => {
        const url = node.getURL();
        const parsedUrl = Uri.parse(url);
        await env.openExternal(parsedUrl);
    }

}
