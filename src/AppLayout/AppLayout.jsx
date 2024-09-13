import './AppLayoutStyle.css';
import {Outlet} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const AppLayout = () => {
  // 뮤지컬, 콘서트, 클래식/무용, 연극
  // navigate(/search?q=${inputValue});

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="pb-4">
        <Outlet />
      </main>
      <div className="flex-grow-1"></div>
      <Footer />
    </div>
  );
};

export default AppLayout;
