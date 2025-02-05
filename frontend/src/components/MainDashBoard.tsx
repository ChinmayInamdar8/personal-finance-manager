
import { OverviewMain } from "./OverviewMain";
import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardChart } from "./DashBoardChart";

interface result {
  income: string;
  expense: string;
  loan: string;
}



export function MainDashBoard() {
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [loan, setLoan] = useState("");

  useEffect(() => {
    async function CallMe() {
      const response = await axios.get<result>(
        "http://localhost:3000/api/finance/overview",
        {
          headers: {
            authorization: `bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );

      setIncome(response.data.income);
      setExpense(response.data.expense);
      setLoan(response.data.loan);
    }

    CallMe();
  }, []);
  return (
    <div className="flex justify-center flex-col items-center  mt-10">
      <div className="bg-slate-700 w-5/6 h-96 rounded-md shadow-lg opacity-80 mb-14">
        <div className="grid grid-cols-2 justify-center text-center items-center h-full w-full">
          <OverviewMain label="Income" amount={income}></OverviewMain>
          <OverviewMain label="Expense" amount={expense}></OverviewMain>
          <OverviewMain label="Loan" amount={loan}></OverviewMain>
          <OverviewMain
            label="Balance"
            amount={(parseInt(income) - parseInt(expense)).toString()}
          ></OverviewMain>
        </div>
      </div>
      
      <DashboardChart></DashboardChart>


    </div>
  );
}
