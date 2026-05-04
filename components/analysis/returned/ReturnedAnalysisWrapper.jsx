'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../home/Header'
import greenRial from '@/public/images/greenRial.svg'
import Image from 'next/image'
import waIcon from '@/public/images/waIcon.svg'
import orangerial from '@/public/images/orangerial.svg'
import Link from 'next/link'

export default function ReturnedAnalysisWrapper({ id }) {
    const [title, setTitle] = useState('')

    useEffect(() => {
        switch (id) {
            case 'day':
                setTitle('مسترجع اليــوم')
                break;
            case 'week':
                setTitle('مسترجع الأسبوع')
                break;
            case 'month':
                setTitle('مسترجع الشهر')
                break;
            case 'year':
                setTitle('مسترجع السنة')
                break;
            case 'total':
                setTitle('إجمالي المسترجع')
                break;
            default:
                setTitle('مسترجع اليــوم')
                break;
        }
    }, [id])

    const tableHeaders = [
        "رقــم الطلب",
        "رقــم جوال العميل",
        "نــوع العقــد",
        "الدفـــع",
        "المبــلغ المطالــب اســترجاعه",
        "تم الاستــرجــاع",
        "رافــع الطلب",
        "مــوافقة الادارة",
        "عرض العقــد",
    ];

    const tableData = [
        {
            id: 1,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "سكنـي",
            price: "249.99",
            returnedPrice: "125.99",
            returned: true,
            employee: "نهــال",
            manager: true,
        },
        {
            id: 2,
            orderNumber: "000001",
            phone: "997600013",
            contractType: "سكنـي",
            price: "249.99",
            returnedPrice: "125.99",
            returned: true,
            employee: "نهــال",
            manager: true,
        },
        {
            id: 3,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "سكنـي",
            price: "249.99",
            returnedPrice: "125.99",
            returned: false,
            employee: "نهــال",
            manager: false,
        },
        {
            id: 4,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "سكنـي",
            price: "249.99",
            returnedPrice: "125.99",
            returned: true,
            employee: "نهــال",
            manager: true,
        },
        {
            id: 5,
            orderNumber: "000001",
            phone: "997500013",
            contractType: "سكنـي",
            price: "249.99",
            returnedPrice: "125.99",
            returned: true,
            employee: "نهــال",
            manager: true,
        },
    ];

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen" dir="rtl">
            <Header page='welcome' title={title} isMain={false} first="الرئيــسية" firstURL="/" second='التحليــلات' secondURL="/home/analysis" third={title} thirdURL={`/home/return-analysis/${id}`} />
            
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
                        {tableData.map((row) => (
                            <tr key={row.id} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#fafafa] transition-all">
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center justify-center gap-2 px-3 py-1.5 bg-[#f9f9f9] rounded-lg w-fit mx-auto border border-[#eee]">
                                        <span className="text-black text-[12px] font-bold">{row.orderNumber}</span>
                                        <button onClick={() => navigator.clipboard.writeText(row.orderNumber)} className="text-[#A3A3A3] hover:text-brand-main">
                                            <i className="fa-regular fa-copy text-[11px]"></i>
                                        </button>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2">
                                        <span className="text-black text-[13px]">{row.phone}</span>
                                        <Link href={`https://wa.me/${row.phone}`} target="_blank" className="hover:scale-110 transition-all">
                                            <Image src={waIcon} alt="wa" width={16} height={16} />
                                        </Link>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${row.contractType === 'سكنـي' ? 'bg-[#F0E6FF] text-[#7C3AED]' : 'bg-[#FFE6F0] text-[#EC4899]'}`}>
                                        {row.contractType}
                                    </span>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-1.5 text-[#007C13] font-bold text-[13px]">
                                        <span>{row.price}</span>
                                        <Image src={greenRial} alt="rial" width={14} height={14} />
                                        <i className="fa-solid fa-circle-check text-[12px]"></i>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-1.5 text-brand-main font-bold text-[13px]">
                                        <span>{row.returnedPrice}</span>
                                        <Image src={orangerial} alt="rial" width={14} height={14} />
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${row.returned ? 'bg-[#E6FFE6] text-[#10B981]' : 'bg-[#FFE6E6] text-[#EF4444]'}`}>
                                        {row.returned ? "✅ تم المــوافقة" : "❌ لم تتم المــوافقة"}
                                    </span>
                                </td>
                                <td className="p-[15px_20px]">
                                    <span className="px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap bg-[#F0E6FF] text-[#7C3AED]">
                                        {row.employee}
                                    </span>
                                </td>
                                <td className="p-[15px_20px]">
                                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${row.manager ? 'bg-[#E6FFE6] text-[#10B981]' : 'bg-[#FFE6E6] text-[#EF4444]'}`}>
                                        {row.manager ? "✅ تم المــوافقة" : "❌ لم تتم المــوافقة"}
                                    </span>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2">
                                        <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F5F5F5] text-[#4D4D4D] hover:bg-brand-main hover:text-white transition-all">
                                            <i className="fa-solid fa-eye text-[12px]"></i>
                                        </button>
                                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#4D4D4D] hover:bg-[#f5f5f5] transition-all">
                                            <i className="fa-solid fa-ellipsis-vertical text-[14px]"></i>
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