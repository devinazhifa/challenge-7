import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const Student = () => {
    
    const router = useRouter()
    const { id} = router.query

    const [students, setStudents] = useState(null)

    useEffect(() => {
        axios.get(
          `https://fejs-c7-api.herokuapp.com/api/students/${id}?populate=*`
        ).then(res => {
          setStudents(res.data.data)
          console.log(res)
        })
      }, [])

  return (
    <div>
        { students && (
          <>
            <div>
              <div className='flex flex-row m-12 justify-center'>
                <div>
                  <Zoom>
                  { students.attributes.photo.data !== null && 
                    <img 
                      src={students.attributes.photo.data.attributes.url}
                      className='w-[300px] h-[300px]'
                    />
                  }
                  </Zoom>
                </div>
                <div className='my-32 mx-14 font-semibold leading-8'>
                  <div>First Name : {students.attributes.firstname}</div>
                  <div>Last Name : {students.attributes.lastname}</div>
                  <div>Location : {students.attributes.location}</div>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  )
}

export default Student