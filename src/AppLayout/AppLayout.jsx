import './AppLayoutStyle.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react'; // Added useState
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const AppLayout = () => {
  const [showScrollButton, setShowScrollButton] = useState(false); // Added useState hook

  useEffect(() => {
    // window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="pb-4">
        <Outlet />
      </main>
      <div className="flex-grow-1"></div>
      <Footer />

      {showScrollButton ? (
        <Button
          onClick={handleScrollToTop}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'rgb(56, 53, 84, 0.7)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            border: 'none',
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
      ) : null}
    </div>
  );
};

export default AppLayout;
