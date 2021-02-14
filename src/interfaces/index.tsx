export interface Node {
    position: Coordinates;
    isStartNode: boolean;
    isEndNode: boolean;
    isActive: boolean;
    label: string;
    connectedNodes: Array<Node | null | undefined>;
}

export interface Coordinates {
    x: number;
    y: number;
}
