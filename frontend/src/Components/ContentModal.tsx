import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";

interface propsTypes {
  isOPen: boolean;
  onClose: () => void;
}

const ContentModal = (props: propsTypes) => {
  if (props.isOPen == false) {
    return;
  }

  //props, isOpen, setIsOPen/ onClose
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("");
  //   const typeRef = useRef("") {can also use ref as I'm not using the type anywhere}

  // async function addContent() {
  //     try {
  //         const response = await axios.post()
  //     } catch (error) {
  //     }
  // }

  return (
    <div>
      {props.isOPen && (
        <div className="fixed inset-0  flex items-center justify-center  backdrop-blur-xs z-50">
          <div className="flex flex-col gap-2 relative bg-white p-6 rounded-lg shadow-md w-[70%] sm:w-[400px] overflow-y-auto border-1 border-[#e3e3e3]">
            <div className="flex justify-between">
              <p className="text-lg font-bold">Title</p>
              <IoIosCloseCircleOutline
                onClick={props.onClose}
                className="transition-transform duration-300 hover:scale-110 cursor-pointer"
                size={30}
              />
            </div>
            <input
              type="text"
              value={title}
              placeholder="Add some cool title 👀"
              className="text-md  outline-0 rounded-lg bg-[#e2e5fd] px-4 py-2"
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-lg font-bold">Link</p>
            <input
              type="text"
              value={link}
              placeholder="please provide the link."
              className="text-md outline-0 rounded-lg bg-[#e2e5fd] px-4 py-2"
              onChange={(e) => setLink(e.target.value)}
            />
            <p className="text-lg font-bold">Select Type</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setType("twitter")}
                className=" text-sm bg-[#e2e5fd] text-md cursor-pointer rounded-md px-3 py-1 transition-transform duration-300 hover:scale-105  hover:border-1 hover:border-[#796ee6] "
              >
                Tweet
              </button>
              <button
                onClick={() => setType("youtube")}
                className=" text-sm bg-[#e2e5fd] text-md cursor-pointer rounded-md px-3 py-1 transition-transform duration-300 hover:scale-105  hover:border-1 hover:border-[#796ee6] "
              >
                Youtube
              </button>
              <button
                onClick={() => setType("other")}
                className=" text-sm bg-[#e2e5fd] text-md cursor-pointer rounded-md px-3 py-1 transition-transform duration-300 hover:scale-105  hover:border-1 hover:border-[#796ee6] "
              >
                Other
              </button>
            </div>

            <button className=" mt-2 text-white  font-bold flex-1 bg-[#5b43d6] cursor-pointer rounded-lg px-3 py-2 transition-transform duration-300 hover:scale-105  hover:border-1 hover:border-[#796ee6] ">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentModal;
