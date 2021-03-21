// Add row, import CSV, download CSV buttons
import React, { useEffect, useMemo } from 'react';

import Collaborators from '../Collaborators/Collaborators'

import * as Y from 'yjs'

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
    <div style={{width:'100%', display:'flex'}}>
      <input type="button" value="+" onClick={addRow}/>
      <ImportCSV doc={yDoc} yPush={yPush} yInsert={yInsert}/>
    </div>
  );
}

export default Toolbar;



