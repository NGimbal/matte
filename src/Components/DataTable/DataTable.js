import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useTable, useGroupBy, useExpanded, useRowState } from 'react-table'
import { useYDoc, useYArray, useYMap } from 'zustand-yjs'

const SimpleEditableCell = ({
  value: initialValue,
  set: set,
  column: { id },
}) => {

  const [val, setVal] = React.useState(initialValue)
  
  useEffect(() => {
    setVal(initialValue)
  },[initialValue])

  const onChange = e => {
    setVal(`${e.target.value}`)
  }

  const onBlur = e => {
    set(id, `${e.target.value}`)
  }

  return <input value={val} onChange={onChange} onBlur={onBlur} />
}

const EditableRow = ({
  row: row,
}) => {
  
  // Keep and update the state of the cell
  const { set, data } = useYMap(row.original)

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
  row: row,
}) => {

  return (
    <tr {...row.getRowProps()}>
      {row.cells.map(cell => {
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
                ) : cell.isPlaceholder ? null : (
                  cell.render('Cell') // this shouldn't happen?
                )
              }
          </td>
        )
      })}
    </tr>  
  )
}

function DataTable({ columns, data }) {
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

          // is there a better place to do this?
          if(!row.canExpand){
            row.values = row.original.toJSON()
          }

          prepareRow(row)

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
