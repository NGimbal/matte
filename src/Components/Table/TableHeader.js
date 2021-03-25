// Add row, import CSV, download CSV buttons
import React, { useEffect, useMemo } from 'react';

import Collaborators from '../Collaborators/Collaborators'

import * as Y from 'yjs'

import {Table, Pane, Menu, Popover, Position, TextDropdownButton, MoreIcon, EditIcon, GroupObjectsIcon, ExpandAllIcon} from 'evergreen-ui'

// Change projects, also views for current project
function TableHeader({column}) {

  // would like to make this menu narrower
  return (
    <th {...column.getHeaderProps()}>
      <Popover
        position={Position.BOTTOM_RIGHT}
        content={
            <Menu>
              <Menu.Group>
                <Menu.Item icon={EditIcon} key={column.accessor+"-rename"}>Rename</Menu.Item>
                <Menu.Item icon={GroupObjectsIcon} {...column.getGroupByToggleProps()} key={column.accessor+"-groupBy"}>Group by</Menu.Item>
              </Menu.Group>
            </Menu>
        }>
          <TextDropdownButton
            icon={MoreIcon}
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