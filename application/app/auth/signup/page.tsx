import { createUser } from "app/app/lib/actions";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex items-center h-[90vh]">
            <form className="w-[50vw] max-w-[600px] mx-auto p-4" action={createUser}>
                <label htmlFor="email" className="block capitalize">email</label>
                <input type="email" className="block border-black/30 border-[1px] w-full mt-2 h-[40px] px-4 rounded" name="email" id="email" placeholder="example@gmail.com" />
                
                <label htmlFor="username" className="block mt-10 capitalize">username</label>
                <input  type="text" className="block border-black/30 border-[1px] w-full mt-2 h-[40px] px-4 rounded" name="username" id="username"  placeholder="username" />

                <label htmlFor="password" className="block mt-10 capitalize">password</label>
                <input  type="password"  className="block border-black/30 border-[1px] w-full mt-2 h-[40px] px-4 rounded" name="password" id="password"  placeholder="****************" />

                <button className="mt-10 bg-gray-900 text-white uppercase w-full h-10 rounded">Register</button>
                <p className="mt-16 text-center">You already have account ? <Link className="font-bold uppercase" href="login">login</Link></p>
            </form>
        </div>
    )
}