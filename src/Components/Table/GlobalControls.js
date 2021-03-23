// Add row, import CSV, download CSV buttons
import React from 'react';

import {IconButton} from 'evergreen-ui'
import {CogIcon, GroupObjectsIcon, FilterListIcon} from 'evergreen-ui'
import Collaborators from '../Collaborators/Collaborators';

// Change projects, also views for current project
function GlobalControls({collabs}) {

  return (
    <div style={{display:'flex', margin:'20px 20px 0px 20px', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex'}}>
          <IconButton icon={GroupObjectsIcon} marginRight={10}/>
          <IconButton icon={FilterListIcon} marginRight={10}/>
          <IconButton icon={CogIcon}/>
        </div>
        <Collaborators collabs={collabs}/>
    </div>
  );
}

export default GlobalControls;