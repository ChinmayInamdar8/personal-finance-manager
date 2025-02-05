import { useEffect, useState } from "react";
import axios from "axios";

interface props {
  amount: string;
  type: string;
  category: string;
}



interface result{
    data:props[]
}

export function History() {
    const [value, setValue] = useState<result>();

    useEffect(()=>{
        async function CallMe() {
            const response = await axios.get<result>(
              "http://localhost:3000/api/finance/history",
              {
                headers: {
                  authorization: `bearer ${window.localStorage.getItem(
                    "token"
                  )}`,
                },
              }
            );

            console.log(response.data);
            setValue(response.data);
        }
        CallMe();

    }, []);
  return (
    <div className="w-full h-full bg-slate-300 flex justify-center">
      <div className="w-full mx-8 h-96 bg-white my-7 rounded-lg">
        <div className="text-center text-xl font-medium ">History</div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-between bg-green-300 mt-4 py-2">
            <div className="mx-14 text-xl ">Type</div>
            <div className="mx-14 text-xl ">Amount</div>
            <div className="mx-14 text-xl ">Category</div>
          </div>


            {value?.data.map((e)=>{
                return <HistoryInner amount={e.amount} type={e.type} category={e.category}></HistoryInner>
            })}


        </div>
      </div>
    </div>
  );
}

function HistoryInner({ amount, type, category }: props) {
  return (
    <div className="flex justify-between bg-yellow-300 mt-4 py-2">
      <div className="mx-14 text-xl text-center flex justify-center items-center"><div>{type}</div></div>
      <div className="mx-14 text-xl text-center flex justify-center items-center"><div>{amount}</div></div>
      <div className="mx-14 text-xl text-center flex justify-center items-center"><div>{category}</div></div>
    </div>
  );
}
