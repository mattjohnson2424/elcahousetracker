import React, { useState, useContext } from "react";
import { collection, addDoc } from "@firebase/firestore";
import UserContext from "../contexts/UserContext"
import { db } from "../firebase";
import "./AddPoints.css";
import { DataContext } from "../contexts/DataContext";
import useWindowDimensions from "../components/useWindowDimensions"

export default function AddPoints() {
  const [house, setHouse] = useState("laboriosi");
  const [students, setStudents] = useState([""]);
  const [points, setPoints] = useState(1);
  const [reason, setReason] = useState("");
  // const [notifyParents, setNotifyParents] = useState(false)
  const user = useContext(UserContext);
  const { width } = useWindowDimensions()
  
  const studentList = useContext(DataContext).students


  const onSubmit = async () => {

    let email;
    if (user) {
      email = user.email;
    } else {
      email = "";
    }

    await addDoc(collection(db, "pointEntries"), {
      house: house,
      students: students,
      points: parseInt(points),
      reason: reason,
      // notifyParents: notifyParents,
      timestamp: Date.now(),
      addedBy: email,
    });


    fetch("https://script.google.com/macros/s/AKfycbwI4MwdQ_MW_nHtT_66pKfBLSRa_JEF13_6ksvo1EzszuASMwSwTU6H8turyMpQv4Tf/exec", {
      method: "POST",
      body: {
        house: house,
        students: students,
        points: parseInt(points),
        reason: reason,
        // notifyParents: notifyParents,
        timestamp: Date.now(),
        addedBy: email,
      }
    })
    .then(res => res.text())
    .then(data => console.log(data))

    setHouse("laboriosi");
    setStudents([""]);
    setPoints(1);
    setReason("");
    // setNotifyParents(false)

    if (!user.admin) {
      window.location.href = "/";
    }
    
  };

  

  const onPointChange = (e) => {
    if (e.target.value < 0) {
      setPoints(0);
    } else {
      setPoints(e.target.value);
    }
  };

  const handleIdChange = (index, newId) => {
    setStudents((prevStudents) => {
      const newStudents = [...prevStudents];
      newStudents[index] = newId;
      return newStudents;
    });
  };
  // const checkHandler = () => {
  //   setNotifyParents(!notifyParents)
  // }


  return (
      
      <div class="wrapper-box">
        <div class="box2">
          <div className="inputContainer">
          <label htmlFor="house" class="textColor">House: </label>
          <select
            name="house"
            id="house"
            onChange={(e) => setHouse(e.target.value)}
          >
            <option value="laboriosi">Laboriosi</option>
            <option value="integritas">Integritas</option>
            <option value="officium">Officium</option>
            <option value="respectus">Respectus</option>
          </select>
          </div>
          
          
          
          <div class="student-input-container">

          {students.map((student, mapIndex) => (
            <div className="single-student-select">
              <label className="textColor">{width >= 768 ? `Student #${mapIndex + 1} Name` : `#${mapIndex + 1}`}     </label>
              <select
                id="name"
                className="nameInput js-example-responsive"
                style={{ width: "100%" }}
                onChange={(e) => handleIdChange(mapIndex, e.target.value)}
              >
                <option value="">Select a student...</option>
                {studentList ? (
                  studentList
                    .filter((student) => {
                      return student.house === house;
                    })
                    .sort((studentA, studentB) => {
                      if (studentA.grade !== studentB.grade) {
                        return studentA.grade - studentB.grade;
                      }
                      return studentA.name.localeCompare(studentB.name);
                    })
                    .map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} - Grade {student.grade}
                      </option>
                    ))
                ) : (
                  <option value="">Loading...</option>
                )}
              </select>
              {/* <input type='text' id={`student${mapIndex}`} value={student} onChange={e => handleNameChange(mapIndex, e.target.value)}/> */}
              <button
                className="btn"
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  const filtered = students.filter(
                    (student, index) => index !== mapIndex
                  ); // ! GRADE NEEDS TO BE AN IDENTIFIER
                  setStudents(filtered);
                }}
              >
                Remove
              </button>

            </div>
          ))}
      </div>
      <button
        className="btn add-student-btn"
        onClick={() => {
          const addedStudent = [...students, ""];
          setStudents(addedStudent);
        }}
      >
        Add Student
      </button>






          
          <div class="input-container">
            <label for="points" class="textColor">
              Point Amount
            </label>
            <input value={points}
        onChange={(e) => onPointChange(e)}type="number" id="points" min="0" step="1" />
          </div>



          
            <div class="input-container">
              <label id="reason-label"for="reason" class="textColor">
                Reason
              </label>
              <input value={reason}
              onChange={(e) => setReason(e.target.value)} type="text" id="reason" />
            </div>
          
          

          <div className="add-points-submit">
            <button onClick={onSubmit} className="btn">Submit</button>
          </div>
          <div id="studentListContainer">
            <ul id="studentList"></ul>
          </div>
        </div>

        </div>
      

      


      
  );
}
