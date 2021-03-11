import React, { useEffect, useMemo } from 'react';

function Collaborators({collabs}) {
  
  return (
    <div style={{display:'flex', justifyContent:'flex-end', padding:'1%'}}>
      {collabs.map((friend, i) => {
        {console.log(friend)}
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
  );
}

export default Collaborators;