import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../utils/authcontext";
import Toast_Info from "../../toast/toast_info";
import Toast_Success from "../../toast/toast_success";
import Toast_Failed from "../../toast/toast_failed";


export default function _NavBar() {
  const { user, logout } = useAuth();

  const router = useRouter();
  const [userImage, setUserImage] = useState(null);
  const [session_data, setSession_data] = useState(null);
  const [feedback, setFeedback] = useState('');

  const [isFormComplete, setIsFormComplete] = useState(false);
  useEffect(
    () =>
      setIsFormComplete(
        feedback
      ),
    [feedback]
  );



  // #region [Toast Message]

  const [showToast, setShowToast] = useState(false);
  const [showToast_failed, setShowToast_failed] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastMessage_failed, setToastMessage_failed] = useState('');

  const handleShow_Success_Toast = (message) => {
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
    }, 3000); // Hide after 3 seconds
  };

   const handleShow_Failed_Toast = (message) => {
    setShowToast_failed(true);
    setToastMessage_failed(message);

    setTimeout(() => {
      setShowToast_failed(false);
      setToastMessage_failed('');
    }, 3000); // Hide after 3 seconds
  };


  
  // #endregion [Toast Message]




  // #region [Search-Bar Code]

  const [criteria, setCriteria] = useState(''); // Selected filter criteria
  const [inputValue, setInputValue] = useState(''); // Input value
  const [books, setBooks] = useState([]); // List of books
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility
  // const router = useRouter();

  const handleInputChange = async (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    console.info("Criteria Name = "+criteria);
    console.info("Input value = "+inputValue);

    // Fetch books based on criteria and input value
    if (newValue.length > 0) {
      try {
        console.info("Sending request...");
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/book/search?criteria=${criteria}&value=${newValue}",{
            withCredentials:true
          }
        );
        setBooks(response.data);
        console.log("Book Data = "+books);
        setDropdownVisible(true);
        console.info("DropdownVisible value = "+isDropdownVisible)
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    } else {
      setDropdownVisible(false);
      setBooks([]);
    }
  };

  const handleBookClick = (bookId) => {
    router.push(`/seller/book/${bookId}`);
  };

  const handleCriteriaChange = (event) => {
    const newCriteria = event.target.value;
    setCriteria(newCriteria);
    console.warn("Criteria = "+criteria);
    setInputValue(''); // Clear input value when criteria changes
    setBooks([]); // Clear books when criteria changes
    setDropdownVisible(false); // Hide dropdown when criteria changes
  };

  // #endregion [Search-Bar Code]

  // #region [Feedback]


  const handleFeedback = async () =>{
    
    const Feedback_ID = 0;
    const Date = "20/10/2001";
    const Sender_ID = 0;
    const Receiver_ID = 0;
    const Receiver_Type = "Admin";

    if(feedback != ""){
      const response = await axios.post(
      process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/feedbacks/send_feedback",
      {
        Feedback_ID : Feedback_ID,
        Comment : feedback,
        Date : Date,
        Sender_ID : Sender_ID,
        Receiver_ID : Receiver_ID,
        Receiver_Type : Receiver_Type
      },
      {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
          },
      }
    );

    if(response != null){
      // Give a notification in green Success
      handleShow_Success_Toast("Feedback Sent !");
      
    }else{
      // Give a notification in Red Failed
      handleShow_Failed_Toast("Failed to send Feedback");
      
    }
    }
    

  }

 const set_Feedback = (e)=> {
    setFeedback(e.target.value);
  }

  
  // #endregion [Feedback]




  // #region [Check Backend Session is Active or NOT]
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/index", {
          withCredentials: true,
        });
        const sessionData = response.data; // Assuming the session data is a string

        // console.info("Session Data =", sessionData);

      } catch (error) {
        console.error("Error checking session:", error);
        router.push("/seller/login");
      }
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // #endregion [Check Backend Session is Active or NOT]

  // #region [Get Seller Image] When the Navbar is Called
  // When the page loads
  useEffect(() => {
    if (user != null) {
      //  Fetch The Data

      axios
        .get(process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/profile/profile_image", {
          responseType: "arraybuffer", // Indicate that we're expecting binary data
          withCredentials: true,
        })
        .then((response) => {
          const imageBlob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          const imageUrl = URL.createObjectURL(imageBlob);
          setUserImage(imageUrl);
        })
        .catch((error) => {
          setUserImage(null); // Set to null if there's an error
        });

      console.log("user:  " + user.email);
      console.log("user:  " + user.cookie);
    } else {
      router.push("/seller/login");
    }
  }, []);

  // #endregion [Get Seller Image] When the Navbar is Called

  // #region [Storing New Data to Variable]
  const sendToAdd_Books = function () {
    router.push({
      pathname: "/seller/add_books",
    });
  };

  const sendToAll_Books = function () {
    router.push({
      pathname: "/seller/all_books",
    });
  };

  const sendToView_Orders = function () {
    router.push({
      pathname: "/seller/view_orders",
    });
  };

  

  const sendToLogout = function () {
    router.push({
      pathname: "/seller/logout",
    });
  };

  const sendToProfile = function () {
    router.push({
      pathname: "/seller/profile",
    });
  };

  
  // #endregion [Storing New Data to Variable]

  return (
    <>
  
      <div className="navbar bg-base-100">
         <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div> 
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">
           Library
          </a>
          
        </div>
        <div className="flex-none gap-2">
          
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">


                {/* Image */}
                <img src={userImage || "/images/seller/temp.svg"} alt="User" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li onClick={sendToProfile}>
                <a className="justify-between">
                  Profile
                  {/* <span className="badge">New</span> */}
                </a>
              </li>
              {/* <li><a>Settings</a></li> */}
              <li>
                <a onClick={() => window.my_modal_3.showModal()}>Logout</a>
              </li>

              {/* You can open the modal using ID.showModal() method */}
              {/* <button className="btn" >open modal</button> */}
              <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="modal-box">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                  <h3 className="font-bold text-lg">Wanna get out?</h3>
                  <p className="py-4">See you later, Seller</p>
                  <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <a onClick={sendToLogout} className="btn">
                      Logout
                    </a>
                  </div>
                </form>
              </dialog>

              {/* You can open the modal using ID.showModal() method */}
              {/* <button className="btn" >open modal</button> */}
              <dialog id="feedback_modal" className="modal">
                <form method="dialog" className="modal-box">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                  <h3 className="font-bold text-lg">Write what you wanna tell us?</h3>
                  <textarea placeholder="Feedback" className="textarea textarea-bordered textarea-lg w-full max-w-xs" onChange={set_Feedback} ></textarea>
                  <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <a disabled={!isFormComplete}  onClick={() => {handleFeedback(); window.feedback_modal.close()}} className="btn">
                      Send Feedback
                    </a>
                  </div>
                </form>
              </dialog>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
// window.feedback_modal.close()