import React, { useEffect, useRef, useState } from "react";
interface Node {
    position: Coordinates;
    isStartNode: boolean;
    isEndNode: boolean;
    isActive: boolean;
    label: string;
    connectedNode: Array<Node>;
}

interface Coordinates {
    x: number;
    y: number;
}

const NODE_RADIUS = 100;

const NodeCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const contextRef = useRef<CanvasRenderingContext2D | null | undefined>(
        null
    );

    const [nodes, setNodes] = useState<Array<Node>>([]);
    const [isMovingNode, setIsMovingNode] = useState(false);
    const [activeNode, setActiveNode] = useState<Node | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;

        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;

        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext("2d");

        if (!context) return;
        contextRef.current = context;
        drawNodes();
        console.log("init: " + JSON.stringify(nodes, null, 2));
    }, []);

    const drawNodes = () => {
        if (!contextRef.current || !canvasRef.current) return;

        contextRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );

        console.log("draw nodes: " + nodes.length);
        nodes.map((node) => {
            drawNode(node);
        });
    };

    const drawNode = (node: Node) => {
        if (!contextRef.current) return;

        node.connectedNode.map((connectedNode) => {
            if (!contextRef.current) return;
            const node_pointOnRadius = getPointOnRadius(
                node.position,
                connectedNode.position
            );
            const connectedNode_pointOnRadius = getPointOnRadius(
                connectedNode.position,
                node.position
            );

            contextRef.current.beginPath();
            contextRef.current.arc(
                node_pointOnRadius.x,
                node_pointOnRadius.y,
                10,
                0,
                2 * Math.PI,
                true
            );
            contextRef.current.fillStyle = "purple";
            // contextRef.current.stroke();
            contextRef.current.fill();
            contextRef.current.closePath();

            contextRef.current.beginPath();
            contextRef.current.arc(
                connectedNode_pointOnRadius.x,
                connectedNode_pointOnRadius.y,
                10,
                0,
                2 * Math.PI,
                true
            );
            contextRef.current.fillStyle = "ornage";
            // contextRef.current.stroke();
            contextRef.current.fill();
            contextRef.current.closePath();

            contextRef.current.beginPath();
            contextRef.current.strokeStyle = "black";

            contextRef.current.moveTo(
                node_pointOnRadius.x,
                node_pointOnRadius.y
            );

            contextRef.current.lineTo(
                connectedNode_pointOnRadius.x,
                connectedNode_pointOnRadius.y
            );
            contextRef.current.stroke();
            contextRef.current.closePath();
        });

        contextRef.current.strokeStyle = node.isActive
            ? "red"
            : node.isStartNode
            ? "green"
            : "black";
        contextRef.current.lineWidth = 5;
        contextRef.current.beginPath();
        contextRef.current.arc(
            node.position.x,
            node.position.y,
            NODE_RADIUS,
            0,
            2 * Math.PI
        );
        contextRef.current.stroke();

        contextRef.current.fillStyle = "white";
        contextRef.current.fill();
        contextRef.current.closePath();

        contextRef.current.font = "32px roboto";
        contextRef.current.fillText(
            node.isStartNode ? "start".toUpperCase() : node.label,
            node.position.x - 50,
            node.position.y + 10,
            NODE_RADIUS
        );
    };

    const getPointOnRadius = (
        center: Coordinates,
        point: Coordinates
    ): Coordinates => {
        const angle = Math.atan((point.y - center.y) / (point.x - center.x));

        return {
            x: center.x + Math.cos(angle) * NODE_RADIUS,
            y: center.y + Math.sin(angle) * NODE_RADIUS,
        };
    };

    const handleMouseDown = ({
        nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { offsetX, offsetY } = nativeEvent;
        let node = getExsistingNode({ x: offsetX * 2, y: offsetY * 2 });
        if (!node) {
            node = createNewNode(offsetX, offsetY);
        }
        setActiveNode(node);
        node.isActive = true;
        setIsMovingNode(true);
    };

    const createNewNode = (offsetX: number, offsetY: number) => {
        const newNode = {
            position: { x: offsetX * 2, y: offsetY * 2 },
            isStartNode: nodes.length === 0,
            isActive: false,
            isEndNode: false,
            label: `Node ${nodes.length + 1}`,
            connectedNode: activeNode ? [activeNode] : [],
        };
        setNodes([...nodes, newNode]);
        return newNode;
    };

    const getExsistingNode = (point: Coordinates): Node | undefined => {
        const existingNode = nodes.find(
            (node) =>
                Math.sqrt(
                    Math.pow(point.x - node.position.x, 2) +
                        Math.pow(point.y - node.position.y, 2)
                ) < NODE_RADIUS
        );

        return existingNode;
    };

    const handleMouseMove = ({
        nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!isMovingNode) return;
        const { offsetX, offsetY } = nativeEvent;
        const activeNode = nodes.find((node) => node.isActive);
        if (!activeNode) return;
        activeNode.position = { x: offsetX * 2, y: offsetY * 2 };
        drawNodes();
    };

    const handleMouseUp = () => {
        console.log("mouse up: " + nodes.length);
        drawNodes();
        setIsMovingNode(false);
        const activeNode = nodes.find((node) => node.isActive);
        if (!activeNode) return;
        activeNode.isActive = false;
    };

    return (
        <canvas
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            ref={canvasRef}
        />
    );
};

export default NodeCanvas;
