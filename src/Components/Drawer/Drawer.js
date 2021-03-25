// import React, { useEffect, useMemo } from 'react';

import { Heading, Pane, Menu} from 'evergreen-ui';
import {AddIcon, MoreIcon, TickCircleIcon, IconButton, ChevronLeftIcon } from 'evergreen-ui'
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
      <Pane
        width={"100%"}>
        <Menu>
          <Menu.OptionsGroup
            options={projects.all.map((p) => {return({label:p.name, value:p.key})})}
            selected={projects.current.key}
            // onChange={sel => setProjs({...projects, current:projects.all.find(p => p.key === sel)})}
            onChange={sel => console.log(sel)}
            >
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