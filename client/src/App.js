import {Landing, Error, Register,ProtectedRoute } from "./pages";
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import {AddJob, AllJobs, Profile, Stats, SharedLayout} from './pages/dashboard'


function App() {

  return (
    <div className="test">
      
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <SharedLayout/>
              </ProtectedRoute>
            } 
          >
            <Route index element={<Stats/>} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/register" element={<Register/>} />
          <Route path="/landing" element={<Landing/>} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
