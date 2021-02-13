import { notDeepEqual } from "assert";
import React, { useEffect, useRef, useState } from "react";

interface Node {
    position: Coordinates;
    isStartNode: boolean;
    isEndNode: boolean;
    isActive: boolean;
}

interface Coordinates {
    x: number;
    y: number;
}

const Board = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const contextRef = useRef<CanvasRenderingContext2D | null | undefined>(
        null
    );

    const [nodes, setNodes] = useState<Array<Node>>([
        {
            position: { x: 50, y: 50 },
            isStartNode: false,
            isEndNode: false,
            isActive: false,
        },
    ]);
    const [isMovingNode, setIsMovingNode] = useState(false);

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
        nodes
            .map((node) => node.position)
            .forEach((position) => {
                drawNode(position.x, position.y);
            });
    };

    const drawNode = (x: number, y: number) => {
        if (!contextRef.current) return;

        contextRef.current.strokeStyle = "black";
        contextRef.current.lineWidth = 5;
        contextRef.current.beginPath();
        contextRef.current.arc(x, y, 50, 0, 2 * Math.PI);
        contextRef.current.stroke();
        contextRef.current.closePath();
    };

    const handleMouseDown = ({
        nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { offsetX, offsetY } = nativeEvent;
        let node = getExsistingNode({ x: offsetX * 2, y: offsetY * 2 });
        if (!node) {
            console.log("new Node");
            node = createNewNode(offsetX, offsetY);
        }
        node.isActive = true;

        setIsMovingNode(true);
    };
    const createNewNode = (offsetX: number, offsetY: number) => {
        const newNode = {
            position: { x: offsetX * 2, y: offsetY * 2 },
            isStartNode: false,
            isActive: false,
            isEndNode: false,
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
                ) < 100
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
        console.log("mouse move: " + nodes.length);
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

export default Board;
