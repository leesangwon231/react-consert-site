import ContentsDetailPage from "./pages/ContentsDetailPage/ContentsDetailPage"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    
      <div>
        <Routes>
          <Route path="/:id" element={<ContentsDetailPage/>}/>
        </Routes>
      </div>
    
  )
}

export default App
