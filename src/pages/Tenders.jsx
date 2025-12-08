import React from 'react'
import Table from '../components/resusable_components/Table'
import tenders from '../data/tenderTable.json'

export default function Tenders() {
  return (
    <div>
      <Table data={tenders} />
    </div>
  )
}
