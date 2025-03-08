import Header from '../components/Header';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Pledge() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pledge Form data:', { name, email, message });
    console.log('Environment variables:', {
      serviceID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateID: process.env.NEXT_PUBLIC_EMAILJS_PLEDGE_TEMPLATE_ID,
      userID: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
    });

    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || !process.env.NEXT_PUBLIC_EMAILJS_PLEDGE_TEMPLATE_ID || !process.env.NEXT_PUBLIC_EMAILJS_USER_ID) {
      setStatus('Error: Missing environment variables');
      console.error('Missing environment variables:', {
        serviceID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateID: process.env.NEXT_PUBLIC_EMAILJS_PLEDGE_TEMPLATE_ID,
        userID: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
      });
      return;
    }

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_PLEDGE_TEMPLATE_ID,
        { name, email, message },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then((response) => {
        console.log('Email sent successfully:', response);
        setStatus('Pledge sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Email send error:', error);
        setStatus('Failed to send pledge: ' + (error.text || 'Unknown error'));
      });
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h1 className="display-5 mb-4 text-center">Pledge Your Support</h1>
            <p className="text-center mb-4">
              Help us save Blessed Sacrament School by pledging your support today. Let us know how you can contribute!
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
                <label htmlFor="message" className="form-label">How can you help?</label>
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
                <button type="submit" className="btn btn-success btn-lg">Submit Pledge</button>
              </div>
            </form>
            {status && <p className={`mt-3 text-center ${status.includes('successfully') ? 'text-success' : 'text-danger'}`}>{status}</p>}
          </div>
        </div>
      </div>
    </>
  );
}