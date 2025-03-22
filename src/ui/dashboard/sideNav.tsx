import { Menu } from "@/constants/constants";
import { SelectMenuIcon } from "@/lib/utilities/common";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaPowerOff } from "react-icons/fa6";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";

const SideNav = () => {
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();
  const currentRoute = usePathname();

  const toggleMenu = (menuName: string): void => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <ul className="menu menu-lg flex-nowrap bg-base-300 rounded-box md:w-60 h-full shadow p-3 overflow-auto">
      <Image src={"/images/gkm_icon.png"} alt="Gema Karya Makmur" width={500} height={500} />
      {Menu.map((value, index) => (
        <li key={index} className="my-2">
          {value.children ? (
            <>
              <button
                className="flex items-center justify-between w-full p-2 btn btn-ghost"
                onClick={() => toggleMenu(value.name)}
              >
                <div className="flex items-center gap-2">
                  {SelectMenuIcon(value.name)}
                  <span className="hidden md:block">{value.name}</span>
                </div>
                {openMenus[value.name] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openMenus[value.name] && (
                <ul className="mt-2 border-l border-gray-600">
                  {value.children.map((child, idx) => (
                    <li key={idx}>
                      <Link
                        href={child.path}
                        className={`flex items-center gap-2 justify-start p-2 mt-2 btn ${
                          currentRoute.includes(child.path) ? "btn-primary" : "btn-ghost"
                        }`}
                      >
                        <span className="hidden md:block">{child.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <Link
              href={value.path}
              className={`flex items-center gap-2 justify-start p-2 btn ${
                (currentRoute.includes(value.path) && value.path !== "/dashboard") || value.path == currentRoute ? "btn-primary" : "btn-ghost"
              }`}
            >
              {SelectMenuIcon(value.name)}
              <span className="hidden md:block">{value.name}</span>
            </Link>
          )}
        </li>
      ))}
      <li>
        <button
          className="btn btn-neutral my-2"
          onClick={() => {
            setIsLoadingButton(true);
            localStorage.removeItem("gemakaryamakmur_token");
            router.push("/login");
          }}
        >
          <FaPowerOff />
          <span className="hidden md:block">{isLoadingButton ? "Logout....." : "Logout"}</span>
        </button>
      </li>
    </ul>
  );
};

export default SideNav;
