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
            Save Blessed Sacrament School
          </h1>
          <p className="lead mb-5 mx-auto" style={{ color: '#FFD700', maxWidth: '600px' }}>
            Blessed Sacrament School in Erie, PA, faces closure by the bishop and separation from the Erie Catholic School System. We need your help to stay open!
          </p>
          <div className="d-flex justify-content-center gap-3 mb-5">
            <Link href="/pledge">
              <button className="btn btn-lg px-4 py-2" style={{ backgroundColor: '#FFD700', color: '#000000' }}>
                Pledge Support
              </button>
            </Link>
            <Link href="/contact">
              <button className="btn btn-outline-light btn-lg px-4 py-2">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h3 className="mb-3" style={{ color: '#000000' }}>Why We Need You</h3>
            <p className="text-muted">
              Blessed Sacrament School has been a cornerstone of education in Erie for decades. Closing our doors would disrupt our students’ education and weaken our community. Your voice can help us convince the bishop to keep us open and separate from the Erie Catholic School System.
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