'use client';

import { logout } from "../data/actions";
import NavLinks from "./Nav-links";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action={logout}>
          <button type="submit" className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-400 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}