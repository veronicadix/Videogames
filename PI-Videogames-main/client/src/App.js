import "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom"; // importo
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import GameCreated from "./components/GameCreated";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/creategame" component={GameCreated} />
          <Route path="/videogame/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
