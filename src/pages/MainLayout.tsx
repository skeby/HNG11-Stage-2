import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container mx-auto flex w-full flex-grow flex-col justify-center px-5 py-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
