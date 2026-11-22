import './Header.css';

// 공통 헤더 - 로고 클릭 시 새로고침 (Link 대신 a 태그 사용)
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