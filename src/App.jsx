import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import LoginPage from "./pages/login"; 
import Register from "./pages/register";
import Home from "./pages/home";
import Posts from "./pages/posts";
import Header from "./components/header";
import Dashboard from "./pages/dashboard"; 
import Profile from "./pages/profile"; 
import ProfileDetails from "./pages/profileDetails"; 
import PostDetails from "./pages/postDetails";
import CreateProfile from "./pages/createProfile";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Header />
                  <Routes>
                  <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/:id" element={<ProfileDetails />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/createProfile" element={<CreateProfile />} />
                  </Routes>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
