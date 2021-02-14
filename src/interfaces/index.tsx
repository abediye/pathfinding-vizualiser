export interface Node {
    position: Coordinates;
    isStartNode: boolean;
    isEndNode: boolean;
    isActive: boolean;
    label: string;
    connectedNode: Array<Node>;
}

export interface Coordinates {
    x: number;
    y: number;
}
