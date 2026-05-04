'use client'
import logo from "@/public/images/logo.svg";
import Image from "next/image";
import { useState } from "react";

import { useLogout } from "@/src/hooks/useLogout";
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
import CommentForm from "../comment/comment-form";

export default function SideData() {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const { logout, logoutLoading } = useLogout();
  const { displayedPart } = useSidebarStore()
  return (
    <div className={`w-[309px] shrink-0 h-screen overflow-y-auto no-scrollbar bg-[#F5F5F5] border-e border-[#e9e9e9] p-[45px_35px] relative transition-all duration-300 max-[1700px]:p-[30px_10px_10px] ${displayedPart !== "default" ? "max-[1700px]:w-[345px]" : "max-[1700px]:w-[245px]"} max-[1700px]:w-[245px] max-[1200px]:absolute max-[1200px]:inset-s-0 max-[1200px]:inset-y-0 max-[1200px]:z-[100] ${active ? 'max-[1200px]:translate-x-0' : 'max-[1200px]:translate-x-full'}`} id="side-data">
      {displayedPart == "default" && <>

        <div className="absolute top-[80px] inset-inline-end-[-30px] cursor-pointer items-center justify-center w-[30px] h-[30px] rounded-s-[4px] bg-[#F5F5F5] hidden max-[1200px]:flex hover:bg-[#ddd] hover:text-white transition-all hover:scale-105 border border-transparent hover:border-brand-main" onClick={() => { setActive(!active) }}>
          <i className={`fa-solid ${active ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </div>
        <div className="flex items-center gap-2.5 mb-[25px] max-[1700px]:mb-5">
          <Link href="/home"><Image src={logo} alt="Aakdi" className="w-[52px] h-[52px] rounded-full bg-white border border-black/10 flex items-center justify-center transition-all hover:bg-[#ddd] hover:text-white hover:scale-105 hover:border-brand-main p-3 object-contain" /></Link>
          <div>
            <h2 className="font-semibold text-[14px] text-black mb-[7px] max-[1700px]:text-[13px]">عقــدي لتقنيـــات العقــاريـة</h2>
            <h5 className="text-[12px] text-[#686868] font-normal">داشبـــورد</h5>
          </div>
        </div>
        <div className="mb-5 max-[1700px]:mb-2.5">
          <h3 className="text-[#686868] text-[12px] font-normal mb-2.5">الرئيســية </h3>
          <div className="flex flex-col gap-[5px]">
            <Link href="/home/analysis" className={` ${pathname === '/home/analysis' && "active hover:bg-[var(--main-hover)] hover:text-white"} bg-white h-12 rounded-[24px] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105`}><span>التحليــلات</span><RiPentagonFill />
            </Link>
          </div>
        </div>
        <div className="mb-5 max-[1700px]:mb-2.5">
          <h3 className="text-[#686868] text-[12px] font-normal mb-2.5">العقــود </h3>
          <div className="flex flex-col gap-[5px]">
            <Link href="/home/orders" className={` ${pathname === '/home/orders' && "active hover:bg-[var(--main-hover)] hover:text-white"} bg-white h-12 rounded-[24px] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105`}><span>جميع الطلبات</span><Box size={16} /></Link>
            <Link href="/home/completed-orders" className={` ${pathname === '/home/completed-orders' && "active hover:bg-[var(--main-hover)] hover:text-white"} bg-white h-12 rounded-[24px] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105`}><span>طلـب مكتمـــل</span><RiPentagonFill /></Link>
            <Link href="/home/incolpleted-orders-analysis/total" className={` ${pathname === '/home/incolpleted-orders-analysis/total' && "active hover:bg-[var(--main-hover)] hover:text-white"} bg-white h-12 rounded-[24px] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105`}><span>طلـب غيــر مكتمل</span><RiPentagonFill /></Link>
            <Link href="/home/completed-whatsapp" className={` ${pathname === '/home/completed-whatsapp' && "active hover:bg-[var(--main-hover)] hover:text-white"} bg-white h-12 rounded-[24px] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105`}><span>طلـب واتســـاب مكتمـــل </span><BiSolidFolder /></Link>
            <Link href="/home/incompleted-whatsapp" className={` ${pathname === '/home/incompleted-whatsapp' && "active hover:bg-[var(--main-hover)] hover:text-white"} bg-white h-12 rounded-[24px] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105`}><span>طلـب واتسـاب  غير مكتمل</span><BiSolidFolderMinus /></Link>
            <Link href="/home/orders-analysis/refunded_orders" className={` ${pathname === '/home/orders-analysis/refunded_orders' && "active hover:bg-[var(--main-hover)] hover:text-white"} bg-white h-12 rounded-[24px] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105`}><span>طلـب مستــرجع</span><HiMiniArrowPathRoundedSquare /></Link>
            <Link href="/home/sorting-orders" className={` ${pathname === '/home/sorting-orders' && "active hover:bg-[var(--main-hover)] hover:text-white"} bg-white h-12 rounded-[24px] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105`}><span>تصنيــف الطلبـــــات</span><FaEnvelopeOpen /></Link>
          </div>
        </div>
        <div className="mb-5 max-[1700px]:mb-2.5">
          <h3 className="text-[#686868] text-[12px] font-normal mb-2.5">الموظفيــن والأدوار </h3>
          <div className="flex flex-col gap-[5px]">
            <Link href="/home/roles" className={`${pathname === '/home/roles' && "active hover:bg-[var(--main-hover)] hover:text-white"} bg-white h-12 rounded-[24px] text-[#424242] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105`}><span>الأدوار</span><TbClipboardListFilled /></Link>
            <Link href="/home/employees" className={`${pathname === '/home/employees' && "active hover:bg-[var(--main-hover)] hover:text-white"} bg-white h-12 rounded-[24px] text-[#424242] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105`}><span>الموظفيــن</span><HiUsers /></Link>
            <Link href="/home/salaries" className={`${pathname === '/home/salaries' && "active hover:bg-[var(--main-hover)] hover:text-white"} bg-white h-12 rounded-[24px] text-[#424242] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105`}><span>رواتــب الموظفيــن</span><RiMoneyDollarCircleFill />
            </Link>
          </div>
        </div>
        <div className="mb-5 max-[1700px]:mb-2.5">
          <h3 className="text-[#686868] text-[12px] font-normal mb-2.5">إعــدادت النظام</h3>
          <div className="flex flex-col gap-[5px]">
            <Link href="/home/settings" className={`${pathname === '/home/settings' && "active hover:bg-[var(--main-hover)] hover:text-white"} bg-white h-12 rounded-[24px] text-[#424242] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105`}><span>الاعــدادات</span><Settings size={16} /></Link>
            <div onClick={() => logout()} disabled={logoutLoading} className={`${pathname === '/home/logout' && "active hover:bg-[var(--main-hover)] hover:text-white"} bg-white h-12 rounded-[24px] text-[#424242] text-[14px] font-normal flex items-center justify-between gap-2.5 px-5 transition-all hover:bg-[#eee] hover:scale-105 cursor-pointer`}><span>تسجيل الخـــروج</span>{logoutLoading ? <Loader2 className="animate-spin" /> : <LuLogOut />}</div >
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
