import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const download = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <>
      <div className='container mx-auto px-4 py-6'>
      <h2 className='text-2xl text-gray-700 p-8 font-bold text-center'>Download</h2>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js">
          <Viewer
            fileUrl='/remember.pdf'
            plugins={[defaultLayoutPluginInstance]}/>
        </Worker>
      </div>
    </>
  )
}

export default download
