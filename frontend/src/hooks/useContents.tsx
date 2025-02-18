import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";


//custom-hook to fetch the user-contents
//Import, where-ever the contents are required.
function useContents() {

    interface contenTypes{
        title:string,
        type:'twitter' | 'youtube' | 'other'
        link:string,
        _id:string
    }
    const [contents, setContents]=useState<contenTypes[]>([]);
    const [isLoading, setIsLoading]=useState(false);
    const [isError, setIsError]=useState(false);
    const [errMsg, setErrMsg]=useState("");


    async function getContents() {
        try {
            setIsLoading(true);
            setIsError(false);
            const response = await axiosInstance.get("/content/", {
                headers: {
                    token:localStorage.getItem('token'),
                }
            });
            // console.log(response.data.content[1].link);
            setContents(response.data.content);
            setIsLoading(false);

        } catch (error:any) {
            setIsError(true);
            setErrMsg(error.response?.data?.message);
            console.log(`Error in fetching contents! : ${error}`);

            setTimeout(()=> {
                setIsError(false);
                setErrMsg("");
            },3000);
            
        }
    }

    useEffect(()=>{
        getContents();
    },[]);

    return {contents,isLoading, isError, errMsg, getContents};
}

export default useContents;