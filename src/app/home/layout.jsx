import SideData from '@/components/home/SideData';
import React from 'react'

export default function Profile({ children }) {

    return (
            <div className="flex relative">
                <SideData />
                <div className="w-full p-[45px] h-screen overflow-y-auto transition-all max-[1700px]:p-[30px]">
                    {children}
                </div>
            </div>
    )
}
