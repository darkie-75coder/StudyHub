import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Notes from "./Pages/Notes";
import Dashboard from "./Pages/Dashboard";
import Tasks from "./Pages/Tasks";
import Subjects from "./Pages/Subjects";
import CreateSubject from "./Pages/CreateSubject";
import CreateTask from "./Pages/CreateTask";
import CreateNote from "./Pages/CreateNote";
import UpdateNote from "./Pages/UpdateNote";
import PreviewTask from "./Pages/PreviewTask";
import Home from "./Pages/Home";
import PreviewNote from "./Pages/PreviewNote";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/createSubject" element={<CreateSubject />} />
        <Route path="/createTask" element={<CreateTask />} />
        <Route path="/createNote" element={<CreateNote />} />
        <Route path="/updateNote/:id" element={<UpdateNote />} />
        <Route path="/previewTask/:id" element={<PreviewTask />} />
        <Route path="/previewNote/:id" element={<PreviewNote />} />
      </Routes>
    </div>
  );
};

export default App;
