import {Button, Form} from 'react-bootstrap';
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
    <div className="min-vh-100 d-flex flex-column">
      <header id="header" className="global-mx position-sticky top-0 bg-light-subtle py-2 py-lg-0">
        <div className="big-menu-box d-flex align-items-center">
          <h2>
            <Link to="/" className="me-4">
              <div>LOGO</div>
            </Link>
          </h2>
          <nav className="me-auto">
            <ul className="d-flex align-items-center my-2 d-none d-lg-flex align-self-end ">
              {menuItems.map(({itemName, itemLink}, i) => (
                <li key={i} className="menu-item-box">
                  <NavLink className="nav-menu-item pb-2 pt-3 fs-5" to={itemLink}>
                    {itemName}
                    <div className="underline"></div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Form className="input-box d-flex">
            <Form.Control type="text" placeholder="검색어를 입력하세요" className="fs-5 me-2 w-auto" />
            <Button variant="primary" type="submit" className="input-button fs-5">
              검색
            </Button>
          </Form>
        </div>
      </header>
      <main className="pb-4">
        <Outlet />
      </main>
      <div className="flex-grow-1"></div>
      <footer id="footer" className="bg-light-subtle">
        여기는 푸터
      </footer>
    </div>
  );
};

export default AppLayout;
