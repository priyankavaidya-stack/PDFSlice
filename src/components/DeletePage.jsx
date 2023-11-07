import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { PDFDocument } from 'pdf-lib';


const DeletePage = () => {

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

    // To delete single page in pdf
    const handleDeletePage = async (pageIndex) => {
    
        if (pdfData) {
            const pdfBytes = atob(pdfData.split(",")[1]);
            console.log(pdfBytes);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const pages = pdfDoc.getPages();
            
            if (pageIndex > 0 && pageIndex <= pages.length) {
                pdfDoc.removePage(pageIndex - 1);
                const modifiedPdfData = await pdfDoc.save();
                const modifiedPdfDataUri = `data:application/pdf;base64,${Buffer.from(modifiedPdfData).toString('base64')}`;
                localStorage.setItem('pdfData', modifiedPdfDataUri);
                setPdfData(modifiedPdfDataUri);
            } else {
                console.error("Invalid page index");
            }
        }
    }

    return (
        <>
            <div className='mt-[40px] mb-10 py-2 px-4 w-fit font-bold rounded-[4px] bg-[#00cc99]'>
                    <div className='btn btn-medium text-white text-lg cursor-pointer' onClick={ handleInputClick }>Edit a PDF document 
                        <span className='font-normal'> - it's free</span>
                    </div>
                    <input className='hidden' type="file" accept='.pdf' title="Upload" name="file" ref={fileInputRef} onChange={ onFileInputChange } />
            </div>
            {/* ............ Display pdf here ......... */}
            <div className="flex flex-wrap container justify-center items-center bg-[#EEE]">
                {pdfData ?  (
                   
                    <Document 
                        file={pdfData}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="grid xl:grid-cols-12 min-[991px]:grid-cols-12 grid-cols-12 mt-3"
                    >
                        {Array.from(new Array(numPages),(el, index) => (
                            <div 
                                key={`serial_${index + 1}`}
                                className="p-4 pb-6 mb-4 max-[768px]:col-span-6 max-[370px]:col-span-12 min-[768px]:col-span-3 min-[1300px]:col-span-2 hover:bg-[#DDDDDD] relative">
                                <Page 
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                    width={140}
                                    height={210}
                                    className="shadow-custom"
                                />
                                <div className="bg-white absolute bottom-6 w-[140px] h-20 flex justify-center items-center">
                                    <button 
                                        className="text-[#00cc99] rounded border border-[#00cc99] flex justify-center opacity-30 py-2 px-4 hover:opacity-100 hover:bg-[#00cc99] hover:text-white"
                                    onClick={()=>{
                                        handleDeletePage(index + 1);
                                    }}
                                    >
                                        <RiDeleteBin6Line size={23} className="mr-2" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                                <div className="flex flex-row absolute mt-1.5 w-[130px] justify-center items-center">
                                    <p className="text-xs">A{index + 1}</p>
                                </div>
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

export default DeletePage;
