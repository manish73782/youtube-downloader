import Image from "next/image";

const PlatformSupport = () => {
  return (
    <section className="container mt-5 mb-5 align-items-center b-instruction how-to-mp4">
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="media">
            <div className="media-body">
              <p className="text-muted">
                Looking for a way to download youtube videos? We have a FREE
                result for you! You can download vids or audio with instant
                youtube downloader.
              </p>
            </div>
          </div>
        </div>
      </div>
      <h5 className="text-muted mb-0 text-center">Supported Platforms:</h5>
      <div className="row justify-content-center">
        <div className="col-6 col-sm-2 p-4 text-center">
          <Image
            src="/windows.svg"
            layout="responsive"
            alt=""
            width="150"
            height="150"
          />
        </div>
        <div className="col-6 col-sm-2 p-4 text-center">
          <Image
            src="/apple.svg"
            layout="responsive"
            alt=""
            width="150"
            height="150"
          />
        </div>
        <div className="col-6 col-sm-2 p-4 text-center">
          <Image
            src="/android.svg"
            layout="responsive"
            alt=""
            width="150"
            height="150"
          />
        </div>
        <div className="col-6 col-sm-2 p-4 text-center">
          <Image
            layout="responsive"
            src="/linux.svg"
            alt=""
            width="150"
            height="150"
          />
        </div>
      </div>
    </section>
  );
};

export default PlatformSupport;
