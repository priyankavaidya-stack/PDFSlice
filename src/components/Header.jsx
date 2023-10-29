import React from 'react';
import PDFSliceLogo from '../images/PDFSliceLogo.jpeg';

const Header = () => {
  return (
    <div className="bg-[#E84E36]">
      <div>
        <img src={ PDFSliceLogo } style={{ width: "225px", height: "60px" }} />
      </div>
    </div>
  )
}

export default Header
