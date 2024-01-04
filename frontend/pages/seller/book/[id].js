import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { DEFAULT_SANS_SERIF_FONT } from "next/dist/shared/lib/constants";

import LoadingModalDots from "./../../components/loading_modal/loading_modal_dots";


// Dynamic Imports
const _Layout = dynamic(() =>
  import("../../components/layout/seller-layout/seller_layout")
);
const _Title = dynamic(() => import("../../components/layout/_title"));

export default function View_Single_Book() {
  const router = useRouter();

  // console.info("Got Data = "+data);// Empty

  const [Book_ID, setBook_ID] = useState(0);
  const [Title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [ISBN, setISBN] = useState("");
  const [Condition, setCondition] = useState("");
  const [Price, setPrice] = useState("");
  const [Book_Image, setBook_Image] = useState("");
  const [Seller_ID, setSeller_ID] = useState(2); //TODO: Use Session Here for Seller ID

  const [selectedImage, setSelectedImage] = useState(null); // To store the selected image file
  const [CollectedBookData, setCollectedBookData] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  console.warn("ID line(30)= " + router.query.id); // Working

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedImage(URL.createObjectURL(file));
  //   }
  // };

  // #region UseEffect
  // * Use Effect

  // * Collect Book-Data and Book-Image
  useEffect(() => {
    fetchBookData();
    fetchBookImage();
  }, [router.query.id]);

  // * Collect Book Data
  useEffect(() => {
    if (CollectedBookData !== null) {
      console.log("Collected BookData:", CollectedBookData);
      // Setting Data to the variables
      setBook_ID(CollectedBookData?.Book_ID);
      setTitle(CollectedBookData?.Title);
      setAuthor(CollectedBookData?.Author);
      setISBN(CollectedBookData?.ISBN);
      setCondition(CollectedBookData?.Condition);
      setPrice(CollectedBookData?.Price);
      setBook_Image(CollectedBookData?.Book_Image);
      setSeller_ID(CollectedBookData?.Seller_ID);

      console.log("Book_ID :", Book_ID);
      console.log("Title :", Title);
      console.log("Author :", Author);
      console.log("ISBN :", ISBN);
      console.log("Condition :", Condition);
      console.log("Price :", Price);
      console.log("Book Image Name :", Book_Image);
      console.log("Seller_ID :", Seller_ID);
    }
  }, [CollectedBookData]);

  // * Checks Users has filled all the field properly or not
  useEffect(() => {
    // Check if all required fields are filled
    const allFieldsFilled =
      Title && Author && ISBN && Condition && Price && selectedImage;

    setIsFormComplete(allFieldsFilled);
  }, [Title, Author, ISBN, Condition, Price, selectedImage]);

  // #endregion

  const fetchBookData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/books/search_books/" + router.query.id,
        { withCredentials: true }
      );
      const data = response.data;
      console.log("Fetched Book Data:", data);
      
      // Update the CollectedBookData state
      if (data != null) {
        setCollectedBookData(data);
        setBook_Image(data.Book_Image);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching book data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append('myfile', e.target.elements.myfile);
    const fileInput = document.getElementById("myfile"); // Get the file input element

    if (fileInput && fileInput.files.length > 0) {
      formData.append("myfile", fileInput.files[0]);
      const uploadedFileName = formData.get("myfile").name;
      setBook_Image(uploadedFileName);
      // ! Not used
      // * If there is a change in Book Image of new Image uploaded then,
      formData.append("Book_Image", uploadedFileName);
      // console.warn('Uploaded File Name:', uploadedFileName);
    }
    formData.append("Book_ID", Book_ID);
    formData.append("Title", Title);
    formData.append("Author", Author);
    formData.append("ISBN", ISBN);
    formData.append("Condition", Condition);
    formData.append("Price", Price);
    formData.append("Book_Image", Book_Image);
    formData.append("seller", Seller_ID);

    console.log(formData); // Working

    try {
      console.log("Posting Data...");

      setIsLoading(true);
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/books/update_book_info/" + Book_ID,
        {
          Book_ID: Book_ID,
          Title: Title,
          Author: Author,
          ISBN:ISBN,
          Condition: Condition,
          Price: Price,
          Book_Image: Book_Image,
          Seller_ID: Seller_ID,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.data) {
        console.info("Data Has been Updated");
        // TODO: Reload the Page Here
        router.push({
          pathname: "/seller/book/" + router.query.id,
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.info("Failed to Update");
        router.push({
          pathname: "error",
        });
      }
    } catch (error) {
      console.error("Error adding books:", error);
    }
  };

  const fetchBookImage = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/book/book_image/" + router.query.id,
        {
          responseType: "arraybuffer",
          withCredentials: true,
        }
      );

      const imageBlob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const imageUrl = URL.createObjectURL(imageBlob);
      setSelectedImage(imageUrl);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching profile image:", error);
    }
  };

  // #region  [Data Insertion to the variables]

  const set_Title = (e) => {
    setTitle(e.target.value);
  };
  const set_Author = (e) => {
    setAuthor(e.target.value);
  };
  const set_ISBN = (e) => {
    setISBN(e.target.value);
  };
  const set_Condition = (e) => {
    setCondition(e.target.value);
  };
  const set_Price = (e) => {
    setPrice(e.target.value);
  };

  // #endregion  [Data Insertion to the variables]

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
              // onChange={(e) => setBook_ID(CollectedBookData?.Book_ID)}
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
                    placeholder={Title}
                    id="Title"
                    value={Title}
                    onChange={set_Title}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Book Author</span>
                  </label>
                  <input
                    type="text"
                    placeholder={Author}
                    id="Author"
                    value={Author}
                    onChange={set_Author}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">ISBN</span>
                  </label>
                  <input
                    type="number"
                    placeholder={ISBN}
                    id="ISBN"
                    value={ISBN}
                    onChange={set_ISBN}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Condition</span>
                  </label>
                  <input
                    type="text"
                    placeholder={Condition}
                    id="Condition"
                    value={Condition}
                    onChange={set_Condition}
                    className="input input-bordered"
                  />
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
                  {/* <input
                    type="file"
                    className="file-input"
                    id="myfile"
                    onChange={handleImageChange}
                  /> */}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    placeholder={Price}
                    id="Price"
                    value={Price}
                    onChange={set_Price}
                    className="input input-bordered"
                  />
                </div>

                <div className="text-center">
                  <input
                    className="btn btn-outline btn-success rounded-2xl"
                    type="submit"
                    disabled={!isFormComplete}
                    value="Update Info"
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
