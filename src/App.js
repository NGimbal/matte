import React, { useState, useEffect, useMemo } from 'react';

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

// const yRow = new Y.Map()

// for (let k in blankRow){
//   yRow.set(k, blankRow[k])
// }

// const yarray = ydoc.getArray('data')

// yarray.push([yRow])

function useYDoc(){
  // how does set state deal with complex javscript objects
  const [ydoc, setYdoc] = useState(new Y.Doc())

  // end point and room name can also be state
  // const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', ydoc)

  // wsProvider.on('status', event => {
  //   console.log(event.status) // logs "connected" or "disconnected"
  // })

  useEffect(() => {
    console.log('ydoc updated!')
  },[ydoc])

  return ydoc
}

// the idea is to provide a parallel array of data
// encapsulate logic to efficiently update the array
function useYArray(name, _ydoc){
  let yArray
  if(typeof _ydoc !== 'undefined') {
    yArray = _ydoc.getArray(name)
  } else {
    yArray = new Y.Array()
  }
  // const [yArray, setYArray] = useState(yarray)
  
  // var store = []

  // useEffect(() => {
  //   console.log('yArray updated!')
  // }, [yArray])

  yArray.observe(yE => {
    console.log('yArray observe')
    console.log(yE.changes)
  })

  yArray.observeDeep(yE => {
    console.log('yArray observeDeep')
    console.log(yE[0].changes)
    // idea is to make this more efficient using
    // yE changes to update selectively
    console.log(yArray)
    // store = yArray.toJSON()
  })

  return yArray
}

function useYMap(name, _ydoc){
  let ymap
  if(typeof _ydoc !== 'undefined') {
    ymap = _ydoc.getMap(name)
  } else {
    ymap = new Y.Map()
  }
  const [yMap, setYMap] = useState(ymap)

  useEffect(() => {
    console.log('yMap updated!')
  }, [yMap])

  yMap.observe(yE => {
    console.log('yMap observe')
  })

  return yMap
}

function App() {
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
    
  const ydoc = useYDoc()
  
  const yArray = useYArray('table1', ydoc)
  
  // const yArray = new Y.Array()
  const yMap = useYMap()

  for (let k in blankRow){
    yMap.set(k, blankRow[k])
  }

  yArray.push([yMap])

  const [data, setData] = React.useState([])

  const mData = React.useMemo(
    () => [
      ...data
    ],
    [data]
  )

  useEffect(() => {
    console.log("data useEffect!")
    console.log(data)
  }, [data])

  const updateMyData = (rowIndex, columnId, value) => {
    let row = yArray.get(rowIndex)
    row.set(columnId, value)
  }

  const addRow = () => {
    const newRow = new Y.Map()

    for (let k in blankRow){
      newRow.set(k, blankRow[k])
    }

    yArray.push([newRow])
    // console.log(ydoc.getArray('table1').toJSON())
  }

  return (
    <div className="App" style={{width:250}}>
      <Styles>
        <DataTable columns={columns} data={mData} updateMyData={updateMyData}/>
      </Styles>
      <input type="button" value="+" onClick={addRow}/>
      <ImportCSV doc={ydoc}/>
    </div>
  );
}

export default App;