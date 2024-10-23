import Link from "next/link";
import { FaPlus } from "react-icons/fa6";


export function CreateOffer() {
    return (
      <Link
        href="/dashboard/"
        className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Create Offer</span>{' '}
        <FaPlus />
      </Link>
    );
  }