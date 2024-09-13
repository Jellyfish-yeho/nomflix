import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/tv">
                    <Tv />
                </Route>
                <Route path="/search">
                    <Search />
                </Route>
                {/* / 경로는 모든 경로에 들어 있기 때문에 맨 마지막에 체크하도록 아래에 넣는다 */}
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
