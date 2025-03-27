import { ChangeEvent} from 'react';
import {useNavigate, Link} from "react-router-dom"
import { useState } from "react"
import { SignupInput } from "@amitesh_sahoo/common/dist/index"
import axios from "axios"
import { BACKEND_URL } from "../config";
interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}
export const Auth = ({type} : {type : "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        username: "",
        password: "",
        name: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            console.log(jwt);
            localStorage.setItem("token", jwt.jwt);
            navigate("/blogs");
        } catch(e) {
            console.log(e);
            alert("Error while signing up")
            // alert the user here that the request failed
        }
    }

    return <div className="h-screen flex flex-col justify-center items-center">
        <div className="text-3xl font-extrabold">
            Create an account
        </div>
        <div>
            Already have an account? 
            <Link className="underline pl-2"to="/signin">Login</Link>
        </div>  
        <div className="">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Harkirat Singh..." onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}
                    <LabelledInput label="Username" placeholder="harkirat@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
    </div>

}