import { createContext } from "react";
import { NodesState } from "../interfaces";

export const NodesContext = createContext<NodesState>({
    nodes: [],
    setNodes: undefined,
});
