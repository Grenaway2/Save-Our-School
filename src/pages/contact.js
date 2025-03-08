import Header from '../components/Header';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form data:', { name, email, message });
    console.log('Environment variables:', {
      serviceID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateID: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID,
      userID: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
    });

    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || !process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || !process.env.NEXT_PUBLIC_EMAILJS_USER_ID) {
      setStatus('Error: Missing environment variables');
      console.error('Missing environment variables:', {
        serviceID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateID: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID,
        userID: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
      });
      return;
    }

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID,
        { name, email, message },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then((response) => {
        console.log('Email sent successfully:', response);
        setStatus('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Email send error:', error);
        setStatus('Failed to send message: ' + (error.text || 'Unknown error'));
      });
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h1 className="display-5 mb-4 text-center">Contact Us</h1>
            <p className="text-center mb-4">
              Reach out to us to learn more about how you can help save Blessed Sacrament School.
            </p>
            <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-light">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg">Send Message</button>
              </div>
            </form>
            {status && <p className={`mt-3 text-center ${status.includes('successfully') ? 'text-success' : 'text-danger'}`}>{status}</p>}
          </div>
        </div>
      </div>
    </>
  );
}