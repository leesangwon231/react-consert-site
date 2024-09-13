import {Routes, Route} from 'react-router-dom';
import AppLayout from './AppLayout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import ContentsPage from './pages/ContentsPage/ContentsPage';
import ContentsDetailPage from './pages/ContentsDetailPage/ContentsDetailPage';
import LocationPage from './pages/location/LocationPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// 앱 레이아웃 - 헤더랑 푸터

const App = () => {
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
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
