import React, { useContext, useEffect, useRef, useState } from "react";
import { NodesContext } from "../../contexts/NodesContext";
import { Coordinates, Node, NodesState } from "../../interfaces";
import { draw } from "./draw";

const NODE_RADIUS = 100;

const NodeCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // const [nodes, setNodes] = useState<Array<Node>>([]);
    const [isMovingNode, setIsMovingNode] = useState(false);
    const [activeNodes, setActiveNodes] = useState<Array<Node | null>>([]);

    const { nodes, setNodes } = useContext<NodesState>(NodesContext);

    useEffect(() => {
        draw.setCanvas(canvasRef);
        draw.nodes(nodes);
        // eslint-disable-next-line
    }, [nodes]);

    const handleMouseDown = ({
        nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { offsetX, offsetY } = nativeEvent;

        if (!nativeEvent.ctrlKey) {
            nodes
                .filter((node) => node.isActive)
                .map((node) => (node!.isActive = false));
            setActiveNodes([]);
            return;
        }

        let node = getExsistingNode({ x: offsetX * 2, y: offsetY * 2 });

        if (!node) {
            node = createNewNode(offsetX, offsetY);
        }
        setActiveNodes(getActiveNodes(nativeEvent.shiftKey, node));

        setIsMovingNode(true);
        draw.nodes(nodes);
    };

    const getActiveNodes = (
        shiftKeyPressed: boolean,
        node: Node
    ): Array<Node | null> => {
        node.isActive = true;
        if (!shiftKeyPressed) {
            activeNodes.map((node) => (node!.isActive = false));
            return [node];
        }

        if (activeNodes.includes(node)) {
            return [...activeNodes];
        }

        return [...activeNodes, node];
    };

    const createNewNode = (offsetX: number, offsetY: number): Node => {
        const newNode: Node = {
            position: { x: offsetX * 2, y: offsetY * 2 },
            isStartNode: nodes.length === 0,
            isActive: false,
            isEndNode: false,
            label: `Node ${nodes.length + 1}`,
            connectedNodes: [...activeNodes],
        };
        // TODO - solve undefined error
        setNodes!([...nodes, newNode]);
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
        if (!activeNodes) return;
        activeNodes.map((node) => {
            if (!node) return null;
            node.position.x = offsetX * 2;
            node.position.y = offsetY * 2;

            return null;
        });

        // position = { x: offsetX * 2, y: offsetY * 2 };
        draw.nodes(nodes);
        console.log("activeNodes move");
        console.log(activeNodes.map((node) => node?.label));
    };

    const handleMouseUp = () => {
        draw.nodes(nodes);
        setIsMovingNode(false);

        console.log("activeNodes up");
        console.log(activeNodes.map((node) => node?.label));
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
