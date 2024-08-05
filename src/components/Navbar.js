import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { signInWithPopup, signOut } from "@firebase/auth"
import { auth, provider } from "../firebase"
import UserContext from '../contexts/UserContext';
import useWindowDimensions from './useWindowDimensions';
import "./Navbar.css"

export const Navbar = ({ showNav }) => {

    const user = useContext(UserContext)
    const { width } = useWindowDimensions();
    const location = useLocation()
    // const [navShown, setNavShown] = useState(true)

    const signIn = async () => {
        await signInWithPopup(auth, provider);
      };
    
      const signUserOut = async () => {
        await signOut(auth);
        window.location.href = "/";
      };

      

    //   const keyDownEvent = (event: React.KeyboardEvent) => {
    //     console.log(event.code);
    //     if (event.code === "ArrowRight") {
    //       setLeft(() => left + 15);
    //     }
    //     if (event.code === "ArrowLeft") {
    //       setLeft(() => left - 15);
    //     }
    //     if (event.code === "ArrowDown") {
    //       setTop(() => top + 15);
    //     }
    //     if (event.code === "ArrowUp") {
    //       setTop(() => top - 15);
    //     }
    //   };

  return (
    <>
        {showNav && 
        <>
        ({width >= 768 ? 
            <div className='navbar-wide'>
                <div className='nav-left'>
                    {location.pathname !== "/" && 
                        <div class="nav-item" style={{ }}>
                            <Link to="/"><button className="btn">Back to Home</button></Link>
                        </div>
                    }
                </div>
                <div className='nav-right'>
                    
                    {(user && user.whitelisted) && 
                        <div class="nav-item">
                            <Link to="/addpoints"><button className="btn">Add Points</button></Link>
                        </div>
                    }
                    {(user && user.admin) && 
                        <div className="nav-item">
                            <Link to="/managestudents"><button className="btn">Manage Students</button></Link>
                        </div>
                    }
                    {(user && user.admin) && 
                        <div className="nav-item">
                            <Link to="/pointinfo"><button className="btn">Point Info</button></Link>
                        </div>
                    }
                    <div class="nav-item">
                        {user && user.loggedIn ? (
                            <button className="btn" onClick={signUserOut}>Log Out</button>
                        ) : (
                            <button className="btn" onClick={signIn}>Login</button>
                        )}
                    </div>
                    
                </div> 
            </div>
            :
            <div className="navbar">
                <div className="nav-dropdown">
                    <div className="nav-dropbtn">&#8801;</div>
                    <ul className="nav-dropdown-content">
                        <li className={`nav-dropdown-item ${location.pathname === "/" && "nav-dropdown-current-page"}`}>
                            <Link to="/">Home</Link>
                        </li>
                        {(user && user.whitelisted) && (
                            <li className={`nav-dropdown-item ${location.pathname === "/addpoints" && "nav-dropdown-current-page"}`}>
                                <Link to="/addpoints">Add Points</Link>
                            </li>
                        )}
                        {(user && user.admin) && (
                            <li className={`nav-dropdown-item ${location.pathname === "/manangestudents" && "nav-dropdown-current-page"}`}>
                                <Link to="/managestudents">Manage Students</Link>
                            </li>
                        )}
                        {(user && user.admin) && (
                            <li className={`nav-dropdown-item ${location.pathname === "/pointinfo" && "nav-dropdown-current-page"}`}>
                                <Link to="/pointinfo">Point Info</Link>
                            </li>
                        )}
                        {user && user.loggedIn ? (
                            <li onClick={signUserOut} className={`nav-dropdown-item`}>
                                <Link className="nav-redirect" to="#">Log Out</Link>
                            </li>
                        ) : (
                            <li onClick={signIn} className={`nav-dropdown-item`}>
                                <Link className="nav-redirect" to="#">Log In</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        })
        </>
        }
    </>
  )
}
