import React from 'react';
import PolkaLeft from '../images/PolkaLeft.png';
import PolkaRight from '../images/PolkaRight.png';
import DeletePage from './DeletePage.jsx';


const Home = () => {

  return (
    <div className="container-fluid justify-center items-center text-center">
        <img  src={ PolkaRight } className="absolute top-10 left-[-33px] opacity-30 height-[294px]" />
        <img  src={ PolkaLeft } className="absolute top-12 right-0 opacity-30 height-[300px] overflow-hidden" />
        
        <div className='row mr-[-15px] ml-[-15px] flex flex-col items-center'>
            <h1 className='mt-[120px] text-[39px] font-[900] tracking-tighter mb-[10px]'>We help with your PDF tasks</h1>
            <h2 className='text-[#0c9] text-[26px] mt-[-9px]'>Easy, pleasant and productive PDF editor</h2>
            {/* <div className='mt-[40px] mb-10 py-2 px-4 w-fit font-bold rounded-[4px] bg-[#00cc99]'>
                <div className='btn btn-medium text-white text-lg cursor-pointer' onClick={handleInputClick}>Edit a PDF document 
                    <span className='font-normal'> - it's free</span>
                </div>
                <input className='hidden' type="file" accept='.pdf' title="Upload" name="file" ref={fileInputRef} onChange={ onFileInputChange } />
            </div> */}
            <DeletePage />
        </div>
    </div>
  )
}

export default Home
