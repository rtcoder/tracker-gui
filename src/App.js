import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import PolygonSelect from "./pages/PolygonSelect/PolygonSelect";
import VideoPreview from "./pages/VideoPreview/VideoPreview";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={Home}/>
        <Route path="/polygon" component={PolygonSelect}/>
        <Route path="/video" component={VideoPreview}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
