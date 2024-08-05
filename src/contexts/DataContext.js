import React, { createContext, useState, useEffect } from "react";
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";

export const DataContext = createContext(null);

export const DataContextWrapper = props => {

    const [points, setPoints] = useState([])
    const [students, setStudents] = useState([])

    useEffect(() => {
        const q = query(collection(db, "students"));
        const dbStudents = [];
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dbStudents.push({
                    ...doc.data(),
                    id: doc.id,
                });
            });
            setStudents(dbStudents);
        });

        const r = query(collection(db, "pointEntries"));
        onSnapshot(r, (querySnapshot) => {
            const dbPoints = []
            querySnapshot.forEach((doc) => {
                const point = {
                    id: doc.id,
                    ...doc.data()
                }
                if (!Number.isInteger(point.points)) {
                    point.points = 1
                }
                dbPoints.push(point);
            });
            setPoints(dbPoints);
        });

    }, [])

  return (
    <DataContext.Provider value={{points, students}}>
        {props.children}
    </DataContext.Provider>
  )
}
