import { useState } from 'react'
import Upload from './pages/upload/Upload'
import './App.css'
import List from './pages/list/List'

function App() {
  const [page, setPage] = useState("upload")

  const handlePageChange = (pageName) => {
    setPage(pageName)
  }

  return (
    <div className='app'>
      <h1 className='title'>CSV to DB 😎</h1>
      <div className='header-row'>
        <button className={page === "upload" ? 'active' : ''} onClick={() => handlePageChange("upload")}>Upload CSV</button>
        <button className={page === "list" ? 'active' : ''} onClick={() => handlePageChange("list")}>View List</button>
      </div>
      <div className='page'>
        {page === "upload" ? <Upload setPage={setPage} /> : <List />}
      </div>
    </div>
  )
}


export default App
