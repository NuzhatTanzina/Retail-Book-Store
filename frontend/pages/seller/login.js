import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../utils/authcontext";
import LoadingModalDots from "../components/loading_modal/loading_modal_dots";
import Toast_Success from "../components/toast/toast_success";
import Toast_Failed from "../components/toast/toast_failed";

// Dynamic Imports
const _Layout = dynamic(() => import("../components/layout/_layout"));
const _Title = dynamic(() => import("../components/layout/_title"));

export default function Login() {
  const router = useRouter();

  const { login, user } = useAuth();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");


  const [otp, setOtp] = useState("");
  const [forget_Email, setForget_Email] = useState("");
  const [new_Password, setNew_Password] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [showToast_failed, setShowToast_failed] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastMessage_failed, setToastMessage_failed] = useState('');

  const [Email_Error, setEmail_Error] = useState('');
  const [Password_Error, setPassword_Error] = useState('');


  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidPassword = (str) =>
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/.test(
        str
      );

    if (!Email || !Password) {
      // setError("Email and password are required");
    } else if (!isValidEmail(Email)) {
      setEmail_Error("Email is required in the correct format")
      console.info("Error = "+Email_Error);
    } else if (!isValidPassword(Password)) {
      setPassword_Error(
        "Password must have at least 1 uppercase, 1 lowercase, 1 digit, 1 special character, and be 8+ characters long"
      );
      // setError("Invalid email address");
      console.info("Error = "+Password_Error);
    } else {
      try{
        setIsLoading(true);
        const data = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/login",
        { Email, Password },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );

      if (data.data) {
        login(Email, document.cookie);
        console.log(data.data);
        router.push({
          pathname: "/seller/profile",
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        handleShow_Failed_Toast("Login failed");
      }
      console.log(data);
      }catch(error){
        setIsLoading(false);
        router.push({
          pathname: "/seller/login",
        });
        handleShow_Failed_Toast("Login failed");
        console.error("Error Sending Login Request"+error);

      }
      
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };



    // #region [Toast Message]
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




  // #region [Forget Password]



  const handleForgetEmail = async (e) => {
    if (forget_Email != null && forget_Email != "") {
      //  use Axios to send the Forget request with Email
      // triggerLoading();

      try{
        setIsLoading(true);
        console.info("New Mail = "+forget_Email);
        const data = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/forget_password",
          {Email: forget_Email}
        );
        if (data.data){

      //     // Extract the connect.sid cookie from the response headers
      // const cookies = response.headers["set-cookie"];
      // const connectSidCookie = cookies.find(cookie => cookie.startsWith("connect.sid"));
      // console.warn("Cookie = "+connectSidCookie)

          setIsLoading(false);
          login(forget_Email, document.cookie);
          // login(forget_Email, document.cookie.split(";")[1].trim());
          handleShow_Success_Toast("OTP Sent !");
           window.OTP_modal.showModal();
          setIsLoading(false);
        }else{
          setIsLoading(false);
          handleShow_Failed_Toast("Failed to sent OTP");
        }

      }catch(error){
        setIsLoading(false);
        handleShow_Failed_Toast("Failed to sent OTP");
        console.error("Error Sending Send Mail Request"+error);
      }
      

    }
  };

  const handleOTP = async (e) => {

    if(otp != null && otp != ""){
      //  use Axios to send the OTP

      try{
        setIsLoading(true);
        console.info("OTP = " + otp);
        const data = await axios.post(
          process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/forget_password/send_pin",
          { Pin_Code: otp }
        );
        if (data.data){
          setIsLoading(false);
          // handleShow_Success_Toast("OTP Sent !");
           window.New_Password_modal.showModal();
        }else{
          setIsLoading(false);
          handleShow_Failed_Toast("OTP didn't match");
        }

      }catch(error){
        setIsLoading(false);
        handleShow_Failed_Toast("OTP didn't match");
        console.error("Error Sending OTP pin "+error);
      }
      


      // 
    }

  }

  const handleNewPassword = async (e) => {
    //  use Axios to send the OTP
    if(new_Password != null && new_Password != ""){
      try {
        setIsLoading(true);
        console.info("New Password = " + new_Password);
        console.info("New Mail = " + user.email);
        const data = await axios.put(
          process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/forget_password/update_password",
          { 
            Email : user.email,
            Password: new_Password 
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (data.data) {
          setIsLoading(false);
          handleShow_Success_Toast("Password Updated !");
          window.New_Password_modal.close()
        } else {
          setIsLoading(false);
          handleShow_Failed_Toast("Failed to update password");
        }
      } catch (error) {
        setIsLoading(false);
        handleShow_Failed_Toast("Failed to update password");
        console.error("Error Sending Password " + error);
      }
    }
  }

  const set_OTP = (e) => {
    setOtp(e.target.value);
  }
  const set_Forget_Email = (e) => {
    setForget_Email(e.target.value);
  }
  const set_New_Password = (e) => {
    setNew_Password(e.target.value);
  }
  

  // #endregion [Forget Password]

  // #region [Loading Modal]
  const triggerLoading = () => {
    setIsLoading(true);

    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Example: 3 seconds
  };
  // #endregion [Loading Modal]

  // #region [Send to Signup]
  const sendToSeller_Signup = function () {
    router.push({
      pathname: "/seller/signup",
    });
  };
  // #endregion [Send to Signup]





  return (
    <>
     <_Title title="Login" />
      <_Layout>
        <br />
        <div className="flex items-center justify-center h-screen">
  <div className="square border-2 border-green">
                {/* Email */}
                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Email</span>
                      {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                      type="email"
                      placeholder="Type here"
                      id="Email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                      {/* <span className="label-text-alt">Bottom Left label</span> */}
                      <span className="label-text-alt text-red-600">
                        {Email_Error}
                      </span>
                    </label>
                  </div>

                  {/* Password */}
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Password</span>
                      {/* <span className="label-text-alt">Top Right label</span> */}
                    </label>
                    <input
                      type="password"
                      placeholder="Type here"
                      id="Password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                      {/* <span className="label-text-alt">Bottom Left label</span> */}
                      <span className="label-text-alt text-red-600">
                        {Password_Error}
                      </span>
                    </label>
                  </div>

                  <div class="flex justify-end">
                    <label className="label text-sm text-red-500 cursor-pointer">
                      <span
                        className="hover:text-black"
                        onClick={() => window.Forget_Email_modal.showModal()}
                      >
                        Forget Password?
                      </span>
                    </label>
                  </div>
                  <div class="flex justify-center">
                    <label className="label text-sm">
                      Don't have an account?
                      <span
                        className="text-green-500 hover:text-black transition-colors cursor-pointer ml-2"
                        onClick={sendToSeller_Signup}
                      >
                        Signup
                      </span>
                    </label>
                  </div>

                  {/* <br /> */}
                  {/* <br /> */}
                  <input
                    className="btn w-64 btn-outline btn-success rounded-full"
                    type="submit"
                    value="Login"
                  />
                </form>
              </div>
            </div>
          

        <br />
      </_Layout>

      {/* You can open the modal using ID.showModal() method */}
      {/* <button className="btn" >open modal</button> */}
      <dialog id="Forget_Email_modal" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-lg">Email</h3>
          <p className="py-4">
            Please enter your email id which you have used to signup here!
          </p>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered input-info w-full max-w-xs"
            onChange={set_Forget_Email}
          />
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <a
              onClick={() => {
                handleForgetEmail();
                window.Forget_Email_modal.close();
              }}
              className="btn"
            >
              Confirm
            </a>
          </div>
        </form>
      </dialog>
      {/* You can open the modal using ID.showModal() method */}
      {/* <button className="btn" >open modal</button> */}
      <dialog id="OTP_modal" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-lg">OTP Verification</h3>
          <p className="py-4">
            We have Sent a 6 digit OTP code to {forget_Email}
          </p>
          <input
            type="number"
            placeholder="OTP"
            className="input input-bordered input-info w-full max-w-xs"
            onChange={set_OTP}
          />
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <a
              onClick={() => {
                handleOTP();
                window.OTP_modal.close();
              }}
              className="btn"
            >
              Confirm
            </a>
          </div>
        </form>
      </dialog>

      {/* You can open the modal using ID.showModal() method */}
      {/* <button className="btn" >open modal</button> */}
      <dialog id="New_Password_modal" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-lg">New Password</h3>
          <p className="py-4">Enter Your New Password </p>
          <input
            type="text"
            placeholder="Password"
            className="input input-bordered input-info w-full max-w-xs"
            onChange={set_New_Password}
          />
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <a
              onClick={() => {
                handleNewPassword();
                window.New_Password_modal.close();
              }}
              className="btn"
            >
              Update !
            </a>
          </div>
        </form>
      </dialog>

      {isLoading && <LoadingModalDots />}

      {showToast && <Toast_Success message={toastMessage} />}
      {showToast_failed && <Toast_Failed message={toastMessage_failed} />}
    </>
  );
}
