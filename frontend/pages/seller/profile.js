import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import LoadingModalDots from "./../components/loading_modal/loading_modal_dots";

// Dynamic Imports
const _Layout = dynamic(() =>
  import("../components/layout/seller-layout/seller_layout")
);
const _Profile_Navigation = dynamic(() =>
  import("../components/layout/seller-layout/_profile_Navigation")
);
const _Title = dynamic(() => import("../components/layout/_title"));

export default function Profile() {
  const router = useRouter();

  // const [sellerData, setSellerData] = useState({
  //   Seller_ID: 2,
  //   Name: '',
  //   Email: '',
  //   Password: '',
  //   Phone: '',
  //   Profile_Picture: 'temp.svg',
  // });

  const [Seller_ID, setSeller_ID] = useState(0);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("passW0rd$");
  const [Phone, setPhone] = useState("");
  const [Profile_Picture, setProfile_Picture] = useState("");

  const [Seller_Data, setSeller_Data] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    fetchProfileImage();
    fetchSellerData();
  }, []);

  useEffect(() => setIsFormComplete(Name && Phone), [Name, Phone]);

 // * Collect Seller Data
  useEffect(() => {
    if (Seller_Data !== null) {
      console.log("Collected Seller Data :", Seller_Data);
      setSeller_ID(Seller_Data.Seller_ID);
      setName(Seller_Data.Name);
      setEmail(Seller_Data.Email);
      // setPassword(Seller_Data.Password);
      setPhone(Seller_Data.Phone);
      setProfile_Picture(Seller_Data.Profile_Picture);



      // console.log("Book_ID :", CollectedBookData.Book_ID);
      // console.log("Title :", CollectedBookData.Title);
      // console.log("Author :", CollectedBookData.Author);
      // console.log("ISBN :", CollectedBookData.ISBN);
      // console.log("Condition :", CollectedBookData.Condition);
      // console.log("Price :", CollectedBookData.Price);
      // console.log("Book Image Name :", CollectedBookData.Book_Image);
      // console.log("Seller_ID :", CollectedBookData.Seller_ID);
    }
  }, [Seller_Data]);



  // #region  [Data Insertion to the variables]

  const set_Name = (e)=> {
    setName(e.target.value);
  }
  const set_Phone = (e) => {
    setPhone(e.target.value);
  };
  // #endregion  [Data Insertion to the variables]




  const fetchSellerData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/profile", {
        withCredentials: true,
      });
      if (response != null || response != undefined) {
        setSeller_Data(response.data);
        console.info("Seller Data = " + response);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching Seller Profile:", error);
    }
  };

  const fetchProfileImage = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/profile/profile_image",
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setIsImageSelected(true);
    } else {
      setIsImageSelected(false);
    }
  };

  const handleSubmit_UserData = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/profile/update_profile_info",
        {
          Seller_ID: Seller_ID,
          Name: Name,
          Email: Email,
          Password: Password,
          Phone: Phone,
          Profile_Picture: Profile_Picture,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        console.log("Profile updated successfully:", response.data);
        setIsLoading(false);
        router.push("/seller/profile");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating profile :");
      console.info("Data I have sent :", error.response.data);
      console.info("Response I Got :", error.response.data.message);
    }
  };

  // [Uploading New Profile Picture]
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedImage) {
      formData.append("myfile", imageFile);
      console.warn("Image = " + imageFile);
    }
    try {
      setIsLoading(true);
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/profile/update_profile_info/upload_profile_image",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      setIsLoading(false);
      console.error("Data I have sent :", error.response.data);
      console.error("Response Message I Got :", error.response.data.message);
      console.error("Response Error Called :", error.response.data.error);
    }
  };

  return (
    <>
      <_Title title="Profile" />
      
      <_Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="grid grid-cols-2 gap-4 w-full max-w-screen-lg mx-auto">
            {/* {data.map(seller => ( */}
            <form onSubmit={handleSubmit_UserData}>
              {/* Hidden Book_ID */}

              <input
                type="hidden"
                id="Seller_ID"
                value={Seller_ID}
                // onChange={(e) => setSeller_ID(e.target.value)} // TODO : Use Session here or remove this
              />
              {/* Left Column */}
              <div className="col-span-1 space-y-4">
                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    id="Name"
                    value={Name}
                    onChange={set_Name}
                    className="input input-bordered"
                  />
                </div>

                {/* Phone */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    id="Phone"
                    value={Phone}
                    onChange={set_Phone}
                    className="input input-bordered"
                  />
                </div>

                {/* Hidden User Image */}
                <input
                  type="hidden"
                  id="Profile_Picture"
                  value={Profile_Picture}
                />

                {/* Submit Button */}
                <div className="text-center">
                  <input
                    className="btn btn-outline btn-success rounded-2xl"
                    type="submit"
                    disabled={!isFormComplete} // Disable the button when the form is incomplete
                    value="Update Profile !"
                  />
                </div>
              </div>
            </form>
            {/* ))} */}

            {/* Right Column */}
            <div className="col-span-1 space-y-4">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div id="image-preview" className="space-y-2">
                  <br />
                  <div className="avatar w-40 rounded">
                    <img
                      src={
                        selectedImage ||
                        `/images/seller/${Seller_Data.Profile_Picture}`
                      }
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
                </div>

                <div className="text-center">
                  <input
                    className="btn btn-outline btn-success rounded-2xl"
                    type="submit"
                    onChange={handleImageChange}
                    disabled={!isImageSelected} // Disable the button when no image is selected
                    value="Update Profile Image!"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Bottom Profile Navigation Here */}
        <_Profile_Navigation />
      </_Layout>
      {isLoading && <LoadingModalDots />}
    </>
  );
}
