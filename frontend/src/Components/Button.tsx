import { ReactElement } from "react";


interface ButtonProps {
    variant :"primary"|"secondary";
    size:"sm"|"md"|"lg";
    text: string;
    startIcon: ReactElement;
    //this can be, any type too, but not preffered!
    endIcon?:ReactElement;
    onClick:()=>void

}

const variantStyles = {
    primary:'bg-[#796ee6] text-white',
    secondary:'bg-[#cbcffa] text-[#3f347b]'
}

const sizeStyles = {
    "sm":'px-2 py-2 text-sm',
    "md":'px-3 py-2 text-md',
    "lg":'px-6 py-2'
}


const defaultStyles = 'flex gap-2 rounded-xl font-bold items-center cursor-pointer hover:-translate-y-1 transition duration-300 ease-in-out';


export const Button = (props: ButtonProps)=> {
    return(

        <button 
            onClick={props.onClick}
            className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${defaultStyles}`}>
                {props.startIcon}
                {props.text}
        </button>
    )
}



//Implementing a more generic button, 
//Things needed,
//{<Button variant="primary" size="md" onClick={} text ={}/>}
//Accr to this data, we should define a type/interface 