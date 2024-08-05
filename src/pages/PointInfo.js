import React, { useContext } from 'react'
import "./PointInfo.css"
import { PointRow } from '../components/PointRow';
import { DataContext } from '../contexts/DataContext';

export const PointInfo = () => {

    const { students, points } = useContext(DataContext)

  return (
    <div className='point-info-container'>
        <h1 style={{ textAlign: 'center' }}>Manage Points</h1>
        <div className='point-info-grid'>
            <div className='point-row'>
                <div className='point-header point-item'>Added</div>
                {/* <div className='point-header point-item'>Added By</div> */}
                <div className='point-header point-item'>Points</div>
                <div className='point-header point-item'>House</div>
                <div className='point-header point-item'>Students</div>
                <div className='point-header point-item'>Reason</div>
                <div className='point-header point-item'>Delete</div>
            </div>
            {points && points.sort((a,b) => {
                return b.timestamp - a.timestamp
            }).map(point => {
                return (
                    <PointRow students={students} point={point}/>
                )
            })}
        </div>
    </div>
  )
}

// .sort((a,b) => {
//     return b.timestamp - a.timestamp
// })
