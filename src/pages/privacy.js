import Header from '../components/Header';
import Head from 'next/head'; // Import Head for metadata

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Save Blessed Sacrament School</title>
        <meta
          name="description"
          content="Learn about our privacy policy for the Save Blessed Sacrament School fundraiser. We protect your personal information with care."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" type="image/x-icon" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" /> {/* Fallback for modern browsers */}
        {/* Open Graph tags for social media */}
        <meta property="og:title" content="Privacy Policy - Save Blessed Sacrament School" />
        <meta
          property="og:description"
          content="Review the privacy policy for the Save Blessed Sacrament School fundraiser and how we safeguard your data."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://savebss.org/privacy" /> {/* Updated to your live domain */}
        <meta property="og:image" content="https://savebss.org/logo.svg" /> {/* Updated to full URL */}
      </Head>
      <Header>
        <img src="/logo.svg" alt="Blessed Sacrament School Logo" style={{ maxWidth: '200px', marginBottom: '1rem' }} />
      </Header>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="display-4 text-center mb-4" style={{ color: '#FFD700' }}>
              Privacy Policy
            </h1>
            <p className="lead text-center mb-4" style={{ color: '#333' }}>
              We are committed to protecting your privacy.
            </p>
            <div className="card p-4 shadow-lg rounded" style={{ backgroundColor: '#f8f9fa' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Commitment</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                At Save Blessed Sacrament School, we value your trust. Any personal information you provide, such as your name and email, is used solely for the purpose of processing your pledge and keeping you informed about our campaign. We do not share your data with third parties except as required to process donations or comply with legal obligations.
              </p>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Data Security</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                We use secure methods to store and transmit your data, including encryption for all transactions. Your information is stored in a secure database and is only accessible to authorized team members.
              </p>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Contact Us</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                If you have any questions about our privacy practices, please contact us at{' '}
                <a href="mailto:standwithus@makesbssaparishschool.org" style={{ color: '#FFD700' }}>
                  standwithus@makesbssaparishschool.org
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}