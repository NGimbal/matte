import React from 'react'
import styled from 'styled-components'
import { useTable, useGroupBy, useExpanded, useRowState } from 'react-table'
import { useYDoc, useYArray, useYMap } from 'zustand-yjs'

// TODO:
// Cell is rendered normally, except when click, turns to editable cell
//

// Create an editable cell renderer
// const EditableCell = ({
//   // value: initialValue,
//   row: { original },
//   // row: { index },
//   column: { id },
// }) => {
  
//   // Keep and update the state of the cell
//   const { set, data } = useYMap(original)

//   const onChange = e => {
//     console.log("onChange")
//     // setValue(e.target.value)
//     set(id, `${e.target.value}`)
//   }

//   // We'll only update the external data when the input is blurred
//   // const onBlur = () => {
//   //   console.log("blur")
//   // }

//   return <input value={data[id]} onChange={onChange} />
// }

const SimpleEditableCell = ({
  value: initialValue,
  set: set,
  column: { id },
}) => {
  
  // Keep and update the state of the cell
  // const { set, data } = useYMap(original)

  const onChange = e => {
    console.log("onChange")
    // setValue(e.target.value)
    set(id, `${e.target.value}`)
  }

  // We'll only update the external data when the input is blurred
  // const onBlur = () => {
  //   console.log("blur")
  // }

  return <input value={initialValue} onChange={onChange} />
}

const EditableRow = ({
  // value: initialValue,
  // row: { original },
  row: row,
  // row: { index },
  // column: { id },
}) => {
  
  // Keep and update the state of the cell
  const { set, data } = useYMap(row.original)

  // const onChange = e => {
  //   console.log("onChange")
  //   console.log(e)
    // setValue(e.target.value)
    // set(id, `${e.target.value}`)
  // }

  // We'll only update the external data when the input is blurred
  // const onBlur = () => {
  //   console.log("blur")
  // }

  return (
    <tr {...row.getRowProps()}>
      {row.cells.map(cell => {
        // console.log(cell)
        return (
          <td 
            {...cell.getCellProps()}
            style={{
              background: cell.isGrouped
                ? '#0aff0082' // green
                : cell.isAggregated
                ? '#ffa50078' // orange
                : cell.isPlaceholder
                ? '#ff000042'
                : 'white'
              }}
            >
              {cell.isGrouped ? (
                <>
                  <span {...row.getToggleRowExpandedProps()}>
                    {row.isExpanded ? '👇' : '👉'}
                  </span>{' '}
                  {cell.render('Cell')} ({row.subRows.length})
                </>
                ) : cell.isAggregated ? (
                  cell.render('Aggregated')
                ) : cell.isPlaceholder? null : (
                  cell.render(SimpleEditableCell, {value:cell.value, column: cell.column, set: set})
                )
              }
          </td>
        )
      })}
    </tr>  
  )
}

const GroupedRow = ({
  // value: initialValue,
  // row: { original },
  row: row,
  // row: { index },
  // column: { id },
}) => {
  
  // Keep and update the state of the cell
  // const { set, data } = useYMap(row.original)

  // const onChange = e => {
  //   console.log("onChange")
  //   console.log(e)
    // setValue(e.target.value)
    // set(id, `${e.target.value}`)
  // }

  // We'll only update the external data when the input is blurred
  // const onBlur = () => {
  //   console.log("blur")
  // }

  return (
    <tr {...row.getRowProps()}>
      {row.cells.map(cell => {
        // console.log(cell)
        return (
          <td 
            {...cell.getCellProps()}
            style={{
              background: cell.isGrouped
                ? '#0aff0082' // green
                : cell.isAggregated
                ? '#ffa50078' // orange
                : cell.isPlaceholder
                ? '#ff000042'
                : 'white'
              }}
            >
              {cell.isGrouped ? (
                <>
                  <span {...row.getToggleRowExpandedProps()}>
                    {row.isExpanded ? '👇' : '👉'}
                  </span>{' '}
                  {cell.render('Cell')} ({row.subRows.length})
                </>
                ) : cell.isAggregated ? (
                  cell.render('Aggregated')
                ) : cell.isPlaceholder? null : (
                  cell.render('Cell') // this shouldn't happen?
                )
              }
          </td>
        )
      })}
    </tr>  
  )
}

function DataTable({ columns, table: data }) {
  // const data = React.useMemo(() =>
  //   table.map(row => row.toJSON())
  // , [table])

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
    // useRowState,
  )


  // console.log(data)

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.canGroupBy ? (
                  <span {...column.getGroupByToggleProps()}>
                    {column.isGrouped ? '🤌' : '🖐'}
                  </span>
                ) : null}
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          // is this going to be rly slow?
          if(!row.canExpand){
            row.values = row.original.toJSON()
          }
          // console.log(prepareRow)
          prepareRow(row)

          // row.canExpand ? renderGrouped(row) : renderEditable(row)
          return (            
            <>
            {row.canExpand ? <GroupedRow row={row}/> : <EditableRow row={row}/>}
            </>
          )
        })}
      </tbody>
    </table>
  )
}

export default DataTable
