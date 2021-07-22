import React from "react";
import DockerImages from "./components/docker-images-component/DockerImages";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DockerImageDetails from "./components/docker-image-details/DockerImageDetails";
import DockerImageEdit from "./components/docker-image-edit/DockerImageEdit";
import DockerImageCreate from "./components/docker-image-create/DockerImageCreate";

function AppRouter() {
  return (
    <Router>
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/dockerimage/create">
        Create
      </Link>

      <Route path="/dockerimage/create" exact component={DockerImageCreate} />
      <Route path="/" exact component={DockerImages} />
      <Route
        path="/dockerimage/details/:id"
        exact
        component={DockerImageDetails}
      />
      <Route
        path="/dockerimage/details/:id/edit"
        exact
        component={DockerImageEdit}
      />
    </Router>
  );
}

function App() {
  return (
    <div>
      <h1>Docker Image System</h1>
      <AppRouter />
    </div>
  );
}

export default App;
