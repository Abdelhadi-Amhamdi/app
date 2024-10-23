import SideNav from "../ui/SideNav";


export default function DashboardLayout({children} : {children : React.ReactNode}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 w-[100vw] h-[100vh]">
            <div className="w-full h-full">
                <SideNav />
            </div>
            <div className="w-full h-full flex-grow p-4 col-span-3">
                {children}
            </div>
        </div>
    )
}