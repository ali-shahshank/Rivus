import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Player from "./pages/player/Player";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/Player/:id" element={<Player />}></Route>
      </Routes>
    </>
  );
};

export default App;
