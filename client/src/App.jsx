import NewTask from "./pages/NewTask";
import Tasks from './pages/Tasks'
import NewTaskButton from "./components/NewTaskButton";
import {createBrowserRouter, Routes, Route, BrowserRouter} from "react-router-dom";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Tasks/>}/>
      <Route path="/new-task" element={<NewTask/>}/>
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App;