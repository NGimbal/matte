// Add row, import CSV, download CSV buttons
import React from 'react';

import styled from 'styled-components'

const Styles = styled.div`
  padding:2px;
  box-sizing:border-box;
  button{
    color: ${props => props.intent === 'primary' ? props.theme.contrastText :
                      props.intent === 'secondary' ? props.theme.contrastText :
                      props.theme.contrastText};

    background-color: ${props => props.intent === 'primary' ? props.theme.primary :
                                 props.intent === 'secondary' ? props.theme.secondary :
                                 props.theme.secondary};
    width:35px;
    height:35px;
    border-radius:18px;
    border:none;
  }

  button:hover{
    box-shadow: 0px 0px 3px 2px ${props => props.theme.grey};
  }

  button:focus{
    outline:none;
  }
`
// Change projects, also views for current project
function Button({intent, icon}) {
  return (
    <Styles intent={intent}>
      <button><i class="material-icons">{icon ? `${icon}` : 'cloud_upload'}</i></button>
    </Styles>
  );
}

export default Button;
