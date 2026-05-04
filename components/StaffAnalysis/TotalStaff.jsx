import React from 'react'
import Header from '../home/Header'
import greenRial from '@/public/images/greenRial.svg'
import Image from 'next/image'
import waIcon from '@/public/images/waIcon.svg'
import Link from 'next/link'
import defaultUser from '@/public/images/defaultUser.jpg'
import userIcon from '@/public/images/user.svg'

export default function TotalStaff() {

    const tableHeaders = [
        "الصورة الشخصية",
        "الاسم",
        "الراتب الأساسي",
        "رقم الهاتف",
        "البريد الإلكتروني",
        "الاجـــراءات"
    ];

    const staffData = [
        {
            id: 1,
            image: defaultUser,
            name: "المسؤول",
            salary: "9999",
            phone: "01068389295",
            email: "employee@gmail.com",
            avatarColor: "#E91E63" // Pink
        },
        {
            id: 2,
            image: defaultUser,
            name: "المسؤول",
            salary: "9999",
            phone: "01068389295",
            email: "employee@gmail.com",
            avatarColor: "#FFC107" // Yellow
        },
        {
            id: 3,
            image: defaultUser,
            name: "المسؤول",
            salary: "9999",
            phone: "01068389295",
            email: "employee@gmail.com",
            avatarColor: "#FF5722" // Orange
        },
        {
            id: 4,
            image: defaultUser,
            name: "المسؤول",
            salary: "9999",
            phone: "01068389295",
            email: "employee@gmail.com",
            avatarColor: null // Real photo
        },
        {
            id: 5,
            image: defaultUser,
            name: "المسؤول",
            salary: "9999",
            phone: "01068389295",
            email: "employee@gmail.com",
            avatarColor: "#00BCD4" // Cyan
        },
        {
            id: 6,
            image: defaultUser,
            name: "المسؤول",
            salary: "9999",
            phone: "01068389295",
            email: "employee@gmail.com",
            avatarColor: null // Real photo
        },
        {
            id: 7,
            image: defaultUser,
            name: "المسؤول",
            salary: "9999",
            phone: "01068389295",
            email: "employee@gmail.com",
            avatarColor: null // Real photo
        },
        {
            id: 8,
            image: defaultUser,
            name: "المسؤول",
            salary: "9999",
            phone: "01068389295",
            email: "employee@gmail.com",
            avatarColor: "#00BCD4" // Cyan
        },
        {
            id: 9,
            image: defaultUser,
            name: "المسؤول",
            salary: "9999",
            phone: "01068389295",
            email: "employee@gmail.com",
            avatarColor: "#424242" // Dark gray
        },
        {
            id: 10,
            image: defaultUser,
            name: "المسؤول",
            salary: "9999",
            phone: "01068389295",
            email: "employee@gmail.com",
            avatarColor: "#9C27B0" // Purple
        }
    ];

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen" dir="rtl">
            <Header
                page='welcome'
                title={"عدد الموضفين"}
                isMain={false}
                first="الرئيــسية"
                firstURL="/"
                second='التحليــلات'
                secondURL="/home/analysis"
                third="عدد الموضفين"
                thirdURL={`/home/staff-analysis/total`}
            />
            
            <div className="w-full overflow-x-auto bg-white rounded-[24px] border border-[#E4E4E4] mt-4 shadow-sm">
                <table className="w-full border-collapse">
                    <thead className="bg-[#FAFAFA]">
                        <tr>
                            {tableHeaders.map((header, index) => (
                                <th key={index} className="text-right p-[15px_20px] text-[#A3A3A3] text-[13px] font-medium border-b border-[#E4E4E4] whitespace-nowrap">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {staffData.map((staff) => (
                            <tr key={staff.id} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#fafafa] transition-all">
                                <td className="p-[15px_20px]">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-[#eee]"
                                         style={staff.avatarColor ? { backgroundColor: staff.avatarColor } : {}}>
                                        <Image
                                            src={staff.avatarColor ? userIcon : staff.image}
                                            alt={staff.name}
                                            width={40}
                                            height={40}
                                            className={staff.avatarColor ? "w-5 h-5 invert brightness-0" : "w-full h-full object-cover"}
                                        />
                                    </div>
                                </td>
                                <td className="p-[15px_20px] text-black text-[13px] font-medium">
                                    <div className="bg-[#F9F9F9] px-3 py-1 rounded-full border border-[#eee] inline-block">
                                        {staff.name}
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-1.5 text-[#007C13] font-bold text-[14px]">
                                        <span>{staff.salary}</span>
                                        <Image src={greenRial} alt="rial" width={16} height={16} />
                                    </div>
                                </td>
                                <td className="p-[15px_20px] text-black text-[13px]">{staff.phone}</td>
                                <td className="p-[15px_20px] text-[#616161] text-[13px]">{staff.email}</td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2">
                                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#4D4D4D] hover:bg-brand-main hover:text-white transition-all text-[12px] border border-[#eee] hover:border-brand-main">
                                            👁️
                                        </button>
                                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-all border border-[#FFE6E6]">
                                            <i className="fa-solid fa-ban text-[12px]"></i>
                                        </button>
                                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-brand-main hover:bg-brand-main hover:text-white transition-all border border-brand-main/20">
                                            <i className="fa-regular fa-pen-to-square text-[12px]"></i>
                                        </button>
                                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-all border border-[#FFE6E6]">
                                            <i className="fa-regular fa-trash-can text-[12px]"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-center gap-2.5 mt-4">
                <button className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-brand-main hover:text-white transition-all">
                    <i className="fa-solid fa-chevron-right text-[12px]"></i>
                </button>
                <button className="w-9 h-9 rounded-full bg-brand-main text-white flex items-center justify-center text-[13px] font-medium shadow-lg shadow-brand-main/20">1</button>
                <button className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-[#f5f5f5] transition-all text-[13px]">2</button>
                <span className="text-[#A3A3A3]">...</span>
                <button className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-[#f5f5f5] transition-all text-[13px]">40</button>
                <button className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-brand-main hover:text-white transition-all">
                    <i className="fa-solid fa-chevron-left text-[12px]"></i>
                </button>
            </div>
        </div>
    );
}