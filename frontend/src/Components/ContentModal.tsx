import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axiosInstance from "../api/axiosInstance";

interface propsTypes {
  isOPen: boolean;
  onClose: () => void;
  refetch: () => any;
}

const ContentModal = (props: propsTypes) => {
  if (props.isOPen == false) {
    return;
  }

  //props, isOpen, setIsOPen/ onClose
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("other");
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // const titleRef = useRef<HTMLInputElement>("");
  // const linkRef = useRef<HTMLInputElement>("");
  // const typeRef = useRef("") {can also use ref}

  async function addContent() {
    try {
      if (link.trim() === "" || title.trim() === "") {
        setIsError(true);
        setErrMsg("Please provide valid title, url");
        return;
      }
      await axiosInstance.post(
        "/content/",
        {
          title: title,
          link: link,
          type: type,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      props.refetch();
      props.onClose();
      // console.log(response);

      setTimeout(() => {
        setIsError(false);
        setErrMsg("");
      }, 3000);
    } catch (error: any) {
      console.log(error);
      setIsError(true);
      setErrMsg(
        error.response?.data?.message || "An unexpexted error occured!"
      );
      setTimeout(() => {
        setIsError(false);
        setErrMsg("");
      }, 3000);
    }
  }

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
                className={`text-sm  cursor-pointer rounded-md px-3 py-1 transition-transform duration-300 hover:scale-105  hover:border-1 hover:border-[#796ee6] 
                  ${
                    type === "twitter"
                      ? "bg-[#796ee6]  text-white"
                      : "bg-[#e2e5fd] text-black"
                  }`}
              >
                Tweet
              </button>
              <button
                onClick={() => setType("youtube")}
                className={` text-sm text-md cursor-pointer rounded-md px-3 py-1 transition-transform duration-300 hover:scale-105  hover:border-1 hover:border-[#796ee6] ${
                  type === "youtube"
                    ? "bg-[#796ee6]  text-white"
                    : "bg-[#e2e5fd] text-black"
                }`}
              >
                Youtube
              </button>
              <button
                onClick={() => setType("other")}
                className={`text-sm text-md cursor-pointer rounded-md px-3 py-1 transition-transform duration-300 hover:scale-105  hover:border-1 hover:border-[#796ee6] 
                  ${
                    type === "other"
                      ? "bg-[#796ee6]  text-white"
                      : "bg-[#e2e5fd] text-black"
                  }`}
              >
                Other
              </button>
            </div>

            <button
              onClick={addContent}
              className=" mt-2 text-white  font-bold flex-1 bg-[#5b43d6] cursor-pointer rounded-lg px-3 py-2 transition-transform duration-300 hover:scale-105  hover:border-1 hover:border-[#796ee6] "
            >
              Submit
            </button>

            {isError && (
              <div className="text-md text-red-400 m-3 text-center ">
                {errMsg}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentModal;
