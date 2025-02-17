
import DashBoard from "./Pages/DashBoard"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignUP from "./Pages/SignUP";
import SignIn from "./Pages/SignIn";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard/>}/>
        <Route path="/signup" element={<SignUP/>}/>
        <Route path="/signin" element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;