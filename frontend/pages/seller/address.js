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
const _Profile_Navigation = dynamic(() =>
  import("../components/layout/seller-layout/_profile_Navigation")
);
const _Title = dynamic(() => import("../components/layout/_title"));

export default function Address() {
  const router = useRouter();

  const [Address_ID, setAddress_ID] = useState(-1);
  const [Street, setStreet] = useState("");
  const [Building, setBuilding] = useState("");
  const [City, setCity] = useState("");
  const [Country, setCountry] = useState("");
  const [ZIP, setZIP] = useState("");
  const [Seller_ID, setSeller_ID] = useState(0);

  const [Seller_Address, setSeller_Address] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isFormComplete, setIsFormComplete] = useState(false);


  const fetchSellerAddress = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/profile/address",
        { withCredentials: true }
      );
      if (response.data) {
        setIsLoading(false);
        setSeller_Address(response.data[0]); // Update the state with the fetched data
        console.info("Seller_Address response.data[0] = ", response.data[0]);

      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching Seller Address:", error);
    }
  };

  useEffect(() => setIsFormComplete(Street && Building && City && Country && ZIP), [Street, Building, City, Country, ZIP]);


  useEffect(() => {
    // Fetch data when the component mounts
    fetchSellerAddress();
  }, []);



  // * Collect Seller Data
  useEffect(() => {
    if ((Seller_Address !==  undefined) && Seller_Address !== null) {
      console.log("Collected Seller Data :", Seller_Address);
      setAddress_ID(Seller_Address.Address_ID);
      setStreet(Seller_Address.Street);
      setBuilding(Seller_Address.Building);
      setCity(Seller_Address.City);
      setCountry(Seller_Address.Country);
      setZIP(Seller_Address.ZIP);
      setSeller_ID(Seller_Address.Seller_ID);
      console.info("Address id = " + Address_ID);
      console.info("Street = " + Street);
      console.info("Building = " + Building);
      console.info("City = " + City);
      console.info("Country = " + Country);
      console.info("ZIP = " + ZIP);
      console.info("Seller_ID = " + Seller_ID);
    }
  }, [Seller_Address]);




  //#region  [Data Insertion to the variables]

  const set_Street = (e) => {
    setStreet(e.target.value);
  };
  const set_Building = (e) => {
    setBuilding(e.target.value);
  };
  const set_City = (e) => {
    setCity(e.target.value);
  };
  const set_Country = (e) => {
    setCountry(e.target.value);
  };
  const set_ZIP = (e) => {
    setZIP(e.target.value);
  };

  //end#region  [Data Insertion to the variables]



  const handleSubmit_UserData = async (e) => {
    e.preventDefault();
    if (isFormComplete) {
      try {
        console.log("Updating Address... ")
        setIsLoading(true);
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/profile/update_profile_info/update_address",
        {
          Address_ID: Address_ID,
          Street: Street,
          Building: Building,
          City: City,
          Country: Country,
          ZIP: ZIP,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        console.log(response.data);
        setIsLoading(false);
        router.push({
          pathname: "/seller/address",
        });
      }
    } catch (error) {
        setIsLoading(false);
        console.error("Error updating Address:", error);
      }
    }
    
  };

  return (
    <>
      <_Title title="Address" />
      <_Layout>
        <div
          id="center_screen_Column"
          className="flex items-center justify-center h-screen"
        >
          <form onSubmit={handleSubmit_UserData}>
            <div
              id="Columns_Holder"
              className="grid grid-cols-2 gap-4 w-full max-w-screen-lg mx-auto"
            >
              {/* Before Column Start Data */}
              <input type="hidden" id="Address_ID" value={Address_ID} />

              {/* Left Column */}
              <div id="Left_Column" className="col-span-1 space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Street</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    id="Street"
                    value={Street}
                    onChange={set_Street}
                    className="input input-bordered"
                  />
                </div>

                {/* Building */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Building</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    id="Building"
                    value={Building}
                    onChange={set_Building}
                    className="input input-bordered"
                  />
                </div>

                {/* City */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    id="City"
                    value={City}
                    onChange={set_City}
                    className="input input-bordered"
                  />
                </div>
              </div>

              <div id="Right_Column" className="col-span-1 space-y-4">
                {/* Country */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Country</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    id="Country"
                    value={Country}
                    onChange={set_Country}
                    className="input input-bordered"
                  />
                </div>

                {/* ZIP */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">ZIP</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Type here"
                    id="ZIP"
                    value={ZIP}
                    onChange={set_ZIP}
                    className="input input-bordered"
                  />
                </div>
                <div className="text-center">
                  <input
                    className="btn btn-outline btn-success rounded-2xl"
                    type="submit"
                    disabled={!isFormComplete} // Disable the button when the form is incomplete
                    value="Update Address !"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <br />
            </div>
          </form>
        </div>

        <_Profile_Navigation />
      </_Layout>
      {isLoading && <LoadingModalDots />}
    </>
  );
}

