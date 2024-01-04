import { useRouter } from 'next/router';
export default function _Profile_Navigation() {
    const router = useRouter();

    const sendToProfile = function() {
        router.push({
            pathname: '/seller/profile',
        });
      };

      const sendToAddress = function() {
        router.push({
            pathname: '/seller/address',
        });
      };
    return(

        <>
            <div class="fixed bottom-0 left-0 right-0 flex justify-center ">
          <ul class="menu menu-horizontal bg-base-200 rounded-box">
            
            <li onClick={sendToAddress}>
              <a>
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <image href="/images/seller/address2.png" width="20" height="20" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        </>

    );
}
