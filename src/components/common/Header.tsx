import './Header.css';

function Header() {

  return (
    <header className="header">
      <div className="header-inner">
        <h1>
          <a href="/" className="logo" aria-label="do it 홈으로 이동" />
        </h1>      
      </div>
    </header>
  );
}

export default Header;