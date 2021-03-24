// Add row, import CSV, download CSV buttons
import React, {useState} from 'react';

import {Dialog, IconButton} from 'evergreen-ui'
import {CogIcon, GroupObjectsIcon, FilterListIcon} from 'evergreen-ui'
import Collaborators from '../Collaborators/Collaborators';
import SchemaEdit from '../SchemaEdit/SchemaEdit';

// Change projects, also views for current project
function GlobalControls({collabs, columns}) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex'}}>
          <IconButton icon={GroupObjectsIcon} marginRight={8}/>
          <IconButton icon={FilterListIcon} marginRight={8}/>
          <Dialog
            isShown={open}
            title="Schema Edit Test"
            onCloseComplete={() => setOpen(false)}
            confirmLabel='Confirm'>
              <SchemaEdit columns={columns}></SchemaEdit>
          </Dialog>
          <IconButton icon={CogIcon} onClick={() => setOpen(true)}/>
        </div>
        <Collaborators collabs={collabs}/>
    </div>
  );
}

export default GlobalControls;