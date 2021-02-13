import React, { useEffect, useRef, useState } from "react";

interface Node {
    position: { x: number; y: number };
    isStart: boolean;
    isEnd: boolean;
}

const Board = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const contextRef = useRef<CanvasRenderingContext2D | null | undefined>(
        null
    );

    const [nodes, setNodes] = useState<Array<Node>>([]);
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
    }, []);

    const placeNode = ({
        nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { offsetX, offsetY } = nativeEvent;

        drawPlacedNode(offsetX * 2, offsetY * 2);

        console.log("placing node: ");
    };

    const moveNode = ({
        nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!isMovingNode) return;

        const { offsetX, offsetY } = nativeEvent;

        console.log("moving node: ");

        // drawMovingNode();
    };

    const setNode = ({
        nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { offsetX, offsetY } = nativeEvent;
        const newNode: Node = {
            position: { x: offsetX, y: offsetY },
            isStart: false,
            isEnd: false,
        };
        setNodes([...nodes, newNode]);
        setIsMovingNode(false);
        console.log("setting node: "); //+ nodes.length);
    };

    const drawPlacedNode = (x: number, y: number) => {
        if (!contextRef.current) return;

        contextRef.current.strokeStyle = "black";
        contextRef.current.lineWidth = 5;
        contextRef.current.beginPath();
        contextRef.current.arc(x, y, 50, 0, 2 * Math.PI);
        contextRef.current.stroke();
        contextRef.current.closePath();
    };

    // const drawNodes = () => {
    //     nodes.forEach((node) => {
    //         if (!contextRef.current) return;
    //         contextRef.current.strokeStyle = "black";
    //         contextRef.current.lineWidth = 5;
    //         contextRef.current.beginPath();
    //         contextRef.current.arc(
    //             node.position.x * 2,
    //             node.position.y * 2,
    //             50,
    //             0,
    //             2 * Math.PI
    //         );
    //         contextRef.current.stroke();
    //         contextRef.current.closePath();
    //     });
    //     console.log("after drawing - nodes: " + nodes.length);
    // };

    return (
        <canvas
            onMouseDown={placeNode}
            onMouseUp={setNode}
            onMouseMove={moveNode}
            ref={canvasRef}
        />
    );
};

export default Board;
