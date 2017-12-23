module.exports = `import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import reducer from "./redux/reducers/reducer";
import Footer from "./navigation/Footer";
import Navigation from "./navigation/Navigation";
import { MAIN_PAGE } from "./pages/Routes";

const store = createStore(reducer, applyMiddleware(thunk));

const App = () => (
<Provider store={store}>
    <Router>
      <div>
        <Route
            path={MAIN_PAGE}
            component={Navigation}
        />

        <Route
            exact path={MAIN_PAGE}
            component={MainPage}
        />

        <Route
            path={MAIN_PAGE}
            component={Footer}
        />
      </div>
    </Router>
    </Provider>
);

export default App;
`;