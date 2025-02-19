import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Card from "../Components/Card";
import { useParams } from "react-router-dom";

const ShareBrain = () => {
  interface contenTypes {
    title: string;
    type: "twitter" | "youtube" | "other";
    link: string;
    _id: string;
  }

  const { id } = useParams();
  const [userContents, setUserContent] = useState<contenTypes[]>([]);
  const [username, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getUserContent();
  }, [id]);

  async function getUserContent() {
    try {
      setIsLoading(true);
      setIsErr(false);

      const response = await axiosInstance.get(`/share/${id}`);

      setUserContent(response.data.contents);
      setUserName(response.data.user);
      setIsLoading(false);
    } catch (error: any) {
      setIsErr(true);
      setErrMsg(
        error.response?.data?.message ||
          "An error occured while fetching user contents!"
      );

      setTimeout(()=>{
        setIsErr(false);
        setErrMsg("");
      },2000)
    //   console.log(`Error occured while fetching the user contents`);
    }
  }

  return (
    <div className="flex flex-col items-center bg-[#e2e5fd] w-full min-h-screen gap-2">
      <p className="text-2xl text-center m-2 font-bold">{username} contents</p>

      {isLoading && (
        <div>
          <p className="inline-block p-4 bg-white rounded-xl">Loading...</p>
        </div>
      )}

      {isErr && <div className="text-md text-red-400">{errMsg} </div>}
      <div className="gap-3 sm:mt-4 sm:m-10   grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
        {userContents &&
          userContents.map((content, index) => (
            <Card
              key={index}
              title={content.title}
              link={content.link}
              type={content.type}
              id={content._id}
              reFetch={() => {}}
            />
          ))}
      </div>
    </div>
  );
};

export default ShareBrain;
