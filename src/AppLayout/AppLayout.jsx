import {Link, Outlet} from 'react-router-dom';
const AppLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <ul className="flex">
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/search">검색</Link>
            </li>
            <li>
              <Link to="/contents">콘텐츠</Link>
            </li>
            <li>
              <Link to="/location">지역</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="pb-14">
        <Outlet />
      </main>
      <footer>여기는 푸터</footer>
    </div>
  );
};

<<<<<<< HEAD
export default AppLayout;
=======
export default AppLayout;
>>>>>>> SearchPage
