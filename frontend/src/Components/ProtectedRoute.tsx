import { Navigate } from "react-router-dom";

const ProtectedRoute=({children}:any)=>{
    const token = localStorage.getItem('token');

    if(!token) {
        <Navigate to="/signin" replace/>
        //navigate("signup");
    }

    return <>{children}</>
}

export default ProtectedRoute;


//navigate("signup"); -- we only use this, after any form submission,
//By using the <Navigate/> it directly renders when this mounts,
