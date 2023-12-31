import FileUpload from './components/FileUpload';


const App = () => {
  
  // const addItem = async(e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", fileInputRef.current.files[0]);
  //     const res =  await axios.post('http://localhost:3000/api/v1/items', formData);
  //     // function to show pdf file on frontend
  //     // showPages();

  //     getItems();
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const downlodFile = async (id) => {
  //   try {
  //     const res = await axios.get(`http://localhost:3000/api/v1/items/download/${id}`,
  //     {responseType: 'blob'}
  //     );
  //     const blob =new Bolb([res.data], {type: res.data.type});
  //     const link = document.URL = createElement('a');
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = "file.pdf";
  //     // link.download = res.header['content-disposition'].split('filename')[1];
  //     link.click();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <>
       <FileUpload /> 

      {/* { items && items.map((item,index) => (
          <div key={item._id} className="item">
            <p>File{index}</p>
            <button onClick={() => showPdf(item.file)}>show file</button>
          </div>
      ))} */}

   
    </>
  );
}

export default App;

    
   


    