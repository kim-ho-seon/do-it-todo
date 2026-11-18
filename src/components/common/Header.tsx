import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="logo" aria-label="do it Logo" onClick={() => navigate('/')} />
      </div>
    </header>
  );
}

export default Header;