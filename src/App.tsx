import Board from "./components/Board";
import Header from "./components/Header";
import GlobalStyle from "./styles/GlobalStyle";
import { StyledApp } from "./styles/StyledApp";

const App = () => (
    <StyledApp>
        <Header />
        <Board />
        <GlobalStyle />
    </StyledApp>
);

export default App;
