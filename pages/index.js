import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const index = () => {

  const router = useRouter()

  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('https://fejs-c7-api.herokuapp.com/api/students/?populate=*'
    ).then ( res => {
      console.log(res)
      setStudents([...res.data.data]);
    })
  }, []);

  return (
    <>
      <div className='container mx-auto'>
        <h2 className='text-2xl text-gray-700 p-8 font-bold text-center'>Home Page</h2>
        <div className='justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 '>
          { students.map((student) => {
            return(
              <div 
                key={student.id}
                // onClick={() => router.push(`/student/${student.id}`)}
                className='border-solid border-2 border-gray-150 rounded-md p-4'  
              >
                {student.attributes.photo.data !== null && 
                <Zoom>
                  <img src={student.attributes.photo.data.attributes.url} width="250" />
                </Zoom>
                }
                <ul key={student.id} onClick={() => router.push(`/student/${student.id}`)} >
                  <li>First Name: {student.attributes.firstname}</li>
                  <li>Last Name: {student.attributes.lastname}</li>
                  <li>Location: {student.attributes.location}</li>
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default index
