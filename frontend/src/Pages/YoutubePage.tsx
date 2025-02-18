import Card from "../Components/Card";
import useContents from "../hooks/useContents";
import { useEffect, useState } from "react";

const YoutubePage = () => {
  interface contenTypes {
    title: string;
    type: "twitter" | "youtube" | "other";
    link: string;
    _id: string;
  }

  const { contents, isLoading, isError, errMsg, getContents } = useContents();
  const [youtubeContent, setYoutubeContent] = useState<contenTypes[]>([]);

  const filteredYtVideos = () => {
    const data = contents.filter((content) => content.type == "youtube");
    setYoutubeContent(data);
  };

  useEffect(() => {
    filteredYtVideos();
  }, [contents]);

  return (
    <div className="sm:ml-64 ml-2 bg-[#eff1fe] min-h-screen w-full">
      <p className="text-2xl m-4 text-center">
        The vault of your favorite YouTube moments.🎥
      </p>
      {isError && (
        <div className="text-center">
          <p className="text-md text-red-400">{errMsg}</p>
        </div>
      )}
      {isLoading && (
        <div className="text-center">
          <p className=" inline-block bg-white p-6 m-3 rounded-xl text-2xl text-[#5943bf]">
            Loading...
          </p>
        </div>
      )}
      <div className="gap-1 sm:mt-4 sm:m-20   grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
        {youtubeContent &&
          youtubeContent.map((content, index) => (
            <Card
              key={index}
              id={content._id}
              type={content.type}
              title={content.title}
              link={content.link}
              reFetch={getContents}
            />
          ))}
      </div>
    </div>
  );
};

export default YoutubePage;
