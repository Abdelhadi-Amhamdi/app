



// import { fetchCustomers } from '@/app/lib/data';

import { createOffer } from "app/app/lib/actions";
import Link from "next/link";


export function MyForm() {
    return (
      <form action={createOffer}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">

          <div className="mb-4">
            <label htmlFor="customer" className="mb-2 block text-sm font-medium">
              Choose Type
            </label>
            <div className="relative">
              <select
                id="type"
                name="type"
                className="block w-full cursor-pointer rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a type
                </option>
                <option value="fulltime">
                  fulltime
                </option>
 
              </select>
            </div>
          </div>
  
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 capitalize block text-sm font-medium">
              offer title
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter The Job Title"
                  className="peer block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
  
          <div>
            <label htmlFor="description" className="w-full block">Description</label>
            <textarea placeholder="description..." className="p-4 w-full mt-4" rows={10} name="description" id="description"></textarea>
          </div>
          
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/offers"
            className="flex h-10 items-center rounded bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <button type="submit" className="capitalize bg-gray-600 px-2 h-10 text-white rounded">create offer</button>
        </div>
      </form>
    );
  }
  
 
export default async function Page() {
  return (
    <main>
      <MyForm />
    </main>
  );
}