import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import { RiDeleteBin6Line } from 'react-icons/ri'
import Header from './Header';
import axios from 'axios';
import ShowPdf from './ShowPdf';


const FileUpload = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [name, setName] = useState("");
    const [numPages, setNumPages] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    useEffect(()=>{
        getItems();
    },[fileInputRef]);

    const handleInputClick = () => {
        fileInputRef.current.click();
    }

    const onFileInputChange = (event) => {
        const file = event.target.files[0];
        // console.log(file);
        // add here try catch
        if(file) {
            handleFileUpload(file);
        }
    };

    const handleFileUpload= async(file) => {
        // e.preventDefault();
        try {
        const formData = new FormData();
        formData.append("file", fileInputRef.current.files[0]);
        const res =  await axios.post('http://localhost:3000/api/v1/items', formData);
        getItems();
        } catch (error) {
            console.log(error);
        }
    }

    const showPdf = (pdf) => {
        // const filePath = 'D:\\pdf project react\\Serverside\\uploads\\1702406466228.pdf';

        // Split the path using the backslash as a delimiter
        const pathSegments = pdf.split('\\');

        // Find the index of the "uploads" string in the path
        const uploadsIndex = pathSegments.indexOf('uploads');

        // Extract the filename from the path starting from the next segment after "uploads"
        const filename = pathSegments.slice(uploadsIndex + 1).join('\\');

        // window.open(`http://localhost:3000/uploads/${filename}`)
        setPdfFile(`http://localhost:3000/uploads/${filename}`);
    }

    const getItems = async() => {
        setLoading(true);
        try {
        const res = await axios.get("http://localhost:3000/api/v1/items");
        setItems(res.data.items);
        
        // call show pdf function here....
        setLoading(false);
        const len = res.data.items.length - 1;
        console.log(len);
        console.log(res.data.items[len].file);
        showPdf(res.data.items[len].file);
        } catch (error) {
        console.log(error);
        }
    }


    // Ensure that the workerSrc is set correctly
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
    ).toString();

    return (
        <>
            <div className='mt-[40px] mb-10 py-2 px-4 w-fit font-bold rounded-[4px] bg-[#00cc99]'>
                <div className='btn btn-medium text-white text-lg cursor-pointer' onClick={ handleInputClick }>Edit a PDF document 
                    <span className='font-normal'> - it's free</span>
                </div>
                <input className='hidden' type="file" accept='application/pdf' title="Upload" name="file" ref={ fileInputRef } onChange={ onFileInputChange } />
            </div>

            {/* ............ Display pdf here ......... */}
            <ShowPdf pdfFile={pdfFile} /> 
        </>
    )
}

export default FileUpload
