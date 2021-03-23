// Add row, import CSV, download CSV buttons
import React, { useEffect, useMemo } from 'react';

import Collaborators from '../Collaborators/Collaborators'

import * as Y from 'yjs'

import {Button, ImportIcon, Pane, PlusIcon, Popover, Position} from 'evergreen-ui'

import ImportCSV from '../ImportCSV/ImportCSV'

const blankRow = {
  a: 'lala',
  b: '1235',
  c: 'blabla',
  d: '',
  e: '',
  f: '',
}

// Change projects, also views for current project
function Toolbar({yDoc, yPush, yInsert}) {
  
  const addRow = () => {
    const row = new Y.Map()

    for (let k in blankRow){
      row.set(k, blankRow[k])
    }

    yPush([row])
  }

  return (
    <div style={{width:'100%', display:'flex', alignItems:'flex-start'}}>
      <Button iconBefore={PlusIcon} onClick={addRow} marginLeft={20} marginRight={10}>Add Row</Button>
      <Popover
        bringFocusInside
        position={Position.BOTTOM}
        content={
          <Pane
          paddingX={10}
          paddingY={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column">
            <ImportCSV doc={yDoc} yPush={yPush} yInsert={yInsert}/>
          </Pane> 
        }>
          <Button iconBefore={ImportIcon}>Import CSV</Button>
        </Popover>
    </div>
  );
}

export default Toolbar;



