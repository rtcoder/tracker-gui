import LinkBtn from "../../components/LinkBtn/LinkBtn";
import CanvasVideoPreview from "../../components/CanvasVideoPreview/CanvasVideoPreview";

function VideoPreview() {
  return (
    <>
      <header>
        <LinkBtn url="/">Wstecz</LinkBtn>
      </header>
      <div className="content">
        <CanvasVideoPreview selectingActivw={false}/>
      </div>
    </>
  );
}

export default VideoPreview;
