import { Button } from "./Components/Button";
// import { IoAddOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import {Plusicon} from './icons/PlusIcon'; //this is how, I import the svg and use

function App() {
  return(
    <div className=" m-4 flex gap-2">Second Brain
      <Button variant="secondary" size="md" text="Share" startIcon={<IoShareSocialOutline size={20} />}onClick={()=>{}}/>
      <Button variant="primary" size="md"  text="Add Content" startIcon={<Plusicon size={"md"}/>} onClick={()=> {}}/>
    </div>
  )
}

export default App;


//color - ui locked: #5b43d6