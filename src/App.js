import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useYDoc, useYArray, useYMap } from 'zustand-yjs'
import './App.css';

import styled from 'styled-components'

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

import * as chroma from 'chroma-js'

// import Collaborators from './Components/Collaborators/Collaborators'
import DataTable from './Components/DataTable/DataTable'
import ImportCSV from './Components/ImportCSV/ImportCSV';
import Drawer from './Components/Drawer/Drawer';
import TableControls from './Components/TableControls/TableControls';
import AppBar from './Components/AppBar/AppBar';

const Styles = styled.div`
  margin:10px;
  
  table {
    border-spacing: 0;
    border: 1px solid grey;
    border-radius: 5px;
    background: rgb(224,224,230);
    background: linear-gradient(0deg, rgba(224,224,230,1) 0%, rgba(246,246,251,1) 100%);
    tr {
      :last-child {
        td {
          border-bottom: 0;
          border-radius: 0px 0px 0px 5px;
          :last-child {
            border-radius: 0px 0px 5px 0px;
          }
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid grey;
      border-right: 1px solid grey;
      :last-child {
        border-right: 0;
      }
      input {
        border:none;
        border-bottom: 1px dotted grey;
        background:none;
        cursor:pointer;
        :focus{
          outline:none;
          background:rgba(242,242,242,0.75)
        }
      }
    }
  }
`

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

function randomName(){
  let names1 = ['Bold','Confident','Cunning','Sincere','Thoughtful','Honest','Happy','Amorous','Enlightened','Pretty','Persistent','Passionate','Loving','Faithful','Nice','Optimistic','Plucky','Thoughtful','Funny','Frank','Fearless','Considerate','Courageous','Marvelous','Capable','Accomplished','Wise','Adept','Expert','Engaging']
  let names2 = ['Aardvark','Antelope','Fox','Dog','Alligator','Anteater','Ocelot','Tiger','Bear','Whale','Dolphin','Snake','Dragon','Salmon','Tuna','Cuttlefish','Squid','Octopus','Cat','Lion','Cricket','Grasshopper','Rhino','Zebra','Quetzal','Toucan']

  let firstName = names1[Math.floor(Math.random() * names1.length)]
  let lastName = names2[Math.floor(Math.random() * names2.length)]

  return firstName + ' ' + lastName
}

var awareProvider

const connectDoc = (doc) => {
  console.log('connect to a provider with room', doc.guid)
  const wsProvider = new WebsocketProvider('wss://matte-server.herokuapp.com/', 'my-room3', doc)
  
  wsProvider.on('status', event => {
    console.log(event.status)
  })

  awareProvider = wsProvider.awareness

  awareProvider.setLocalState({ 
      color: chroma.random().hex(),
      name: randomName(),
      clientID: awareProvider.clientID
    })

  return () => console.log('disconnect', doc.guid)
}

const useAwareness = (initAwareness) => {
  const [collabs, setCollabs] = useState([])
  const [awareness, setAwareness] = useState(initAwareness)

  useEffect(() => {
    if(typeof awareness !== 'undefined'){
      setCollabs(Array.from(awareness.getStates().values()))

      awareness.on('update', () => {
        setCollabs(Array.from(awareProvider.getStates().values()))
      })
    }
  },[awareness])
  
  return [collabs, setAwareness]
}


function App() {

  const ydoc = useYDoc('docguid', connectDoc)
  const {data, push: yPush, insert: yInsert} = useYArray(ydoc.getArray('table1'))
  
  const [collabs, setAwareness] = useAwareness(awareProvider)
  
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

  // useEffect(() => {
  //   console.log(collabs)
  // },[collabs])

  const addRow = () => {
    const row = new Y.Map()

    for (let k in blankRow){
      row.set(k, blankRow[k])
    }

    yPush([row])
  }

  return (
    <div className="App">
      <AppBar collabs={collabs}/>
      <div style={{display:'flex', flexDirection:'row', height:'100%'}}>
        <Drawer/>
        <div style={{display:'flex', flexDirection:'column', width:'85%'}}>
          <TableControls/>
          <div style={{display:'flex', flexDirection:'column'}}>
            <Styles>
              <DataTable columns={columns} data={data} awareProvider={awareProvider} collabs={collabs}/>
            </Styles>
            <div style={{width:'100%', display:'flex'}}>
              <input type="button" value="+" onClick={addRow}/>
              <ImportCSV doc={ydoc} yPush={yPush} yInsert={yInsert}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;