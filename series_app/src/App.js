import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LoginPageComp from "./Components/LoginPage";
import SeriesMainComp from "./Components/SeriesComps/SeriesMainComp.jsx";

function App() {
  return (
    <div className="App" style={{border: '3px solid red'}}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPageComp} />
          <Route path="/home" component={SeriesMainComp}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
