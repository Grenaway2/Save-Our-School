import Header from '../components/Header';
import Link from 'next/link';
import Head from 'next/head'; // Import Head for metadata
import styles from './index.module.css';
import { useState, useEffect } from 'react';

export default function Home() {
  const [pledgeTotal, setPledgeTotal] = useState(0);
  const [recentPledge, setRecentPledge] = useState(null);
  const [publicPledges, setPublicPledges] = useState([]); // New state for public pledges

  useEffect(() => {
    const fetchTally = async () => {
      try {
        const res = await fetch('/api/pledge');
        const { total, pledges } = await res.json();
        console.log('Fetched pledges:', pledges); // Debug log
        if (total > pledgeTotal) {
          setRecentPledge(total - pledgeTotal);
          setTimeout(() => setRecentPledge(null), 3000);
        }
        setPledgeTotal(total);

        // Filter pledges to show only public ones (name is not "Anonymous")
        const publicPledgesList = pledges.filter(pledge => pledge.name !== 'Anonymous');
        console.log('Public pledges after filtering:', publicPledgesList); // Debug log
        setPublicPledges(publicPledgesList);
      } catch (error) {
        console.error('Error fetching tally:', error);
      }
    };

    fetchTally();
    const interval = setInterval(fetchTally, 5000);
    return () => clearInterval(interval);
  }, [pledgeTotal]);

  return (
    <>
      <Head>
        <title>Save Blessed Sacrament School - Community Fundraiser</title>
        <meta
          name="description"
          content="Join the community fundraiser to save Blessed Sacrament School in Erie. Pledge today to help us reach our $100,000 goal and preserve this cherished institution."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" type="image/x-icon" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" /> {/* Fallback for modern browsers */}
        {/* Open Graph tags for social media */}
        <meta property="og:title" content="Save Blessed Sacrament School - Community Fundraiser" />
        <meta
          property="og:description"
          content="Support the effort to save Blessed Sacrament School in Erie with your pledge. Help us reach our $100,000 goal!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://savebss.org" /> {/* Updated to your live domain */}
        <meta property="og:image" content="https://savebss.org/logo.svg" /> {/* Updated to full URL */}
      </Head>
      <Header>
        <img src="/logo.svg" alt="Blessed Sacrament School Logo" style={{ maxWidth: '200px', marginBottom: '1rem' }} />
      </Header>
      <div className="container-fluid py-5 text-center" style={{ backgroundColor: '#000000', color: '#FFD700' }}>
        <div className="container py-5">
          <h1 className="display-4 mb-4 fw-bold" style={{ color: '#FFD700', letterSpacing: '1px' }}>
            Save Blessed Sacrament School
          </h1>
          <p className="lead mb-5 mx-auto" style={{ maxWidth: '800px', fontSize: '1.25rem', lineHeight: '1.6' }}>
            For over 80 years, Blessed Sacrament School has been a cornerstone of faith, education, and community in Erie. Facing closure by the Erie Catholic School System, we are committed to restoring it to parish stewardship to preserve its legacy for future generations.
          </p>
          <div className="mb-5">
            <h2 className="fw-bold" style={{ fontSize: '4.5rem', color: '#FFD700', position: 'relative' }}>
              ${pledgeTotal.toFixed(2)}
              {recentPledge && (
                <span
                  style={{
                    position: 'absolute',
                    color: '#28a745',
                    fontSize: '1.5rem',
                    top: '-25px',
                    right: '-70px',
                    fontWeight: 'bold',
                  }}
                >
                  +${recentPledge.toFixed(2)}
                </span>
              )}
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              Raised of $100,000 Goal
            </p>
            <div className="progress" style={{ maxWidth: '700px', height: '25px', margin: '0 auto', backgroundColor: '#333', borderRadius: '5px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${(pledgeTotal / 50000) * 100}%`,
                  backgroundColor: '#FFD700',
                  transition: 'width 1s ease-in-out',
                }}
                aria-valuenow={pledgeTotal}
                aria-valuemin="0"
                aria-valuemax="50000"
              />
            </div>
            <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
              {((pledgeTotal / 50000) * 100).toFixed(1)}% Funded
            </p>
          </div>
          <Link href="/pledge">
            <button
              className="btn btn-lg px-4 py-2"
              style={{
                backgroundColor: '#FFD700',
                color: '#000000',
                fontWeight: '600',
                borderRadius: '5px',
                border: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              Support Our Cause
            </button>
          </Link>
        </div>
      </div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h3 className="mb-3 text-dark fw-bold" style={{ fontSize: '1.75rem' }}>
              Why Your Support Matters
            </h3>
            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
            We are committed to keeping our school open and returning it to parish control, where it can thrive under the care of those who value it most.
            </p>
            <h4 className="mt-4 mb-3 text-dark fw-bold" style={{ fontSize: '1.5rem', color: '#FFD700', borderBottom: '2px solid #FFD700' }}>
              Public Supporters
            </h4>
            {publicPledges.length > 0 ? (
              <ul className="list-unstyled public-supporters-list" style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                {publicPledges.map((pledge, index) => (
                  <li key={index} style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffffff', borderLeft: '4px solid #28a745', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: '#333' }}>{pledge.name}</span>
                    <span style={{ color: '#28a745', fontWeight: 'bold' }}>${pledge.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted" style={{ fontSize: '1.1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                No public pledges yet. Be the first to show your support!
              </p>
            )}
            <h4 className="mt-4 mb-3 text-dark" style={{ fontSize: '1.5rem' }}>
              How You Can Help
            </h4>
            <ul className="list-unstyled" style={{ fontSize: '1.1rem' }}>
              <li className="mb-2"><strong>Sign the Petition:</strong> Demonstrate community backing.</li>
              <li className="mb-2"><strong>Donate:</strong> Fund our efforts to keep the school open.</li>
              <li className="mb-2"><strong>Contact Leaders:</strong> Advocate with local representatives.</li>
            </ul>
            <p className="mt-4 fw-bold text-dark" style={{ fontSize: '1.2rem' }}>
              Together, we can secure the future of our school.
            </p>
          </div>
        </div>
      </div>
      <footer className="text-center py-4" style={{ backgroundColor: '#000000' }}>
        <p style={{ color: '#FFD700', fontSize: '1rem' }}>© 2025 Save Our School. All rights reserved.</p>
        <p>
          <a href="/contact" className={`text-decoration-none ${styles.footerLink}`} style={{ color: '#FFD700', marginRight: '15px' }}>
            Contact Us
          </a>
          <a href="mailto:standwithus@makesbssaparishschool.org" className={`text-decoration-none ${styles.footerLink}`} style={{ color: '#FFD700', marginRight: '15px' }}>
            Email Us
          </a>
          <a href="/privacy" className={`text-decoration-none ${styles.footerLink}`} style={{ color: '#FFD700' }}>
            Privacy Policy
          </a>
        </p>
      </footer>
    </>
  );
}