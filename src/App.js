import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import Home from './pages/Home.js';
import Game from './pages/Game.js';

function App() {
    return <Router>
        <Switch>
            <Route path="/game/:gameId">
                <Game />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
        </Switch>
    </Router>
}

export default App;
