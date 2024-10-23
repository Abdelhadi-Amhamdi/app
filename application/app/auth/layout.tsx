import NavBar from "../ui/NavBar";


export default function AuthLayout({children} : {children : React.ReactNode}) {
    return (
        <div className="h-[100vh]">
            <NavBar />
            <div>
                {children}
            </div>
        </div>
    )
}