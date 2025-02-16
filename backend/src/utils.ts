import { number } from "zod";

export function randomString(len:number) {
    let options = "dnadlfqerfbeirvbefdivernfa";
    let optionLen = options.length;
    let ans="";

    for(let i=0;i<=len;i++) {
        ans+= options[Math.floor(Math.random()*optionLen)];
    }
    return ans;
}