import React, { useEffect, useMemo } from 'react';

import {Button, Heading} from 'evergreen-ui'
// Change projects, also views for current project
function AppBar() {
  
  return (
    <div style={{width:'100%', 
                 height:'48px', 
                 left:'0px', 
                 top:'0px', 
                 padding:'1%',
                 boxSizing:'border-box',
                 display:'flex',
                 backgroundColor:'#2979FF',
                 boxShadow:"0px 2px 3px 0px rgba(0,0,0,0.35)",
                 zIndex:'1000',
                 display:'flex',
                 alignItems:'center',
                 justifyContent:'space-between'
                 }}>
        <Heading size={700} color='white'>matte.</Heading>
        <div style={{display:'flex'}}>
          <Button appearance="minimal" height={40} style={{color:'white'}}>Search</Button>
          <Button appearance="minimal" height={40} style={{color:'white'}}>Organize</Button>
          <Button appearance="minimal" height={40} style={{color:'white'}}>Discover</Button>
        </div>
    </div>
  );
}

export default AppBar;