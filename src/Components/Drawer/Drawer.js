import React, { useEffect, useMemo } from 'react';

// Change projects, also views for current project
function Drawer({orgs, projects}) {
  
  return (
    <div style={{height:'100%', width:'15%', background:'grey', position:'sticky', left:'0px'}}>
      <h4>Born Ready Architecture</h4>
      <ul>
        <li>
          Project 1
        </li>
        <li>
          Project 2
        </li>
        <li>
          Project 3
        </li>
        <li>
          Project 4
        </li>
      </ul>
    </div>
    
  );
}

export default Drawer;