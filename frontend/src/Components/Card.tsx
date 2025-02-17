import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

{
  /* <AiOutlineYoutube /> */
}

interface cardProps {
    title:string,
    link:string,
    type:'twitter' | 'youtube'
}

const Card = (props:cardProps) => {
    
  return (
    <div>
      <div className="max-w-72 border-1 border-[#e3e3e3]  rounded-lg p-4 bg-white mt-4">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 ">
            
            {props.type=="youtube" && <AiOutlineYoutube size={24}/>}
            {props.type=="twitter" && <FaXTwitter size={18} />}
            <p className="text-xl font-bold px-2">{props.title}</p>
          </div>

          <div className="flex justify-center items-center gap-2">
            <a href={props.link.replace('embed', 'watch')} target="_blank">
            <IoShareSocialOutline size={18}/>
            </a>
            <RiDeleteBin6Line size={18}  className="hover:text-red-400 cursor-pointer"/>
          </div>

        </div>

        {props.type=='youtube' && 
            <iframe
            className="w-full pt-4"
            
            src={props.link.replace('watch', 'embed').replace("?v=","/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        }

        {props.type == 'twitter' && 
<div>

<blockquote 
    className="twitter-tweet"> 
    <a href={props.link.replace('x.com','twitter.com')}></a>
</blockquote> <script async src="https://platform.twitter.com/widgets.js"  charSet="utf-8"></script>
</div>
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
