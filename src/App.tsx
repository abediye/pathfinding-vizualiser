import NodeCanvas from "./components/Canvas";
import Header from "./components/Header";

import { StyledApp } from "./styles/StyledApp";

const App = () => (
    <StyledApp>
        <Header />
        <NodeCanvas />
    </StyledApp>
);

export default App;
