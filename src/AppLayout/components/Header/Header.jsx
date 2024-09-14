import {useState} from 'react';
import './HeaderStyle.css';
import {Button, Form} from 'react-bootstrap';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import Logo from '../../../assets/Logo.png';
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
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const searchByKeyword = (event) => {
    event.preventDefault();
    // change API URL with keywords
    navigate(`/search?q=${keyword}`);
    setKeyword('');
  };
  return (
    <header id="header" className="global-mx position-sticky top-0 bg-light-subtle py-2 py-lg-0 z-2">
      <div className="big-menu-box d-flex align-items-center">
        <h2>
          <Link to="/">
            <img className="logo-img" src={Logo} alt="로고" />
          </Link>
        </h2>
        <nav className="mx-auto">
          <ul className="d-flex align-items-center my-2 d-none d-lg-flex">
            {menuItems.map(({itemName, itemLink}, i) => (
              <li key={i} className="menu-item-box">
                <NavLink className="nav-menu-item pb-2 pt-3 fs-4" to={itemLink}>
                  {itemName}
                  <div className="underline"></div>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Form className="input-box fs-5 d-flex" onSubmit={searchByKeyword}>
          <Form.Control
            type="search"
            placeholder="검색어를 입력하세요"
            className="me-2 w-75"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
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
  );
};
export default Header;
