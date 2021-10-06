import './CanvasVideoPreview.css';
import {useEffect, useRef, useState} from "react";
import {getAddressFromLS} from "../../helpers/local-storage";

function CanvasVideoPreview({selectingActive, pointsUpdated, pointsFromLs}) {
  const [points, setPoints] = useState(pointsFromLs);
  const [pointsToProcess, setPointsToProcess] = useState([]);
  const [tmpPoint, setTmpPoint] = useState({x: -1, y: -1});
  const [isMouseDown, setIsMousedown] = useState(false);

  const canvasContentRef = useRef();
  const canvasRef = useRef();
  const videoRef = useRef();

  const [videoSrc, setVideoSrc] = useState('');

  const drawPoints = (canvas) => {
    const ctx = canvas?.getContext('2d');
    ctx.fillStyle = 'red';
    ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
    console.log([...points, tmpPoint]);
    points
      .filter(({x, y}) => {
        return x > 0 && y > 0 && x < canvas.width && y < canvas.height;
      }).forEach(point => {
      if (point.x > 0 && point.y > 0) {
        ctx?.beginPath();
        ctx?.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx?.fill();
      }
    });
    if (isMouseDown) {
      if (tmpPoint.x > 0 && tmpPoint.y > 0) {
        ctx?.beginPath();
        ctx?.arc(tmpPoint.x, tmpPoint.y, 5, 0, 2 * Math.PI);
        ctx?.fill();
      }
    }
  };

  const handleResize = () => {
    const {width, height} = canvasContentRef.current?.getBoundingClientRect();
    if (width && height) {
      videoRef.current.width = width;
      videoRef.current.height = height;
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
  };
  const getXY = e => {
    const {clientX, clientY} = e;
    const {top = 0, left = 0} = canvasRef.current?.getBoundingClientRect();
    return {
      x: clientX - left,
      y: clientY - top
    };
  };

  const handleMouseDownOnCanvas = e => {
    setIsMousedown(true);
    setTmpPoint(getXY(e));
  };

  const handleMouseMoveOnCanvas = e => {
    setTmpPoint(getXY(e));
  };

  const handleMouseUpOnCanvas = e => {
    setIsMousedown(false);
    const {x, y} = getXY(e);
    const {width = 0, height = 0} = canvasRef.current?.getBoundingClientRect();

    if (x > 0 && y > 0 && x < width && y < height) {
      setPoints(prev => [...prev, {x, y}]);
    }
  };

  useEffect(() => {
    if (!selectingActive) {
      setPoints(pointsToProcess);
      return;
    }
    setPointsToProcess(points);
    pointsUpdated(points);
    const CanvasElement = canvasRef.current;

    drawPoints(CanvasElement);
  }, [tmpPoint, points, pointsToProcess, selectingActive]);

  useEffect(() => {
    setPoints(pointsFromLs);
    setPointsToProcess(pointsFromLs);
    const CanvasElement = canvasRef.current;

    drawPoints(CanvasElement);
  }, [pointsFromLs]);

  useEffect(() => {
    const CanvasElement = canvasRef.current;
    setVideoSrc(getAddressFromLS());

    window.addEventListener("resize", handleResize);
    CanvasElement?.addEventListener("mousedown", handleMouseDownOnCanvas);
    window?.addEventListener("mousemove", handleMouseMoveOnCanvas);
    window?.addEventListener("mouseup", handleMouseUpOnCanvas);

    handleResize();
    setPointsToProcess(points);
    drawPoints(CanvasElement);

    return () => {
      window.removeEventListener("resize", handleResize);
      CanvasElement?.removeEventListener("mousedown", handleMouseDownOnCanvas);
      window?.removeEventListener("mousemove", handleMouseMoveOnCanvas);
      window?.removeEventListener("mouseup", handleMouseUpOnCanvas);
    };
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