import {Routes, Route, useLocation} from 'react-router-dom';
import AppLayout from './AppLayout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import ContentsPage from './pages/ContentsPage/ContentsPage';
import ContentsDetailPage from './pages/ContentsDetailPage/ContentsDetailPage';
import LocationPage from './pages/location/LocationPage';
import VenueDetailPage from './pages/location/VenueDetailPage'; 
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import {useEffect} from 'react';

// 앱 레이아웃 - 헤더랑 푸터

const App = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'instant'});
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/contents">
          <Route index element={<ContentsPage />} />
          <Route path=":category">
            <Route index element={<ContentsPage />} />
            <Route path=":id" element={<ContentsDetailPage />} />
          </Route>
        </Route>
        <Route path="/location" element={<LocationPage />} />
        <Route path="/hall/:id" element={<VenueDetailPage />} />
        {/* <Route path="/hall">
            <Route path=":id" element={<HallDetailPage />} />
        </Route> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
