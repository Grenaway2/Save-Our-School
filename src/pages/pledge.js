import Header from '../components/Header';
import Head from 'next/head'; // Import Head for metadata
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Pledge() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pledgeAmount, setPledgeAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Pledge Form data:', { name, email, pledgeAmount, isAnonymous });

    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Please enter a valid email address.');
      return;
    }
    if (!pledgeAmount || isNaN(pledgeAmount) || parseFloat(pledgeAmount) < 1) {
      setStatus('Please enter a valid pledge amount (minimum $1).');
      return;
    }
    if (!isAnonymous && (!name || name.trim().length === 0)) {
      setStatus('Please enter your name or choose to pledge anonymously.');
      return;
    }

    console.log('Environment variables:', {
      serviceID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      pledgeTemplateID: process.env.NEXT_PUBLIC_EMAILJS_PLEDGE_TEMPLATE_ID,
      thankYouTemplateID: process.env.NEXT_PUBLIC_EMAILJS_THANKYOU_TEMPLATE_ID,
      userID: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
    });

    if (
      !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_PLEDGE_TEMPLATE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_THANKYOU_TEMPLATE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_USER_ID
    ) {
      setStatus('Error: Missing environment variables');
      console.error('Missing environment variables:', {
        serviceID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        pledgeTemplateID: process.env.NEXT_PUBLIC_EMAILJS_PLEDGE_TEMPLATE_ID,
        thankYouTemplateID: process.env.NEXT_PUBLIC_EMAILJS_THANKYOU_TEMPLATE_ID,
        userID: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
      });
      return;
    }

    try {
      const teamEmailResponse = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_PLEDGE_TEMPLATE_ID,
        { name: isAnonymous ? 'Anonymous' : name.trim(), email, pledgeAmount },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      );
      console.log('Team email sent successfully:', teamEmailResponse);

      const donorEmailResponse = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_THANKYOU_TEMPLATE_ID,
        { name: isAnonymous ? 'Anonymous' : name.trim(), email, pledgeAmount },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      );
      console.log('Donor thank-you email sent successfully:', donorEmailResponse);

      console.log('Sending to API with data:', { amount: pledgeAmount, name: name.trim(), isAnonymous });
      const apiResponse = await fetch('/api/pledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: pledgeAmount, name: name.trim(), isAnonymous }),
      });

      if (!apiResponse.ok) {
        throw new Error('API response not OK: ' + apiResponse.statusText);
      }

      const { total } = await apiResponse.json();
      console.log('API response total:', total);

      setStatus(
        `Thank you! Your pledge of $${pledgeAmount || 'any amount'} brings us to $${total.toFixed(2)} toward our $50,000 goal!`
      );
      setName('');
      setEmail('');
      setPledgeAmount('');
      setIsAnonymous(false);
    } catch (error) {
      console.error('Error submitting pledge:', error);
      setStatus('Failed to submit pledge: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <>
      <Head>
        <title>Pledge to Save Blessed Sacrament School</title>
        <meta
          name="description"
          content="Make a pledge to save Blessed Sacrament School in Erie. Every donation helps us reach our $100,000 goal to keep this school open for the community."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" type="image/x-icon" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" /> {/* Fallback for modern browsers */}
        {/* Open Graph tags for social media */}
        <meta property="og:title" content="Pledge to Save Blessed Sacrament School" />
        <meta
          property="og:description"
          content="Support Blessed Sacrament School in Erie with your pledge. Help us reach our $100,000 goal!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://savebss.org/pledge" /> {/* Updated to your live domain */}
        <meta property="og:image" content="https://savebss.org/logo.svg" /> {/* Updated to full URL */}
      </Head>
      <Header>
        <img src="/logo.svg" alt="Blessed Sacrament School Logo" style={{ maxWidth: '200px', marginBottom: '1rem' }} />
      </Header>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="display-4 text-center mb-4" style={{ color: '#FFD700' }}>
              Pledge to Save Blessed Sacrament
            </h1>
            <p className="lead text-center mb-4" style={{ color: '#333' }}>
              No amount is too small every pledge counts toward keeping our school open. Join our community, where pledges range from $10 to $500, and help us reach our $100,000 goal. Your support, big or small, makes a difference!
            </p>
            <div className="card p-4 shadow-lg rounded" style={{ backgroundColor: '#f8f9fa' }}>
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isAnonymous}
                    disabled={isAnonymous}
                    placeholder="Enter your name (optional if anonymous)"
                  />
                  <div className="invalid-feedback">Please provide your name or choose to pledge anonymously.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                  <div className="invalid-feedback">Please provide a valid email.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="pledgeAmount" className="form-label">Pledge Amount ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="pledgeAmount"
                    value={pledgeAmount}
                    onChange={(e) => setPledgeAmount(e.target.value)}
                    min="1"
                    step="0.01"
                    placeholder="e.g., 10.00, 50.00, or more"
                  />
                  <div className="invalid-feedback">Please enter a valid pledge amount (minimum $1).</div>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isAnonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="isAnonymous">
                    Pledge anonymously (name will not be shared)
                  </label>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg px-5 py-2"
                    style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
                  >
                    Pledge Now
                  </button>
                </div>
              </form>
              {status && (
                <p
                  className={`mt-3 text-center ${status.includes('Thank you') ? 'text-success' : 'text-danger'}`}
                  style={{ fontSize: '1.1rem' }}
                >
                  {status}
                </p>
              )}
            </div>
            <p className="text-center mt-4" style={{ color: '#666' }}>
              Your pledge, no matter the size, supports our $100,000 goal. See how we’re doing:{' '}
              <a href="/" className="text-decoration-none" style={{ color: '#FFD700' }}>
                View Tally
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}