'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../home/Header'
import greenRial from '@/public/images/greenRial.svg'
import Image from 'next/image'
import waIcon from '@/public/images/waIcon.svg'
import orangerial from '@/public/images/orangerial.svg'
import Link from 'next/link'

export default function ExpenseAnalysisWrapper({ id }) {
    const [title, setTitle] = useState('')

    useEffect(() => {
        switch (id) {
            case 'day':
                setTitle('مصروفات اليــوم')
                break;
            case 'week':
                setTitle('مصروفات الأسبوع')
                break;
            case 'month':
                setTitle('مصروفات الشهر')
                break;
            case 'year':
                setTitle('مصروفات السنة')
                break;
            case 'total':
                setTitle('إجمالي المصروفات')
                break;
            default:
                setTitle('مصروفات اليــوم')
                break;
        }
    }, [id])

    const tableHeaders = [
        "تاريخ الإضافة",
        "المبــلغ",
        "الملاحظة",
    ];

    const row =
    {
        id: 1,
        date: "01 أغسطس 2025",
        price: "249.99",
        note: "تمت ملاحظة تقصير الموظف في تسليم المهام ضمن الوقت المحدد خلال الشهر الماضي، رغم تنبيهه مسبقًا بضرورة الالتزام بمواعيد التسليم. كما لوحظ ضعف في المتابعة اليومية للطلبات وقلة التفاعل مع الزملاء في فريق العمل. يُرجى من الموظف تحسين مستوى الانضباط والحرص على إنجاز المهام وفق الجدول الزمني المحدد، مع رفع تقارير الأداء بشكل دوري لضمان وضوح سير العمل وجودة النتائج.",
    }
        ;

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
                        {Array.from({ length: 10 }).map((_, index) => (
                            <tr key={index} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#fafafa] transition-all">
                                <td className="p-[15px_20px]">
                                    <div className="text-black text-[13px] font-medium whitespace-nowrap">
                                        <span>{row.date}</span>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-1.5 text-[#007C13] font-bold text-[14px]">
                                        <span>{row.price}</span>
                                        <Image src={greenRial} alt="rial" width={16} height={16} />
                                        <i className="fa-solid fa-circle-check text-[12px]"></i>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="max-w-[600px] text-[13px] text-[#616161] leading-relaxed text-right line-clamp-2 hover:line-clamp-none transition-all cursor-default">
                                        <span>{row.note}</span>
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