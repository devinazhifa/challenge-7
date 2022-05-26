import React, {useRef, useState} from 'react'
import axios from 'axios'
import {useDropzone} from 'react-dropzone';

const input = () => {

  const [formMessage, setFormMessage] = useState('')
  const [showFormMessage, setShowFormMessage] = useState(false)
  const [formMessageType, setFormMessageType] = useState('error')
  const [formIsLoading, setFormIsLoading] = useState(false)

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));  

  const inputFirstname = useRef()
  const inputLastname = useRef()
  const inputLocation = useRef()

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    setFormIsLoading(true)

    const formIsCompleted = false

    // Validasi dan sanitasi
    let firstname = inputFirstname.current.value
    let lastname = inputLastname.current.value
    let location = inputLocation.current.value

    firstname = firstname.trim()
    lastname = lastname.trim()
    location = location.trim()

    if ( firstname !== '' && lastname !== '' && location !== ''
    && acceptedFiles.length > 0 ) {
      formIsCompleted = true
    }

    if ( formIsCompleted ) {
        // data setup
        const submittedData = {
          firstname,
          lastname,
          location
        }

        // membuat object FormData
        const formData = new FormData();
        
        // memasukkan photo ke formData
        formData.append('data', JSON.stringify(submittedData))
        acceptedFiles.forEach( file => {
          formData.append('files.photo', file, file.path)
        })

        // post to API
        try {
          const res = await axios.post('https://fejs-c7-api.herokuapp.com/api/students/', formData)
          if( res.data.data.id )
          setFormMessage('Terima kasih data anda sudah diterima')
          setFormMessageType('success')
          setShowFormMessage(true) 
          inputFirstname.current.value = ''
          inputLastname.current.value = ''
          inputLocation.current.value = ''
          // acceptedFiles = []

        } catch (err) {
          setFormMessage('Maaf koneksi sedang bermasalah')
          setFormMessageType('error')
          setShowFormMessage(true)  
        }
      } else {
        setFormMessage('Harap Mengisi seluruh form')
        setFormMessageType('error')
        setShowFormMessage(true)
      }

      setFormIsLoading(false)
    }
    
  return (
    <>
      <div className='flex items-center h-screen w-full bg-teal-lighter'>
        <div className='w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto'>
          <h2 className='text-2xl text-gray-700 p-8 font-bold text-center'>Input</h2>

          { (showFormMessage === true ) && 
            <div>
              { formMessageType === 'error' && `Error: ${formMessage} ` } 
              { formMessageType === 'success' && `Success: ${formMessage} `} 
            </div>
          }
          <div style= {{
            opacity: formIsLoading === true ? '0.3' : '1',
            pointerEvents: formIsLoading === true ? 'none' : 'all'
            }}
          >
            <form onSubmit={formSubmitHandler} className='mb-4 md:flex md:flex-wrap md:justify-between'>
              <div className='flex flex-col mb-4 md:w-full'>
                <label className='mb-2 font-bold text-md text-gray-700'>First Name</label>
                <input type='text' name='firstname' id='firstname' ref={inputFirstname} className='border rounded-lg py-2 px-3 text-grey-darkest md:mr-2' ></input>
              </div>
              <div className='flex flex-col mb-4 md:w-full'>
                <label className='mb-2 font-bold text-md text-gray-700'>Last Name</label>
                <input type='text' name='lastname' id='lastname' ref={inputLastname} className='border rounded-lg py-2 px-3 text-grey-darkest md:mr-2' ></input>
              </div>
              <div className='flex flex-col mb-4 md:w-full'>
                <label className='mb-2 font-bold text-md text-gray-700'>Location</label>
                <input type='text' name='location' id='location' ref={inputLocation} className='border rounded-lg py-2 px-3 text-grey-darkest md:mr-2' ></input>
              </div>
              <div className='flex flex-col mb-4 md:w-full'>
                <label  className='mb-2 font-bold text-md text-gray-700'>Photo</label>
                <div {...getRootProps({className: 'dropzone'})}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                  <ul>{files}</ul>
                </div>
              </div>
              <div>
                <button className="bg-blue-500 rounded-lg p-3 text-white" type="submit">Submit Form</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default input
