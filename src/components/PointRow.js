import React, { useContext, useState } from 'react'
import { doc, deleteDoc } from "@firebase/firestore"
import dayjs from 'dayjs'
import { db } from '../firebase'
import { DataContext } from '../contexts/DataContext'

export const PointRow = ({point}) => {

  const { students } = useContext(DataContext)
  const [expand, setExpand] = useState(false)

    const deletePoint = async () => {
        await deleteDoc(doc(db, 'pointEntries', point.id));
    }

    function getNameById(objects, idToFind) {
      
      // Iterate through the objects
      for (const obj of objects) {
        // Check if the object has an "id" key and if its value matches the idToFind
        if (obj.hasOwnProperty('id') && obj.id === idToFind) {
          // Return the "name" value associated with the matching ID
          return obj.name;
        }
      }
      
      // If no match is found, return null or an appropriate value
      return null; // You can also return a custom message or handle the case differently
    }

  return (
    <div className='point-row-container' onClick={() => setExpand(!expand)}>
      <div className='point-row'>
        <div className='point-item'>{dayjs(point.timestamp).format("M-D-YY [at] h:mm A")}</div>
        {/* <div className='point-item'>{point.addedBy ? point.addedBy : "Unnamed"}</div> */}
        <div className='point-item'>{point.points}</div>
        <div className='point-item'>{point.house.charAt(0).toUpperCase() + point.house.slice(1)}</div>
        <div className='point-item'>{point.students.map(student => {
          if (student === "") return <></>
          return <p className='student-point-info'>{getNameById(students, student)}</p>
        })}</div>
        <div className='point-item'>{point.reason}</div>
        <div className='point-item'><button onClick={deletePoint}className='btn' style={{ backgroundColor: "red" }}>Delete Point</button></div>
      </div>

        {expand &&
          <div className='point-row-expand'>
            <div>Added By {point.addedBy}</div>
          </div>
        }
    </div>
    
  )
}
