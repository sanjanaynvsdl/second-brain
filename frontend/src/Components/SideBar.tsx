import { GiBrain } from "react-icons/gi";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { ReactElement, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
// import { LiaHashtagSolid } from "react-icons/lia";
// import { PiLinkSimpleHorizontal } from "react-icons/pi";

// interface currStates{
//     currPage:"home" | "twitter" |"youtube" | "Others"
// }

const SideBar = () => {
  const [currPage, setCurrPage] = useState<
    "Home" | "Twitter" | "Youtube" | "Others"
  >("Home");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("signin");
  };

  return (
    <div className="h-screen border-r-1 w-64 border-[#d2cece] fixed hidden md:flex flex-col">
      <div className="flex items-center justify-start m-2">
        <GiBrain size={35} className="text-[#796ee6] m-3" />
        <p className="text-2xl font-bold text-black">Second Brain</p>
      </div>
      <div className="flex flex-col m-2 flex-grow">
        <SideBarItem
          name="Home"
          currPage={currPage}
          onClick={() => setCurrPage("Home")}
          navigateTo={() => navigate("/")}
          startIcon={<IoHomeOutline size={24} />}
        />
        <SideBarItem
          name="Twitter"
          currPage={currPage}
          navigateTo={() => navigate("/twitter")}
          startIcon={<FaXTwitter size={24} />}
          onClick={() => setCurrPage("Twitter")}
        />

        <SideBarItem
          name="Youtube"
          currPage={currPage}
          navigateTo={() => navigate("/youtube")}
          onClick={() => setCurrPage("Youtube")}
          startIcon={<AiOutlineYoutube size={24} />}
        />
        <SideBarItem
          name="Others"
          currPage={currPage}
          navigateTo={() => navigate("/other")}
          onClick={() => setCurrPage("Others")}
          startIcon={<IoDocumentTextOutline size={24} />}
        />
        {/* <SideBarItem startIcon={<LiaHashtagSolid size={24}/>} name="Tags"/> */}
        {/* <SideBarItem startIcon={<PiLinkSimpleHorizontal size={24}/>} name="Links"/> */}
      </div>

      <div
        onClick={handleLogout}
        className="m-3 mt-auto mb-6 p-0.5 hover:bg-[#cbcffa] cursor-pointer rounded-lg"
      >
        <div className="flex justify-start items-center m-2 text-lg  rounded-xl p-2 cursor-pointer transition-all duration-400">
          <LuLogOut />
          <p className="pl-4">Log out</p>
        </div>
      </div>
    </div>
  );
};

interface siderBarItem {
  startIcon: ReactElement;
  name: string;
  onClick: () => void;
  currPage: "Home" | "Twitter" | "Youtube" | "Others";
  navigateTo: () => void;
}
function SideBarItem(props: siderBarItem) {
  //   console.log(props.name + "this is the name : " + props.currPage);

  const handleClick = () => {
    props.onClick();
    props.navigateTo();
  };
  return (
    <div
      onClick={handleClick}
      className={`flex justify-start items-center m-2 text-lg  rounded-xl p-2 cursor-pointer transition-all duration-400 ${
        props.name == props.currPage ? "bg-[#e2e5fd]" : "hover:bg-[#e2e5fd]"
      }`}
    >
      {props.startIcon}
      <p className="pl-4">{props.name}</p>
    </div>
  );
}
export default SideBar;
