import React from 'react';
import PDFSliceLogo from '../images/PDFSliceLogo.jpeg';
import PolkaLeft from '../images/PolkaLeft.png';
import PolkaRight from '../images/PolkaRight.png';


const Header = () => {
  return (
    // bg-[#E84E36]
    <div>
      <div className="bg-white">
        {/* <img src={ PDFSliceLogo } style={{ width: "225px", height: "60px" }} /> */}
        <div className='p-2 border '>
          <h1>P</h1>
        </div>
      </div>
      <div className="container-fluid justify-center items-center text-center">
        <img  src={ PolkaRight } className="absolute top-10 left-[-33px] opacity-30 height-[294px]" />
        <img  src={ PolkaLeft } className="absolute top-12 right-0 opacity-30 height-[300px] overflow-hidden" />
        
        <div className='row mr-[-15px] ml-[-15px]'>
          <h1 className='mt-[120px] text-[39px] font-[900] tracking-tighter mb-[10px]'>We help with your PDF tasks</h1>
          <h2 className='text-[#0c9] text-[26px] mt-[-9px]'>Easy, pleasant and productive PDF editor</h2>
          <div className='mt-[40px] mb-10'>
              <a className='btn btn-medium' href="#">Edit a PDF document 
                <span className='font-normal'>- it's free</span>
              </a>
              <div></div>
          </div>
        </div>
      </div>
      <section>
          <div className='mb-[-1px] mt-32 container-fluid content-center' id="curveSlowWave">
              <div className='container-fluid content-center'>
                <svg viewBox='0 0 1440 240'  style={{ backgroundColor: "#f3e5d8" }}>
                  <path d="M0,32L17.1,42.7C34.3,53,69,75,103,74.7C137.1,75,171,53,206,64C240,75,274,117,309,160C342.9,203,377,245,411,224C445.7,203,480,117,514,80C548.6,43,583,53,617,85.3C651.4,117,686,171,720,192C754.3,213,789,203,823,186.7C857.1,171,891,149,926,128C960,107,994,85,1029,112C1062.9,139,1097,213,1131,202.7C1165.7,192,1200,96,1234,58.7C1268.6,21,1303,43,1337,53.3C1371.4,64,1406,64,1423,64L1440,64L1440,0L1422.9,0C1405.7,0,1371,0,1337,0C1302.9,0,1269,0,1234,0C1200,0,1166,0,1131,0C1097.1,0,1063,0,1029,0C994.3,0,960,0,926,0C891.4,0,857,0,823,0C788.6,0,754,0,720,0C685.7,0,651,0,617,0C582.9,0,549,0,514,0C480,0,446,0,411,0C377.1,0,343,0,309,0C274.3,0,240,0,206,0C171.4,0,137,0,103,0C68.6,0,34,0,17,0L0,0Z" 
                  fill-opacity="1" fill='#fff'></path>
                </svg>
              </div>
          </div>
          {/* <div className='mb-[-35px] mt-[30px] container-fluid content-center' id="shakyWave">
          <svg style={{ marginBottom: "-7px", marginTop: "-40px" }} preserveAspectRatio='none'
                viewBox='0 0 100 100' height="100" width="100%" version='1.1' className=''>
                <path d="m-0.33328,19.1669c6.33333,15.6663 19.33328,30.3331 36.45828,24.2081c17.125,-6.125 38.875,6.625 63.875,56.625l-100,0.16667z"></path>
              </svg>
          </div> */}
          <div className='container-fluid content-center h-screen' style={{ 
            background: 'linear-gradient(180deg,#f3e5d8 0,hsla(0,0%,100%,0))'
          }}>

          </div>
      </section>
    </div>
  )
}

export default Header
