"use client";

import { useMemo, useState } from "react";
import { Bell, ChevronLeft, Home, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrderMessageAlerts } from "@/src/hooks/use-order-message-alerts";
import { filterAlertsByOrderContext, getErrorTypeLabel } from "./order-section-message-utils";
import OrderSectionErrorDialog from "./order-section-error-dialog";

function MessageRowIcon() {
  return (
    <span className="w-7 h-7 rounded-lg bg-white border border-[#E8E8E8] flex items-center justify-center shrink-0 text-[#333]">
      <Home className="size-3.5" aria-hidden />
    </span>
  );
}

export default function OrderSectionErrorMenu({
  label = "إرسال خطأ للعميل",
  orderData,
  context,
  messageType = "client",
  buttonClassName = "text-xs px-4 py-3 bg-pink-200 text-pink-600 rounded-full gap-2 h-auto font-semibold",
}) {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { clientAlerts, propertyAlerts, isLoading } = useOrderMessageAlerts(menuOpen || dialogOpen);

  const sourceAlerts = messageType === "property" ? propertyAlerts : clientAlerts;

  const menuItems = useMemo(() => {
    return filterAlertsByOrderContext(sourceAlerts, context);
  }, [sourceAlerts, context]);

  const handleSelect = (alert) => {
    setSelectedAlert(alert);
    setDialogOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      <DropdownMenu dir="rtl" open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button type="button" className={buttonClassName}>
            {label}
            <Bell className="size-4 shrink-0" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="p-3 rounded-[24px] min-w-[min(320px,calc(100vw-32px))] border border-[#EBEBEB] shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="size-5 animate-spin text-[#A3A3A3]" />
            </div>
          ) : menuItems.length === 0 ? (
            <p className="text-xs text-[#A3A3A3] text-center py-4 px-2">
              لا توجد رسائل لهذا القسم
            </p>
          ) : (
            <DropdownMenuGroup className="space-y-1">
              {menuItems.map((alert) => (
                <DropdownMenuItem
                  key={alert.id}
                  onClick={() => handleSelect(alert)}
                  className="flex items-center gap-2.5 rounded-[14px] px-2.5 py-3 cursor-pointer text-right"
                >
                  <ChevronLeft className="size-4 shrink-0 text-[#C4C4C4] mr-auto" />
                  <span className="flex-1 text-[13px] font-semibold text-[#1A1A1A] leading-snug">
                    {getErrorTypeLabel(alert)}
                  </span>
                  <MessageRowIcon />
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <OrderSectionErrorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        alert={selectedAlert}
        orderData={orderData}
      />
    </>
  );
}
