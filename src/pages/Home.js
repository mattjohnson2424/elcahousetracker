import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { calculateTotalPoints } from "../helpers/Helpers";
import "./Home.css";
import { logos } from "../media";
import { DataContext } from "../contexts/DataContext";

const houses = ["laboriosi", "integritas", "officium", "respectus"]

export const Home = ({ showNav }) => {

  const { students } = useContext(DataContext)
  const { points } = useContext(DataContext)

  const [totalPoints, setTotalPoints] = useState({})
  const [leaders, setLeaders] = useState({})

  function keepFirstThreeElements(array) {
    if (array.length <= 3) {
      return array; // Return the original array as is
    } else {
      return array.slice(0, 3); // Keep the first 3 elements
    }
  }

  useEffect(() => {
    const totalPoints = () => {
      
        let l = 0;
        let i = 0;
        let o = 0;
        let r = 0;

        points.forEach(point => {
          let actualStudents = 0;
          point.students.forEach(student => {
            if (student !== "") {
              actualStudents++;
            }
          })

          if (actualStudents === 0) {
            actualStudents = 1
          }


          if (point.house === "laboriosi") {
            l += parseInt(point.points) * actualStudents;
          } else if (point.house === "integritas") {
            i += parseInt(point.points) * actualStudents;
          } else if (point.house === "officium") {
            o += parseInt(point.points) * actualStudents;
          } else if (point.house === "respectus") {
            r += parseInt(point.points) * actualStudents;
          }
        });


        setTotalPoints({
          laboriosi: l,
          integritas: i,
          officium: o,
          respectus: r
        })
      
    };





    totalPoints();
  }, [points]);

  useEffect(() => {
    const calculatedPoints = calculateTotalPoints(points, students);

    const labrosiTeam = calculatedPoints
      .filter((student) => "laboriosi" === student.house)
      .sort((a, b) => b.points - a.points);
    const integritasTeam = calculatedPoints
      .filter((student) => "integritas" === student.house)
      .sort((a, b) => b.points - a.points);
    const officiumTeam = calculatedPoints
      .filter((student) => "officium" === student.house)
      .sort((a, b) => b.points - a.points);
    const respectusTeam = calculatedPoints
      .filter((student) => "respectus" === student.house)
      .sort((a, b) => b.points - a.points);

    setLeaders({
      laboriosi: keepFirstThreeElements(labrosiTeam),
      integritas: keepFirstThreeElements(integritasTeam),
      officium: keepFirstThreeElements(officiumTeam),
      respectus: keepFirstThreeElements(respectusTeam)
    })

  }, [points, students]);

  return (
    <div className="home-page" style={{ paddingTop: `${showNav ? "50px" : "0px"}`}}>

      <div class="grid">

        {houses.map(house => {
          return (
            <Link to={`/teaminfo?house=${house}`}>
              <div class="square" id={house}>
                  <div class="square-link">
                      <img src={logos[house]} alt={house}/>
                  </div>
                  <div class="name-list">
                      <p class="point-count">{totalPoints[house]} points</p>
                      <br/>
                      <ul style={{ width: "100%"}}>
                        {leaders[house] ? (
                          leaders[house].map((student) => (
                            <li key={student.id}>
                              <p className="main-page-txt front-page-leaders">{student.name} - {student.points} points</p>
                            </li>
                          ))
                        ) : (
                          <div className="main-page-txt front-page-leaders">Leaders Loading...</div>
                        )}
                      </ul>
                      <br/>
                      {/* <p className="main-page-txt">Last point was earned ago</p> */}
                  </div>
              </div>
            </Link>
          )
        })}
        
        
        
        
        
      </div>     
    </div>
  );
};
