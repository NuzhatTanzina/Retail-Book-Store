import "@/styles/globals.css";

import 'daisyui/dist/full.css'; // Import DaisyUI styles



import { AuthProvider } from "./utils/authcontext";

export default function App({ Component, pageProps }) {
  return (

    
    <AuthProvider>
      <script src="https://cdn.tailwindcss.com"></script>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
