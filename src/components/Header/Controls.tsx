import { StyledControls } from "../../styles/StyledHeader";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import LayersClearIcon from "@material-ui/icons/LayersClear";
import EditIcon from "@material-ui/icons/Edit";
import { useContext } from "react";
import { NodesState } from "../../interfaces";
import { NodesContext } from "../../contexts/NodesContext";

const Controls = () => {
    const { nodes, setNodes } = useContext<NodesState>(NodesContext);

    const handleDelete = () => {
        setNodes!([]);
    };
    return (
        <StyledControls>
            {`Nodes: ${nodes.length}`}
            <EditIcon />
            <LayersClearIcon onClick={handleDelete} />
            <PlayArrowIcon />
            <StopIcon />
        </StyledControls>
    );
};

export default Controls;
