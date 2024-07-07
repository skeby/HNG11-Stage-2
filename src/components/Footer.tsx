import { Link } from "react-router-dom"
import Logo from "./Logo"
import { footerAppStores, footerSections } from "../static"

const Footer = () => {
  return (
    <div className="bg-primary">
      <div className="container mx-auto flex min-h-[380px] flex-col items-center justify-between gap-4 px-5 py-10 text-center text-white lg:flex-row lg:items-start lg:text-start">
        <Logo />
        <div className="mt-[15px]">
          <p className="mb-[15px] text-sm font-bold">Latest Blog Post</p>
          <p className="mb-2.5 text-xl">Ready to get started?</p>
          <p className="text-sm">
            Meraki stores has once again taken the online market by the storm
          </p>
        </div>
        <p className="h-full border-l border-white"></p>
        <div className="flex w-full max-w-[295px] flex-col self-center">
          <div className="mb-[60px] flex w-full justify-between gap-x-5">
            {footerSections.map((section, i) => (
              <div key={i} className="flex flex-col text-sm">
                <p className="mb-[22px] font-bold">{section.header}</p>
                {section.links.map((link, i) => (
                  <Link
                    to={link.path}
                    key={i}
                    className="mb-2 font-normal transition-all duration-300 hover:text-[#191C1F]"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>© 2010 — 2024</p>
            <p>Privacy — Terms</p>
          </div>
        </div>
        <div className="mt-[15px] text-nowrap">
          <p className="mb-[18px] font-medium uppercase">Download App</p>
          <div className="flex flex-col gap-y-3">
            {footerAppStores.map((store, i) => (
              <div
                key={i}
                className="flex h-[70px] w-[176px] cursor-pointer items-center gap-x-4 rounded-[3px] bg-white px-5 py-4 text-[#191C1F] transition-all duration-300 hover:bg-[#191C1F] hover:text-white"
              >
                {store.icon}
                <div className="leading-3">
                  <p className="text-xs">Get it now</p>
                  <p className="text-sm font-semibold">{store.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
