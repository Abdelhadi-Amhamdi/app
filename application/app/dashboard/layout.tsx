import { cookies } from "next/headers";
import SideNav from "../ui/SideNav";
import { redirect } from "next/navigation";
import jwt from 'jsonwebtoken'

export default async function DashboardLayout({children} : {children : React.ReactNode}) {

    try {
        const token = (await cookies()).get('token')
        if (!token) throw new Error("");
        jwt.verify(token.value, "secret")
    } catch  {
        redirect('/auth/login') 
    }
    

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 w-[100vw] md:h-[100vh]">
            <div className="w-full h-full">
                <SideNav />
            </div>
            <div className="w-full h-full flex-grow p-4 col-span-3">
                {children}
            </div>
        </div>
    )
}