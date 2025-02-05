interface props{
    label:string,
}

export function SubTitleComponent({label}:props){
    return (
        <div className="text-xl text-center">
            {label}
        </div>
    )
}