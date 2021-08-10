import logo from "assets/logo.png"

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="MVP Movie logo" className="w-16" />
      <h1 className="text-3xl font-extrabold text-primary">MVP Movie</h1>
    </div>
  )
}

export default Logo
