import { useEffect, useState } from "react";
import { LuClipboardCheck } from "react-icons/lu";
import axiosInstance from "../api/axiosInstance";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface shareModal {
  shareOpen: boolean;
  onClose: () => void;
}

const ShareModal = (props: shareModal) => {
  if (!props.shareOpen) {
    return;
  }

  const [shareableLink, setShareableLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [hash, setHash] = useState("");
  const [isErr, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const baseUrl = import.meta.env.VITE_FRONTEND_URL;
  // const link = import.meta.env.VITE_API_URL;

  useEffect(()=>{

    if(hash) {
      setShareableLink(`${baseUrl}/share/${hash}`);
    }
  },[hash,baseUrl]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setIsError(false);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
        props.onClose();
      }, 2000);
    } catch (error) {
      setIsError(true);
      setErrMsg("Error while copying to clipboard!");
      console.log(`Error while copying link to clipboard!`);
    }
  }

  async function handleGetLink() {
    try {
      setIsError(false);
      const response = await axiosInstance.post(
        "/share/",
        {
          share: true,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      setHash(response.data.hash);
    } catch (error: any) {
      setIsError(true);
      setErrMsg(error.response?.data?.message || "An error occured!");

      setTimeout(() => {
        setIsError(false);
        setErrMsg("");
      }, 3000);
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-brightness-75">
      <div className="inline-block bg-white p-8 rounded-xl mt-[-100px]">
        <div className="flex flex-col justify-center gap-4">
          <div className="flex">
            <p className="text-center text-lg pr-4">
              Share this link with a friend!
              <br />
              They can view the content, <br />
              but no edits allowed!
            </p>
            <IoIosCloseCircleOutline
              onClick={props.onClose}
              className="transition-transform duration-300 hover:scale-110 cursor-pointer"
              size={30}
            />
          </div>
          <button
            onClick={handleGetLink}
            className="bg-[#5b43d6] text-white font-bold py-1 cursor-pointer rounded-md transition-all duration-300 transform shadow-md hover:scale-105 hover:bg-[#4a35c4] active:scale-95"
          >
            Get Link
          </button>

          <div className=" bg-[#e2e5fd] flex w-64 break-words">
            <p className="text-md p-2 flex-1 overflow-hidden break-words">
             {shareableLink}
            </p>
            <button
              onClick={handleCopy}
              className="bg-[#8c8aef] text-white p-2 cursor-pointer hover:scale-100 hover:bg-[#4a35c4] active:scale-95"
            >
              <LuClipboardCheck size={25} />
            </button>
          </div>

          {isErr && (
            <div className="text-center text-md text-red-400">{errMsg}</div>
          )}

          {copied && (
            <p className="text-center text-md text-[#251f47]">
              Copied to Clipboard!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;

// http://localhost:5173/share/brain/veefvefnfef --copied
