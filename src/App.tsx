import NodeCanvas from "./components/Canvas";
import Header from "./components/Header";

import { StyledApp } from "./styles/StyledApp";
import { NodesContext } from "./contexts/NodesContext";
import { useState } from "react";
import { Node } from './interfaces'

const App = () => {
    const [nodes, setNodes] = useState<Array<Node>>([]);

    return (
        <StyledApp>
            <NodesContext.Provider value={{ nodes, setNodes }}>
                <Header />
                <NodeCanvas />
            </NodesContext.Provider>
        </StyledApp>
    );
};

export default App;
