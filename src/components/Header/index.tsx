import { StyledHeader, StyledLogo } from '../../styles/StyledHeader'
import AccountTreeOutlined from '@material-ui/icons/AccountTreeOutlined'
import Typography from '@material-ui/core/Typography'
import Controls from './Controls'
import Preferances from './Preferanes'



const Header = () => <StyledHeader>

    <StyledLogo>
        <AccountTreeOutlined />
        <Typography variant="h6" component="h6"> Pathfinding Vizualiser </Typography>
    </StyledLogo>

    <Preferances/>
    <Controls />

</StyledHeader>

export default Header