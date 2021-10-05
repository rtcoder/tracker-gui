import './PolygonSelect.css';
import LinkBtn from "../../components/LinkBtn/LinkBtn";
import CanvasVideoPreview from "../../components/CanvasVideoPreview/CanvasVideoPreview";
import {useState} from "react";

function PolygonSelect() {
  const [selectingActive, setSelectingActive] = useState(false);
  const [points, setPoints] = useState([]);


  return (
    <>
      <header>
        <LinkBtn url="/">Wstecz</LinkBtn>
      </header>
      <div className="content">

        <CanvasVideoPreview selectingActivw={selectingActive}/>

        <div className="three-buttons">

          <div className="column">
            <button onClick={() => setSelectingActive(prev => !prev)}>
              {selectingActive ? 'Wyłącz zaznaczanie' : 'Aktywuj zaznaczanie'}
            </button>
          </div>
          <div className="column">
            <button>
              Zapisz
            </button>
          </div>
          <div className="column">
            <button>
              Wyślij dane do API
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PolygonSelect;
