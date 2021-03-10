import React, { useEffect, useMemo } from 'react';
import { useAsyncCallback } from 'react-async-hook';

import * as Y from 'yjs'

// https://gist.github.com/plbowers/7560ae793613ee839151624182133159
const csvStringToArray = (strData, header=true) =>
{
    //const objPattern = new RegExp(("(\\,|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\\,\\r\\n]*))"),"gi");
    const objPattern = new RegExp(("(\\,|\\r?\\n|\\r|^)(?:\"((?:\\\\.|\"\"|[^\\\\\"])*)\"|([^\\,\"\\r\\n]*))"),"gi");
    let arrMatches = null, arrData = [[]];
    while (arrMatches = objPattern.exec(strData)){
        if (arrMatches[1].length && arrMatches[1] !== ",") arrData.push([]);
        arrData[arrData.length - 1].push(arrMatches[2] ? 
            arrMatches[2].replace(new RegExp( "[\\\\\"](.)", "g" ), '$1') :
            arrMatches[3]);
    }
    if (header) {
        let hData = arrData.shift();
        let hashData = arrData.map(row => {
            let i = 0;
            return hData.reduce(
                (acc, key) => { 
                    acc[key] = row[i++]; 
                    return acc; 
                },
                {}
            );
        });
        return hashData;
    } else {
        return arrData;
    }
}

const readFile = async file => {
  if (!file) return
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}

function ImportCSV(props) {
  const fileContents = useAsyncCallback(readFile)
  
  function getFile(e){
    const input = e.target
    if('files' in input && input.files.length > 0) {
      fileContents.execute(input.files[0])
    }
  }

  useEffect(() => {
    if(!fileContents.result) return

    let data = csvStringToArray(fileContents.result, false)
    // console.log(data)
    data.shift()
    
    // map data to schema
    // eventually can provide a UI to match headers with schema
    let schema = ['format',
                  'divNum',
                  'divName',
                  'secNum',
                  'secName',
                  'keyNum',
                  'keyDesc',
                  'interior',
                  'exterior',
                  'function',
                  'source',
                  'contact',
                  'sku',
                  'color',
                  'finish',
                  'remark']

    data = data.map((val,index,arr) => {
      let row = new Y.Map()
      val.map((v,i) => row.set(schema[i], v))
      return row
    })

    props.yInsert(0, data)

  },[fileContents.result])

  return (
    <div>
      <label htmlFor="input-file">Choose a CSV File:</label>
      <input id="input-file" type="file" onChange={getFile}></input>
    </div>
  );
}

export default ImportCSV;