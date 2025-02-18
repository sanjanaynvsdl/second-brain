import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import axiosInstance from "../api/axiosInstance";
import { useState } from "react";

{
  /* <AiOutlineYoutube /> */
}

interface cardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "other";
  id: string;
  reFetch: () => any;
}

const Card = (props: cardProps) => {
  // const [onSuccess, setOnSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isError, setIsError] = useState(false);

  async function deleteContent() {
    console.log("Function called!");
    try {
      console.log(props.id);
      await axiosInstance.delete(`/content/${props.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      // console.log(response.data);
      // setOnSuccessMsg(response.data?.message);
      props.reFetch();
    } catch (error: any) {
      setIsError(true);
      setErrMsg(
        error.response?.data?.message ||
          "An Error occurred while deleting content!"
      );
      console.log(`Error while deleting the content ${error}`);
    }
  }

  return (
    <div>
      {isError && (
        <div className="text-center text-md text-red-400">
          <p>{errMsg}</p>
        </div>
      )}
      <div className="max-w-72 border-1 border-[#e3e3e3]  rounded-lg p-4 bg-white mt-4">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 ">
            {props.type == "youtube" && <AiOutlineYoutube size={24} />}
            {props.type == "twitter" && <FaXTwitter size={18} />}
            <p className="text-xl font-bold px-2">{props.title}</p>
          </div>

          <div className="flex justify-center items-center gap-2">
            <a href={props.link.replace("embed", "watch")} target="_blank">
              <IoShareSocialOutline size={18} />
            </a>
            <RiDeleteBin6Line
              size={18}
              onClick={deleteContent}
              className="hover:text-red-400 cursor-pointer"
            />
          </div>
        </div>

        {props.type == "youtube" && (
          <iframe
            className="w-full pt-4"
            src={props.link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {
          props.type == "twitter" && (
            <div className="">
              <blockquote className="twitter-tweet">
                <a href={props.link.replace("x.com", "twitter.com")}></a>
              </blockquote>{" "}
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charSet="utf-8"
              ></script>
            </div>
          )
          // <blockquote>
          //     <a href={props.link}></a>
          // </blockquote>
        }
        <br></br>
      </div>
    </div>
  );
};

export default Card;
