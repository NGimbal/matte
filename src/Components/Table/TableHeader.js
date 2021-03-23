// Add row, import CSV, download CSV buttons
import React, { useEffect, useMemo } from 'react';

import Collaborators from '../Collaborators/Collaborators'

import * as Y from 'yjs'

import {Table, Menu, Popover, Position, TextDropdownButton, MoreIcon, EditIcon, GroupObjectsIcon, ExpandAllIcon} from 'evergreen-ui'

// Change projects, also views for current project
function TableHeader({column}) {

  return (
    <th {...column.getHeaderProps()}>
      <Popover
        position={Position.BOTTOM_LEFT}
        content={
          <Menu>
            <Menu.Group>
              <Menu.Item icon={EditIcon}>Rename</Menu.Item>
              <Menu.Item icon={GroupObjectsIcon} {...column.getGroupByToggleProps()}>Group by</Menu.Item>
            </Menu.Group>
          </Menu>
        }>
          <TextDropdownButton
            iconAfter={MoreIcon}
            style={{
              width:'calc(100% - 20px)',
              justifyContent:'space-between',
              padding:'0px 10px',
            }}
          >
            {column.render('Header')}
          </TextDropdownButton>
        </Popover>
    </th>
  );
}

export default TableHeader;