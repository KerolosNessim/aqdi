'use client'
import React, { useEffect, useState } from 'react'
import greenRial from '@/public/images/greenRial.svg'
import Image from 'next/image'
import waIcon from '@/public/images/waIcon.svg'
import Link from 'next/link'
import Header from '../home/Header'
import { toast } from 'sonner'
import { axiosInstance } from '@/src/utils/axios'
import { useQuery } from '@tanstack/react-query'
import Loader from '../home/loader'
import ChangeStatusDialog from './change-status-dialog'
import { useRouter } from 'next/navigation'

export default function AllOrdersWrapper({ id }) {
    const [activeFilter, setActiveFilter] = useState('');
    const router = useRouter()



    /*-------------------------------------------------------------------------------------*/
    // table headers
    const tableHeaders = [
        "رقــم الطلب",
        "رقــم جوال العميل",
        "نــوع العقــد",
        "نـوع الوثيقة",
        "الدفـــع",
        "مستلم منذ",
        "حــالة الطلب",
        "الاسـتلام",
        "الاجـــراءات",

    ];


    /*-------------------------------------------------------------------------------------*/
    // get all status
    function getStatus() {
        return axiosInstance("/admin/contract-statuses")
    }
    const { data: statusData, isLoading: statusLoading } = useQuery({
        queryKey: ["status"],
        queryFn: getStatus
    })
    const statusItems = statusData?.data?.data?.items;
    /*-------------------------------------------------------------------------------------*/
    // get all orders
    function getAllOrders() {
        return axiosInstance(`/admin/orders?contract_status_id=${activeFilter}`)
    }
    const { data, isLoading } = useQuery({
        queryKey: ["orders", activeFilter],
        queryFn: getAllOrders
    })
    const orders = data?.data?.data ?? []
    /*-------------------------------------------------------------------------------------*/
    // loader
    if (isLoading) {
        return <Loader />
    }
    /*-------------------------------------------------------------------------------------*/
    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen" dir="rtl">
            <Header page='welcome' title={"جميع الطلبات"} isMain={false} first="الرئيــسية" firstURL="/" second="جميع الطلبات" secondURL="/orders" />

            <div className="flex flex-col gap-6  mt-4  relative z-10">
                {/* search and filter orders */}
                <div className="space-y-4 w-full">
                    <div className="flex items-center gap-3">
                        {/* search */}
                        <div className="relative grow">
                            <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A3A3A3]" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
                                <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <input type="text" placeholder="البحث الذكي ...!" className="w-full h-[46px] bg-[#F9F9F9] border border-[#EEEEEE] rounded-full pr-12 pl-4 text-[14px] focus:outline-none focus:border-brand-main focus:bg-white transition-all shadow-inner" />
                        </div>
                    </div>
                </div>

                <div className="w-full ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 gap-4">
                        {/* قيد المعالجة */}
                        <div
                            className={` p-4 rounded-xl border transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg ${activeFilter === "" ? 'border-brand-main shadow-md -translate-y-2' : ''}`}
                            onClick={() => setActiveFilter("")}
                        >
                            <div className="flex items-center justify-center ">
                                <h3 className="text-[12px] font-bold text-black max-w-[80px] leading-tight text-center">الكل</h3>
                            </div>
                        </div>
                        {statusItems?.map((item) => (
                            <div
                                key={item?.id}
                                style={{ backgroundColor: item?.color }}
                                className={` p-4 rounded-xl border transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg ${activeFilter === item.name ? 'border-brand-main shadow-md -translate-y-2' : ''}`}
                                onClick={() => setActiveFilter(item.id)}
                            >
                                <div className="flex items-center justify-center ">
                                    <h3 className="text-[12px] font-bold text-white max-w-[80px] leading-tight text-center">{item?.name}</h3>
                                </div>
                            </div>
                        ))}

                        {/* عرض الكل */}
                        {/* <div
                            className={`flex flex-col justify-center items-center gap-3 p-3 rounded-[20px] border border-dashed transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg ${activeFilter === 'all' ? 'bg-brand-main/5 border-brand-main shadow-md' : 'bg-[#FAFAFA] border-[#D4D4D4]'}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[24px] leading-none">📊</span>
                                <h3 className="text-[13px] font-bold text-black">عرض الكل</h3>
                            </div>
                            <span className={`text-[11px] px-4 py-1.5 rounded-full font-bold w-full text-center mt-2 ${activeFilter === 'all' ? 'bg-brand-main text-white' : 'bg-[#E6F0FF] text-[#3B82F6]'}`}>عـرض الكــل</span>
                        </div> */}
                    </div>
                </div>
            </div>
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
                        {orders?.map((row) => (
                            <tr onClick={() => router.push(`/home/orders/${row.id}`)} key={row.id} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#fafafa] transition-all">
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center justify-center gap-2 px-3 py-1.5 bg-[#f9f9f9] rounded-lg w-fit mx-auto border border-[#eee]">
                                        <span className="text-black text-[12px] font-bold">{row?.uuid}</span>
                                        <button onClick={(e) => {
                                            e.stopPropagation()
                                            navigator.clipboard.writeText(row?.uuid)
                                            toast.success('تم نسخ رقم الطلب')
                                        }} className="text-[#A3A3A3] hover:text-brand-main">
                                            <i className="fa-regular fa-copy text-[11px]"></i>
                                        </button>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-2">
                                        <span className="text-black text-[13px]">{row?.user_mobile}</span>
                                        <button onClick={(e) => {
                                            e.stopPropagation()
                                            navigator.clipboard.writeText(row?.user_mobile)
                                            toast.success('تم نسخ رقم الجوال')
                                        }} className="text-[#A3A3A3] hover:text-brand-main">
                                            <i className="fa-regular fa-copy text-[11px]"></i>
                                        </button>
                                        <Link onClick={(e) => {
                                            e.stopPropagation()
                                        }} href={`https://wa.me/${row?.user_mobile}`} target="_blank" className="hover:scale-110 transition-all">
                                            <Image src={waIcon} alt="wa" width={16} height={16} />
                                        </Link>
                                    </div>
                                </td>
                                <td className="p-[15px_20px]">
                                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${row.contractType === 'سكنـي' ? 'bg-[#F0E6FF] text-[#7C3AED]' : row.contractType === 'تجــاري' ? 'bg-[#FFE6F0] text-[#EC4899]' : 'bg-[#E6F0FF] text-[#3B82F6]'}`}>
                                        {row?.contract_type}
                                    </span>
                                </td>
                                <td className="p-[15px_20px]">
                                    <span className="px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap bg-[#F9F9F9] border border-[#eee] text-[#4D4D4D]">
                                        {row?.instrument_type ?? "---"}
                                    </span>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className="flex items-center gap-1.5 text-[#007C13] font-bold text-[13px]">
                                        <span>{row?.amount_payment}</span>
                                        <Image src={greenRial} alt="rial" width={14} height={14} />
                                        <i className="fa-solid fa-circle-check text-[12px]"></i>
                                    </div>
                                </td>
                                <td className="p-[15px_20px] text-[13px] text-[#A3A3A3] whitespace-nowrap">{new Date(row?.updated_at).toLocaleDateString('ar-EG')}</td>
                                <td className="p-[15px_20px]">
                                    <span className="px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap" style={{ backgroundColor: row?.status?.color || "#FFFBE6" }}>
                                        {row?.status?.name ? row?.status?.name : "قيد المعالجه"}
                                    </span>
                                </td>
                                <td className="p-[15px_20px]">
                                    <span className="text-[13px] text-[#4D4D4D] font-medium">{row?.employee_name}</span>
                                </td>
                                <td className="p-[15px_20px]">
                                    <div className='flex items-center gap-2'>
                                        <button onClick={(e) => { e.stopPropagation(); router.push(`/home/orders/${row.id}`) }} className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F5F5F5] text-[#4D4D4D] hover:bg-brand-main hover:text-white transition-all">
                                            👁️
                                        </button>
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <ChangeStatusDialog orderId={row?.id} queryKey={['orders']} />
                                        </div>
                                    </div>
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