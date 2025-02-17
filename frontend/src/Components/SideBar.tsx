import { GiBrain } from "react-icons/gi";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { LiaHashtagSolid } from "react-icons/lia";
import { IoDocumentTextOutline } from "react-icons/io5";
import { ReactElement } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { PiLinkSimpleHorizontal } from "react-icons/pi";

const SideBar = ()=> {
    return(
        <div className="h-screen border-r-1 w-64 border-[#d2cece] fixed flex flex-col">
            <div className="flex items-center justify-start m-2">
                <GiBrain size={35} className="text-[#796ee6] m-3"/>
                <p className="text-2xl font-bold text-black">Second Brain</p>
            </div>
            <div className="flex flex-col m-2">
                <SideBarItem startIcon={<IoHomeOutline size={24}/>} name="Home"/>
                <SideBarItem startIcon={<FaXTwitter size={24}/>} name="Twitter"/>
                <SideBarItem startIcon={<AiOutlineYoutube size={24}/>} name="Youtube"/>
                <SideBarItem startIcon={<LiaHashtagSolid size={24}/>} name="Tags"/>
                <SideBarItem startIcon={<PiLinkSimpleHorizontal size={24}/>} name="Links"/>
                <SideBarItem startIcon={<IoDocumentTextOutline size={24}/>} name="Others"/>


            </div>

        </div>
    )
}


interface siderBarItem{
    startIcon:ReactElement,
    name:string,

}
function SideBarItem(props:siderBarItem) {
    return(
        <div className="flex justify-start items-center m-2 text-lg hover:bg-[#e2e5fd] rounded-xl p-2 cursor-pointer transition-all duration-400">
            {props.startIcon}
            <p className="pl-4">{props.name}</p>
        </div>
    )
    
}
export default SideBar;