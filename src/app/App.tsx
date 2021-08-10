import Footer from "components/layout/Footer"
import Navbar from "components/layout/Navbar"
import { RoutePath } from "constants/enum"
import HomePage from "pages/HomePage"
import { Route, Switch } from "react-router-dom"

function App() {
  return (
    <div className="flex flex-col w-full min-h-screen text-white bg-black">
      <Navbar />
      <main className="flex-grow w-full max-w-5xl mx-auto my-8">
        <Switch>
          <Route exact path={RoutePath.HOME} component={HomePage} />
        </Switch>
      </main>
      <Footer />
    </div>
  )
}

export default App
