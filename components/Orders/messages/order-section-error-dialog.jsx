"use client";

import { useMemo } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  composeOrderErrorMessage,
  getAlertDialogTitle,
  getOrderClientPhone,
} from "./order-section-message-utils";

function WhatsAppIcon({ className = "size-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 0 0 .914.914l4.458-1.495A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.358-.213-2.642.886.886-2.575-.233-.375A9.818 9.818 0 1 1 12 21.818z" />
    </svg>
  );
}

function normalizeWhatsAppPhone(phone) {
  const digits = String(phone).replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("966")) return digits;
  if (digits.startsWith("0")) return `966${digits.slice(1)}`;
  if (digits.length === 9) return `966${digits}`;
  return digits;
}

export default function OrderSectionErrorDialog({
  open,
  onOpenChange,
  alert,
  orderData,
}) {
  const messageText = useMemo(
    () => composeOrderErrorMessage(alert, orderData),
    [alert, orderData]
  );
  const phone = getOrderClientPhone(orderData);
  const title = getAlertDialogTitle(alert);

  const copyMessage = async () => {
    if (!messageText.trim()) {
      toast.error("لا يوجد نص للنسخ");
      return;
    }
    try {
      await navigator.clipboard.writeText(messageText);
      toast.success("تم نسخ الرسالة");
    } catch {
      toast.error("تعذر نسخ الرسالة");
    }
  };

  const copyPhone = async () => {
    if (!phone) return;
    try {
      await navigator.clipboard.writeText(String(phone));
      toast.success("تم نسخ رقم الجوال");
    } catch {
      toast.error("تعذر نسخ الرقم");
    }
  };

  const openWhatsApp = () => {
    if (!phone) {
      toast.error("لا يوجد رقم جوال للعميل");
      return;
    }
    const normalizedPhone = normalizeWhatsAppPhone(phone);
    const url = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(messageText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        closeButton={false}
        dir="rtl"
        className="sm:max-w-[560px] p-8 sm:p-10 rounded-[28px] border-0 shadow-[0_24px_48px_rgba(0,0,0,0.12)]"
      >
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-[#737373] hover:text-black transition-colors text-xl leading-none w-8 h-8 flex items-center justify-center"
            aria-label="إغلاق"
          >
            ✕
          </button>
          <h2 className="text-[20px] font-bold text-black text-right">{title}</h2>
        </div>

        <div className="bg-[#F5F5F5] rounded-[20px] p-5 sm:p-6 mb-6 max-h-[min(50vh,360px)] overflow-y-auto">
          <p className="text-[14px] leading-[1.9] text-[#1A1A1A] whitespace-pre-wrap text-right">
            {messageText || "—"}
          </p>
        </div>

        {phone ? (
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-[#F3F3F3] px-4 py-2.5">
              <button
                type="button"
                onClick={openWhatsApp}
                className="text-[#25D366] hover:opacity-80 transition-opacity"
                aria-label="إرسال واتساب"
              >
                <WhatsAppIcon className="size-[22px]" />
              </button>
              <button
                type="button"
                onClick={copyPhone}
                className="text-[#737373] hover:text-black transition-colors"
                aria-label="نسخ رقم الجوال"
              >
                <Copy className="size-4" />
              </button>
              <span className="text-[15px] font-semibold text-[#1A1A1A]" dir="ltr">
                {phone}
              </span>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={copyMessage}
            className="flex items-center justify-center gap-2 h-[48px] min-w-[140px] px-8 rounded-[14px] bg-[#1D4ED8] text-white text-[15px] font-bold hover:bg-[#1e40af] transition-colors shadow-[0_8px_20px_rgba(29,78,216,0.35)]"
          >
            <Copy className="size-4 shrink-0" strokeWidth={2.5} />
            نسخ
          </button>
          {phone ? (
            <button
              type="button"
              onClick={openWhatsApp}
              className="flex items-center justify-center gap-2 text-[14px] font-semibold text-[#25D366] hover:underline"
            >
              <WhatsAppIcon className="size-[18px]" />
              إرسال للعميل عبر واتساب
            </button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
