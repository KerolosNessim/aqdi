'use client';
import React from 'react'
import mainPagesHeaderIcon from '@/public/images/mainPagesHeaderIcon.svg'
import messegeIcon from '@/public/images/messegeIcon.svg'
import notificationIcon from '@/public/images/notificationIcon.svg'
import defaultUser from '@/public/images/defaultUser.jpg'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/src/stores/user-store'
import { useSidebarStore } from '@/src/stores/sidebar-store'

export default function Header({orderId, isSingleOrder, page, title, isMain, first, firstURL, second, third, thirdURL, secondURL }) {
    const router = useRouter();
    const { user } = useUserStore();
    const { setDisplayedPart, displayedPart, setOrderId } = useSidebarStore();
    return (
        <div className="flex items-center justify-between mb-7 max-w-[calc(100vw-305px)] max-[1200px]:max-w-[calc(100vw-60px)]">
            <div className="flex items-center gap-2.5">
                {
                    isMain ?
                        <div className="w-[52px] h-[52px] rounded-full bg-brand-hover transition-all duration-300 flex items-center justify-center hover:bg-brand-main hover:scale-105">
                            <Image src={mainPagesHeaderIcon} alt="Aakdi" className="w-4 h-auto object-contain" />
                        </div> :
                        <button className="w-[52px] h-[52px] rounded-full bg-[#F3F3F3] transition-all duration-300 flex items-center justify-center hover:bg-[#eee] hover:scale-105" onClick={() => { router.back() }}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                }
                <div className="max-[992px]:hidden">
                    {
                        title ?
                            <h2 className="text-lg font-bold text-black mb-1.5">{title}</h2>
                            : null
                    }
                    <div className="flex items-center gap-2.5">
                        {
                            first ?
                                <Link href={firstURL} className="text-[14px] text-[#424242] transition-all hover:text-brand-main">{first}</Link>
                                : null
                        }
                        {
                            second ?
                                <>
                                    <i className="fa-solid fa-chevron-left text-[14px] text-[#424242]"></i>
                                    <Link href={secondURL} className="text-[14px] text-[#424242] transition-all hover:text-brand-main">{second}</Link>
                                </>
                                : null
                        }
                        {
                            third ?
                                <>
                                    <i className="fa-solid fa-chevron-left text-[14px] text-[#424242]"></i>
                                    <Link href={thirdURL} className="text-[14px] text-[#424242] transition-all hover:text-brand-main">{third}</Link>
                                </>
                                : null
                        }
                    </div>

                </div>
            </div>
            <div className="flex items-center gap-2.5">
                {
                    isSingleOrder ?
                        <button onClick={() => {
                            setOrderId(orderId);
                            if (displayedPart === "comment") {
                                setDisplayedPart("default");
                            } else {
                                setDisplayedPart("comment");
                            }
                        }} className={` ${displayedPart === "comment" ? "bg-brand-main" : " bg-[#F3F3F3]"} w-[52px] h-[52px] rounded-full transition-all duration-300 flex items-center justify-center hover:bg-[#eee] hover:scale-105`}><Image src={messegeIcon} alt="Aakdi" className="w-[20px] h-auto object-contain" /></button>
                        :
                        null
                }
                <button onClick={() => {
                    if (displayedPart === "notification") {
                        setDisplayedPart("default");
                    } else {
                        setDisplayedPart("notification");
                    }
                }} className={` ${displayedPart === "notification" ? "bg-brand-main" : " bg-[#F3F3F3]"} w-[52px] h-[52px] rounded-full transition-all duration-300 flex items-center justify-center hover:bg-[#eee] hover:scale-105`}><Image src={notificationIcon} alt="Aakdi" className="w-[20px] h-auto object-contain" /></button>
                <div className="h-[52px] bg-[#F3F3F3] rounded-[26px] flex items-center gap-2.5 p-[6px_10px] transition-all duration-300 hover:bg-[#eee] hover:scale-105 max-[992px]:w-[52px] max-[992px]:p-0 justify-center">
                    <Image src={user?.profile_image || defaultUser} alt="Aakdi" className="w-[39px] h-[39px] object-cover rounded-full overflow-hidden max-[992px]:w-full max-[992px]:h-full" />
                    <div className="max-[992px]:hidden">
                        <h3 className="text-[12px] font-medium text-black">{user?.name}</h3>
                        <span className="text-[10px] font-normal text-[#4D4D4D]">{user?.role_relation?.name}</span>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-[52px] h-[52px] rounded-full !bg-black !text-white border-none shadow-none hover:!bg-[#424242] transition-all duration-300 flex items-center justify-center hover:scale-105">
                            <i className="fa-solid fa-chevron-down"></i>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Keyboard shortcuts
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
