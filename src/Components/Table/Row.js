// Editable Row, and Cell Components

// Table container, data and useTable

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useTable, useGroupBy, useExpanded, useRowState } from 'react-table'
import { useYDoc, useYArray, useYMap } from 'zustand-yjs'
import { Button, ChevronDownIcon, ChevronRightIcon, CollapseAllIcon, ExpandAllIcon, Heading } from 'evergreen-ui'

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
          <td {...cell.getCellProps()}>
            {cell.isPlaceholder ? (
                <></>
              ) : (
                cell.render(EditCell, {value:cell.value, 
                                        column: cell.column.id, 
                                        row:cell.row.id, 
                                        set: set, 
                                        awareProvider, 
                                        collabs})
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
      {row.cells.map((cell, i) => {
          if(i > row.depth) return 
          return (
            i === row.depth ?
              <td colSpan={Object.keys(row.values).length - i} style={{display:'flex'}} {...cell.getCellProps()}>
                <Button height={32} appearance="minimal" iconBefore={row.isExpanded ? <ChevronDownIcon/>  : <ChevronRightIcon/>}  {...row.getToggleRowExpandedProps()}> 
                  {row.groupByVal}
                </Button>
              </td>
              :
              cell.render(<td></td>)
          )
      })}
    </tr>  
  )
}