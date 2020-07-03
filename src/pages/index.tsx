import React, { useState } from "react"
import { Link } from "gatsby"

import initializeSpreadsheet from '../spreadsheet/initializeSpreadsheet'
import SpreadsheetView from '../spreadsheet/SpreadsheetView'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

let spreadsheetModel = initializeSpreadsheet({useLocalStorage: true});
// spreadsheetModel.saveToLocalStorage = true;

const IndexPage = () => {
    const [ modelVer, setModelVer ] = useState(0);

  return <Layout>
    <h1>Spreadsheet demo</h1>

    <SpreadsheetView
     model={spreadsheetModel}
     />

    <button onClick={() => {
        spreadsheetModel.resetToFakeData();
        setModelVer(modelVer + 1);
    }}>Reset</button>

  </Layout>
}

export default IndexPage
