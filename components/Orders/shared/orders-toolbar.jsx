"use client";

import Link from "next/link";
import { Filter, RefreshCw, Search } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/src/utils/axios";
import AddCompleteOrder from "../add-complete-order";
import AddInCompleteOrder from "../add-incompleted-order";
import OrdersMoreFilters from "./orders-more-filters";
import { hasActiveAdvancedFilters } from "./orders-filter-utils";

const defaultQuickLinks = [
  { emoji: "✅", label: "تم التوثيق", href: "/home/completed-orders", match: ["توثيق", "وثق", "مكتمل"] },
  { emoji: "😎", label: "طلب واتساب مكتمل", href: "/home/completed-whatsapp", match: ["واتساب مكتمل", "واتساب المكتملة"] },
  { emoji: "😞", label: "مسترجع", href: "/home/return-orders", match: ["مسترج", "استرجاع"] },
];

function getQuickLinkCount(items, matchPatterns) {
  const item = items.find((entry) =>
    matchPatterns.some((pattern) => entry.label_ar?.includes(pattern))
  );
  return item?.value ?? 0;
}

export default function OrdersToolbar({
  searchQuery,
  onSearchChange,
  showAddButtons = false,
  queryKeys = [],
  showMoreFilters = false,
  onToggleMoreFilters,
  advancedFilters,
  onAdvancedFiltersChange,
  onResetAll,
  showStatusField = true,
}) {
  const queryClient = useQueryClient();

  const { data: analyticsData } = useQuery({
    queryKey: ["dashboard-analytics-quick"],
    queryFn: () => axiosInstance.get("/admin/dashboard-analytics").then((res) => res?.data),
  });

  const analyticsItems = analyticsData?.data?.order_analytics ?? [];

  const handleRefresh = () => {
    onResetAll?.();
    queryKeys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });
    queryClient.invalidateQueries({ queryKey: ["status"] });
    queryClient.invalidateQueries({ queryKey: ["order-status-count"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard-analytics-quick"] });
  };

  const filtersActive = hasActiveAdvancedFilters(advancedFilters);

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap items-center gap-3">
        {showAddButtons && (
          <>
            <AddCompleteOrder />
            <AddInCompleteOrder />
          </>
        )}

        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A3A3A3] size-5" />
          <input
            type="text"
            placeholder="البحث الذكي...!"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-[46px] bg-[#F9F9F9] border border-[#EEEEEE] rounded-full pr-12 pl-4 text-[14px] focus:outline-none focus:border-brand-main focus:bg-white transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {defaultQuickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-full border border-[#EEEEEE] hover:border-brand-main hover:shadow-sm transition-all text-[13px] font-bold text-black whitespace-nowrap"
            >
              <span>{link.emoji}</span>
              <span>{link.label}</span>
              <span className="bg-[#F5F5F5] text-[#616161] px-2 py-0.5 rounded-full text-[11px] min-w-[28px] text-center">
                {getQuickLinkCount(analyticsItems, link.match)}
              </span>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          className="w-[46px] h-[46px] flex items-center justify-center rounded-full border border-[#EEEEEE] bg-[#10B981] text-white hover:bg-[#0E9F6E] transition-all shadow-sm shrink-0"
          title="إعادة تعيين الفلاتر"
        >
          <RefreshCw className="size-5" />
        </button>

        <button
          type="button"
          onClick={onToggleMoreFilters}
          className={`h-[46px] px-5 rounded-full border font-bold text-[14px] transition-all shadow-sm flex items-center gap-2 shrink-0 ${
            showMoreFilters || filtersActive
              ? "border-brand-main bg-brand-main text-white"
              : "border-[#212121] bg-[#212121] text-white hover:bg-black"
          }`}
        >
          <Filter className="size-4" />
          فلترة أكثر
        </button>
      </div>

      {showMoreFilters && (
        <OrdersMoreFilters
          filters={advancedFilters}
          onChange={onAdvancedFiltersChange}
          showStatusField={showStatusField}
        />
      )}
    </div>
  );
}
