
import DashBoard from "./Pages/DashBoard"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignUP from "./Pages/SignUP";
import SignIn from "./Pages/SignIn";
import ProtectedRoute from "./Components/ProtectedRoute"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><DashBoard/></ProtectedRoute>}/>
        <Route path="/signup" element={<SignUP/>}/>
        <Route path="/signin" element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

//todo: 

//5. Render the components dynamically
//6. Log out button
//7. Implement, Other features on the side-Bar
//8. Correct the axios issues,
//9. Test, with frotend, to backend
//10. deploy BE,
//11. set the env in FE.
//12. Deploy FE
//---DONE---- by 18EOD


//----Need to be fixed------
//  (couldn't load from env.)