import React, { useEffect, useMemo } from 'react';

import { Heading, ListItem, Pane, Text, TickCircleIcon, UnorderedList, Menu, Link, Button, IconButton, ChevronLeftIcon } from 'evergreen-ui';
import {AddIcon, MoreIcon} from 'evergreen-ui'
// Change projects, also views for current project
function Drawer({orgs, projects, setOrgs, setProjs, width}) {
  
  // this should become a menu with selected row being the current project
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
      <div style={{display:'flex', alignItems:'center', width:'100%', justifyContent:'space-between'}}><Heading size={600} marginTop={16} marginLeft={8} marginBottom={16}>{orgs.current.name}</Heading><IconButton icon={ChevronLeftIcon} appearance="minimal" height={48}/></div>
      <div style={{marginLeft:'8px', borderBottom:'1px solid #E4E7EB',width:'85%',height:'1px',boxSizing:'border-box'}}/>
      <Heading size={500} marginTop={8} marginLeft={8} marginBottom={8}>Projects</Heading>
      {/* <UnorderedList marginLeft={32}>
        {projects.all.map((p) => 
          <ListItem icon={TickCircleIcon} iconColor={projects.current === p ? "success" : "muted"} key={p}><Link href='#' color="neutral">{p}</Link></ListItem>
        )}
      </UnorderedList>
      <Button marginLeft={2} appearance="minimal" iconBefore={AddIcon} color='primary'>New Project</Button> */}
      <Pane
        width={"100%"}>
        <Menu>
          <Menu.OptionsGroup
            options={projects.all.map((p) => {return({label:p.name, value:p.key})})}
            selected={projects.current.key}
            onChange={sel => setProjs({...projects, current:projects.all.find(p => p.key === sel)})}
            >
            {/* {projects.all.map((p) => 
              <Menu.Item icon={TickCircleIcon} iconColor={projects.current === p ? "success" : "muted"} key={p+'-sel_proj'}>{p}</Menu.Item>
            )} */}
          </Menu.OptionsGroup>
          <Menu.Divider />
          <Menu.Group>
            <Menu.Item icon={AddIcon} intent="primary">Add Project</Menu.Item>
          </Menu.Group>
        </Menu>
      </Pane>
    </Pane>
    
  );
}

export default Drawer;