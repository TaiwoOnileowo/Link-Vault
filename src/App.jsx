import Home from "./components/Home";
import { Router } from "react-chrome-extension-router";
const App = () => {
  return (
    <>
    
      <Router>
        <Home />
      </Router>
    </>
  );
};

export default App;
