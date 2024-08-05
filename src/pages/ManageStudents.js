import React, { useContext, useEffect, useState } from 'react'
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebase";
import "./ManageStudents.css"
import StudentRow from '../components/StudentRow';
import { DataContext } from '../contexts/DataContext';

export const ManageStudents = () => {

    const [gradeFilter, setGradeFilter] = useState("")
    const [nameFilter, setNameFilter] = useState("")
    const [houseFilter, setHouseFilter] = useState("")
    const { students } = useContext(DataContext)

    const [newName, setNewName] = useState("")
    const [newGrade, setNewGrade] = useState("5")
    const [newHouse, setNewHouse] = useState("laboriosi")
    const [newParentEmail, setNewParentEmail] = useState("")

    const [addDisabled, setAddDisabled] = useState(true)

    useEffect(() => {
        setAddDisabled(newName === "")
    }, [newName])

    const addNewStudent = async () => {
        await addDoc(collection(db, 'students'), {
            name: newName,
            grade: newGrade,
            house: newHouse,
            parentEmail: newParentEmail
        });

        setNewName("")
        setNewGrade("5")
        setNewHouse("laboriosi")
        setNewParentEmail("")

    }

  return (
    
    <div className='manage-student-container'>
        <div className='inside-container'>
            <h2 style={{ textAlign: "center" }}>New Student</h2>
            <div className='add-new-student'>
                <input placeholder="Name" type="text" value={newName} onChange={e => setNewName(e.target.value)} />
                <select value={newGrade} onChange={e => setNewGrade(e.target.value)}>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
                <select value={newHouse} onChange={e => setNewHouse(e.target.value)}>
                    <option value="laboriosi">Laboriosi</option>
                    <option value="integritas">Integritas</option>
                    <option value="officium">Officium</option>
                    <option value="respectus">Respectus</option>
                </select>
                <input placeholder="Parent Email"type="text" value={newParentEmail} onChange={e => setNewParentEmail(e.target.value)}/>
                <button  className="success btn" disabled={addDisabled} onClick={addNewStudent}>Add</button>
            
            </div>
            <h2 style={{ textAlign: "center" }}>Filter Students</h2>
            <div className='filters'> 
                <input placeholder="Filter Name" type="text" value={nameFilter} onChange={e => setNameFilter(e.target.value)}/>
                <select value={gradeFilter} onChange={e => setGradeFilter(e.target.value)}>
                    <option value="">All Grades</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
                <select value={houseFilter} onChange={e => setHouseFilter(e.target.value)}>
                    <option value="">All Houses</option>
                    <option value="laboriosi">Laboriosi</option>
                    <option value="integritas">Integritas</option>
                    <option value="officium">Officium</option>
                    <option value="respectus">Respectus</option>
                </select>
            </div>
            <div className='edit-student-box'>
                <h2 style={{ textAlign: "center" }}>Student List</h2>
                {students.filter(student => {
                    if (gradeFilter === "") return true
                    return student.grade === gradeFilter
                }).filter(student => {
                    return (student.name).toLowerCase().includes(nameFilter.toLowerCase()) || nameFilter === ""
                }).filter(student => {
                    if (houseFilter === "") return true
                    return student.house === houseFilter
                }).sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                }).sort((a,b) => {
                    return a.grade - b.grade
                }).map(student => (
                    <StudentRow student={student} key={student.id}/>
                ))}
            </div>
        </div>
    </div>
    
  )
}
