// Add row, import CSV, download CSV buttons
import React, { useEffect } from 'react';

import {
  CodeIcon, 
  DocumentIcon, 
  GlobeNetworkIcon, 
  NumericalIcon, 
  Popover, 
  Switch, 
  Table, 
  TickCircleIcon, 
  TranslateIcon,
  Menu,
  TextDropdownButton,
  Position,
  TextInput
  } from 'evergreen-ui'

const fields = [
  'Header',
  'ToggleShow',
  'Type',
]

// Change projects, also views for current project
function SchemaEdit({columns, yColumn}) {

  return (
    <Table>
      <Table.Head>
        {fields.map(val =>
            <Table.TextHeaderCell>
              {val}
            </Table.TextHeaderCell>
        )}
      </Table.Head>
      <Table.Body>
        {columns.map(col => 
          <Table.Row key={col['accessor']}>
            <Table.TextCell>
              <TextInput
                name={col['Header'] + '-input'}
                value={col['Header']}
              />
            </Table.TextCell>
            <Table.TextCell><Switch/></Table.TextCell>
            <Table.TextCell>
              <Popover
                position={Position.BOTTOM_LEFT}
                content={
                  <Menu>
                    <Menu.Group>
                      <Menu.Item icon={TranslateIcon}>Text</Menu.Item>
                      <Menu.Item icon={NumericalIcon}>Number</Menu.Item>
                      <Menu.Item icon={TickCircleIcon}>Yes/No</Menu.Item>
                      <Menu.Item icon={GlobeNetworkIcon}>URL</Menu.Item>
                      <Menu.Item icon={DocumentIcon}>Attachment</Menu.Item>
                    </Menu.Group>
                  </Menu>
                }>
                <TextDropdownButton
                  iconAfter={CodeIcon}
                  style={{
                    width:'calc(100% - 20px)',
                    justifyContent:'space-between',
                    padding:'0px 10px',
                  }}
                >
                  Type
                </TextDropdownButton>
              </Popover>
            </Table.TextCell>
          </Table.Row>  
        )}
      </Table.Body>
    </Table>
  );
}

export default SchemaEdit;