import Link from 'next/link'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <div className='bg-blue-400 text-white' >
        <div className='container py-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <h2 className='text-4xl font-extrabold ml-16'>Student</h2>
                </div>
                <div>
                    <ul className='flex space-x-4'>
                        <li className='hover:text-black hover:bg-white px-3 py-2 rounded-md'><Link href="/">Home</Link></li>
                        <li className='hover:text-black hover:bg-white px-3 py-2 rounded-md'><Link href="/input">Input</Link></li>
                        <li className='hover:text-black hover:bg-white px-3 py-2 rounded-md'><Link href="/chart">Chart</Link></li>
                        <li className='hover:text-black hover:bg-white px-3 py-2 rounded-md'><Link href="/download">Download</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <Component {...pageProps} />
    <div className='mt-8 flex flex-col justify-center items-center text-center p-3 bg-blue-100'>
      <h1 className='text-gray-800 font-semibold'>Build with love by FE JS 2</h1>
    </div>
    </>
  )
}

export default MyApp
