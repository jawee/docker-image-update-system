import React from "react";
import DockerImages from "./components/docker-images-component/DockerImages";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DockerImageDetails from "./components/docker-image-details/DockerImageDetails";
import DockerImageEdit from "./components/docker-image-edit/DockerImageEdit";

function AppRouter() {
  return (
    <Router>
      <Link to="/">Home</Link>

      <Route path="/" exact component={DockerImages} />
      <Route path="/dockerimage/:id" exact component={DockerImageDetails} />
      <Route path="/dockerimage/:id/edit" exact component={DockerImageEdit} />
    </Router>
  );
}

function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <AppRouter />
    </div>
  );
}

export default App;
