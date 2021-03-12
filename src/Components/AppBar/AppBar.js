import React, { useEffect, useMemo } from 'react';

import Collaborators from '../Collaborators/Collaborators'

// Change projects, also views for current project
function AppBar({collabs}) {
  
  return (
    <div style={{width:'100%', 
                 height:'75px', 
                 background:'light-grey', 
                 position:'sticky', 
                 left:'0px', 
                 top:'0px', 
                 padding:'1%',
                 boxSizing:'border-box',
                 display:'flex'}}>
      <Collaborators collabs={collabs}/>
    </div>
    
  );
}

export default AppBar;