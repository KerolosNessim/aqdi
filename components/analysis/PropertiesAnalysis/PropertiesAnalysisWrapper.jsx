'use client'
import Header from '../../home/Header'
import React, { useEffect, useState } from 'react'
import greenRial from '@/public/images/greenRial.svg'
import Image from 'next/image'
import whatsappIcon from '@/public/images/waIcon.svg'
import Link from 'next/link'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"

export default function PropertiesAnalysisWrapper({ id }) {
    const [title, setTitle] = useState('')
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [suspendModalOpen, setSuspendModalOpen] = useState(false)
    const [selectedPropertyId, setSelectedPropertyId] = useState(null)
    const [properties, setProperties] = useState([
        {
            id: 1,
            name: "خصب الجنـوب",
            email: "alhanan@gmail.com",
            phone: "0979500013",
            date: "٩ يناير ٢٠٢٥ - 10:15 ص",
            units: "03",
            completedRequests: "10",
            incompleteRequests: "14",
            totalPaid: "9999"
        },
        {
            id: 2,
            name: "خصب الجنـوب",
            email: "alhanan@gmail.com",
            phone: "0979500013",
            date: "٩ يناير ٢٠٢٥ - 10:15 ص",
            units: "03",
            completedRequests: "10",
            incompleteRequests: "14",
            totalPaid: "9999"
        },
        {
            id: 3,
            name: "خصب الجنـوب",
            email: "alhanan@gmail.com",
            phone: "0979500013",
            date: "٩ يناير ٢٠٢٥ - 10:15 ص",
            units: "03",
            completedRequests: "10",
            incompleteRequests: "14",
            totalPaid: "9999"
        },
        {
            id: 4,
            name: "خصب الجنـوب",
            email: "alhanan@gmail.com",
            phone: "0979500013",
            date: "٩ يناير ٢٠٢٥ - 10:15 ص",
            units: "03",
            completedRequests: "10",
            incompleteRequests: "14",
            totalPaid: "9999"
        },
        {
            id: 5,
            name: "خصب الجنـوب",
            email: "alhanan@gmail.com",
            phone: "0979500013",
            date: "٩ يناير ٢٠٢٥ - 10:15 ص",
            units: "03",
            completedRequests: "10",
            incompleteRequests: "14",
            totalPaid: "9999"
        },
        {
            id: 6,
            name: "خصب الجنـوب",
            email: "alhanan@gmail.com",
            phone: "0979500013",
            date: "٩ يناير ٢٠٢٥ - 10:15 ص",
            units: "03",
            completedRequests: "10",
            incompleteRequests: "14",
            totalPaid: "9999"
        },
        {
            id: 7,
            name: "خصب الجنـوب",
            email: "alhanan@gmail.com",
            phone: "0979500013",
            date: "٩ يناير ٢٠٢٥ - 10:15 ص",
            units: "03",
            completedRequests: "10",
            incompleteRequests: "14",
            totalPaid: "9999"
        },
        {
            id: 8,
            name: "خصب الجنـوب",
            email: "alhanan@gmail.com",
            phone: "0979500013",
            date: "٩ يناير ٢٠٢٥ - 10:15 ص",
            units: "03",
            completedRequests: "10",
            incompleteRequests: "14",
            totalPaid: "9999"
        },
        {
            id: 9,
            name: "خصب الجنـوب",
            email: "alhanan@gmail.com",
            phone: "0979500013",
            date: "٩ يناير ٢٠٢٥ - 10:15 ص",
            units: "03",
            completedRequests: "10",
            incompleteRequests: "14",
            totalPaid: "9999"
        },
        {
            id: 10,
            name: "خصب الجنـوب",
            email: "alhanan@gmail.com",
            phone: "0979500013",
            date: "٩ يناير ٢٠٢٥ - 10:15 ص",
            units: "03",
            completedRequests: "10",
            incompleteRequests: "14",
            totalPaid: "9999"
        },
        {
            id: 11,
            name: "خصب الجنـوب",
            email: "alhanan@gmail.com",
            phone: "0979500013",
            date: "٩ يناير ٢٠٢٥ - 10:15 ص",
            units: "03",
            completedRequests: "10",
            incompleteRequests: "14",
            totalPaid: "9999"
        },
        {
            id: 12,
            name: "خصب الجنـوب",
            email: "alhanan@gmail.com",
            phone: "0979500013",
            date: "٩ يناير ٢٠٢٥ - 10:15 ص",
            units: "03",
            completedRequests: "10",
            incompleteRequests: "14",
            totalPaid: "9999"
        }
    ])

    useEffect(() => {
        switch (id) {
            case 'day':
                setTitle('عقارات المضافة  / اليــوم')
                break;
            case 'week':
                setTitle('عقارات المضافة  / الأسبوع')
                break;
            case 'month':
                setTitle('عقارات المضافة  / الشهر')
                break;
            case 'year':
                setTitle('عقارات المضافة  / السنة')
                break;
            case 'total':
                setTitle('إجمالي العقـارات')
                break;
            default:
                setTitle('عقارات المضافة  / اليــوم')
                break;
        }
    }, [id])

    const tableHeaders = [
        "اسم العقــار",
        "البريد الإلكتروني",
        "الهاتف",
        "التـاريخ/الســاعة",
        "الوحدات المضـافة في العقــار",
        "الطلبات المكتملة",
        "الطلبات الغير المكتملة",
        "إجمالي المبلغ المدفوع",
        "الاجــراءات"
    ];

    // Handler for opening delete modal
    const handleDeleteClick = (propertyId) => {
        setSelectedPropertyId(propertyId)
        setDeleteModalOpen(true)
    }

    // Handler for opening suspend modal
    const handleSuspendClick = (propertyId) => {
        setSelectedPropertyId(propertyId)
        setSuspendModalOpen(true)
    }

    // Handler for confirming delete
    const confirmDelete = () => {
        console.log(`Deleting property ${selectedPropertyId}`)
        toast.success('تم حذف العقار بنجاح')
        setDeleteModalOpen(false)
        setSelectedPropertyId(null)
    }

    // Handler for confirming suspend
    const confirmSuspend = () => {
        console.log(`Suspending property ${selectedPropertyId}`)
        toast.success('تم إيقاف العقار بنجاح')
        setSuspendModalOpen(false)
        setSelectedPropertyId(null)
    }

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen" dir="rtl">
            <Header page='welcome' title={title} isMain={false} first="الرئيــسية" firstURL="/" second='التحليــلات' secondURL="/home/analysis" third={title} thirdURL={`/home/Properties-analysis/${id}`} />
            
            <div className="w-full overflow-x-auto bg-white rounded-[24px] border border-[#E4E4E4] mt-4">
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
                        {properties.map((row) => (
                            <tr key={row.id} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#fafafa] transition-all">
                                <td className="p-[15px_20px] text-black text-[13px] font-medium">{row.name}</td>
                                <td className="p-[15px_20px] text-[#616161] text-[13px]">{row.email}</td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2">
                                        <span className="text-black text-[13px]">{row.phone}</span>
                                        <Link href={`https://wa.me/${row.phone}`} target="_blank" className="hover:scale-110 transition-all">
                                            <Image src={whatsappIcon} alt="wa" width={16} height={16} />
                                        </Link>
                                    </div>
                                </td>
                                <td className="p-[15px_20px] text-[#616161] text-[12px] whitespace-nowrap">{row.date}</td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2 px-2.5 py-1 bg-[#f9f9f9] rounded-lg border border-[#eee] w-fit mx-auto group hover:border-brand-main transition-all cursor-pointer">
                                        <span className="text-black text-[12px] font-bold">{row.units}</span>
                                        <i className="fa-regular fa-eye text-[#A3A3A3] text-[11px] group-hover:text-brand-main"></i>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2 px-2.5 py-1 bg-[#f9f9f9] rounded-lg border border-[#eee] w-fit mx-auto cursor-pointer group hover:border-brand-main transition-all">
                                        <span className="text-black text-[12px] font-bold">{row.completedRequests}</span>
                                        <i className="fa-regular fa-eye text-[#A3A3A3] text-[11px] group-hover:text-brand-main"></i>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2 px-2.5 py-1 bg-[#f9f9f9] rounded-lg border border-[#eee] w-fit mx-auto cursor-pointer group hover:border-brand-main transition-all">
                                        <span className="text-black text-[12px] font-bold">{row.incompleteRequests}</span>
                                        <i className="fa-regular fa-eye text-[#A3A3A3] text-[11px] group-hover:text-brand-main"></i>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-1.5 text-[#007C13] font-bold text-[13px] justify-center">
                                        <i className="fa-regular fa-eye text-[#A3A3A3] text-[11px] cursor-pointer hover:text-brand-main transition-all"></i>
                                        <span>{row.totalPaid}</span>
                                        <Image src={greenRial} alt="rial" width={14} height={14} />
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <DropdownMenu dir="rtl">
                                        <DropdownMenuTrigger asChild>
                                            <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#4D4D4D] hover:bg-[#f5f5f5] transition-all">
                                                <i className="fa-solid fa-ellipsis-vertical text-[14px]"></i>
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuItem className="cursor-pointer">
                                                <i className="fa-regular fa-eye ml-2 text-[#A3A3A3]"></i>
                                                <span>عرض العقار</span>
                                                <i className="fa-solid fa-chevron-left mr-auto text-[10px] text-[#A3A3A3]"></i>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleSuspendClick(row.id)}>
                                                <i className="fa-solid fa-ban ml-2 text-[#A3A3A3]"></i>
                                                <span>إيقاف العقار</span>
                                                <i className="fa-solid fa-chevron-left mr-auto text-[10px] text-[#A3A3A3]"></i>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer text-green-600">
                                                <i className="fa-solid fa-circle-check ml-2"></i>
                                                <span>قبول العقار</span>
                                                <i className="fa-solid fa-chevron-left mr-auto text-[10px] text-green-300"></i>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer text-red-600" onClick={() => handleDeleteClick(row.id)}>
                                                <i className="fa-regular fa-trash-can ml-2"></i>
                                                <span>حذف العقار</span>
                                                <i className="fa-solid fa-chevron-left mr-auto text-[10px] text-red-300"></i>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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

            {/* Suspend Property Modal */}
            <Dialog open={suspendModalOpen} onOpenChange={setSuspendModalOpen}>
                <DialogContent className="max-w-[500px] rounded-[32px] p-0 overflow-hidden border-none shadow-2xl bg-white">
                    <div className="p-10 flex flex-col items-center">
                        <button
                            className="absolute top-6 left-6 w-10 h-10 rounded-full flex items-center justify-center bg-[#F5F5F5] text-[#4D4D4D] hover:bg-[#eee] transition-all"
                            onClick={() => setSuspendModalOpen(false)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <div className="w-24 h-24 rounded-full bg-brand-main flex items-center justify-center text-white text-[40px] mb-8 shadow-lg shadow-brand-main/20">
                            <i className="fa-solid fa-ban"></i>
                        </div>
                        <h3 className="text-[22px] font-bold text-black text-center mb-3">
                            هل أنت متأكد من <span className="text-brand-main">إيقـاف</span> هذا العقار !
                        </h3>
                        <p className="text-[14px] text-[#A3A3A3] text-center mb-10">
                            هذا الإجراء يمكن التراجع عنه بعد التأكيد !
                        </p>
                        <div className="flex gap-4 w-full">
                            <button
                                className="flex-1 h-[56px] rounded-full bg-[#F5F5F5] text-[#4D4D4D] font-bold text-[16px] hover:bg-[#eee] transition-all"
                                onClick={() => setSuspendModalOpen(false)}
                            >
                                إلغاء
                            </button>
                            <button
                                className="flex-1 h-[56px] rounded-full bg-brand-main text-white font-bold text-[16px] hover:opacity-90 transition-all shadow-lg shadow-brand-main/20"
                                onClick={confirmSuspend}
                            >
                                تأكيد الإيقاف
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Property Modal */}
            <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <DialogContent className="max-w-[500px] rounded-[32px] p-0 overflow-hidden border-none shadow-2xl bg-white">
                    <div className="p-10 flex flex-col items-center">
                        <button
                            className="absolute top-6 left-6 w-10 h-10 rounded-full flex items-center justify-center bg-[#F5F5F5] text-[#4D4D4D] hover:bg-[#eee] transition-all"
                            onClick={() => setDeleteModalOpen(false)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <div className="w-24 h-24 rounded-full bg-[#EF4444] flex items-center justify-center text-white text-[40px] mb-8 shadow-lg shadow-[#EF4444]/20">
                            <i className="fa-regular fa-trash-can"></i>
                        </div>
                        <h3 className="text-[22px] font-bold text-black text-center mb-3">
                            هل أنت متأكد من <span className="text-[#EF4444]">حذف</span> هذا العقار !
                        </h3>
                        <p className="text-[14px] text-[#A3A3A3] text-center mb-10">
                            هذا الإجراء لا يمكن التراجع عنه بعد التأكيد !
                        </p>
                        <div className="flex gap-4 w-full">
                            <button
                                className="flex-1 h-[56px] rounded-full bg-[#F5F5F5] text-[#4D4D4D] font-bold text-[16px] hover:bg-[#eee] transition-all"
                                onClick={() => setDeleteModalOpen(false)}
                            >
                                إلغاء
                            </button>
                            <button
                                className="flex-1 h-[56px] rounded-full bg-[#EF4444] text-white font-bold text-[16px] hover:bg-[#dc2626] transition-all shadow-lg shadow-[#EF4444]/20"
                                onClick={confirmDelete}
                            >
                                تأكيد الحذف
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}