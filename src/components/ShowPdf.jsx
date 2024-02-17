import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { PDFDocument } from 'pdf-lib';

const ShowPdf = ({ pdfFile }) => {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfContent, setPdfContent] = useState(null);
    const [selectedPages, setSelectedPages] = useState([]);
    const [deleteInput, setDeleteInput] = useState('');


    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(pdfFile);
          const data = await response.arrayBuffer();
          setPdfContent(new Uint8Array(data));
        };
    
        if (pdfFile) {
          fetchData();
        }
    }, [pdfFile]);

    async function handleDelete(){
        const updateSelectedPages = [...selectedPages];
        setSelectedPages(updateSelectedPages);
        updateDeleteInput(updateSelectedPages);
    }

    function handleCheckboxChange(index){
        const updateSelectedPages = selectedPages.includes(index) ? 
        selectedPages.filter((page) => page !== index)
        : [...selectedPages, index];
        setSelectedPages(updateSelectedPages);
        updateDeleteInput(updateSelectedPages);
    }

    function updateDeleteInput(selectedPages){
        setDeleteInput(selectedPages.join(', '));
    }

    async function deletePages() {
        if (!pdfContent) return;
    
        const pdfDoc = await PDFDocument.load(pdfContent, { ignoreEncryption: true });
    
        // Sort the selected pages in descending order to avoid index shifting
        const sortedSelectedPages = [...selectedPages].sort((a, b) => b - a);
    
        console.log(sortedSelectedPages);
        sortedSelectedPages.forEach((page) => {
            pdfDoc.removePage(page);
        });
    
        const updatedNumPages = pdfDoc.getPageCount();
        console.log("Updated Number of Pages:", updatedNumPages);

        if (updatedNumPages === 0) {
            console.error("PDF has zero pages after removal.");
            return;
        }

        try {
            const updatedPdfBytes = await pdfDoc.save();
            console.log("Updated PDF Bytes:", updatedPdfBytes);

            downloadPdf(updatedPdfBytes);
        } catch (error) {
            console.error("Error saving PDF:", error);
        }
    }
    
    async function downloadPdf(updatedPdfBytes) {
        // Create a Blob from the PDF content
        const blob = new Blob([updatedPdfBytes], { type: 'application/pdf' });
    
        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'downloaded_pdf.pdf';
    
        // Append the link to the body and trigger the download
        document.body.appendChild(link);
        link.click();
    
        // Remove the link from the body
        document.body.removeChild(link);

    }

  return (
    <div className="flex flex-wrap container justify-center items-center bg-[#EEE]">
        { pdfFile ? 
            (
                <div className="flex flex-col">
                <Document 
                    file={ pdfFile } 
                    onLoadSuccess={ onDocumentLoadSuccess }
                    className="grid xl:grid-cols-12 min-[991px]:grid-cols-12 grid-cols-12 mt-3"
                >
                    { Array.apply(null, Array(numPages))
                    .map((x,i) => i + 1 )
                    .map((page, index) => {
                        return(
                            <div 
                                key={`serial_${index + 1}`}
                                className="p-4 pb-6 mb-4 max-[768px]:col-span-6 max-[370px]:col-span-12 min-[768px]:col-span-3 min-[1300px]:col-span-2 hover:bg-[#DDDDDD] relative"
                            >
                                <Page 
                                    key={`page_${index + 1}`}
                                    pageNumber={page} 
                                    renderTextLayer={false} 
                                    renderAnnotationLayer={false} 
                                    width={140}
                                    height={210}
                                    className="shadow-custom"
                                />
                                {/* <div className="bg-white absolute bottom-6 w-[140px] h-20 flex justify-center items-center">
                                    <button className="text-[#00cc99] rounded border border-[#00cc99] flex justify-center opacity-30 py-2 px-4 hover:opacity-100 hover:bg-[#00cc99] hover:text-white">
                                        <RiDeleteBin6Line size={23} className="mr-2" />
                                        <span>Delete</span>
                                    </button>
                                </div> */}
                                <div className="flex flex-row absolute mt-1.5 w-[130px] justify-center items-center">
                                    <input type="checkbox"
                                        checked={selectedPages.includes(index)} 
                                        onChange={() => handleCheckboxChange(index) }
                                    />
                                    <p className="text-xs">A{index + 1}</p>
                                </div>
                            </div>
                        );
                    })}
                </Document>
                <input type="text" value={deleteInput} readOnly />
                {selectedPages.length > 0 ? (
                    <button id="delete" onClick={() => deletePages()}>
                         Delete Selected Pages
                    </button>  
                ) : ( 
                   ""
                 )}
                </div>
            ) : (
                <div>No PDF selected</div>
            )
        }
    </div>
  );
}

export default ShowPdf;