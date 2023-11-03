import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";


const FileUpload = () => {

    const [numPages, setNumPages] = useState(null);
    const [pdfData, setPdfData] = useState(null);

    useEffect(() => {
        // Retrieve the PDF data from localStorage
        const storedPDFData = localStorage.getItem('pdfData');
        if(storedPDFData){
            setPdfData(storedPDFData);
        }
        // console.log(storedPDFData);
    }, [pdfData]);

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
            setPdfData(pdfData);
        }
        reader.readAsDataURL(file);
    }

    const onFileInputChange = (event) => {
        const file = event.target.files[0];
        // console.log(file);
        if(file) {
            handleFileUpload(file);
        }
    };


    return (
        <>
            <div className='mt-[40px] mb-10 py-2 px-4 w-fit font-bold rounded-[4px] bg-[#00cc99]'>
                    <div className='btn btn-medium text-white text-lg cursor-pointer' onClick={handleInputClick}>Edit a PDF document 
                        <span className='font-normal'> - it's free</span>
                    </div>
                    <input className='hidden' type="file" accept='.pdf' title="Upload" name="file" ref={fileInputRef} onChange={ onFileInputChange } />
            </div>
            {/* ............ Display pdf here ......... */}
            <div className="flex flex-wrap">
                {pdfData ?  (

                   
                    <Document 
                        file={pdfData}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="grid xl:grid-cols-12 min-[991px]:grid-cols-12 grid-cols-12 mt-3 gap-4"
                    >
                        {Array.from(new Array(numPages),(el, index) => (
                            <div 
                                key={`serial_${index + 1}`}
                                className="p-3 max-[768px]:col-span-12 min-[768px]:col-span-4 min-[1300px]:col-span-3 mx-3">
                                <input type="checkbox" />{index + 1}
                                <Page 
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                    width={200} />
                            </div>
                          )
                         )}
                    </Document>
                ) : (
                    <div>No PDF selected</div>
                )
                }
            </div>
        </>
    )
}

export default FileUpload
