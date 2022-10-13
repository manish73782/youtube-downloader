import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function getVideoId(url) {
  let regex =
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
  return regex.exec(url)[3];
}

const SearchForm = ({
  setLoading,
  setError,
  setYt,
  setThumbnail,
  setFormatts,
  setDefault,
}) => {
  const [ytUrl, setUrl] = useState("");

  const HandleVideoSearch = () => {
    setLoading(true);

    if (!ytUrl || !ytUrl.includes("youtu")) {
      alert("Invalid Youtube URL, please give a youtube url");
      return;
    }

    axios
      .post("https://freelance-youtube-downloader.herokuapp.com/search", {
        id: getVideoId(ytUrl),
      })
      .then((data) => {
        setYt(data.data.videoDetails);
        setThumbnail(
          data.data.videoDetails.thumbnails[
            data.data.videoDetails.thumbnails.length - 1
          ]
        );
        setFormatts(data.data.formats);

        setDefault(
          data.data.formats.filter((vid) => vid.hasAudio && !vid.hasVideo)[0]
        );

        setLoading(false);
      })
      .catch(() => {
        alert("Something wrong, Video not Found");
        setLoading(false);
        setError(true);
      });
  };

  return (
    <div className="card card-sm">
      <div className="card-body row no-gutters align-items-center search_form">
        <div className="col">
          <input
            type="text"
            placeholder="Paste your video link here"
            className="textinput textInput form-control"
            style={{
              border: "none",
            }}
            value={ytUrl}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button
            type="submit"
            id="search"
            className="btn btn-lg btn-danger d-flex align-items-center"
            style={{ gap: "1rem" }}
            onClick={HandleVideoSearch}
          >
            <span className="d-none d-md-inline">Download</span>
            <em className="fas fa-arrow-right"></em>
          </button>
        </div>
      </div>
    </div>
  );
};
String.prototype.toHHMMSS = function () {
  let sec_num = parseInt(this, 10); // don't forget the second param
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

const Content = ({ thumbnail, yt, formats, defaultAudio }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4 col-lg-4 order-12 order-lg-1 mt-3 mx-auto result-col-thumb">
          <Image
            src={thumbnail.url}
            alt=""
            layout="responsive"
            width={thumbnail.width}
            height={thumbnail.height}
          />
          <h6>{yt.title}</h6>
          <p>Duration: {yt.lengthSeconds.toHHMMSS()}</p>
        </div>
        <div className="col-12 col-lg-8 order-2">
          <div className="col-12 p-0 m-0">
            <div className="tabs-header row">
              <a className="video-title col-12 m-0 active-tab">
                <span>
                  <i className="fab fa-youtube"></i> Video
                </span>
              </a>
            </div>
          </div>
          <div className="row m-0">
            <div className="d-lg-block p-0 col-12">
              <div id="myTabContent" className="tab-content">
                <div id="nav-mp4" className="tab-pane active show">
                  <table
                    cellSpacing="0"
                    className="table table-dark table-striped table-sm mb-0"
                  >
                    {formats
                      .sort(function (a, b) {
                        return a.contentLength - b.contentLength;
                      })
                      .filter((vid) => vid.hasVideo && vid.hasAudio)
                      .map((format, index) => {
                        return (
                          <tr key={"vid_" + index}>
                            <td scope="row">
                              <span>
                                <strong>
                                  {format.qualityLabel.replace("p", "")}
                                </strong>
                                .{format.container}
                              </span>

                              {!format.hasAudio && (
                                <span className="no-audio-icon">
                                  <i className="fas fa-volume-mute"></i>
                                </span>
                              )}
                            </td>
                            <td className="align-middle">
                              <a
                                className="btn"
                                href={format.url}
                                download={true}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fas fa-video"></i>
                                Download
                              </a>
                            </td>
                          </tr>
                        );
                      })}

                    {defaultAudio && (
                      <tr>
                        <td scope="row">
                          <span>
                            <strong>{defaultAudio.audioBitrate}</strong> kbps
                          </span>
                        </td>
                        <td className="align-middle">
                          <a
                            className="btn"
                            href={defaultAudio.url}
                            download={true}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fas fa-music"></i>
                            Download
                          </a>
                        </td>
                      </tr>
                    )}

                    {showMore &&
                      formats
                        .sort(function (a, b) {
                          return a.contentLength - b.contentLength;
                        })
                        .filter((vid) => vid.hasAudio && !vid.hasVideo)
                        .map((format, index) => {
                          return (
                            defaultAudio.audioBitrate !=
                              format.audioBitrate && (
                              <tr key={"aud_" + index}>
                                <td scope="row">
                                  <span>
                                    <strong>{format.audioBitrate}</strong> kbps
                                  </span>
                                </td>
                                <td className="align-middle">
                                  <a
                                    className="btn"
                                    href={format.url}
                                    download={true}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="fas fa-music"></i>
                                    Download
                                  </a>
                                </td>
                              </tr>
                            )
                          );
                        })}
                  </table>
                  <div
                    className="show-more-button"
                    onClick={() => setShowMore(!showMore)}
                  >
                    <span>{showMore ? "Show less" : "Show more"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainCard = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [yt, setYt] = useState({});
  const [thumbnail, setThumbnail] = useState();
  const [formats, setFormatts] = useState();
  const [defaultAudio, setDefault] = useState();
  return (
    <section className="jumbotron mb-0 pb-3 bg-primary">
      <div className="search-block-default-height">
        <div className="container text-white h-100">
          <div className="align-items-center text-center pl-lg-5">
            <h1 className="mb-3 mt-3 main_title">Online Video Downloader</h1>
            <div className="row justify-content-center" id="m-form">
              <div className="col-12 col-md-10 col-lg-6">
                <SearchForm
                  setLoading={setLoading}
                  setError={setError}
                  setYt={setYt}
                  setThumbnail={setThumbnail}
                  setFormatts={setFormatts}
                  setDefault={setDefault}
                />
                <div className="col-auto">
                  By using our service you accept our
                  <Link href="/term_of_service"> Terms of Service</Link>
                  {" and "}
                  <Link href="/privacy_policy">Privacy Policy</Link>
                </div>
                {isLoading && (
                  <Image
                    loading="lazy"
                    src="/loader.svg"
                    id="img"
                    width="60"
                    height="60"
                    alt="loader"
                  />
                )}
              </div>
            </div>
            {error && (
              <div>
                <div className="pl-lg-5">
                  <div
                    id="convert-error"
                    role="alert"
                    className="row col-lg-4 col-md-6 col-12 mt-5 alert alert-primary shadow-lg"
                  >
                    <div className="container">
                      <div className="text-center">
                        <div>
                          <span className="conver-error-title">Sorry</span>
                          <i className="far fa-frown"></i>
                        </div>
                        <div className="conver-error-text">
                          The download link was not found
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formats && (
              <div
                id="convert-result"
                role="alert"
                className="row col-lg-8 col-md-10 col-12 mx-auto mt-5 alert alert-primary shadow-lg"
              >
                <div className="container">
                  <p className="convert-title">Download video as:</p>
                </div>

                <Content
                  thumbnail={thumbnail}
                  formats={formats}
                  yt={yt}
                  defaultAudio={defaultAudio}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCard;
