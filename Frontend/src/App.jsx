import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
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
import ProtectedRoute from "./Context/ProtectedRoute";
import PreviewNote from "./Pages/PreviewNote";
import PageNotFound from "./Components/PageNotFound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <Subjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createSubject"
          element={
            <ProtectedRoute>
              <CreateSubject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createTask"
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createNote"
          element={
            <ProtectedRoute>
              <CreateNote />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateNote/:id"
          element={
            <ProtectedRoute>
              <UpdateNote />
            </ProtectedRoute>
          }
        />
        <Route
          path="/previewTask/:id"
          element={
            <ProtectedRoute>
              <PreviewTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/previewNote/:id"
          element={
            <ProtectedRoute>
              <PreviewNote />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
