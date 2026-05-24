"use client";

import greenRial from "@/public/images/greenRial.svg";
import waIcon from "@/public/images/waIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, MoreVertical } from "lucide-react";
import ChangeStatusDialog from "../change-status-dialog";

function formatRelativeTime(dateString) {
  if (!dateString) return "---";
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "الآن";
  if (minutes < 60) return `منذ ${minutes}د`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `منذ ${hours} س`;
  const days = Math.floor(hours / 24);
  return `منذ ${days} ي`;
}

export default function OrdersTable({
  orders = [],
  showStatusColumn = true,
  showChangeStatus = true,
  queryKey = ["orders"],
  onRowClick,
}) {
  const tableHeaders = [

    "رقــم الطلب",
    "رقــم جوال العميل",
    "نــوع العقــد",
    "نـوع الوثيقة",
    "الدفـــع",
    "مستلم منذ",
    ...(showStatusColumn ? ["حــالة الطلب"] : []),
    "الاسـتلام",
    "الاجـــراءات",
  ];

  return (
    <div className="w-full overflow-x-auto bg-white rounded-[24px] border border-[#E4E4E4] shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-[#FAFAFA]">
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="text-right p-[15px_20px] text-[#A3A3A3] text-[13px] font-medium border-b border-[#E4E4E4] whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={tableHeaders.length} className="text-center p-8 text-[#A3A3A3] text-sm">
                لا توجد طلبات متوفرة حالياً
              </td>
            </tr>
          ) : (
            orders.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#fafafa] transition-all cursor-pointer"
              >

                <td className="p-[15px_20px]">
                  <div className="flex items-center justify-center gap-2 px-3 py-1.5 bg-[#f9f9f9] rounded-lg w-fit mx-auto border border-[#eee]">
                    <span className="text-black text-[12px] font-bold">{row?.uuid}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(row?.uuid);
                        toast.success("تم نسخ رقم الطلب");
                      }}
                      className="text-[#A3A3A3] hover:text-brand-main"
                    >
                      <i className="fa-regular fa-copy text-[11px]" />
                    </button>
                  </div>
                </td>
                <td className="p-[15px_20px]">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`https://wa.me/${row?.user_mobile}`}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:scale-110 transition-all"
                    >
                      <Image src={waIcon} alt="wa" width={16} height={16} />
                    </Link>
                    <span className="text-black text-[13px]" dir="ltr">
                      {row?.user_mobile}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(row?.user_mobile);
                        toast.success("تم نسخ رقم الجوال");
                      }}
                      className="text-[#A3A3A3] hover:text-brand-main"
                    >
                      <i className="fa-regular fa-copy text-[11px]" />
                    </button>
                  </div>
                </td>
                <td className="p-[15px_20px]">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${
                      row?.contract_type_key === "housing" || row?.contract_type === "سكني"
                        ? "bg-[#E6F0FF] text-[#3B82F6]"
                        : "bg-[#F0E6FF] text-[#7C3AED]"
                    }`}
                  >
                    {row?.contract_type || "---"}
                  </span>
                </td>
                <td className="p-[15px_20px]">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap bg-[#F0E6FF] text-[#7C3AED]">
                    {row?.instrument_type ?? "---"}
                  </span>
                </td>
                <td className="p-[15px_20px]">
                  <div className="flex items-center gap-1.5 text-[#007C13] font-bold text-[13px]">
                    <i className="fa-solid fa-circle-check text-[12px]" />
                    <span>{row?.amount_payment}</span>
                    <Image src={greenRial} alt="rial" width={14} height={14} />
                  </div>
                </td>
                <td className="p-[15px_20px] text-[13px] text-[#A3A3A3] whitespace-nowrap">
                  {formatRelativeTime(row?.updated_at)}
                </td>
                {showStatusColumn && (
                  <td className="p-[15px_20px]">
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap text-[#212121]"
                      style={{ backgroundColor: row?.status?.color || "#E6FFE6" }}
                    >
                      {row?.status?.name || "قيد المعالجة"}
                    </span>
                  </td>
                )}
                <td className="p-[15px_20px]">
                  <span className="text-[13px] text-[#4D4D4D] font-medium">{row?.employee_name || "---"}</span>
                </td>
                <td className="p-[15px_20px]">
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => onRowClick?.(row)}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F5F5F5] text-[#4D4D4D] hover:bg-brand-main hover:text-white transition-all"
                    >
                      <Eye className="size-4" />
                    </button>
                    {showChangeStatus && (
                      <ChangeStatusDialog orderId={row?.id} queryKey={queryKey} />
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
