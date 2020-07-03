import React from "react"
import { Link } from "gatsby"

import initializeSpreadsheet from '../spreadsheet/initializeSpreadsheet'
import SpreadsheetView from '../spreadsheet/SpreadsheetView'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const spreadsheetData = initializeSpreadsheet();

const IndexPage = () => (
  <Layout>
    <h1>Spreadsheet demo</h1>

    <SpreadsheetView
     data={spreadsheetData}
     />

  </Layout>
)

export default IndexPage
