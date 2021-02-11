import styled from 'styled-components'


export const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    padding: 1rem;
    background-color: #231728;
    color: #F8F8F7;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
`

export const StyledLogo = styled.div`

    display: flex;
    align-items: center;
    text-transform: uppercase;
    flex: 1;

    padding: 0.5rem;
    border: 1px solid #BB76A5;
    & :first-child {
        margin: 0 1rem;
    }

    :hover {
        outline: none;
        border-color: #BB76A5   ;
        box-shadow: 0 0 10px #BB76A5;
    }

`
export const StyledPreferances = styled.div`
    flex: 4;
    
    display:flex;
    justify-content: center;
    
    & > * {
        margin-left: 2rem;
    }
`


export const StyledControls = styled.div`
    flex: 1;

    display:flex;
    justify-content: flex-start;

    & > * {
        margin-left:1rem;
    }

    & > * :hover{
        color: green;
    }

`