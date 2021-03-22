import React, { useEffect, useMemo } from 'react';

import {Avatar} from 'evergreen-ui'

// click on icon to set name / color
function Collaborators({collabs}) {
  
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      {/* { 
        collabs.length ?
        <span style={{fontWeight:'bold', color:collabs[0].color}}>
          {collabs[0].name}
        </span> : <></>
      } */}
      <div style={{display:'flex', justifyContent:'flex-end', margin:'10px'}}>
        {collabs.map((friend, i) => {
          // return <div style={{display:'flex',
          //                     alignItems:'center', 
          //                     justifyContent:'center', 
          //                     backgroundColor:friend.color,
          //                     boxShadow: i === 0 ? '0px 0px 8px 0px rgba(0,0,0,0.7)' : 'none',
          //                     color:'white',
          //                     margin:'0.5%',
          //                     height:'35px', 
          //                     width:'35px', 
          //                     borderRadius:'18px',
          //                     margin:'4px'}}>
          //   {friend.name.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}
          // </div>
          return <Avatar isSolid name={friend.name ? friend.name : "Anonymous Mouse"} size={40} style={{bacgroundColor:friend.color, zIndex:i*-1}} marginRight={-15} />
        })}
      </div>
    </div>
    
  );
}

export default Collaborators;