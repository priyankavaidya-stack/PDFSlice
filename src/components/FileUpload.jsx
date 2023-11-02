import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { pdfjs } from 'react-pdf';

const FileUpload = () => {

    const [numPages, setNumPages] = useState(null);
    const [pdfData, setPdfData] = useState(null);

    useEffect(() => {
        // Retrieve the PDF data from localStorage
        const storedPDFData = localStorage.getItem('pdfData');
        setPdfData(storedPDFData);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    // Ensure that the workerSrc is set correctly
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
    ).toString();

    const fileInputRef = useRef(null);

    const handleInputClick = () => {
        fileInputRef.current.click();
    }

    const handleFileUpload= (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const pdfData = event.target.result;
            localStorage.setItem('pdfData', pdfData);
        }
        reader.readAsDataURL(file);
    }

    const onFileInputChange = (event) => {
        const file = event.target.files[0];
        if(file) {
            handleFileUpload(file);
        }
    };


    return (
        <div>
            <div className='mt-[40px] mb-10 py-2 px-4 w-fit font-bold rounded-[4px] bg-[#00cc99]'>
                    <div className='btn btn-medium text-white text-lg cursor-pointer' onClick={handleInputClick}>Edit a PDF document 
                        <span className='font-normal'> - it's free</span>
                    </div>
                    <input className='hidden' type="file" accept='.pdf' title="Upload" name="file" ref={fileInputRef} onChange={ onFileInputChange } />
            </div>
            {/* ............ Display pdf here ......... */}
            <div>
                {pdfData && (
                    <Document file={pdfData}
                    onLoadSuccess={onDocumentLoadSuccess}
                    >
                        {/* {Array.from(new Array(numPages),(el, index) => (
                           
                        ))} */}
                    </Document>
                )}
            </div>
        </div>
    )
}

export default FileUpload
