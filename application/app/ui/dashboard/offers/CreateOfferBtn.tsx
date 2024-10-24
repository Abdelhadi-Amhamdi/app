import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

export function CreateOffer() {
    return (
      <Link
        href="offers/create"
        className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white justify-evenly"
      >
        <span>Create Offer</span>{' '}
        <FaPlus />
      </Link>
    );
  }