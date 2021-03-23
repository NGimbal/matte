import { Heading, ListItem, Pane, Text, TickCircleIcon, UnorderedList, Menu, Link } from 'evergreen-ui';
import React, { useEffect, useMemo } from 'react';

// Change projects, also views for current project
function Drawer({orgs, projects, width}) {
  
  return (
    <Pane
      height="100%"
      width={width}
      display="flex"
      border="default"
      flexDirection="column"
      alignItems="flex-start"
      border="none"
      boxShadow="1px 0px 2px 1px rgba(0,0,0,0.125)"
    >
      <Heading size={600} marginTop={24} marginLeft={8} marginBottom={16}>Projects</Heading>
      <div style={{marginLeft:'8px', borderBottom:'1px solid #E4E7EB',width:'85%',height:'1px',boxSizing:'border-box'}}/>
      <UnorderedList marginLeft={32}>
        <ListItem icon={TickCircleIcon} iconColor="success"><Link href='#' color="neutral">Project 1</Link></ListItem>
        <ListItem icon={TickCircleIcon} iconColor="success"><Link href='#' color="neutral">Project 2</Link></ListItem>
        <ListItem icon={TickCircleIcon} iconColor="success"><Link href='#' color="neutral">Project 3</Link></ListItem>
      </UnorderedList>
    </Pane>
    
  );
}

export default Drawer;