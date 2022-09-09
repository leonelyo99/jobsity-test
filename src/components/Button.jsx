import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

function Button(props) {
  const { onClick, children } = props;

  return (
    <ButtonStyled onClick={onClick} {...props}>
      {children}
    </ButtonStyled>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const ButtonStyled = styled.button`
  height: fit-content;
  cursor: pointer;
  align-items: center;
  background-color: ${(props) =>
    props.secondary ? "#FF4742" : "rgb(47, 116, 181)"};
  border: 2px solid
    ${(props) => (props.secondary ? "#FF4742" : "rgb(47, 116, 181)")};
  margin-right: ${(props) => (!!props.marginRight ? props.marginRight : "0")}px;
  padding: 4px 8px 4px 8px;
  color: #fff;
  font-weight: 600;
  outline: 0;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background-color: rgb(34 92 147);
    border-color: rgb(34 92 147);
  }
`;

export default Button;
