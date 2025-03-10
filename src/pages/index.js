import Header from '../components/Header';
import Link from 'next/link';
import styles from './index.module.css';

export default function Home() {
  return (
    <>
      <Header />
      <div className="container-fluid py-5 text-center" style={{ backgroundColor: '#000000' }}>
        <div className="container py-5">
          <h1 className="display-4 mb-4 fw-bold" style={{ color: '#FFD700' }}>
            Keep Blessed Sacrament School Open: Return It to Parish Control
          </h1>
          <p className="lead mb-5 mx-auto" style={{ color: '#FFD700', maxWidth: '800px' }}>
            For over 80 years, Blessed Sacrament School has been a cornerstone of faith and education in Erie. Now, it faces closure by the bishop, with no opportunity for parents to explore alternatives. This decision threatens our children’s education and our community’s foundation.
          </p>
          <Link href="/pledge">
            <button className="btn btn-lg px-4 py-2" style={{ backgroundColor: '#FFD700', color: '#000000' }}>
              Pledge Your Support
            </button>
          </Link>
        </div>
      </div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h3 className="mb-3 text-dark">Why We Need Your Help</h3>
            <p className="text-muted">
              We are committed to keeping our school open and returning it to parish control, where it can thrive under the care of those who value it most.
            </p>
            <h4 className="mt-4 mb-3 text-dark">How You Can Help:</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><strong>Sign the Petition:</strong> Add your name to demonstrate support.</li>
              <li className="mb-2"><strong>Donate:</strong> Contribute funds to sustain our efforts.</li>
              <li className="mb-2"><strong>Contact Representatives:</strong> Urge local leaders to back our cause.</li>
            </ul>
            <p className="mt-4 text-muted">
              Your action is critical now. Together, we can preserve Blessed Sacrament School for future generations.
            </p>
            <p className="fw-bold text-dark">
              Join the Fight: Save Our School Today
            </p>
          </div>
        </div>
      </div>
      <footer className="text-center py-3" style={{ backgroundColor: '#000000' }}>
        <p style={{ color: '#FFD700' }}>© 2025 Save Our School. All rights reserved.</p>
        <p>
          <a href="/contact" className={`text-decoration-none ${styles.footerLink}`} style={{ color: '#FFD700' }}>
            Contact Us
          </a> | 
          <a href="mailto:standwithus@makesbssaparishschool.org" className={`text-decoration-none ms-2 ${styles.footerLink}`} style={{ color: '#FFD700' }}>
            Email Us
          </a>
        </p>
      </footer>
    </>
  );
}