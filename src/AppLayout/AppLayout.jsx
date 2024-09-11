import './AppLayoutStyle.css';
import {Link, NavLink, Outlet} from 'react-router-dom';

const AppLayout = () => {
  const menuItems = [
    {
      itemName: '홈',
      itemLink: '/',
    },
    {
      itemName: '콘서트',
      itemLink: '/contents/concert',
    },
    {
      itemName: '뮤지컬',
      itemLink: '/contents/musical',
    },
    {
      itemName: '클래식/무용',
      itemLink: '/contents/classical',
    },
    {
      itemName: '연극',
      itemLink: '/contents/play',
    },
    {
      itemName: '지역',
      itemLink: '/location',
    },
  ];

  // 뮤지컬, 콘서트, 클래식/무용, 연극
  // navigate(/search?q=${inputValue});

  return (
    <div>
      <header className="d-flex align-items-center position-sticky top-0 bg-light-subtle">
        <h3>
          <Link to="/">
            <div>LOGO</div>
          </Link>
        </h3>
        <nav>
          <ul className="d-flex align-items-center">
            {menuItems.map(({itemName, itemLink}, i) => (
              <li key={i}>
                <NavLink className="nav-menu-item border border-dark-subtle px-4 py-2" to={itemLink}>
                  {itemName}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="pb-4">
        <Outlet />
      </main>
      <footer>여기는 푸터</footer>
    </div>
  );
};

export default AppLayout;
