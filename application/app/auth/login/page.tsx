
import {Input} from "@nextui-org/react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex items-center h-[90vh]">
            <div className="w-[50vw] max-w-[600px] mx-auto p-4">
                <div className="mt-10">
                    <Input variant="bordered" type="email" label="Email" placeholder="Enter your email" />
                </div>
                <div className="mt-10">
                    <Input variant="bordered" type="password" label="password" placeholder="Enter your password" />
                </div>
                <button className="mt-10 bg-gray-900 text-white uppercase w-full h-10 rounded">login</button>
                <p className="mt-16 text-center">Don't have account ? <Link className="font-bold uppercase" href="signup">Sign up</Link></p>

            </div>
        </div>
    )
}