import React, {useState} from 'react'
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
  const [orgs, setOrgs] = useState({
    current:{
        name:'OMA',
        key:'oma-1234'
      },
    all: [{
        name:'WSP',
        key:'wsp-1234'
      }, {
        name:'KPF',
        key:'kpf-1234'
      }, {
        name:'BIG',
        key:'big-1234'
      }]
  })

  const [projects, setProjs] = useState({
    current:{name:'table2', key:'table2'},
    all: [{name:'table1', key:'table1'}, 
          {name:'table2', key:'table2'}, 
          {name:'table3', key:'table3'}]
  })

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <AppBar/>
      <div style={{display:'flex', flexDirection:'row', height:'calc(100% - 48px)'}}>
        <Drawer width='15%' orgs={orgs} projects={projects} setProjs={setProjs}/>
        <DataTable width='85%' project={projects.current} org={orgs.current}/>
      </div>
      </ThemeProvider>
    </div>
  );
}

export default App;