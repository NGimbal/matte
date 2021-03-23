import React from 'react'
import './App.css'

import create from 'zustand'

import DataTable from './Components/Table/DataTable'
import Drawer from './Components/Drawer/Drawer'
import AppBar from './Components/AppBar/AppBar'
import {ThemeProvider} from 'styled-components'

const theme = {
    text: '#001720',
    contrastText: '#F8F9F9',

    primary: '#f44336',
    primaryLite: '#f6685e',

    secondary: '#2979FF',
    secondaryLite: '#5393ff',

    ok: '#00A584',
    warning: '#FEDF00',
    alert: '#E91D27',

    grey: '#CED3DF',
  }
  

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <AppBar/>
      <div style={{display:'flex', flexDirection:'row', height:'calc(100% - 48px)'}}>
        <Drawer width='15%'/>
        <DataTable width='85%'/>
      </div>
      </ThemeProvider>
    </div>
  );
}

export default App;