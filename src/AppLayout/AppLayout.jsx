import './AppLayoutStyle.css';
import {Outlet} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const AppLayout = () => {
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
