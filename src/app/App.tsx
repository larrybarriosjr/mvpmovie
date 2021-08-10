import Footer from "components/layout/Footer"
import Navbar from "components/layout/Navbar"

function App() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow"></main>
      <Footer />
    </div>
  )
}

export default App
