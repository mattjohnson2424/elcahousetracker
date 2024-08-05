import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './pages/Home.js';
import TeamInfo from './pages/TeamInfo';
import AddPoints from './pages/AddPoints';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "./firebase";
import { collection, getDocs, query } from "@firebase/firestore";
import { UserContext } from "./contexts/UserContext"
import { ManageStudents } from './pages/ManageStudents';
import { Navbar } from './components/Navbar';
import { NotFound } from './pages/NotFound';
import { PointInfo } from "./pages/PointInfo.js";
import { DataContextWrapper } from "./contexts/DataContext.js";


function App() {

  const [user, setUser] = useState(null);
  const [showNav, setShowNav] = useState(true)
  
  // start useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const dbWhiteList = []
        const q = query(collection(db, "whitelist"));
        const whitelistSnapshot = await getDocs(q)
        whitelistSnapshot.forEach(doc => {
          dbWhiteList.push(doc.id)
        })
        if (dbWhiteList.includes(user.uid)) {
          user.whitelisted = true
        } else {
          user.whitelisted = false
        }

        const dbAdmins = []
        const r = query(collection(db, "admins"));
        const adminsSnapshot = await getDocs(r)
        adminsSnapshot.forEach(doc => {
          dbAdmins.push(doc.id)
        })
        if (dbAdmins.includes(user.uid)) {
          user.admin = true
        } else {
          user.admin = false
        }
        user.loggedIn = true  
        setUser(user)    
      } else {
        const user = {}
        user.whitelisted = false
        user.loggedIn = false
        setUser(user)
        
      }

    })
    return () => unsubscribe();
  }, [])

  useEffect(() => {
    window.addEventListener("keypress", event => {
      if (event.key === "~") {
        setShowNav(false)
      } else if (event.key === "`") {
        setShowNav(true)
      }

    })
  }, [])

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={user}>
          <DataContextWrapper>
            <Navbar showNav={showNav}/>
            <Routes>
              <Route exact path="/" element={<Home showNav={showNav}/>}/>
              <Route exact path="/teaminfo" element={<TeamInfo/>}/>
              {(user && user.whitelisted) && <Route exact path="/addpoints" element={<AddPoints/>}/>}
              {(user && user.admin) && <Route exact path="/managestudents" element={<ManageStudents/>}/>}
              {(user && user.admin) && <Route exact path="/pointinfo" element={<PointInfo/>}/>}
              <Route path="/*" element={<NotFound/>}/>
            </Routes>
          </DataContextWrapper>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
