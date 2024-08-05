import React, { useContext, useEffect, useState } from 'react'
import { calculateTotalPoints } from '../helpers/Helpers';
import "./TeamInfo.css"
import { logos } from '../media';
import { DataContext } from '../contexts/DataContext';

export default function TeamInfo() {

  const queryParameters = new URLSearchParams(window.location.search)
  const house = queryParameters.get("house")

  const { students, points } = useContext(DataContext)
  const [studentPoints, setStudentPoints] = useState([]);

  useEffect(() => {
    const calculatedPoints = calculateTotalPoints(points, students)
    setStudentPoints(calculatedPoints)
  }, [points, students])

  return (

    <div class="page-content">
      <div className="inside-page-content">
        <div class="header-image">
          <img src={logos[house]} alt="crest"/>
        </div>
        <h1>Leaderboard</h1>
          <div class="team-info-name-list">
            {studentPoints
              .filter(student => {
                return student.house === house
              })
              .sort((a, b) => b.points - a.points)
              .map((student, index) => (
                <div key={student.id} className='student-rank-row'>{student.name} - {student.points} points</div>
              ))}
          </div>
      </div>
        

    </div>
  )
}
