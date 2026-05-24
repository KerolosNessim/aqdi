'use client'
import React, { useState } from 'react'
import greenRial from '@/public/images/greenRial.svg'
import Image from 'next/image'
import waIcon from '@/public/images/waIcon.svg'
import Link from 'next/link'
import Header from '../home/Header'
import { toast } from 'sonner'
import { axiosInstance } from '@/src/utils/axios'
import { useQuery } from '@tanstack/react-query'
import Loader from '../home/loader'
import { useRouter } from 'next/navigation'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function ReturnOrdersWrapper({ searchParams }) {
    
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
    const [resolvedParams, setResolvedParams] = useState(null)
    const [isResolved, setIsResolved] = useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    React.useEffect(() => {
        if (!searchParams) {
            setIsResolved(true);
            return;
        }
        if (searchParams instanceof Promise) {
            searchParams.then(res => {
                setResolvedParams(res);
                setIsResolved(true);
            });
        } else {
            setResolvedParams(searchParams);
            setIsResolved(true);
        }
    }, [searchParams])

    const createdAtParam = resolvedParams?.created_at || null;

    React.useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchQuery, createdAtParam]);

    const tableHeaders = [
        "رقــم الطلب",
        "العميل",
        "رقــم جوال العميل",
        "نــوع العقــد",
        "نـوع الوثيقة",
        "الدفـــع",
        "حــالة الطلب",
        "مستلم منذ",
        "الاسـتلام",
        "الاجـــراءات"
    ];

    function getReturnOrders(page = 1) {
        let url = `/admin/orders/return?page=${page}`;
        if (createdAtParam) {
            const createAt = createdAtParam === 'total' ? 'all' : createdAtParam === 'day' ? 'today' : createdAtParam;
            url += `&created_at=${createAt}`;
        }
        if (debouncedSearchQuery) {
            url += `&search=${encodeURIComponent(debouncedSearchQuery)}`;
        }
        return axiosInstance.get(url)
            .then(res => res.data);
    }

    const { data: responseData, isLoading, isError } = useQuery({
        queryKey: ['returnOrders', currentPage, createdAtParam, debouncedSearchQuery],
        queryFn: () => getReturnOrders(currentPage),
        enabled: isResolved,
    });

    const rawData = responseData?.data;
    const items = rawData?.items ?? [];
    const pagination = rawData?.pagination;

    // Formatting date
    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString('ar-EG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (e) {
            return dateStr;
        }
    }

    const getPageTitle = () => {
        if (!createdAtParam) return "الطلبات المسترجعة";
        switch (createdAtParam) {
            case 'day':
                return "الطلبات المسترجعة / اليــوم";
            case 'week':
                return "الطلبات المسترجعة / الأسبوع";
            case 'month':
                return "الطلبات المسترجعة / الشهر";
            case 'year':
                return "الطلبات المسترجعة / السنة";
            case 'total':
                return "إجمالي الطلبات المسترجعة";
            default:
                return "الطلبات المسترجعة";
        }
    }

    if (isLoading || !isResolved) return <Loader />
    if (isError) return <div className="text-center p-8 text-[#FA5252] text-[15px]">حدث خطأ أثناء تحميل بيانات طلبات الاسترجاع</div>

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen" dir="rtl">
            <Header page='welcome' title={getPageTitle()} isMain={false} first="الرئيــسية" firstURL="/" second="الطلبات المسترجعة" secondURL="/home/return-orders" />

            <div className="flex flex-col gap-6 mt-4 relative z-10">
                <div className="space-y-4 w-full">
                    <div className="flex items-center gap-3">
                        {/* search */}
                        <div className="relative grow">
                            <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A3A3A3]" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
                                <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <input
                                type="text"
                                placeholder="البحث الذكي ...!"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-[46px] bg-[#F9F9F9] border border-[#EEEEEE] rounded-full pr-12 pl-4 text-[14px] focus:outline-none focus:border-brand-main focus:bg-white transition-all shadow-inner"
                            />
                        </div>
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
                        {items.length > 0 ? (
                            items.map((row) => (
                                <tr
                                    onClick={() => router.push(`/home/orders/${row.id}`)}
                                    key={row.id}
                                    className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#fafafa] transition-all cursor-pointer"
                                >
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
                                    <td className="p-[15px_20px] text-black text-[13px] font-semibold whitespace-nowrap">
                                        {row?.user_name || "—"}
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
                                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${row.contract_type_key === 'housing' || row.contract_type === 'سكنـي' || row.contract_type === 'سكني' ? 'bg-[#F0E6FF] text-[#7C3AED]' : 'bg-[#FFE6F0] text-[#EC4899]'}`}>
                                            {row?.contract_type}
                                        </span>
                                    </td>
                                    <td className="p-[15px_20px]">
                                        <span className="px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap bg-[#F9F9F9] border border-[#eee] text-[#4D4D4D]">
                                            {row?.instrument_type ?? "---"}
                                        </span>
                                    </td>
                                    <td className="p-[15px_20px]">
                                        {row?.is_paid ? (
                                            <div className="flex items-center gap-1.5 text-[#007C13] font-bold text-[13px]">
                                                <span>{row?.amount_payment}</span>
                                                <Image src={greenRial} alt="rial" width={14} height={14} />
                                                <i className="fa-solid fa-circle-check text-[12px]"></i>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-[#EF4444] font-bold text-[13px]">
                                                <span>{row?.payment_label_ar || "لم يتم الدفع"}</span>
                                                <i className="fa-solid fa-circle-xmark text-[12px]"></i>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-[15px_20px]">
                                        <span
                                            className="px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap text-red-700"
                                            style={{ backgroundColor: row?.status?.color || "#f7e8e8" }}
                                        >
                                            {row?.status?.name || "استرجاع"}
                                        </span>
                                    </td>
                                    <td className="p-[15px_20px] text-[13px] text-[#A3A3A3] whitespace-nowrap">{formatDate(row?.created_at || row?.updated_at)}</td>
                                    <td className="p-[15px_20px]">
                                        <span className="text-[13px] text-[#4D4D4D] font-medium">{row?.employee_name}</span>
                                    </td>
                                    <td className="p-[15px_20px]">
                                        <div className='flex items-center gap-2'>
                                            <button onClick={(e) => { e.stopPropagation(); router.push(`/home/orders/${row.id}`) }} className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F5F5F5] text-[#4D4D4D] hover:bg-brand-main hover:text-white transition-all">
                                                👁️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={tableHeaders.length} className="text-center p-8 text-[#A3A3A3] text-sm">
                                    لا توجد طلبات مسترجعة متوفرة حالياً.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* pagination controls */}
            {pagination && pagination.last_page > 1 && (
                <div className="flex items-center justify-center gap-2.5 mt-6" dir="rtl">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-brand-main hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#A3A3A3]"
                    >
                        <ChevronRight className="size-4" />
                    </button>

                    {(() => {
                        const pages = [];
                        const { last_page } = pagination;
                        const range = 1;
                        const start = Math.max(1, currentPage - range);
                        const end = Math.min(last_page, currentPage + range);

                        if (start > 1) {
                            pages.push(1);
                            if (start > 2) pages.push('...');
                        }

                        for (let i = start; i <= end; i++) {
                            pages.push(i);
                        }

                        if (end < last_page) {
                            if (end < last_page - 1) pages.push('...');
                            pages.push(last_page);
                        }

                        return pages.map((page, idx) => {
                            if (page === '...') {
                                return (
                                    <span key={`dots-${idx}`} className="text-[#A3A3A3] px-1">
                                        ...
                                    </span>
                                );
                            }
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-medium transition-all ${currentPage === page
                                            ? "bg-brand-main text-white shadow-lg shadow-brand-main/20"
                                            : "border border-[#E4E4E4] text-[#A3A3A3] hover:bg-[#f5f5f5]"
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        });
                    })()}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(pagination.last_page, prev + 1))}
                        disabled={currentPage === pagination.last_page}
                        className="w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#A3A3A3] hover:bg-brand-main hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#A3A3A3]"
                    >
                        <ChevronLeft className="size-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
