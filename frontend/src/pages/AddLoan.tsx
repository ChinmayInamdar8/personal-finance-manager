import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface result {
  message: string;
}



export function AddLoan(){
    const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 w-screen h-screen flex justify-center items-center">
      <div className="bg-white flex flex-col w-96 h-80 justify-center items-center border-2 border-orange-500 rounded-lg">
        <div className="text-xl font-medium">Add Expense</div>
        <div className="m-8">
          <div className="mb-3">Enter Amount</div>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="1234"
            className="w-full border border-slate-700 px-4 py-1 rounded-md focus:outline-none mb-8"
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            name="type"
            id="type"
            className="w-full border border-slate-700 px-4 py-1 rounded-md focus:outline-none "
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="home">Home Loan</option>
            <option value="car">Car Loan</option>
            <option value="personal">Personal Loan</option>
            <option value="education">Education Loan</option>
          </select>

          <button
            className="w-full border border-slate-700 px-4 py-1 rounded-md focus:outline-none bg-green-600 text-white mt-8"
            onClick={() => {
              async function CallMe() {
                const response = await axios.post<result>(
                  "http://localhost:3000/api/finance/loan",
                  { amount: parseInt(amount), type: "loan", category: category },
                  {
                    headers: {
                      authorization: `bearer ${window.localStorage.getItem(
                        "token"
                      )}`,
                    },
                  }
                );

                console.log(response);

                  if (response.data.message == "entry added successfully!") {
                    Swal.fire({
                      title: "Done!",
                      text: "You are being direcred to dashbaord",
                      icon: "success",
                    });
                    navigate("/dashboard");
                }

            }
            CallMe();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}