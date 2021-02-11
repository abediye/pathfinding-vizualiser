import styled from "styled-components";

export const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    padding: 1rem;
    background-color: #231728;
    color: #f8f8f7;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
`;

export const StyledLogo = styled.div`
    display: flex;
    align-items: center;
    text-transform: uppercase;
    flex: 1;

    padding: 0.5rem;
    border: 1px solid #bb76a5;
    & :first-child {
        margin: 0 1rem;
    }

    :hover {
        outline: none;
        border-color: #bb76a5;
        box-shadow: 0 0 10px #bb76a5;
    }
`;
export const StyledPreferances = styled.div`
    flex: 4;

    display: flex;
    justify-content: center;

    & > * {
        margin-left: 2rem;
    }
`;

export const StyledControls = styled.div`
    flex: 1;

    display: flex;
    justify-content: flex-start;

    & > * {
        margin-left: 1rem;
    }

    & > * :hover {
        color: green;
    }
`;
