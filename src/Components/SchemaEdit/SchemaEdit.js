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
  Button,
  Position,
  TextInput,
  ChevronDownIcon
  } from 'evergreen-ui'

const fields = [
  'Header',
  'Show/Hide',
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
          <Table.Row key={col.id}>
            <Table.TextCell>
              <TextInput
                name={col.id + '-input'}
                value={col.Header}
                width="100%"
              />
            </Table.TextCell>
            <Table.Cell ><Switch {...col.getToggleHiddenProps()} checked={col.isVisible}/></Table.Cell>
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
                <Button
                  iconAfter={ChevronDownIcon}
                  appearance="minimal"
                >
                  Type
                </Button>
              </Popover>
            </Table.TextCell>
          </Table.Row>  
        )}
      </Table.Body>
    </Table>
  );
}

export default SchemaEdit;