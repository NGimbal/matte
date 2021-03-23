import React, { useEffect, useMemo } from 'react';

import {Avatar} from 'evergreen-ui'
import './Collaborators.css'

// click on icon to set name / color
function Collaborators({collabs}) {
  
  return (
    <div className="anim_container" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      {collabs.map((friend, i) => {
        return <Avatar className="anim_avatar" isSolid name={friend.name ? friend.name : "Anonymous Mouse"} size={36} style={{zIndex:i*-1}} marginRight={-15} />
      })}
    </div>
  );
}

export default Collaborators;