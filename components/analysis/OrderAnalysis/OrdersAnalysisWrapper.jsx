'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../home/Header'
import greenRial from '@/public/images/greenRial.svg'
import Image from 'next/image'
import waIcon from '@/public/images/waIcon.svg'
import blueRial from '@/public/images/blueRial.svg'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/src/utils/axios'
import Loader from '@/components/home/loader'
import { Copy } from 'lucide-react'

export default function OrdersAnalysisWrapper({ id }) {
    const [title, setTitle] = useState('')
    const [refundModalStep, setRefundModalStep] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);
    // useEffect(() => {
    //     switch (id) {
    //         case 'day':
    //             setTitle('طلبات اليــوم المكتمله')
    //             break;
    //         case 'week':
    //             setTitle('طلبات الأسبوع المكتمله')
    //             break;
    //         case 'month':
    //             setTitle('طلبات الشهر المكتمله')
    //             break;
    //         case 'year':
    //             setTitle('طلبات السنة المكتمله')
    //             break;
    //         case 'total':
    //             setTitle('إجمالي الطلبات المكتمله')
    //             break;
    //         case 'completed_orders':
    //             setTitle('الطلبات المكتملة')
    //             break;
    //         case 'incompleted_orders':
    //             setTitle('الطلبات غير المكتملة')
    //             break;
    //         case 'whatsapp_completed_orders':
    //             setTitle("طلبات واتساب مكتملة")
    //             break;
    //         case 'whatsapp_incompleted_orders':
    //             setTitle("طلبات واتساب غير مكتملة")
    //             break;
    //         case 'refunded_orders':
    //             setTitle("طلبات مسترجعه")
    //             break;
    //         //تم التوثيـــق
    //         case 'verified':
    //             setTitle("تم التوثيـــق")
    //             break;
    //         default:
    //             setTitle('طلبات اليــوم المكتمله')
    //             break;
    //     }
    // }, [id])

    const tableHeaders = [
        "رقــم جوال العميل",
        "قيمة المبلغ",
        "نــوع العقــد",
        // "التصنيف",
        "هل تم توثيق العقد",
        "مدة العقد ",
        "الاجـــراءات",

    ];

    const tableData = [
        {
            id: 1,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "سكنـي",
            documentType: "صك إلكــتروني",
            status: "قيد المعـالجة ..",
            payment: "99.99",
            reciveDate: "منذ 10د",
            reciver: "ريـــان"
        },
        {
            id: 2,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "تجــاري",
            documentType: "صك ورقي",
            status: "وثيقة عقارية غير القياسية",
            payment: "99.99",
            reciveDate: "منذ 10د",
            reciver: "ريـــان"
        },
        {
            id: 3,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "سكنـي",
            documentType: "وثيقة",
            status: "محتوى دفع من العميل",
            payment: "99.99",
            reciveDate: "منذ 10د",
            reciver: "ريـــان"
        },
        {
            id: 4,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "تجــاري",
            documentType: "صك ورقي",
            status: "تم تأكيد العقار",
            payment: "99.99",
            reciveDate: "منذ 10د",
            reciver: "ريـــان"
        },
        {
            id: 5,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "سكنـي",
            documentType: "صك ورقي",
            status: "وثيقة عقارية غير القياسية",
            payment: "99.99",
            reciveDate: "منذ 10د",
            reciver: "ريـــان"
        },
        {
            id: 6,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "تجــاري",
            documentType: "وثيقة عقارية",
            status: "محتوى دفع من العميل",
            payment: "99.99",
            reciveDate: "منذ 10د",
            reciver: "ريـــان"
        },
        {
            id: 7,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "سكنـي",
            documentType: "الاستلام",
            status: "واثيقة عقارية غير القياسية",
            payment: "99.99",
            reciveDate: "منذ 10د",
            reciver: "ريـــان"
        },
        {
            id: 8,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "تجــاري",
            documentType: "تم تأكيد الطلب",
            status: "حجز استلام",
            payment: "99.99",
            reciveDate: "منذ 10د",
            reciver: "ريـــان"
        },
        {
            id: 9,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "سكنـي",
            documentType: "تم تأكيد الطلب",
            status: "عقد إيجار من العميل",
            payment: "99.99",
            reciveDate: "منذ 10د",
            reciver: "ريـــان"
        },
        {
            id: 10,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "سكنـي",
            documentType: "الاستلام",
            status: "واثيقة عقارية غير القياسية",
            payment: "99.99",
            reciveDate: "منذ 10د",
            reciver: "ريـــان"
        },
        {
            id: 11,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "سكنـي",
            documentType: "طلب واستلام تعديل",
            status: "محتوى دفع من العميل",
            payment: "99.99",
            reciveDate: "منذ 10د",
            reciver: "ريـــان"
        },
        {
            id: 12,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "سكنـي",
            documentType: "محتوى دفع من العميل",
            status: "عقد إيجار من العميل",
            payment: "99.99",
            reciveDate: "منذ 10د",
            reciver: "ريـــان"
        }
    ];

    const getDocumentTypeClass = (type) => {
        const typeMap = {
            'صك إلكــتروني': 'bg-[#E6F7FF] text-[#0EA5E9]',
            'عقد إيجار': 'bg-[#FFF4E6] text-[#F59E0B]',
            'صك ورقي': 'bg-[#FFE6E6] text-[#EF4444]',
            'وثيقة عقارية': 'bg-[#E6FFE6] text-[#10B981]',
            'طلب واستلام تعديل': 'bg-[#FFF0E6] text-[#F97316]',
            'تم تأكيد العقار': 'bg-[#FFF0E6] text-[#F97316]',
            'الاستلام': 'bg-[#E6F2FF] text-[#3B82F6]',
            'تم تأكيد الطلب': 'bg-[#E6F2FF] text-[#3B82F6]',
            'عقد إيجار من العميل': 'bg-[#FFE6F5] text-[#EC4899]',
            'محتوى دفع من العميل': 'bg-[#FFE6F5] text-[#EC4899]'
        };
        return typeMap[type] || 'bg-[#F5F5F5] text-[#A3A3A3]';
    };

    const getStatusClass = (status) => {
        const statusMap = {
            'قيد المعـالجة ..': 'bg-[#E6F7FF] text-[#0EA5E9]',
            'تم تأكيد العقار': 'bg-[#E6FFE6] text-[#10B981]',
            'جديد استلام': 'bg-[#FFE6F5] text-[#EC4899]',
            'حجز استلام': 'bg-[#FFF4E6] text-[#F59E0B]',
            'عقد إيجار من العميل': 'bg-[#F3E6FF] text-[#A855F7]',
            'واثيقة عقارية غير القياسية': 'bg-[#FEF3E6] text-[#F59E0B]'
        };
        return statusMap[status] || 'bg-[#F5F5F5] text-[#A3A3A3]';
    };

    function getWhatsOrder() {
        return axiosInstance(`/admin/contract-whatsapp?is_complete=1`)
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['orders-whatsapp-completed'],
        queryFn: () => getWhatsOrder(),
    })

    const orders = data?.data?.data?.data ?? [];
    console.log(orders)



    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen" dir="rtl">
            <Header page='welcome' title={"طلبات واتساب مكتملة"} isMain={false} first="الرئيــسية" firstURL="/" second='التحليــلات' secondURL="/home/analysis" third={"طلبات واتساب مكتملة"} thirdURL={`/home/completed-whatsapp`} />
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
                        {orders?.map((row) => (
                            <tr key={row.id} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#fafafa] transition-all">
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2">
                                        <span className="text-black text-[13px]">{row.mobile_number}</span>
                                        <Copy size={10} className="cursor-pointer" onClick={() => {
                                            navigator.clipboard.writeText(row.mobile_number)
                                            toast.success("تم نسخ الرقم")
                                        }} />
                                        <Link href={`https://wa.me/${row.mobile_number}`} target="_blank" className="hover:scale-110 transition-all">
                                            <Image src={waIcon} alt="wa" width={16} height={16} />
                                        </Link>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-1.5 text-[#007C13] font-bold text-[13px]">
                                        <span>{row.amount_paid_by_client}</span>
                                        <Image src={greenRial} alt="rial" width={14} height={14} />
                                        <i className="fa-solid fa-circle-check text-[12px]"></i>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${row.contractType === 'سكنـي' ? 'bg-[#F0E6FF] text-[#7C3AED]' : 'bg-[#FFE6F0] text-[#EC4899]'}`}>
                                        {row.contract_type}
                                    </span>
                                </td>
                                {/* <td className="p-[15px_20px]">
                                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${getDocumentTypeClass(row.documentType)}`}>
                                        {"hhhhh"}
                                    </span>
                                </td> */}
                                <td className="p-[15px_20px]">
                                    {row?.is_documented == null ? "--" : row.is_documented ? "نعم" : "لا"}
                                </td>
                                <td className="p-[15px_20px] text-[#616161] text-[13px]">{row?.contract_duration || "--"}</td>
                                <td className="p-[15px_20px]">
                                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F5F5F5] text-[#4D4D4D] hover:bg-brand-main hover:text-white transition-all mx-auto">
                                        👁️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* <div className="flex items-center justify-center gap-2.5 mt-4">
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
            </div> */}
        </div>
    );
}