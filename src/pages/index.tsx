import React, { useState } from "react"
import { Link } from "gatsby"

import initializeSpreadsheet from '../spreadsheet/initializeSpreadsheet'
import SpreadsheetView from '../spreadsheet/SpreadsheetView'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
    const [ modelVer, setModelVer ] = useState(0);
    let spreadsheetModel = initializeSpreadsheet({useLocalStorage: true});

  return <Layout>
    <h1>Spreadsheet demo</h1>

    <SpreadsheetView
     model={spreadsheetModel}
     />

    <button onClick={() => {
        spreadsheetModel = initializeSpreadsheet({useLocalStorage: false});
        setModelVer(modelVer + 1);
    }}>Reset</button>

  </Layout>
}

export default IndexPage
