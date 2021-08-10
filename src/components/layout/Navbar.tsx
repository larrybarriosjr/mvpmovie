import clsx from "clsx"
import { RoutePath } from "constants/enum"
import { routes } from "constants/items"
import { Link, useLocation } from "react-router-dom"
import Logo from "./Logo"
import Searchbar from "./Searchbar"

const Navbar = () => {
  const location = useLocation()
  const navItemClasses = (url: RoutePath) => {
    return clsx([
      "hover:text-primary",
      { "text-primary border-b border-primary": url === location.pathname }
    ])
  }

  return (
    <nav className="flex items-center justify-between w-full max-w-5xl p-4 mx-auto">
      <Logo />
      <Searchbar />
      <ul className="flex text-white gap-x-4 lg:gap-x-16">
        {routes.map((item, idx) => (
          <li key={idx} className={navItemClasses(item.url)}>
            <Link to={item.url}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar