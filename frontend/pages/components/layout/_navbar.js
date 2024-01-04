import { useRouter } from "next/router";

export default function _NavBar() {
  const router = useRouter();
  const sendToSeller_Login = function () {
    router.push({
      pathname: "/seller/login",
    });
  };

  const sendToSeller_Signup = function () {
    router.push({
      pathname: "/seller/signup",
    });
  };

  const sendTHome = function () {
    router.push({
      pathname: "/",
    });
  };

  const sendToAboutUs = function () {
    router.push({
      pathname: "/aboutus",
    });
  };
{/*
  const sendToContactUs = function () {
    router.push({
      pathname: "/contact-us",
    });
  };
*/}
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">
          Library
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li onClick={sendTHome}>
              <a>Home</a>
            </li>
            <li onClick={sendToAboutUs}>
              <a>About Us</a>
            </li>
            
            {/* Signup */}
           {/* <li>
              <details>
                <summary>Signup</summary>
                <ul className="p-2 bg-base-100">
                  <li><a>Customer</a>
  </li> */}
                  <li onClick={sendToSeller_Signup}>
                    <a>Seller Signup</a>
                  </li>
                  {/* <li><a>Moderator</a></li>
                    <li><a>Admin</a></li> 
                </ul>
              </details>
            </li>*/}
            {/* Login */}
            
                  <li onClick={sendToSeller_Login}>
                    <a>Seller Login</a>
                  </li>
              
             
          </ul>
        </div>
      </div>
    </>
  );
}
