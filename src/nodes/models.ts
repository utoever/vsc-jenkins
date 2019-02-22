'use strict';
import { JenkinsExecutor } from "../jenkins/executors";

export class Node {

    constructor(
        public readonly node: any,
        private executor: JenkinsExecutor
    ) {
    }

    getName(): string {
        return this.node.displayName;
    }

}

export class Nodes {

    constructor(
        public readonly nodes: any,
        private executor: JenkinsExecutor
    ) {
    }

    getNodesList(): Node[] {
        return this.nodes.map(node => new Node(node, this.executor));
    }

}
