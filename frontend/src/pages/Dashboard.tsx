import { MainDashBoard } from "../components/MainDashBoard";
import { TopBar } from "../components/Topbar";

export function Dashboard(){
    return(
        <div className="w-screen bg-slate-300">
            <TopBar></TopBar>
            <MainDashBoard></MainDashBoard>
        </div>
    )
}