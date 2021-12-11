import styled from "styled-components";
const BlackoutBody = ({ onSetIsVisible }) => {
    return (
        <BlackBody onClick={() => onSetIsVisible(false)} />
    );
};

export default BlackoutBody;

const BlackBody = styled.div`
width: 100%;
height: 100%;
position: fixed;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
z-index: 1010;
background-color: rgba(0, 0, 0, 0.65);
`