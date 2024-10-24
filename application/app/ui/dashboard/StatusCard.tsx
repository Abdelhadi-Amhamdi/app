export default function StatusCard({props, data} : {data: any, props : {title : string, icon? : any}}) {  
    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm h-[160px]">
            <div className="flex p-4 justify-center items-center">
                {props?.icon}
                <h3 className="ml-2 text-sm font-medium">{props.title}</h3>
            </div>
            <p className={`truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
                { data && data[props.title] }
            </p>
        </div>
    )
}