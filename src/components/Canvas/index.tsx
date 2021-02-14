import React, { useContext, useEffect, useRef, useState } from "react";
import NodesContext from "../../contexts/NodesContext";
import { Node, Coordinates } from "../../interfaces";
import { draw } from "./draw";

const NODE_RADIUS = 100;

const NodeCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const contextRef = useRef<CanvasRenderingContext2D | null | undefined>(
        null
    );

    const [nodes, setNodes] = useState<Array<Node>>([]);
    const [isMovingNode, setIsMovingNode] = useState(false);
    const [activeNode, setActiveNode] = useState<Node | null>(null);

    const nodesContext = useContext(NodesContext);

    useEffect(() => {
        draw.setCanvas(canvasRef);
        draw.nodes(nodes);
    }, []);

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
        draw.nodes(nodes);
    };

    const handleMouseUp = () => {
        console.log("mouse up: " + nodes.length);
        draw.nodes(nodes);
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
