import { useNavigate } from "react-router-dom"

interface props{
    label:string,
    to:string,
    routeLink:string 
}

export function ChangeLoginPage({label, to, routeLink}:props){
    const navigate = useNavigate();
    return(
        <div className="mb-3">
            <p className="text-center">
                <span>{label}</span>
                <span className="text-blue-700 underline cursor-pointer" onClick={()=>{
                  navigate(routeLink);  
                }}>{to}</span>
            </p>
        </div>
    )
}