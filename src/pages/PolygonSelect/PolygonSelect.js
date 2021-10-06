import './PolygonSelect.css';
import LinkBtn from "../../components/LinkBtn/LinkBtn";
import CanvasVideoPreview from "../../components/CanvasVideoPreview/CanvasVideoPreview";
import {useState} from "react";
import {getPointsFromLs, savePointsInLs} from "../../helpers/local-storage";

function PolygonSelect() {
  const [selectingActive, setSelectingActive] = useState(false);
  const [points, setPoints] = useState(getPointsFromLs);

  const toggleActiveSelection = () => {
    const newVal = !selectingActive;
    setSelectingActive(newVal);
  };

  const savePoints = () => {
    savePointsInLs(points);
  };
  const clearPoints = () => {
    savePointsInLs([]);
    setPoints([]);
  };
  return (
    <>
      <header>
        <LinkBtn url="/">Wstecz</LinkBtn>
      </header>
      <div className="content">

        <CanvasVideoPreview selectingActive={selectingActive} pointsFromLs={points} pointsUpdated={setPoints}/>

        <div className="three-buttons">

          <div className="column">
            <button onClick={toggleActiveSelection}>
              {selectingActive ? 'Wyłącz zaznaczanie' : 'Aktywuj zaznaczanie'}
            </button>
          </div>
          <div className="column">
            <button onClick={savePoints}>Zapisz</button>
            <button onClick={clearPoints}>Wyczyść</button>
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
