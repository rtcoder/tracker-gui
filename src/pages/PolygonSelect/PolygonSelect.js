import LinkBtn from "../../components/LinkBtn/LinkBtn";

function PolygonSelect() {
  return (
    <>
      <header>
        <LinkBtn url="/">Wstecz</LinkBtn>
      </header>
      <div className="content">

        <div className="canvas-container">
          RAW obraz z kamery
        </div>


        <button disabled>
          Aktywuj zaznaczanie
        </button>
      </div>
    </>
  );
}

export default PolygonSelect;
