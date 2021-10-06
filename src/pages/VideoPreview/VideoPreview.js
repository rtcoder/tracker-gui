import LinkBtn from "../../components/LinkBtn/LinkBtn";
import {getAddressFromLS} from "../../helpers/local-storage";
import {useEffect, useState} from "react";

function VideoPreview() {
  const [videoSrc, setVideoSrc] = useState('');
  useEffect(() => {
    setVideoSrc(getAddressFromLS());
  }, []);
  return (
    <>
      <header>
        <LinkBtn url="/">Wstecz</LinkBtn>
      </header>
      <div className="content">
        <div className="canvas">
          <div className="canvas-container">
            <video src={videoSrc}>
              fallback
            </video>
            <canvas>

            </canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPreview;
