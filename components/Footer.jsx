import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black pb-5 pt-4 mt-auto">
      <div className="row justify-content-center text-center mb-3">
        <div className="col-md-12">
          <span className="d-block mt-3 text-gray">
            © 2022 YouTube Downloader
          </span>
        </div>
        <div className="col-md-12">
          <span
            className="mt-3 text-slate-600"
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <Link href="/about_us">About Us</Link>
            <Link href="/contact_us">Contact US</Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
