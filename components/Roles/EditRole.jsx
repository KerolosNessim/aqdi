'use client'
import React, { useState } from 'react'
import Header from '@/components/home/Header'
import { toast } from 'sonner'
import { Switch } from "@/components/ui/switch"
import Link from 'next/link'

export default function EditRole() {
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        titleColor: '#0000FF'
    });

    const [selectAll, setSelectAll] = useState(false);

    const [permissions, setPermissions] = useState({
        analytics: { show: false, add: false, edit: false, retrieve: false, delete: false },
        allOrders: { show: false, add: false, edit: false, retrieve: false, delete: false },
        completedOrder: { show: false, add: false, edit: false, retrieve: false, delete: false },
        incompleteWhatsappOrder: { show: false, add: false, edit: false, retrieve: false, delete: false },
        completedOrderWhatsapp: { show: false, add: false, edit: false, retrieve: false, delete: false }
    });

    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        const allPermissions = {};
        Object.keys(permissions).forEach(key => {
            allPermissions[key] = {
                show: checked,
                add: checked,
                edit: checked,
                retrieve: checked,
                delete: checked
            };
        });
        setPermissions(allPermissions);
    };

    const handlePermissionChange = (category, permission) => {
        setPermissions(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [permission]: !prev[category][permission]
            }
        }));
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.name) {
            toast.error('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        toast.success('تم تعديل الدور بنجاح');
    };

    const PermissionCheckboxes = ({ category, label }) => (
        <div className="bg-[#FAFAFA] border border-[#F0F0F0] rounded-[24px] p-6 hover:shadow-md transition-all">
            <h3 className="text-[16px] font-black text-black mb-5 pb-3 border-b border-[#EEEEEE]">{label}</h3>
            <div className="flex flex-col gap-4">
                {[
                    { key: 'show', label: 'عرض القسم' },
                    { key: 'add', label: 'إضافة' },
                    { key: 'edit', label: 'تعديل' },
                    { key: 'retrieve', label: 'استرجاع' },
                    { key: 'delete', label: 'حذف' },
                ].map((perm) => (
                    <label key={perm.key} className="flex items-center justify-between group cursor-pointer">
                        <span className="text-[14px] font-bold text-[#737373] group-hover:text-black transition-all">{perm.label}</span>
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                checked={permissions[category][perm.key]}
                                onChange={() => handlePermissionChange(category, perm.key)}
                                className="peer appearance-none w-6 h-6 border-2 border-[#E4E4E4] rounded-[6px] checked:bg-brand-main checked:border-brand-main transition-all cursor-pointer"
                            />
                            <i className="fa-solid fa-check absolute left-1 text-white text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></i>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen" dir="rtl">
            <Header
                page='welcome'
                title={"تعديل دور"}
                isMain={false}
                first="الرئيــسية"
                firstURL="/"
                second="الادوار"
                secondURL="/home/roles"
                third="تعديل دور"
                thirdURL="/home/roles/edit"
            />

            <div className="bg-white rounded-[32px] border border-[#F0F0F0] p-8 mt-4 shadow-sm relative z-10" dir="rtl">
                {/* Employee Data Section */}
                <div className="flex flex-col gap-8 pb-8 border-b border-[#F5F5F5]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <h2 className="text-[20px] font-black text-black relative pr-4 before:content-[''] before:absolute before:right-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-6 before:bg-brand-main before:rounded-full">بيـــانات الموظف:</h2>
                        <div className="flex flex-wrap items-center gap-4 bg-[#FAFAFA] p-3 rounded-[18px] border border-[#F0F0F0]">
                            <div className="flex items-center gap-3 px-3">
                                <span className="text-[13px] font-bold text-[#737373]">تفعيل كافة الصلاحيات لهذا الدور</span>
                                <div className="flex items-center gap-2 pr-4 border-r border-[#EEEEEE]">
                                    <Switch
                                        checked={selectAll}
                                        onCheckedChange={handleSelectAll}
                                        dir="ltr"
                                    />
                                    <span className="text-[13px] font-bold text-black whitespace-nowrap">تحديد الكل</span>
                                </div>
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-3 bg-brand-main text-white rounded-full font-bold text-[14px] hover:bg-brand-main/90 transition-all shadow-lg shadow-brand-main/20 min-w-[120px]"
                            >
                                حفظ التعديلات
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px]">
                        {/* Title Input */}
                        <div className="flex flex-col gap-3">
                            <label className="text-[13px] font-bold text-black px-1">
                                اللقب <span className="text-[#FF4D4F] mr-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="مشـرف العقــود"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full h-[54px] bg-[#F9F9F9] border border-[#EEEEEE] rounded-[16px] px-5 text-[15px] focus:outline-none focus:border-brand-main focus:bg-white transition-all font-medium"
                                />
                                <i className="fa-solid fa-id-badge absolute left-5 top-1/2 -translate-y-1/2 text-[#A3A3A3]"></i>
                            </div>
                        </div>

                        {/* Name Input */}
                        <div className="flex flex-col gap-3">
                            <label className="text-[13px] font-bold text-black px-1">
                                الاسم <span className="text-[#FF4D4F] mr-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="ريان"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full h-[54px] bg-[#F9F9F9] border border-[#EEEEEE] rounded-[16px] px-5 text-[15px] focus:outline-none focus:border-brand-main focus:bg-white transition-all font-medium"
                                />
                                <i className="fa-solid fa-user absolute left-5 top-1/2 -translate-y-1/2 text-[#A3A3A3]"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Permissions Grid */}
                <div className="mt-8">
                    <h2 className="text-[18px] font-black text-black mb-8 relative pr-4 before:content-[''] before:absolute before:right-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-5 before:bg-brand-main before:rounded-full">صلاحيـــات النظـــام:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                        <PermissionCheckboxes category="analytics" label="التحليــلات" />
                        <PermissionCheckboxes category="completedOrderWhatsapp" label="طلب واتســـاب مكتمـــل" />
                        <PermissionCheckboxes category="incompleteWhatsappOrder" label="طلب غيـر مكتمـــل" />
                        <PermissionCheckboxes category="allOrders" label="جميع الطلبات" />
                        <PermissionCheckboxes category="completedOrder" label="طلب مكتمـــل" />
                    </div>
                </div>
            </div>
        </div>
    )
}