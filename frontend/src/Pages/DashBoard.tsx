import { Button } from "../Components/Button";
// import { IoAddOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { Plusicon } from "../icons/PlusIcon"; //this is how, I import the svg and use
import Card from "../Components/Card";
import ContentModal from "../Components/ContentModal";
import { useState } from "react";
import useContents from "../hooks/useContents"; 
import ShareModal from "../Components/ShareModal";

function DashBoard() {
  const [open, setIsopen] = useState(false);
  const [shareOpen, setShareOpen]=useState(false);
  const { contents, isError, isLoading, errMsg, getContents } = useContents();

  return (
    <div className="  md:ml-64 mx-auto bg-[#eff1fe] min-h-screen w-full">
      <div className="mt-4 mr-4 flex gap-2 justify-end">
        <Button
          variant="secondary"
          size="md"
          text="Share Brain"
          startIcon={<IoShareSocialOutline size={20} />}
          onClick={() => {setShareOpen(true)}}
        />
        <Button
          variant="primary"
          size="md"
          text="Add Content"
          startIcon={<Plusicon size={"md"} />}
          onClick={() => {
            setIsopen(true);
          }}
        />
        <ShareModal shareOpen={shareOpen} onClose={()=>setShareOpen(false)}/>
        <ContentModal isOPen={open} onClose={() => setIsopen(false)} refetch={getContents}/>
      </div>

      {isError && (
        <div className="text-center">
          <p className="text-lg text-red-400">{errMsg}</p>
        </div>
      )}
      
      {isLoading && (
        <div className=" text-center ">
          <p className="inline-block bg-white text-2xl p-5 text-[#5943bf] rounded-lg">
            Loading...
          </p>
        </div>
      )}

      <div className="gap-1 sm:mt-4 sm:m-10   grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
        {contents &&
          contents.map((content, index) => (
            <Card
            key={index}
              id={content._id}
              type={content.type}
              title={content.title}
              link={content.link}
              reFetch={getContents}
            />

          ))}
            {/* <Card type="twitter" title="Latest-POst" link="https://x.com/Sanjana_ynvsdl/status/1888932240308019419?ref_src=twsrc%5Etfw"/> */}
      </div>
    </div>
  );
}

export default DashBoard;

//color - ui locked: #5b43d6
