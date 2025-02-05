import React from "react";

interface props{
    label:string,
    type:string,
    placeholder?:string,
    OnChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}


export function InputBox({label, type, placeholder, OnChange}:props){
    return (
        <div className="w-full mb-4">
            <p className="ml-1 mb-2">{label}</p>
            <input type={type} name={label} id={label} placeholder={placeholder} onChange={OnChange} className="w-full border-2 border-green-500 py-1 px-4 rounded-md"/>
        </div>
    )
}