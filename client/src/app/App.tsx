import { RouterProvider } from "react-router-dom";
import { router } from "./router";
// import { AuthProvider } from "../modules/auth";
// import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
    return (
        <>
            <RouterProvider router={router} />
        </> 
    )
}