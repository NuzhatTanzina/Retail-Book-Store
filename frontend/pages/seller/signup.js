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

  const [Seller_ID, setSeller_ID] = useState(0);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [Profile_Picture, setProfile_Picture] = useState("test.jpg");


  const [otp, setOtp] = useState("");
  const [forget_Email, setForget_Email] = useState("");
  const [new_Password, setNew_Password] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [showToast_failed, setShowToast_failed] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastMessage_failed, setToastMessage_failed] = useState("");

  const [Email_Error, setEmail_Error] = useState("");
  const [Password_Error, setPassword_Error] = useState("");
  const [Name_Error, setName_Error] = useState("");
  const [Phone_Error, setPhone_Error] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidName = (name) => /^[a-zA-Z ]{3,50}$/.test(name);

    const isValidEmail_new = (email) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    
    const isValidPassword = (str) =>
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/.test(
        str
      );
      const isValidPhone = (phone) => /^\d{10,20}$/.test(phone);


    if (!Email || !Password || !Name || !Phone ) {
      // setError("Email and password are required");
    } else if (!isValidEmail(Email) ) {
      // setError("Invalid email address");
      setEmail_Error("Email is required in the correct format")
    } else if (!isValidPassword(Password)) {
      // setError("Invalid Pass");
      setPassword_Error("Password must have at least 1 uppercase, 1 lowercase, 1 digit, 1 special character, and be 8+ characters long")
    }else if (!isValidName(Name)) {
      // setError("Invalid Name");
      setName_Error(
        "Name should be between 3 and 50 characters and only contain letters and spaces"
      );
    } else if (!isValidPhone(Phone)) {
      // setError("Invalid Pass");
      setPhone_Error("Phone number should be between 10 and 20 digits");
    } else {
      try {
        setIsLoading(true);
        const data = await axios.post(
          process.env.NEXT_PUBLIC_API_ENDPOINT+"seller/signup",
          {
            Seller_ID: Seller_ID,
            Name: Name,
            Email: Email,
            Password: Password,
            Phone: Phone,
            Profile_Picture: Profile_Picture,
          },
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            // withCredentials: true,
          }
        );

        if (data.data) {
          login(Email, document.cookie);
          console.log(data.data);
          setIsLoading(false);
          router.push({
            pathname: "/seller/login",
          });
        } else {
          setIsLoading(false);
          handleShow_Failed_Toast("Signup failed");
        }
        console.log(data);
      } catch (error) {
        setIsLoading(false);
        router.push({
          pathname: "/seller/signup",
        });
        handleShow_Failed_Toast("Signup failed");
        console.error("Error Sending Signup Request" + error);
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
      setToastMessage("");
    }, 3000); // Hide after 3 seconds
  };

  const handleShow_Failed_Toast = (message) => {
    setShowToast_failed(true);
    setToastMessage_failed(message);

    setTimeout(() => {
      setShowToast_failed(false);
      setToastMessage_failed("");
    }, 3000); // Hide after 3 seconds
  };
  // #endregion [Toast Message]



  // #region [Loading Modal]
  const triggerLoading = () => {
    setIsLoading(true);

    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Example: 3 seconds
  };
  // #endregion [Loading Modal]

  return (
    <>
      <_Title title="Signup" />
      <_Layout>
        <br />

        {/* Use Mockups Here */}
        <div className="mockup-browser border bg-base-300">
          <div className="mockup-browser-toolbar">
            <div className="input">Search Book Here</div>
          </div>
          <div
            id="mockup_body"
            className="flex justify-center px-4 py-16 bg-base-200">
            
            
            {/* Form here */}


            <div class="w-full max-w-lg p-8 rounded-lg shadow">
              <table class="w-full">
                <tbody>
                  <tr>
                    <td colspan="2" class="py-2 px-4 text-center">
                      {/* Row 1 (colspan=2) */}
                      {/* Row 1 (colspan=2) */}
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4">
                      {/* Row 2, Column 1 */}
                      {/* Name */}
                      <div className="form-control w-full max-w-xs">
                        <label className="label">
                          <span className="label-text">Name</span>
                          {/* <span className="label-text-alt">Top Right label</span> */}
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          id="Name"
                          value={Name}
                          onChange={(e) => setName(e.target.value)}
                          className="input input-bordered w-full max-w-xs"
                        />
                        <label className="label">
                          {/* <span className="label-text-alt">Bottom Left label</span> */}
                          <span className="label-text-alt text-red-600">
                            {Name_Error}
                          </span>
                        </label>
                      </div>

                      {/* Phone */}
                      <div className="form-control w-full max-w-xs">
                        <label className="label">
                          <span className="label-text">Phone</span>
                          {/* <span className="label-text-alt">Top Right label</span> */}
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          id="Phone"
                          value={Phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="input input-bordered w-full max-w-xs"
                        />
                        <label className="label">
                          {/* <span className="label-text-alt">Bottom Left label</span> */}
                          <span className="label-text-alt text-red-600">
                            {Phone_Error}
                          </span>
                        </label>
                      </div>
                      {/* Row 2, Column 1 */}
                    </td>
                    <td class="py-2 px-4">
                      {/* Row 2, Column 2 */}
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
                      {/* Row 2, Column 2 */}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" class=" py-2 px-4 text-center">
                      {/* Row 3 (colspan=2) */}
                      <input
                        className="btn w-64 btn-outline btn-success rounded-full"
                        type="submit"
                        value="Signup !"
                        onClick={handleSubmit}
                      />
                      {/* Row 3 (colspan=2) */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <br />
      </_Layout>

      {/* You can open the modal using ID.showModal() method */}
      {/* <button className="btn" >open modal</button> */}
      <dialog id="_modal_name" className="modal">
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
            // onChange={set_Forget_Email}
          />
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <a
              //   onClick={() => {
              //     handleForgetEmail();
              //     window.Forget_Email_modal.close();
              //   }}
              className="btn"
            >
              Confirm
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
