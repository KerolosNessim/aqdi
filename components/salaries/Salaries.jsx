'use client'
import React, { useState } from 'react'
import Header from '@/components/home/Header'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from 'next/link'
import greenRial from '@/public/images/greenRial.svg'
import Image from 'next/image'
import AddNewEmployeeDialog from '../employees/add-employee-dialog'

export default function Salaries() {
    const employees = [
        {
            id: 1,
            name: 'الموظف',
            salary: '99,99',
            phone: '010483892195',
            email: 'employee@gmail.com',
            avatar: { color: '#E91E8C', icon: 'fa-user' },
            permissions: [
                { icon: 'fa-trash', color: '#FEE2E2', iconColor: '#EF4444' },
                { icon: 'fa-whatsapp', color: '#D1FAE5', iconColor: '#10B981' },
                { icon: 'fa-phone', color: '#F3F4F6', iconColor: '#6B7280' },
                { icon: 'fa-eye', color: '#E0E7FF', iconColor: '#6366F1' }
            ]
        },
        {
            id: 2,
            name: 'الموظف',
            salary: '99,99',
            phone: '010483892195',
            email: 'employee@gmail.com',
            avatar: { color: '#EAB308', icon: 'fa-user' },
            permissions: [
                { icon: 'fa-trash', color: '#FEE2E2', iconColor: '#EF4444' },
                { icon: 'fa-whatsapp', color: '#D1FAE5', iconColor: '#10B981' },
                { icon: 'fa-phone', color: '#F3F4F6', iconColor: '#6B7280' },
                { icon: 'fa-eye', color: '#E0E7FF', iconColor: '#6366F1' }
            ]
        },
        {
            id: 3,
            name: 'الموظف',
            salary: '99,99',
            phone: '010483892195',
            email: 'employee@gmail.com',
            avatar: { color: '#F97316', icon: 'fa-user' },
            permissions: [
                { icon: 'fa-trash', color: '#FEE2E2', iconColor: '#EF4444' },
                { icon: 'fa-whatsapp', color: '#D1FAE5', iconColor: '#10B981' },
                { icon: 'fa-phone', color: '#F3F4F6', iconColor: '#6B7280' },
                { icon: 'fa-eye', color: '#E0E7FF', iconColor: '#6366F1' }
            ]
        },
        {
            id: 4,
            name: 'الموظف',
            salary: '99,99',
            phone: '010483892195',
            email: 'employee@gmail.com',
            avatar: { color: '#10B981', icon: 'fa-user' },
            permissions: [
                { icon: 'fa-trash', color: '#FEE2E2', iconColor: '#EF4444' },
                { icon: 'fa-whatsapp', color: '#D1FAE5', iconColor: '#10B981' },
                { icon: 'fa-phone', color: '#F3F4F6', iconColor: '#6B7280' },
                { icon: 'fa-eye', color: '#E0E7FF', iconColor: '#6366F1' }
            ]
        },
        {
            id: 5,
            name: 'الموظف',
            salary: '99,99',
            phone: '010483892195',
            email: 'employee@gmail.com',
            avatar: { color: '#06B6D4', icon: 'fa-user' },
            permissions: [
                { icon: 'fa-trash', color: '#FEE2E2', iconColor: '#EF4444' },
                { icon: 'fa-whatsapp', color: '#D1FAE5', iconColor: '#10B981' },
                { icon: 'fa-phone', color: '#F3F4F6', iconColor: '#6B7280' },
                { icon: 'fa-eye', color: '#E0E7FF', iconColor: '#6366F1' }
            ]
        },
        {
            id: 6,
            name: 'الموظف',
            salary: '99,99',
            phone: '010483892195',
            email: 'employee@gmail.com',
            avatar: { color: '#06B6D4', icon: 'fa-user' },
            permissions: [
                { icon: 'fa-trash', color: '#FEE2E2', iconColor: '#EF4444' },
                { icon: 'fa-whatsapp', color: '#D1FAE5', iconColor: '#10B981' },
                { icon: 'fa-phone', color: '#F3F4F6', iconColor: '#6B7280' },
                { icon: 'fa-eye', color: '#E0E7FF', iconColor: '#6366F1' }
            ]
        }
    ];

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen" dir="rtl">
            <Header
                page='welcome'
                title={"رواتـــب الموظفيــــن"}
                isMain={false}
                first="الرئيــسية"
                firstURL="/"
                second="الموظف والأدوار"
                secondURL="/home/employees"
                third="رواتـــب الموظفيــــن"
                thirdURL="/home/salaries"
            />

            <div className="flex flex-col gap-6 bg-white rounded-[24px] border border-[#E4E4E4] p-6 mt-4 shadow-sm relative z-10">
                <div className="flex items-center justify-between pb-6 border-b border-[#F5F5F5]">
                    <h2 className="text-[18px] font-black text-black">قائمة الموظفيـن</h2>
                    <AddNewEmployeeDialog/>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#FAFAFA]">
                                <th className="text-center p-[15px_20px] text-[#A3A3A3] text-[13px] font-medium border-b border-[#E4E4E4] whitespace-nowrap rounded-r-[12px]">البروفايل</th>
                                <th className="text-right p-[15px_20px] text-[#A3A3A3] text-[13px] font-medium border-b border-[#E4E4E4] whitespace-nowrap">الإسم</th>
                                <th className="text-right p-[15px_20px] text-[#A3A3A3] text-[13px] font-medium border-b border-[#E4E4E4] whitespace-nowrap">الراتب الرئيسي</th>
                                <th className="text-right p-[15px_20px] text-[#A3A3A3] text-[13px] font-medium border-b border-[#E4E4E4] whitespace-nowrap">رقم الجوال</th>
                                <th className="text-right p-[15px_20px] text-[#A3A3A3] text-[13px] font-medium border-b border-[#E4E4E4] whitespace-nowrap">البريد الإلكتروني</th>
                                <th className="text-center p-[15px_20px] text-[#A3A3A3] text-[13px] font-medium border-b border-[#E4E4E4] whitespace-nowrap rounded-l-[12px]">الصـــلاحيات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F5F5F5]">
                            {employees.map((employee) => (
                                <tr key={employee.id} className="hover:bg-[#fafafa] transition-all">
                                    <td className="p-[15px_20px]">
                                        <div className="flex justify-center">
                                            <div 
                                                className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-white shadow-md relative overflow-hidden"
                                                style={{ backgroundColor: employee.avatar.color }}
                                            >
                                                <div className="absolute inset-0 bg-black/5"></div>
                                                <i className={`fa-solid ${employee.avatar.icon} text-white text-lg relative z-10`}></i>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-[15px_20px]">
                                        <div className="flex items-center gap-2">
                                            <span className="px-4 py-1.5 bg-black text-white rounded-full font-bold text-[13px] shadow-sm">
                                                {employee.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-[15px_20px]">
                                        <div className="flex items-center gap-1.5 text-[#007C13] font-bold text-[15px]">
                                            <span>{employee.salary}</span>
                                            <Image src={greenRial} alt="rial" width={16} height={16} />
                                        </div>
                                    </td>
                                    <td className="p-[15px_20px]">
                                        <span className="text-[14px] text-[#4D4D4D] font-medium" dir="ltr">{employee.phone}</span>
                                    </td>
                                    <td className="p-[15px_20px]">
                                        <span className="text-[14px] text-[#737373]">{employee.email}</span>
                                    </td>
                                    <td className="p-[15px_20px]">
                                        <div className="flex items-center justify-center gap-2">
                                            {employee.permissions.map((perm, index) => (
                                                <button
                                                    key={index}
                                                    className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
                                                    style={{ backgroundColor: perm.color }}
                                                >
                                                    <i 
                                                        className={`fa-solid ${perm.icon} text-[13px]`}
                                                        style={{ color: perm.iconColor }}
                                                    ></i>
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-center gap-2.5 mt-8 pt-6 border-t border-[#F5F5F5]">
                    <button className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-brand-main hover:text-white transition-all">
                        <i className="fa-solid fa-chevron-right text-[12px]"></i>
                    </button>
                    <button className="w-9 h-9 rounded-full bg-brand-main text-white flex items-center justify-center text-[13px] font-black shadow-lg shadow-brand-main/20">1</button>
                    <button className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-[#f5f5f5] transition-all text-[13px] font-bold">2</button>
                    <span className="text-[#A3A3A3] px-2 font-bold">...</span>
                    <button className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-[#f5f5f5] transition-all text-[13px] font-bold">40</button>
                    <button className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-brand-main hover:text-white transition-all">
                        <i className="fa-solid fa-chevron-left text-[12px]"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}