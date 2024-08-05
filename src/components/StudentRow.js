import React, { useEffect, useState } from 'react';
import { doc, updateDoc, deleteDoc } from "@firebase/firestore"
import { db } from "../firebase"

function StudentRow({ student }) {
  const [name, setName] = useState(student.name);
  const [grade, setGrade] = useState(student.grade);
  const [house, setHouse] = useState(student.house);
  const [parentEmail, setParentEmail] = useState(student.parentEmail);
  const [saveDisabled, setSaveDisabled] = useState(true)

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleGradeChange = event => {
    setGrade(event.target.value);
  };

  const handleHouseChange = event => {
    setHouse(event.target.value)
  }

  const handleParentEmailChange = event => {
    setParentEmail(event.target.value)
  }

  const handleSaveClick = async () => {
    await updateDoc(doc(db, 'students', student.id), {
      name: name,
      grade: grade,
      house: house,
      parentEmail: parentEmail
    });
  };

  const onDelete = async () => {
    await deleteDoc(doc(db, 'students', student.id));
  }

  useEffect(() => {
    setSaveDisabled((name === student.name && grade === student.grade && house === student.house && parentEmail === student.parentEmail))
  }, [name, grade, house, parentEmail, student.name, student.grade, student.house, student.parentEmail])

  return (
    <div className='student-row'>
      <input placeholder="Name" type="text" value={name} onChange={handleNameChange} />
      <select value={grade} onChange={handleGradeChange}>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
      </select>
      <select value={house} onChange={handleHouseChange}>
          <option value="laboriosi">Laboriosi</option>
          <option value="integritas">Integritas</option>
          <option value="officium">Officium</option>
          <option value="respectus">Respectus</option>
      </select>
      <input placeholder='Parent Email' type="text" value={parentEmail} onChange={handleParentEmailChange}/>
      <button className="btn" onClick={handleSaveClick} disabled={saveDisabled}>Save</button>
      <button className='btn' style={{ backgroundColor: "red" }} onClick={onDelete}>Delete</button>
    </div>
  );
}

export default StudentRow;
