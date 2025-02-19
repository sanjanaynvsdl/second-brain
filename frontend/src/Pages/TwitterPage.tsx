import { useEffect, useState } from "react";
import Card from "../Components/Card";
import useContents from "../hooks/useContents";

const TwitterPage = () => {
  interface contenTypes {
    title: string;
    type: "twitter" | "youtube" | "other";
    link: string;
    _id: string;
  }

  const { contents, isLoading, isError, errMsg, getContents } = useContents();

  const [filteredContent, setFilteredContent] = useState<contenTypes[]>([]);

  const filterData = () => {
    const data = contents.filter((content) => content.type == "twitter");
    setFilteredContent(data);
  };

  useEffect(() => {
    filterData();
  }, [contents]);

  return (
    <div className="  sm:ml-64 ml-2 bg-[#eff1fe] min-h-screen w-full">
      <p className="text-2xl m-4 text-center">X marks the spot! All your saved tweets,</p>
      {isError && (
        <div className="text-center">
          <p className="text-md text-red-400">{errMsg}</p>
        </div>
      )}
      {isLoading && (
        <div className=" text-center ">
          <p className="inline-block bg-white text-2xl p-5 text-[#5943bf] rounded-lg">
            Loading...
          </p>
        </div>
      )}
      <div className="gap-1 sm:mt-4 sm:m-10  grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
        {filteredContent &&
          filteredContent.map((content, index) => (
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

export default TwitterPage;
