import { ReactElement } from "react";

interface EmptyStateTypes {
    subHeading?:string,
    message:string,
    Icon?:ReactElement
}

const EmptyState = (props:EmptyStateTypes) => {
  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 max-w-md flex flex-col gap-2 p-6 text-center">
        <div className="flex justify-center items-center gap-4">
          <p className="text-2xl font-bold">{props.subHeading}</p>
          {props.Icon}
        </div>
        <p className="text-gray-800">
         {props.message}
        </p>
      </div>
    </div>
  );
};


export default EmptyState;
