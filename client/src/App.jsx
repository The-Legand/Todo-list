import NewTask from "./pages/NewTask";
import Tasks from './pages/Tasks'
import TaskMap from './pages/TaskMap'
import NewTaskButton from "./components/NewTaskButton";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/SideBarLayout";

function App() {
  return (
    <>
   
    <BrowserRouter>
    <Routes>
      <Route element={<SidebarLayout/>}>
      <Route path="/" element={<Tasks/>}/>
      <Route path="/new-task" element={<NewTask/>}/>
      <Route path="/task-map" element={<TaskMap/>}/>
      </Route>
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App;