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
    <nav className="fixed z-10 w-screen p-4 bg-black border-b h-30 border-gray">
      <div className="flex items-center justify-between max-w-5xl pr-4 mx-auto">
        <Logo />
        {location.pathname !== RoutePath.SEARCH ? (
          <span className="mx-2 ml-auto mr-4 lg:mr-16">
            <Searchbar standalone />
          </span>
        ) : null}
        <ul className="flex gap-x-4 lg:gap-x-16">
          {routes.map((item, idx) => (
            <li key={idx} className={navItemClasses(item.url)}>
              <Link to={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
