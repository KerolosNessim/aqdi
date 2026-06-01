'use client'
import logo from "@/public/images/logo.svg";
import Image from "next/image";
import { useState } from "react";

import { useLogout } from "@/src/hooks/useLogout";
import { usePermissions } from "@/src/hooks/usePermissions";
import { SIDEBAR_NAV } from "@/src/lib/permissions";
import { Box, Loader2, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSolidFolder, BiSolidFolderMinus } from "react-icons/bi";
import { FaEnvelopeOpen } from "react-icons/fa6";
import { HiMiniArrowPathRoundedSquare, HiUsers } from "react-icons/hi2";
import { LuLogOut } from "react-icons/lu";
import { RiMoneyDollarCircleFill, RiPentagonFill } from "react-icons/ri";
import { TbClipboardListFilled } from "react-icons/tb";
import { useSidebarStore } from "@/src/stores/sidebar-store";
import NotificationList from "../notifiction/notification-list";
import CommentList from "../comment/comment-list";

const NAV_ICONS = {
  '/home/analysis': RiPentagonFill,
  '/home/orders': Box,
  '/home/completed-orders': RiPentagonFill,
  '/home/incolpleted-orders-analysis/total': RiPentagonFill,
  '/home/completed-whatsapp': BiSolidFolder,
  '/home/incompleted-whatsapp': BiSolidFolderMinus,
  '/home/return-orders': HiMiniArrowPathRoundedSquare,
  '/home/sorting-orders': FaEnvelopeOpen,
  '/home/roles': TbClipboardListFilled,
  '/home/employees': HiUsers,
  '/home/salaries': RiMoneyDollarCircleFill,
  '/home/settings': Settings,
};

function NavLink({ item, pathname }) {
  const Icon = NAV_ICONS[item.href] ?? RiPentagonFill;
  const isActive =
    pathname === item.href ||
    (item.href !== '/home' && pathname.startsWith(`${item.href}/`));

  return (
    <Link
      href={item.href}
      className={`${isActive ? 'active hover:bg-[var(--main-hover)] hover:text-white' : ''} bg-white h-12 rounded-[24px] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105 text-[#424242]`}
    >
      <span>{item.label}</span>
      <Icon size={16} className="size-4 shrink-0" />
    </Link>
  );
}

export default function SideData() {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const { logout, logoutLoading } = useLogout();
  const { displayedPart } = useSidebarStore();
  const { can, isReady } = usePermissions();

  const visibleNav = SIDEBAR_NAV.map((group) => ({
    ...group,
    items: group.items.filter((item) => !isReady || can(item.section, 'view')),
  })).filter((group) => group.items.length > 0);

  return (
    <div className={`w-[309px] shrink-0 h-screen overflow-y-auto no-scrollbar bg-[#F5F5F5] border-e border-[#e9e9e9] p-[45px_35px] relative transition-all duration-300 max-[1700px]:p-[30px_10px_10px] ${displayedPart !== "default" ? "max-[1700px]:w-[345px]" : "max-[1700px]:w-[245px]"} max-[1700px]:w-[245px] max-[1200px]:absolute max-[1200px]:inset-s-0 max-[1200px]:inset-y-0 max-[1200px]:z-[100] ${active ? 'max-[1200px]:translate-x-0' : 'max-[1200px]:translate-x-full'}`} id="side-data">
      {displayedPart == "default" && <>

        <div className="absolute top-[80px] inset-inline-end-[-30px] cursor-pointer items-center justify-center w-[30px] h-[30px] rounded-s-[4px] bg-[#F5F5F5] hidden max-[1200px]:flex hover:bg-[#ddd] hover:text-white transition-all hover:scale-105 border border-transparent hover:border-brand-main" onClick={() => { setActive(!active) }}>
          <i className={`fa-solid ${active ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </div>
        <div className="flex items-center gap-2.5 mb-[25px] max-[1700px]:mb-5">
          <Link href="/home"><Image src={logo} alt="Aakdi" width={52} height={52} className="w-[52px] h-[52px] rounded-full bg-white border border-black/10 flex items-center justify-center transition-all hover:bg-[#ddd] hover:text-white hover:scale-105 hover:border-brand-main p-3 object-contain" /></Link>
          <div>
            <h2 className="font-semibold text-[14px] text-black mb-[7px] max-[1700px]:text-[13px]">عقــدي لتقنيـــات العقــاريـة</h2>
            <h5 className="text-[12px] text-[#686868] font-normal">داشبـــورد</h5>
          </div>
        </div>

        {visibleNav.map((group) => (
          <div key={group.group} className="mb-5 max-[1700px]:mb-2.5">
            <h3 className="text-[#686868] text-[12px] font-normal mb-2.5">{group.group}</h3>
            <div className="flex flex-col gap-[5px]">
              {group.items.map((item) => (
                <NavLink key={item.href} item={item} pathname={pathname} />
              ))}
            </div>
          </div>
        ))}

        <div className="mb-5 max-[1700px]:mb-2.5">
          <div className="flex flex-col gap-[5px]">
            <div onClick={() => logout()} disabled={logoutLoading} className="bg-white h-12 rounded-[24px] text-[#424242] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105 cursor-pointer"><span>تسجيل الخـــروج</span>{logoutLoading ? <Loader2 className="animate-spin" /> : <LuLogOut />}</div>
          </div>
        </div>
      </>}

      {displayedPart == "notification" && <>
        <NotificationList />
      </>}

      {displayedPart == "comment" && <CommentList />}
    </div>
  );
}
