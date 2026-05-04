'use client'
import React, { useState } from 'react'
import Header from '@/components/home/Header'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from 'next/link'

export default function Roles() {
    const [roles, setRoles] = useState([
        {
            id: 1,
            title: 'المسؤول',
            titleColor: '#000000',
            name: 'ريـان',
            permissions: 410,
            permissionColor: '#E5E5E5',
            permissionTextColor: '#000000',
            lastUpdate: 'أخر تعديل: 15 سبتمبر 2025'
        },
        {
            id: 2,
            title: 'موظفة خدمة العملـاء',
            titleColor: '#E91E8C',
            name: 'نهـال',
            permissions: 12,
            permissionColor: '#FFE5F3',
            permissionTextColor: '#E91E8C',
            lastUpdate: 'أخر تعديل: 15 سبتمبر 2025'
        },
        {
            id: 3,
            title: 'موظف',
            titleColor: '#10B981',
            name: 'مصعب',
            permissions: 4,
            permissionColor: '#D1FAE5',
            permissionTextColor: '#10B981',
            lastUpdate: 'أخر تعديل: 15 سبتمبر 2025'
        }
    ]);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);


    const handleDelete = (id) => {
        const role = roles.find(r => r.id === id);
        setCategoryToDelete(role);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            setRoles(prev => prev.filter(r => r.id !== categoryToDelete.id));
            toast.error('تم حذف الدور');
            setIsDeleteModalOpen(false);
            setCategoryToDelete(null);
        }
    };


    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen" dir="rtl">
            <Header
                page='welcome'
                title={"الادوار"}
                isMain={false}
                first="الرئيــسية"
                firstURL="/"
                second="الادوار"
                secondURL="/home/roles"
            />

            <div className="flex flex-col gap-6 bg-white rounded-[32px] border border-[#F0F0F0] p-8 mt-4 shadow-sm relative z-10">
                <div className="flex items-center justify-between pb-6 border-b border-[#F5F5F5]">
                    <h2 className="text-[20px] font-black text-black">إدارة الأدوار</h2>
                    <Link href="/home/roles/add" className="flex items-center gap-2 px-6 py-3 bg-brand-main text-white rounded-full font-bold text-[14px] hover:bg-brand-main/90 transition-all shadow-lg shadow-brand-main/20">
                        <span>+ إضافة دور جديد</span>
                    </Link>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-4">
                        <thead>
                            <tr className="bg-[#FAFAFA]">
                                <th className="text-right p-4 text-[#A3A3A3] text-[13px] font-bold rounded-r-[16px]">اللقــب</th>
                                <th className="text-right p-4 text-[#A3A3A3] text-[13px] font-bold">الإسم</th>
                                <th className="text-center p-4 text-[#A3A3A3] text-[13px] font-bold">الصلاحيات</th>
                                <th className="text-right p-4 text-[#A3A3A3] text-[13px] font-bold">تاريخ التحديث</th>
                                <th className="text-center p-4 text-[#A3A3A3] text-[13px] font-bold rounded-l-[16px]">الاجـــراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => (
                                <tr key={role.id} className="group hover:bg-[#FAFAFA] transition-all">
                                    <td className="p-4 bg-white group-hover:bg-[#FAFAFA] border-y border-r border-[#F0F0F0] first:rounded-r-[20px]">
                                        <span
                                            className="px-4 py-1.5 rounded-full text-white font-bold text-[12px] shadow-sm whitespace-nowrap"
                                            style={{ backgroundColor: role.titleColor }}
                                        >
                                            {role.title}
                                        </span>
                                    </td>
                                    <td className="p-4 bg-white group-hover:bg-[#FAFAFA] border-y border-[#F0F0F0]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                                                <i className="fa-solid fa-user-tie text-[#737373]"></i>
                                            </div>
                                            <span className="text-[15px] font-bold text-black">{role.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 bg-white group-hover:bg-[#FAFAFA] border-y border-[#F0F0F0]">
                                        <div className="flex justify-center">
                                            <span
                                                className="w-14 h-14 flex items-center justify-center rounded-full font-black text-[20px] shadow-inner"
                                                style={{
                                                    backgroundColor: role.permissionColor,
                                                    color: role.permissionTextColor
                                                }}
                                            >
                                                {role.permissions}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 bg-white group-hover:bg-[#FAFAFA] border-y border-[#F0F0F0]">
                                        <span className="text-[13px] text-[#A3A3A3] font-medium">{role.lastUpdate}</span>
                                    </td>
                                    <td className="p-4 bg-white group-hover:bg-[#FAFAFA] border-y border-l border-[#F0F0F0] last:rounded-l-[20px]">
                                        <div className="flex items-center justify-center gap-3">
                                            <Link href={"/home/roles/edit"}
                                                className="w-10 h-10 rounded-full bg-[#E6FFE6] text-[#10B981] flex justify-center items-center hover:bg-[#10B981] hover:text-white transition-all shadow-sm"
                                            >
                                                <i className="fa-solid fa-pen-to-square text-[14px]"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(role.id)}
                                                className="w-10 h-10 rounded-full bg-[#FFEBEB] text-[#FF4D4F] flex justify-center items-center hover:bg-[#FF4D4F] hover:text-white transition-all shadow-sm"
                                            >
                                                <i className="fa-solid fa-trash text-[14px]"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-center gap-2.5 mt-6 pt-6 border-t border-[#F5F5F5]">
                    <button className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-brand-main hover:text-white transition-all">
                        <i className="fa-solid fa-chevron-right text-[12px]"></i>
                    </button>
                    <button className="w-9 h-9 rounded-full bg-brand-main text-white flex items-center justify-center text-[13px] font-black shadow-lg shadow-brand-main/20">1</button>
                    <button className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-[#f5f5f5] transition-all text-[13px] font-bold">2</button>
                    <span className="text-[#A3A3A3] px-1">...</span>
                    <button className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-[#f5f5f5] transition-all text-[13px] font-bold">40</button>
                    <button className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-brand-main hover:text-white transition-all">
                        <i className="fa-solid fa-chevron-left text-[12px]"></i>
                    </button>
                </div>
            </div>

            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-[32px] border-0" dir="rtl">
                    {categoryToDelete && (
                        <div className="p-8 flex flex-col items-center text-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-[#FFEBEB] text-[#FF4D4F] flex items-center justify-center shadow-inner mt-4">
                                <i className="fa-solid fa-trash text-[40px]"></i>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-[22px] font-black text-black">
                                    هل أنت متأكد من حذف الدور؟
                                </h3>
                                <p className="text-[18px] font-bold text-[#FF4D4F] bg-[#FFEBEB] px-4 py-1.5 rounded-full inline-block mx-auto">
                                    {categoryToDelete.name}
                                </p>
                            </div>

                            <p className="text-[15px] font-medium text-[#737373]">
                                هذا الإجراء لا يمكن التراجع عنه بعد الحذف! سيتم فقدان كافة الصلاحيات المرتبطة بهذا الدور.
                            </p>

                            <div className="flex items-center gap-4 w-full mt-2">
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 h-[54px] bg-[#FF4D4F] text-white rounded-[16px] font-bold text-[16px] hover:bg-[#E03E3E] transition-all shadow-lg shadow-[#FF4D4F]/25"
                                >
                                    تأكيـد الحـذف
                                </button>
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="flex-1 h-[54px] bg-[#F5F5F5] text-[#737373] rounded-[16px] font-bold text-[16px] hover:bg-[#EEEEEE] transition-all"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}