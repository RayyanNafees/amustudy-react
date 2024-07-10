import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from "preact-iso";

// import { Header } from './components/Header.jsx';
// import { Home } from './pages/Home/index.jsx';
import { NotFound } from "./pages/_404.jsx";
import "./style.css";

import Home from './App.jsx';
import Post from "./pages/post.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

export function App() {
  return (
    <LocationProvider>
      {/* <Header /> */}
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/post/:postId" component={Post} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
