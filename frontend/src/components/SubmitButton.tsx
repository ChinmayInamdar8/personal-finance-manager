interface props{
    label:string,
    OnClick:(event:React.MouseEvent<HTMLButtonElement>)=>void
}


export function SubmitButton({label, OnClick}:props){
    return (
        <div>
            <button className="w-full py-1 text-xl text-white bg-green-600 border border-white rounded-md mb-3 mt-10" onClick={OnClick}>{label}</button>
        </div>
    )
}