import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import LoadingModalDots from './../components/loading_modal/loading_modal_dots';


// Dynamic Imports
const _Layout = dynamic(() =>
  import("../components/layout/seller-layout/seller_layout")
);
const _Title = dynamic(() => import("../components/layout/_title"));

export default function Add_Books() {
  const router = useRouter();
  const [Book_ID, setBook_ID] = useState(0);
  const [Title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [ISBN, setISBN] = useState("");
  const [Condition, setCondition] = useState("");
  const [Price, setPrice] = useState("");
  const [Book_Image, setBook_Image] = useState("temp.png");
  const [Seller_ID, setSeller_ID] = useState(2); 

  const [Title_Error, setTitle_Error] = useState(''); 
  const [Author_Error, setAuthor_Error] = useState(''); 
  const [ISBN_Error, setISBN_Error] = useState(''); 
  const [Condition_Error, setCondition_Error] = useState(''); 
  const [Price_Error, setPrice_Error] = useState(''); 
  const [selectedImage_Error, setSelectedImage_Error] = useState(''); 

  const [selectedImage, setSelectedImage] = useState(null); // To store the selected image file

  const [isLoading, setIsLoading] = useState(false);

  const [isFormComplete, setIsFormComplete] = useState(false);
  useEffect(
    () =>
      setIsFormComplete(
        Title && Author && ISBN && Condition && Price && (selectedImage != null)
      ),
    [Title, Author, ISBN, Condition, Price, selectedImage]
  );


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidInteger = (str) => /^\d+$/.test(str); // Regular expression to check for valid integers
    if (
      (Title != "") &&
      (Author != "") &&
      isValidInteger(ISBN) &&
      (Condition != "") &&
      isValidInteger(Price) &&
      selectedImage !== null
    ) {

      const formData = new FormData();
      // formData.append('myfile', e.target.elements.myfile);
      const fileInput = document.getElementById("myfile"); // Get the file input element

      if (fileInput && fileInput.files.length > 0) {
        formData.append("myfile", fileInput.files[0]);
        const uploadedFileName = formData.get("myfile").name;
        setBook_Image(uploadedFileName);
        formData.append("Book_Image", uploadedFileName);
        console.warn("Uploaded File Name:", uploadedFileName);
      }
      formData.append("Book_ID", Book_ID);
      formData.append("Title", Title);
      formData.append("Author", Author);
      formData.append("ISBN", ISBN);
      formData.append("Condition", Condition);
      formData.append("Price", Price);
      formData.append("seller", Seller_ID);

      // const validateFile = (value) => {
      //   const file = value[0];
      //   const allowedtypes = ["image/jpg", "image/png"];

      //   if (!allowedtypes.includes(file.type)){
      //       return false;
      //   }
      //   }
      console.log(formData); // Working

      try {
        console.log("Posting Data...");
        setIsLoading(true);
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/add_books",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response);

        if (response.data) {
          setIsLoading(false);
          router.push({
            pathname: "/seller/add_books",
          });
          window.location.reload(); // Reload the page
        } else {
          setIsLoading(false);
          router.push({
            pathname: "error",
          });
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error adding books:", error);
      }


    }else if( Title == ""){
      setTitle_Error("Book Title is Required !")
    }else if( Author == ""){
      setAuthor_Error("Author Name is Required !")
    }else if( ISBN == ""){
      setISBN_Error("Book ISBN is Required !")
    }else if( Condition == ""){
      setCondition_Error("Book Condition is Required !")
    }else if( selectedImage == null){
      setSelectedImage_Error("Book Image is required !")
    }else if( Price == ""){
      setPrice_Error("Book Price is Required !")
    }
    
    // Page Reload here
  };

  return (
    <>
      <_Title title="Add Books" />
      <_Layout>
        <div className="flex items-center justify-center h-screen">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Hidden Book_ID */}
            <input
              type="hidden"
              id="Book_ID"
              value={Book_ID}
              onChange={(e) => setBook_ID(0)}
            />

            <div className="grid grid-cols-2 gap-4 w-full max-w-screen-lg mx-auto">
              {/* Left Column */}
              <div className="col-span-1 space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Book Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    id="Title"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered"
                  />
                  <label className="label">
                    {/* <span className="label-text-alt">Bottom Left label</span> */}
                    <span className="label-text-alt text-red-600">
                      {Title_Error}
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Book Author</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    id="Author"
                    value={Author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="input input-bordered"
                  />
                  <label className="label">
                    {/* <span className="label-text-alt">Bottom Left label</span> */}
                    <span className="label-text-alt text-red-600">
                      {Author_Error}
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">ISBN</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Type here"
                    id="ISBN"
                    value={ISBN}
                    onChange={(e) => setISBN(e.target.value)}
                    className="input input-bordered"
                  />
                  <label className="label">
                    {/* <span className="label-text-alt">Bottom Left label</span> */}
                    <span className="label-text-alt text-red-600">
                      {ISBN_Error}
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Condition</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    id="Condition"
                    value={Condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="input input-bordered"
                  />
                  <label className="label">
                    {/* <span className="label-text-alt">Bottom Left label</span> */}
                    <span className="label-text-alt text-red-600">
                      {Condition_Error}
                    </span>
                  </label>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-1 space-y-4">
                <div id="image-preview" className="space-y-2">
                  <br />
                  <div className="avatar w-24 rounded">
                    <img
                      src={selectedImage || "/images/seller/default_book.svg"}
                      alt="Preview"
                    />
                  </div>
                  <br />
                  <input
                    type="file"
                    className="file-input"
                    id="myfile"
                    onChange={handleImageChange}
                  />
                  <label className="label">
                    {/* <span className="label-text-alt">Bottom Left label</span> */}
                    <span className="label-text-alt text-red-600">
                      {selectedImage_Error}
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Type here"
                    id="Price"
                    value={Price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="input input-bordered"
                  />
                  <label className="label">
                    {/* <span className="label-text-alt">Bottom Left label</span> */}
                    <span className="label-text-alt text-red-600">
                      {Price_Error}
                    </span>
                  </label>
                </div>

                <div className="text-center">
                  <input
                    className="btn btn-outline btn-success rounded-2xl"
                    type="submit"
                    disabled={!isFormComplete} // Disable the button when the form is incomplete
                    value="Add Book"
                  />
                </div>
              </div>
            </div>

            {/* Hidden Seller_ID */}
            <input
              type="hidden"
              id="Seller_ID"
              value={Seller_ID}
              // onChange={(e) => setSeller_ID(2)}
            />
          </form>
        </div>
      </_Layout>

      {isLoading && <LoadingModalDots />}
    </>
  );
}
