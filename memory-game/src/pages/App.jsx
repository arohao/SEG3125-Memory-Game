import { useState } from 'react'
import '../styles/App.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Link } from 'react-router';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav />

      <main className="flex-grow-1 d-flex align-items-center justify-content-center text-center bg-gradient text-white px-4 py-5">
        <div className="w-100" style={{ maxWidth: '720px' }}>
          <h2 className="mb-4 display-3 fw-bold">Memory Match</h2>
          <p className="mb-4 fs-5">
            Challenge your mind and sharpen your focus with our engaging memory game.
          </p>
          <Link to='/play'>
            <button className="btn btn-lg btn-light fw-bold text-primary px-5 py-3 play-button">
              Play Now
            </button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App
