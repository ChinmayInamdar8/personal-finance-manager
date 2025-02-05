interface props{
    label:string,
}

export function TitleComponent({label}:props){
    return (
        <div className="font-semibold text-2xl text-center mb-2">
            {label}
        </div>
    )
}