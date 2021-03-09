import React, { useState, useEffect, useMemo } from 'react';
import { useYDoc, useYArray, useYMap } from 'zustand-yjs'
import './App.css';

import styled from 'styled-components'

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

import DataTable from './Components/DataTable/DataTable'
import ImportCSV from './Components/ImportCSV/ImportCSV';

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

// const ydoc = new Y.Doc()

// const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', ydoc)

// wsProvider.on('status', event => {
//   window.alert(event.status)
//   console.log(event.status) // logs "connected" or "disconnected"
// })

const blankRow = {
  format: 'lala',
  divNum: '1235',
  divName: 'blabla',
  secNum: '',
  secName: '',
  keyNum: '',
  keyDesc: '',
  interior: false,
  exterior: false,
  function: '',
  source: '',
  contact: '',
  sku: '',
  color: '',
  finish: '',
  remarks: ''
}

const connectDoc = (doc) => {
  console.log('connect to a provider with room', doc.guid)
  const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-room2', doc)
  
  wsProvider.on('status', event => {
    // window.alert(event.status)
    console.log(event.status) // logs "connected" or "disconnected"
  })
  
  return () => console.log('disconnect', doc.guid)
}

function App() {

  const ydoc = useYDoc('docguid', connectDoc)
  const {data: table, push: yPush, insert: yInsert} = useYArray(ydoc.getArray('table1'))

  const columns = React.useMemo(() => [
    {
      Header: 'Format',
      accessor: 'format', // accessor is the "key" in the data
    },{
      Header: 'Division Number',
      accessor: 'divNum',
    },{
      Header: 'Division Name',
      accessor: 'divName',
    },{
      Header: 'Section Number',
      accessor: 'secNum',
    },{
      Header: 'Section Name',
      accessor: 'secName',
    },{
      Header: 'Keynote Number',
      accessor: 'keyNum',
    },{
      Header: 'Keynote Description',
      accessor: 'keyDesc',
    },{
      Header: 'Interior',
      accessor: 'interior',
    },{
      Header: 'Exterior',
      accessor: 'exterior',
    },{
      Header: 'Function/Location',
      accessor: 'function',
    },{
      Header: 'Source',
      accessor: 'source',
    },{
      Header: 'Contact',
      accessor: 'contact',
    },{
      Header: 'Product SKU',
      accessor: 'sku',
    },{
      Header: 'Color',
      accessor: 'color',
    },{
      Header: 'Finish',
      accessor: 'finish',
    },{
      Header: 'Remarks',
      accessor: 'remarks',
    },
  ],[]
  )
  
  const addRow = () => {
    const row = new Y.Map()

    for (let k in blankRow){
      row.set(k, blankRow[k])
    }

    yPush([row])
  }

  return (
    <div className="App" style={{width:250}}>
      <Styles>
        <DataTable columns={columns} table={table}/>
      </Styles>
      <input type="button" value="+" onClick={addRow}/>
      <ImportCSV doc={ydoc} yPush={yPush} yInsert={yInsert}/>
    </div>
  );
}

export default App;