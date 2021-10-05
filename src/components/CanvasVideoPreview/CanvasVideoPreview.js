import './CanvasVideoPreview.css';
import {useEffect, useRef, useState} from "react";
import {getAddressFromLS} from "../../helpers/local-storage";

function CanvasVideoPreview({selectingActive}) {

  const canvasContentRef = useRef();
  const canvasRef = useRef();
  const videoRef = useRef();

  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {

    setVideoSrc(getAddressFromLS());

    function handleResize() {
      const {width, height} = canvasContentRef.current?.getBoundingClientRect();
      if (width && height) {
        videoRef.current.width = width;
        videoRef.current.height = height;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="canvas">
      <div className="canvas-container" ref={canvasContentRef}>
        <video ref={videoRef} src={videoSrc}>
          fallback
        </video>
        <canvas ref={canvasRef}>

        </canvas>
      </div>
    </div>
  );
}

export default CanvasVideoPreview;