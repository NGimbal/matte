// Editable Row, and Cell Components

// Table container, data and useTable

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useTable, useGroupBy, useExpanded, useRowState } from 'react-table'
import { useYDoc, useYArray, useYMap } from 'zustand-yjs'

export const EditCell = ({
  value: initialValue,
  set: set,
  column,
  row,
  awareProvider,
  collabs,
}) => {

  const [val, setVal] = React.useState(initialValue)
  const [editor, setEditor] = React.useState(null)
  
  useEffect(() => {
    setVal(initialValue)
  },[initialValue])

  useEffect(() => {
    let editors = [null]
    if(typeof collabs !== 'undefined') {
      editors = collabs.filter(val => (val.cursor && val.cursor.row === row && val.cursor.column === column))
    }
    setEditor(editors[0])
  },[collabs])

  const onChange = e => {
    setVal(`${e.target.value}`)
    if(typeof awareProvider !== 'undefined'){
      awareProvider.setLocalStateField('cursor', {
        column: column,
        row: row
      })
    }
  }

  const onBlur = e => {
    set(column, `${e.target.value}`)
  }

  return (
    <>
      { 
        editor ? 
        <input style={{border:'3px solid' + editor.color, boxSizing:'border-box'}} value={val} onChange={onChange} onBlur={onBlur}/> :
        <input style={{boxSizing:'border-box'}} value={val} onChange={onChange} onBlur={onBlur}/>
      }
    </>
  )
}

export const EditRow = ({
  row: row,
  awareProvider,
  collabs,
}) => {
  
  // Keep and update the state of the cell
  const { set, data } = useYMap(row.original)
  
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
                : 'default'
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
                  cell.render(EditCell, {value:cell.value, column: cell.column.id, row:cell.row.id, set: set, awareProvider, collabs})
                )
              }
          </td>
        )
      })}
    </tr>  
  )
}

export const GroupedRow = ({
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

// export {EditCell, EditRow, GroupedRow}