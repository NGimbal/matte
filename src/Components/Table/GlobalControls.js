// Add row, import CSV, download CSV buttons
import React from 'react';

import Collaborators from '../Collaborators/Collaborators'

import {Button} from 'evergreen-ui'
import {CogIcon, GroupObjectsIcon, FilterListIcon} from 'evergreen-ui'

// Change projects, also views for current project
function GlobalControls({collabs}) {

  return (
    <div style={{width:'100%', display:'flex'}}>
      <div style={{width:'40%', display:'flex'}}>
        <Button iconBefore={GroupObjectsIcon}> Group </Button>
        <Button iconBefore={FilterListIcon}> Filter </Button>
        <Button iconBefore={CogIcon}>Settings</Button>  
      </div>
      <Collaborators collabs={collabs}/>
    </div>
  );
}

export default GlobalControls;



