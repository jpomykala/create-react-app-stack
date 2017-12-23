module.exports = `import React, {Component} from "react";
import {Link} from "react-router-dom";
import packageJson from "../../package.json";
import { MAIN_PAGE } from "../pages/Routes";

class Navigation extends Component {

  render() {
    return (
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                  data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <Link className="navbar-brand" to={MAIN_PAGE}>{packageJson.name}</Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">

              <li className="nav-item active">
                <Link to={MAIN_PAGE} className="nav-link">Example route</Link>
              </li>
            </ul>
          </div>
        </nav>
    );
  }
}

export default Navigation;
`;