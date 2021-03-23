// Table container, data and useTable

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable, useGroupBy, useExpanded, useRowState } from 'react-table'
import { useYDoc, useYArray, useYMap } from 'zustand-yjs'
import {Heading, Table} from 'evergreen-ui'

import { WebsocketProvider } from 'y-websocket'
import * as chroma from 'chroma-js'

import Toolbar from './Toolbar'
import {EditRow, EditCell, GroupedRow} from './Row'
import {Footer} from './Toolbar'
import TableHeader from './TableHeader'

import GlobalControls from './GlobalControls'

const Styles = styled.div`
  width: ${props => props.width};
  padding: 24px;
  
  max-width:100%;
  display: block;

  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }

  table {
    width: 100%;
    border-spacing: 0;

    margin: 4px 0px 4px 0px;
    color: ${props => props.theme.text};
    border-spacing: 0;
    border: 1px solid ${props => props.theme.text};
    border-radius: 2px;

    tr {
      :last-child {
        td {
          margin: 0px

          border-bottom: 0;
          border-radius: 0px 0px 0px 2px;

          width: 1%;
          /* But "collapsed" cells should be as small as possible */
          &.collapse {
            width: 0.0000000001%;
          }

          :last-child {
            border-radius: 0px 0px 2px 0px;
          }
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.25rem;
      border-bottom: 1px dotted ${props => props.theme.grey};
      border-right: 1px dotted ${props => props.theme.grey};
      :last-child {
        border-right: 0;
      }
      input {
        border:none;
        /*border-bottom: 1px dotted grey;*/
        background:none;
        cursor:pointer;
        :focus{
          outline:none;
          /*background:${props => props.theme.grey};*/
          border-bottom: 1px dotted ${props => props.theme.secondary};
        }
      }
    }
  }
`

function randomName(){
  let names1 = ['Bold','Confident','Cunning','Sincere','Thoughtful','Honest','Happy','Amorous','Enlightened','Pretty','Persistent','Passionate','Loving','Faithful','Nice','Optimistic','Plucky','Thoughtful','Funny','Frank','Fearless','Considerate','Courageous','Marvelous','Capable','Accomplished','Wise','Adept','Expert','Engaging']
  let names2 = ['Aardvark','Antelope','Fox','Dog','Alligator','Anteater','Ocelot','Tiger','Bear','Whale','Dolphin','Snake','Dragon','Salmon','Tuna','Cuttlefish','Squid','Octopus','Cat','Lion','Cricket','Grasshopper','Rhino','Zebra','Quetzal','Toucan']

  let firstName = names1[Math.floor(Math.random() * names1.length)]
  let lastName = names2[Math.floor(Math.random() * names2.length)]

  return firstName + ' ' + lastName
}

var awareProvider

const connectDoc = (doc) => {
  // console.log('connect to a provider with room', doc.guid)

  // const wsProvider = new WebsocketProvider('wss://matte-server.herokuapp.com/', 'my-room3', doc)
  const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-room5', doc)
  
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

function DataTable({width}) {
  const yDoc = useYDoc('docguid', connectDoc)
  const {data, push: yPush, insert: yInsert} = useYArray(yDoc.getArray('table1'))
  
  const [collabs, setAwareness] = useAwareness(awareProvider)
  
  const columns = React.useMemo(() => [
    {
      Header: 'A',
      accessor: 'a', // accessor is the "key" in the data
    },{
      Header: 'B',
      accessor: 'b',
    },{
      Header: 'C',
      accessor: 'c',
    },{
      Header: 'D',
      accessor: 'd',
    },{
      Header: 'E',
      accessor: 'e',
    },{
      Header: 'F',
      accessor: 'f',
    }
  ],[]
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { groupBy, expanded },
  } = useTable(
    {
      columns,
      data,
    },
    useGroupBy,
    useExpanded,
  )

  return (
    <Styles width={width}>
      <GlobalControls collabs={collabs}/>
      <div className="tableWrap">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <TableHeader column={column}/>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {

              // is there a better place to do this?
              if(!row.canExpand){
                row.values = row.original.toJSON()
              }

              prepareRow(row)

              return (            
                <>
                {row.canExpand ? <GroupedRow row={row}/> : <EditRow row={row} awareProvider={awareProvider} collabs={collabs}/>}
                </>
              )
            })}
          </tbody>
        </table>
      </div>
      <Toolbar yDoc={yDoc} yPush={yPush} yInsert={yInsert}/>
    </Styles>
  )
}

export default DataTable