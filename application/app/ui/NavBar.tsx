import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import Link from 'next/link'


const links = [
    {
        link : "/auth/login",
        title : "login"
    },
    {
        link : "/auth/signup",
        title : "signup"
    },
]

export default function NavBar() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      
      <NavbarContent justify="end">
        {
            links.map((l, index) => <NavbarItem key={index}>
                                        <Link href={l.link}>{l.title}</Link>
                                    </NavbarItem>)
        }
      </NavbarContent>
    </Navbar>
  );
}