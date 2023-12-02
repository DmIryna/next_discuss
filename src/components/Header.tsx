import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import Link from "next/link"
import HeaderAuth from "./HeaderAuth"
import SearchInput from "./SearchInput"
import { Suspense } from "react"

async function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/">Discuss</Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <Suspense>
          <SearchInput />
        </Suspense>
      </NavbarContent>

      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  )
}

export default Header
