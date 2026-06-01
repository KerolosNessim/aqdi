"use client";

import { BiSolidCopy } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { toast } from "sonner";
import ChangeStatusDialog from "@/components/Orders/change-status-dialog";
import PrintContractButton from "./print-contract-button";

const pillClass =
  "text-black p-3 flex items-center gap-2 bg-gray-200 border border-gray-300 rounded-2xl text-xs cursor-pointer shrink-0";

export default function OrderDetailsActions({ orderData }) {
  const copyText = (value, message) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    toast.success(message);
  };

  return (
    <div className="  shrink-0 space-y-2">
      <PrintContractButton orderData={orderData} />


<div className="flex items-center gap-2 flex-wrap">
<button
        type="button"
        onClick={() => copyText(orderData?.user?.mobile, "تم نسخ رقم الجوال")}
        className={pillClass}
      >
        <BiSolidCopy size={20} />
        <span className="flex flex-col font-semibold text-right">
          رقــم الجــوال
          <span className="font-normal">{orderData?.user?.mobile || "---"}</span>
        </span>
        <IoLogoWhatsapp className="text-2xl text-green-500 shrink-0" />
      </button>

      <button
        type="button"
        onClick={() => copyText(orderData?.uuid, "تم نسخ رقم الطلب")}
        className={pillClass}
      >
        <BiSolidCopy size={20} />
        <span className="flex flex-col font-semibold text-right">
          رقم الطلب
          <span className="font-normal">{orderData?.uuid || "---"}</span>
        </span>
      </button>
      <div
        className="p-3 flex items-center gap-3 rounded-2xl text-xs shrink-0"
        style={{ backgroundColor: orderData?.contract_summary?.contract_status_color }}
      >
        <p className="text-black flex flex-col font-semibold whitespace-nowrap">
          حــالة الطلب
          <span className="font-normal">
            {orderData?.contract_summary?.contract_status_name || "قيد المعالجه"}
          </span>
        </p>
        <ChangeStatusDialog
          orderId={orderData?.contract_summary?.id}
          queryKey={["single-order", orderData?.id]}
        />
      </div>




</div>
    </div>
  );
}
