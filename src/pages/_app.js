import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
    console.log('User ID:', process.env.NEXT_PUBLIC_EMAILJS_USER_ID);
    console.log('Contact Template ID:', process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID);
    console.log('Pledge Template ID:', process.env.NEXT_PUBLIC_EMAILJS_PLEDGE_TEMPLATE_ID);
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;