import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from 'react-router-dom'
import "./App.css";
import { Sign } from "./pages/Sign";
import { AuthProvider } from "./helper/auth";
import { RequireAuth } from "./helper/requireAuth";
import { Footer } from "./components/Footer";
import { LoggedPage } from "./pages/LoggedPage";
import { AlertModal } from "./components/AlertModal";
import { QuestionsPage } from "./pages/QuestionsPage";
import { AppNavBar } from "./components/AppNavBar";
import { Home } from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <div style={{minHeight: '100vh', backgroundColor: '#f5f5f5'}}>
        <AppNavBar />
        <Routes>
          <Route path='/signin' element={<Sign isSignin={true} />}/>
          <Route path='/signup' element={<Sign isSignin={false} />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/questions' element={<RequireAuth><QuestionsPage /></RequireAuth>}/>
          <Route path='*' element={<RequireAuth><LoggedPage /></RequireAuth>}/>
        </Routes>
      </div>
      <Footer />
      <AlertModal />
    </AuthProvider>
  );
}

export default App;
