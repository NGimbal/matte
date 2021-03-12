import React, { useEffect, useMemo } from 'react';

// click on icon to set name / color
function Collaborators({collabs}) {
  
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
      { 
        collabs.length ?
        <span style={{fontWeight:'bold', color:collabs[0].color}}>
          {collabs[0].name}
        </span> : <></>
      }
      <div style={{display:'flex', justifyContent:'flex-end'}}>
        {collabs.map((friend, i) => {
          return <div style={{display:'flex',
                              alignItems:'center', 
                              justifyContent:'center', 
                              backgroundColor:friend.color,
                              boxShadow: i === 0 ? '0px 0px 8px 0px rgba(0,0,0,0.7)' : 'none',
                              color:'white',
                              margin:'0.5%',
                              height:'40px', 
                              width:'40px', 
                              borderRadius:'20px'}}>
            {friend.name.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}
          </div>
        })}
      </div>
    </div>
    
  );
}

export default Collaborators;