import './HeaderStyle.css';
import { Button, Form } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
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
  return (
    <header id="header" className="global-mx position-sticky top-0 bg-light-subtle py-2 py-lg-0 z-2">
        <div className="big-menu-box d-flex align-items-center">
          <h2>
            <Link to="/" className="me-4">
              <div>LOGO</div>
            </Link>
          </h2>
          <nav className="me-auto">
            <ul className="d-flex align-items-center my-2 d-none d-lg-flex">
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
          <Form className="input-box fs-5 d-flex">
            <Form.Control type="text" placeholder="검색어를 입력하세요" className="me-2 w-75" />
            <Button variant="primary" type="submit" className="input-button">
              검색
            </Button>
            {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
          </Form>
        </div>
        <div className="mobile-menu">
          <ul className="d-flex align-items-center my-2 d-flex d-lg-none justify-content-evenly">
            {menuItems.map(({itemName, itemLink}, i) => (
              <li key={i} className="mobile-menu-item-box">
                <NavLink className="mobile-menu-item pb-2 pt-3 fs-5" to={itemLink}>
                  {itemName}
                <div className="underline"></div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </header>
  )
}
export default Header