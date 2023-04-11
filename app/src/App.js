import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Authentification } from './views/Authentification';
import { Dashboard } from './views/Dashboard';
import { SignUp } from './views/SignUp';
import { Article } from './views/Article';
import AboutUs from './views/AboutUs';
import AllArticle from './views/AllArticle';
import Add from './views/Add';
import { AddUser } from './views/AddUser';

function App() {
  return (
    <div className="flex min-h-screen overflow-y-auto text-main-blue bg-gradient-to-r from-[#74ebd5] to-[#ACB6E5]">
      <Router>
        <Routes>
          <Route exact path="/" element={<Authentification title="Authentication"/>}/>
          <Route path="/login" element={<Authentification title="Authentication"/>}/>
          <Route path="/signup" element={<SignUp title="Sign Up"/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/article" element={<Article/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/all" element={<AllArticle/>}/>
          <Route path="/new" element={<Add/>}/>
          <Route path="/addUser" element={<AddUser title="Add new user"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;