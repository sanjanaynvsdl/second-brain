import { Button } from "../Components/Button";
// import { IoAddOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import {Plusicon} from '../icons/PlusIcon'; //this is how, I import the svg and use
import Card from "../Components/Card"
import ContentModal from "../Components/ContentModal";
import { useState } from "react";
import SideBar from "../Components/SideBar"

function DashBoard() {
  const [open, setIsopen]=useState(false);
  return(
    <div className="flex">
      <SideBar/>
    <div className="  sm:ml-64 ml-2 bg-[#eff1fe] min-h-screen w-full">
      <div className="mt-4 mr-4 flex gap-2 justify-end">
        <Button variant="secondary" size="md" text="Share Brain" startIcon={<IoShareSocialOutline size={20} />}onClick={()=>{}}/>
        <Button variant="primary" size="md"  text="Add Content" startIcon={<Plusicon size={"md"}/>} onClick={()=> {setIsopen(true)}}/>
      </div>
      <div className="gap-1 sm:mt-4 sm:m-20   grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
     
      <Card type="twitter" title="Latest-POst" link="https://x.com/Sanjana_ynvsdl/status/1888932240308019419?ref_src=twsrc%5Etfw"/>
      <Card type="youtube" title="My-fav-one" link="https://www.youtube.com/watch?v=SllpB3W5f6s"/>
      <Card type="youtube" title="My-fav-one" link="https://www.youtube.com/watch?v=SllpB3W5f6s"/>
      <Card type="youtube" title="My-fav-one" link="https://www.youtube.com/watch?v=SllpB3W5f6s"/>
      <Card type="youtube" title="My-fav-one" link="https://www.youtube.com/watch?v=SllpB3W5f6s"/>
      <Card type="youtube" title="My-fav-one" link="https://www.youtube.com/watch?v=SllpB3W5f6s"/>
      <Card type="twitter" title="Latest-POst" link="https://x.com/Sanjana_ynvsdl/status/1888932240308019419?ref_src=twsrc%5Etfw"/>
      <Card type="youtube" title="My-fav-one" link="https://www.youtube.com/watch?v=SllpB3W5f6s"/>
      <Card type="youtube" title="My-fav-one" link="https://www.youtube.com/watch?v=SllpB3W5f6s"/>
      <Card type="youtube" title="My-fav-one" link="https://www.youtube.com/watch?v=SllpB3W5f6s"/>
      <Card type="youtube" title="My-fav-one" link="https://www.youtube.com/watch?v=SllpB3W5f6s"/>
      <Card type="youtube" title="My-fav-one" link="https://www.youtube.com/watch?v=SllpB3W5f6s"/>
      <Card type="twitter" title="Latest-POst" link="https://x.com/Sanjana_ynvsdl/status/1888932240308019419?ref_src=twsrc%5Etfw"/>

      <Card type="twitter" title="Latest-POst" link="https://x.com/Sanjana_ynvsdl/status/1888932240308019419?ref_src=twsrc%5Etfw"/>




    </div>
    <ContentModal isOPen={open} onClose={()=>setIsopen(false) }/>
      </div>
    </div>
  )
}

export default DashBoard;


//color - ui locked: #5b43d6