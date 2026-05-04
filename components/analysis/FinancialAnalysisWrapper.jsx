'use client'
import React, { useEffect, useState } from 'react'
import Header from '../home/Header'
import greenRial from '@/public/images/greenRial.svg'
import Image from 'next/image'
import waIcon from '@/public/images/waIcon.svg'
import blueRial from '@/public/images/blueRial.svg'
import Link from 'next/link'

export default function FinancialAnalysisWrapper({ id }) {
    const [title, setTitle] = useState('')

    useEffect(() => {
        switch (id) {
            case 'day':
                setTitle('دخل اليــوم')
                break;
            case 'week':
                setTitle('دخل الأسبوع')
                break;
            case 'month':
                setTitle('دخل الشهر')
                break;
            case 'year':
                setTitle('دخل العام')
                break;
            case 'total':
                setTitle('إجمالي الدخــل')
                break;
            default:
                setTitle('دخل اليــوم')
                break;
        }
    }, [id])

    const doneImojy = "✅"

    const tableHeaders = [
        "رقــم الجوال",
        "المبلغ",
        "الســأعة",
        "تاريخ الدفع",
        "رقم العقد",
        "العملة",
        "طريقة الدفع",
        "الحالة",
    ];

    const tableData = Array(11).fill(null).map((_, index) => ({
        id: index + 1,
        phone: "597500013",
        amount: "99,99",
        time: "10:15 ص",
        date: "٩ يناير ٢٠٢٥",
        contractNumber: "780695",
        currency: "ريال",
        paymentMethod: "ApplePay",
        status: "مكتمل",
    }));

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen" dir="rtl">
            <Header
                page='welcome'
                title={title}
                isMain={false}
                first="الرئيــسية"
                firstURL="/"
                second='التحليــلات'
                secondURL="/home/analysis"
                third={title}
                thirdURL={`/home/financial-analysis/${id}`}
            />
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
                        {tableData.map((row) => (
                            <tr key={row.id} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#fafafa] transition-all">
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2.5">
                                        <span className="text-black text-[13px] font-normal">{row.phone}</span>
                                        <button onClick={() => navigator.clipboard.writeText(row.phone)} className="text-[#A3A3A3] hover:text-brand-main transition-all">
                                            <i className="fa-regular fa-copy text-[12px]"></i>
                                        </button>
                                        <Link href={`https://wa.me/${row.phone}`} target="_blank" className="hover:scale-110 transition-all">
                                            <Image src={waIcon} alt="wa" width={16} height={16} />
                                        </Link>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-black text-[13px] font-semibold">{row.amount}</span>
                                        <Image src={greenRial} alt="rial" width={16} height={16} />
                                    </div>
                                </td>
                                <td className="p-[15px_20px] text-black text-[13px]">{row.time}</td>
                                <td className="p-[15px_20px] text-[#616161] text-[13px] whitespace-nowrap">{row.date}</td>
                                <td className="p-[15px_20px] text-black text-[13px]">{row.contractNumber}</td>
                                <td className="p-[15px_20px]">
                                    <Image src={row.currency == "ريال" ? blueRial : greenRial} alt="rial" width={16} height={16} />
                                </td>
                                <td className="p-[15px_20px] text-[#616161] text-[13px]">{row.paymentMethod}</td>
                                <td className="p-[15px_20px]">
                                    <span className="px-3 py-1 bg-[#E7F5FF] text-[#228BE6] rounded-full text-[11px] font-medium">ناجحة</span>
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