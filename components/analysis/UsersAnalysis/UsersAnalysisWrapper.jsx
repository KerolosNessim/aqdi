'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../home/Header'
import greenRial from '@/public/images/greenRial.svg'
import Image from 'next/image'
import whatsappIcon from '@/public/images/waIcon.svg'
import Link from 'next/link'
import { Switch } from "@/components/ui/switch"
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
export default function UsersAnalysisWrapper({ id }) {
    const [title, setTitle] = useState('')
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [suspendModalOpen, setSuspendModalOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "حسين احمد البصري",
            email: "elhanan@gmail.com",
            phone: "597900013",
            status: true,
            date: "يناير 1, 2025 - 10:10 ص",
            properties: "03",
            units: "10",
            complaints: "14",
            completedRequests: "01",
            incompleteRequests: "12",
            totalPaid: "00.00"
        },
        {
            id: 2,
            name: "حسين احمد البصري",
            email: "elhanan@gmail.com",
            phone: "597900013",
            status: true,
            date: "يناير 1, 2025 - 10:10 ص",
            properties: "03",
            units: "10",
            complaints: "14",
            completedRequests: "01",
            incompleteRequests: "12",
            totalPaid: "99.99"
        },
        {
            id: 3,
            name: "حسين احمد البصري",
            email: "elhanan@gmail.com",
            phone: "597900013",
            status: true,
            date: "يناير 1, 2025 - 10:10 ص",
            properties: "00",
            units: "00",
            complaints: "00",
            completedRequests: "0",
            incompleteRequests: "0",
            totalPaid: "00.00"
        },
        {
            id: 4,
            name: "حسين احمد البصري",
            email: "elhanan@gmail.com",
            phone: "597900013",
            status: true,
            date: "يناير 1, 2025 - 10:10 ص",
            properties: "03",
            units: "10",
            complaints: "14",
            completedRequests: "01",
            incompleteRequests: "12",
            totalPaid: "99.99"
        },
        {
            id: 5,
            name: "حسين احمد البصري",
            email: "elhanan@gmail.com",
            phone: "597900013",
            status: true,
            date: "يناير 1, 2025 - 10:10 ص",
            properties: "03",
            units: "10",
            complaints: "14",
            completedRequests: "01",
            incompleteRequests: "12",
            totalPaid: "99.99"
        },
        {
            id: 6,
            name: "حسين احمد البصري",
            email: "elhanan@gmail.com",
            phone: "597900013",
            status: true,
            date: "يناير 1, 2025 - 10:10 ص",
            properties: "00",
            units: "00",
            complaints: "00",
            completedRequests: "0",
            incompleteRequests: "0",
            totalPaid: "00.00"
        },
        {
            id: 7,
            name: "حسین احمد البصري",
            email: "elhanan@gmail.com",
            phone: "597900013",
            status: true,
            date: "يناير 1, 2025 - 10:10 ص",
            properties: "03",
            units: "10",
            complaints: "14",
            completedRequests: "01",
            incompleteRequests: "12",
            totalPaid: "99.99"
        },
        {
            id: 8,
            name: "حسين احمد البصري",
            email: "elhanan@gmail.com",
            phone: "597900013",
            status: true,
            date: "يناير 1, 2025 - 10:10 ص",
            properties: "03",
            units: "10",
            complaints: "14",
            completedRequests: "01",
            incompleteRequests: "12",
            totalPaid: "99.99"
        },
        {
            id: 9,
            name: "حسين احمد البصري",
            email: "elhanan@gmail.com",
            phone: "597900013",
            status: true,
            date: "يناير 1, 2025 - 10:10 ص",
            properties: "00",
            units: "00",
            complaints: "00",
            completedRequests: "0",
            incompleteRequests: "0",
            totalPaid: "00.00"
        },
        {
            id: 10,
            name: "حسين احمد البصري",
            email: "elhanan@gmail.com",
            phone: "597900013",
            status: true,
            date: "يناير 1, 2025 - 10:10 ص",
            properties: "03",
            units: "10",
            complaints: "14",
            completedRequests: "01",
            incompleteRequests: "12",
            totalPaid: "99.99"
        },
        {
            id: 11,
            name: "حسين احمد البصري",
            email: "elhanan@gmail.com",
            phone: "597900013",
            status: true,
            date: "يناير 1, 2025 - 10:10 ص",
            properties: "03",
            units: "10",
            complaints: "14",
            completedRequests: "01",
            incompleteRequests: "12",
            totalPaid: "99.99"
        },
        {
            id: 12,
            name: "حسين احمد البصري",
            email: "elhanan@gmail.com",
            phone: "597900013",
            status: true,
            date: "يناير 1, 2025 - 10:10 ص",
            properties: "03",
            units: "10",
            complaints: "14",
            completedRequests: "01",
            incompleteRequests: "12",
            totalPaid: "99.99"
        }
    ])

    useEffect(() => {
        switch (id) {
            case 'day':
                setTitle('المستخدمين الجدد  / اليــوم')
                break;
            case 'week':
                setTitle('المستخدمين الجدد / الأسبوع')
                break;
            case 'month':
                setTitle('المستخدمين الجدد / الشهر')
                break;
            case 'year':
                setTitle('المستخدمين الجدد / السنة')
                break;
            case 'total':
                setTitle('إجمالي المستخدمين الجدد')
                break;
            case 'top_completed_orders':
                setTitle('اكثر العملاء طلب مكتمل')
                break;
            case 'top_incomplete_orders':
                setTitle('اكثر العملاء طلب غير مكتمل')
                break;
            case 'top_properties':
                setTitle("اكثر العملاء عقارات")
                break;
            case 'top_units':
                setTitle('اكثر العملاء وحدات')
                break;
            case 'top_refunds':
                setTitle('اكثر العملاء استرجاع')
                break;
            case 'top_orders':
                setTitle('اكثر العملاء طلبـــات')
                break;
            default:
                setTitle('المستخدمين الجدد / اليــوم')
                break;
        }
    }, [id])

    const tableHeaders = [
        "الاسم",
        "البريد الإلكتروني",
        "الهاتف",
        "الحالة: تفعيل/إلغاء",
        "التـاريخ/الســاعة",
        "العقــارات",
        "الوحدات",
        "الشكاوى",
        "الطلبات المكتملة",
        "الطلبات الغير المكتملة",
        "إجمالي المبلغ المدفوع",
        "الاجــراءات"
    ];

    // Handler for status change
    const handleStatusChange = (userId, newStatus) => {
        console.log(`User ID: ${userId}, New Status: ${newStatus ? 'Active' : 'Inactive'}`)

        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, status: newStatus } : user
            )
        )
    }

    // Handler for opening delete modal
    const handleDeleteClick = (userId) => {
        setSelectedUserId(userId)
        setDeleteModalOpen(true)
    }

    // Handler for opening suspend modal
    const handleSuspendClick = (userId) => {
        setSelectedUserId(userId)
        setSuspendModalOpen(true)
    }

    // Handler for confirming delete
    const confirmDelete = () => {
        console.log(`Deleting user ${selectedUserId}`)
        toast.success('تم حذف المستخدم بنجاح')
        setDeleteModalOpen(false)
        setSelectedUserId(null)
        // Add your delete logic here
    }

    // Handler for confirming suspend
    const confirmSuspend = () => {
        console.log(`Suspending user ${selectedUserId}`)
        toast.success('تم إيقاف المستخدم بنجاح')
        setSuspendModalOpen(false)
        setSelectedUserId(null)
        // Add your suspend logic here
    }


    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen" dir="rtl">
            <Header page='welcome' title={title} isMain={false} first="الرئيــسية" firstURL="/" second='التحليــلات' secondURL="/home/analysis" third={title} thirdURL={`/home/financial-analysis/${id}`} />
            
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
                        {users.map((row) => (
                            <tr key={row.id} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#fafafa] transition-all">
                                <td className="p-[15px_20px] text-black text-[13px] font-medium whitespace-nowrap">{row.name}</td>
                                <td className="p-[15px_20px] text-[#616161] text-[13px]">{row.email}</td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2">
                                        <span className="text-black text-[13px]">{row.phone}</span>
                                        <button onClick={() => {
                                            navigator.clipboard.writeText(row.phone)
                                            toast.success('تم نسخ رقم الهاتف')
                                        }} className="text-[#A3A3A3] hover:text-brand-main">
                                            <i className="fa-solid fa-copy text-[11px]"></i>
                                        </button>
                                        <Link href={`https://wa.me/${row.phone}`} target="_blank" className="hover:scale-110 transition-all">
                                            <Image src={whatsappIcon} alt="wa" width={16} height={16} />
                                        </Link>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center justify-center pointer-events-auto" style={{ direction: "ltr" }}>
                                        <Switch
                                            checked={row.status}
                                            onCheckedChange={(checked) => handleStatusChange(row.id, checked)}
                                        />
                                    </div>
                                </td>
                                <td className="p-[15px_20px] text-[#616161] text-[12px] whitespace-nowrap">{row.date}</td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2 px-2.5 py-1 bg-[#f9f9f9] rounded-lg border border-[#eee] w-fit mx-auto group hover:border-brand-main transition-all cursor-pointer">
                                        <span className="text-black text-[12px] font-bold">{row.properties}</span>
                                        <i className="fa-regular fa-eye text-[#A3A3A3] text-[11px] group-hover:text-brand-main"></i>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2 px-2.5 py-1 bg-[#f9f9f9] rounded-lg border border-[#eee] w-fit mx-auto group hover:border-brand-main transition-all cursor-pointer">
                                        <span className="text-black text-[12px] font-bold">{row.units}</span>
                                        <i className="fa-regular fa-eye text-[#A3A3A3] text-[11px] group-hover:text-brand-main"></i>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2 px-2.5 py-1 bg-[#f9f9f9] rounded-lg border border-[#eee] w-fit mx-auto group hover:border-brand-main transition-all cursor-pointer">
                                        <span className="text-black text-[12px] font-bold">{row.complaints}</span>
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
                                                <span>عرض المستخدم</span>
                                                <i className="fa-solid fa-chevron-left mr-auto text-[10px] text-[#A3A3A3]"></i>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleSuspendClick(row.id)}>
                                                <i className="fa-solid fa-ban ml-2 text-[#A3A3A3]"></i>
                                                <span>إيقاف المستخدم</span>
                                                <i className="fa-solid fa-chevron-left mr-auto text-[10px] text-[#A3A3A3]"></i>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer text-green-600">
                                                <i className="fa-solid fa-circle-check ml-2"></i>
                                                <span>قبول المستخدم</span>
                                                <i className="fa-solid fa-chevron-left mr-auto text-[10px] text-green-300"></i>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer text-red-600" onClick={() => handleDeleteClick(row.id)}>
                                                <i className="fa-regular fa-trash-can ml-2"></i>
                                                <span>حذف المستخدم</span>
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

            {/* Suspend User Modal */}
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
                            هل أنت متأكد من <span className="text-brand-main">إيقـاف</span> حساب الضيف !
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

            {/* Delete User Modal */}
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
                            هل أنت متأكد من <span className="text-[#EF4444]">حذف</span> حساب الضيف !
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