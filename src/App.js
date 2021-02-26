import React, { useMemo } from 'react';

import './App.css';

import styled from 'styled-components'

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

function App() {
  const [data, setData] = React.useState([{
    format: '',
    divNum: '',
    divName: '',
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
  },])

  const mData = React.useMemo(
    () => [
      ...data
    ]
    ,
    [data]
  )
  
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

  const updateMyData = (rowIndex, columnId, value) => {
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  return (
    <div className="App" style={{width:250}}>
      <Styles>
        <DataTable columns={columns} data={mData} updateMyData={updateMyData}/>
      </Styles>
      <ImportCSV setData={setData}/>
    </div>
  );
}

export default App;