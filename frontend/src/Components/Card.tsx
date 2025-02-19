import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import axiosInstance from "../api/axiosInstance";
import { useState } from "react";
import {Tweet} from 'react-tweet';

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

  //Split this link to extract id,
  //1.  "https://x.com/Sanjana_ynvsdl/status/1888932240308019419?ref_src=twsrc%5Etfw"
  //2.  [  'https://x.com/Sanjana_ynvsdl/', '1888932240308019419?ref_src=twsrc%5Etfw' ] --split-1 split 2nd part 
  //3.  [ '1888932240308019419', 'ref_src=twsrc%5Etfw' ]
  const getTweetId = () => {
    if (!props.link) return undefined; 
  
    const split1 = props.link.split("/status/");
  
    if (split1 && split1.length > 1) {  // Add length check to avoid undefined[1]
      const finalId = split1[1].split("?");
      return finalId[0];
    }
    return undefined;  // This fallback ID will help prevent errors
  }

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

      setTimeout(()=>{
        setIsError(false);
        setErrMsg("");
      },2000)
    }
  }

  return (
    <div>
      {isError && (
        <div className="text-center text-md text-red-400">
          <p>{errMsg}</p>
        </div>
      )}
      <div className="max-w-78 border-1 border-[#e3e3e3]  rounded-lg p-4 bg-white mt-4">
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            {props.type == "youtube" && <AiOutlineYoutube size={24} />}
            {props.type == "twitter" && <FaXTwitter size={18} />}
            <div className="flex w-40 break-words">
            <p className="text-xl font-bold px-2 overflow-hidden break-words mt-[-3px] ">{props.title}</p>
            </div>
          </div>

          <div className="flex  gap-2">
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
            <div className="light">
              <Tweet id={getTweetId()}
               {...({} as any)}
              />
            </div>
          )
        }
        <br></br>
      </div>
    </div>
  );
};

export default Card;
