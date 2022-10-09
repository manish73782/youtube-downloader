import Image from "next/image";

const Header = () => {
  return (
    <header>
      <nav className="topnav navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <div
            className="navbar-brand d-flex align-items-center"
            style={{ gap: "1rem" }}
          >
            <Image
              layout="fixed"
              loading="lazy"
              src="/logo.png"
              width="30"
              height="30"
              alt=""
            />
            instantyoutubevideodownloader
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
