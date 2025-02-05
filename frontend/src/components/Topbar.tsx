import { useNavigate } from "react-router-dom"


export function TopBar(){
    const navigate = useNavigate();
    return(
        <div className=" bg-slate-700 flex justify-center">
             <div className="flex justify-between w-5/6">
            <div>
                <button className=" border-slate-600 px-2 py-1 rounded bg-gray-900 border-2 hover:border-slate-50 text-white mx-3 my-2" onClick={()=>navigate("/dashboard/history")}>History</button>
            </div>

            <div>
                <button className=" border-slate-600 px-2 py-1 rounded bg-gray-900 border-2 hover:border-slate-50 text-white mx-3 my-2" onClick={()=>navigate("/dashboard/income")}>Add Income</button>
            </div>
            <div>
                <button className=" border-slate-600 px-2 py-1 rounded bg-gray-900 border-2 hover:border-slate-50 text-white mx-3 my-2" onClick={()=>navigate("/dashboard/expense")}>Add Expense</button>
            </div>
            <div>
                <button className=" border-slate-600 px-2 py-1 rounded bg-gray-900 border-2 hover:border-slate-50 text-white mx-3 my-2" onClick={()=>navigate("/dashboard/loan")}>Add Loan</button>
            </div>
        </div>
        </div>
       
    )
}