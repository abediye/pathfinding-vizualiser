import React from "react";
import { Node } from "../interfaces";

const NodesContext = React.createContext<Array<Node>>([]);

export default NodesContext;
