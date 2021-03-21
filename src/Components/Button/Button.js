// Add row, import CSV, download CSV buttons
import React from 'react';

import styled from 'styled-components'

const Styles = styled.div`
  padding:2px;
  box-sizing:border-box;
  input[type="button"]{
    color: ${props => props.intent === 'primary' ? props.theme.primary :
                      props.intent === 'secondary' ? props.theme.secondary :
                      props.theme.primary};
    background-color: ${props => props.intent === 'primary' ? props.theme.contrastText :
                                 props.intent === 'secondary' ? props.theme.text :
                                 props.theme.text};
    width:35px;
    height:35px;
    border-radius:18px;
    border:none;
  }

  input[type="button"]:hover{
    box-shadow: 0px 0px 2px 1px ${props => props.theme.grey};
  }
`
// Change projects, also views for current project
function Button({value, intent}) {

  return (
    <Styles intent={intent}>
      <input type="button" value={value} intent={intent} />
    </Styles>
  );
}

export default Button;



