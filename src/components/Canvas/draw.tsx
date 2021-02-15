import { RefObject } from "react";
import { Coordinates, Node } from "../../interfaces";

let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;
const NODE_RADIUS = 100;
const LABLE_NODES = false;

// const nodes: Array<Node> = useContext(NodesContext);
export const draw = {
    setCanvas: (canvasRef: RefObject<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;
        canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        context = canvas.getContext("2d");
    },
    nodes: (nodes: Array<Node>) => {
        if (!context || !canvas) return;

        context.clearRect(0, 0, canvas.width, canvas.height);

        nodes.map((node) => drawConnectingLines(node));
        nodes.map((node) => drawNode(node));
        nodes.map((node) => drawDotOnRadius(node));
    },
};

const getPointOnRadius = (
    center: Coordinates,
    point: Coordinates
): Coordinates => {
    const angle = Math.atan((point.y - center.y) / (point.x - center.x));

    return {
        x:
            center.x +
            Math.cos(angle + (point.x - center.x < 0 ? Math.PI : 0)) *
                NODE_RADIUS,
        y:
            center.y +
            Math.sin(angle + (point.x - center.x < 0 ? Math.PI : 0)) *
                NODE_RADIUS,
    };
};

const drawConnectingLines = (node: Node) => {
    node.connectedNodes.map((connectedNode) => {
        if (!context || !connectedNode) return null;
        const node_pointOnRadius = getPointOnRadius(
            node.position,
            connectedNode.position
        );

        const connectedNode_pointOnRadius = getPointOnRadius(
            connectedNode.position,
            node.position
        );

        context.beginPath();
        context.strokeStyle = "black";

        context.moveTo(node_pointOnRadius.x, node_pointOnRadius.y);

        context.lineTo(
            connectedNode_pointOnRadius.x,
            connectedNode_pointOnRadius.y
        );
        context.stroke();
        context.closePath();

        return null;
    });
};

const drawDotOnRadius = (node: Node) => {
    node.connectedNodes.map((connectedNode) => {
        if (!context || !connectedNode) return null;
        const node_pointOnRadius = getPointOnRadius(
            node.position,
            connectedNode.position
        );
        const connectedNode_pointOnRadius = getPointOnRadius(
            connectedNode.position,
            node.position
        );

        drawPoint(connectedNode_pointOnRadius, LABLE_NODES);
        drawPoint(node_pointOnRadius, LABLE_NODES);

        return null;
    });
};

const drawPoint = (point: Coordinates, labled: boolean = false) => {
    if (!context) return;
    context.beginPath();
    context.arc(point.x, point.y, 10, 0, 2 * Math.PI, true);
    context.fillStyle = "purple";
    context.fill();
    context.closePath();

    if (labled) {
        drawPointLabel(point);
    }
};

const drawPointLabel = (point: Coordinates) => {
    if (!context) return;
    context.fillText(
        `(${Math.floor(point.x)},${Math.floor(point.y)})`,
        point.x + 20,
        point.y - 20
    );
};

const drawNode = (node: Node) => {
    if (!context) return;

    context.strokeStyle = node.isActive
        ? "red"
        : node.isStartNode
        ? "green"
        : "black";
    context.lineWidth = 5;
    context.beginPath();
    context.arc(node.position.x, node.position.y, NODE_RADIUS, 0, 2 * Math.PI);
    context.stroke();

    context.fillStyle = "white";
    context.fill();
    context.closePath();

    context.font = "32px roboto";
    context.fillText(
        node.isStartNode ? "start".toUpperCase() : node.label,
        node.position.x - 50,
        node.position.y + 10,
        NODE_RADIUS
    );
};
