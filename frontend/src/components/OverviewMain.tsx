interface props{
    label:string,
    amount:string
}


export function OverviewMain({label, amount}:props) {
  return (
    <div className="bg-slate-300 h-24 mx-20 rounded-lg shadow flex flex-col justify-center items-center">
      <div className="text-xl font-medium mb-4">{label}</div>
      <div className="text-xl">Rs {amount}</div>
    </div>
  );
}
