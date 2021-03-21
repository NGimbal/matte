// Add row, import CSV, download CSV buttons
import React from 'react';

import Collaborators from '../Collaborators/Collaborators'

import Button from '../Button/Button'

// Change projects, also views for current project
function GlobalControls({collabs}) {

  return (
    <div style={{width:'100%', display:'flex'}}>
      <div style={{width:'40%', display:'flex'}}>
        <Button value="+"  intent="primary"/>
        <Button  value="G" intent="primary"/>
        <Button  value="-" intent="primary"/>  
      </div>
      <Collaborators collabs={collabs}/>
    </div>
  );
}

export default GlobalControls;



