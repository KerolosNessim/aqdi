"use client";

const getStatusEmoji = (name = "") => {
  if (name.includes("جديد")) return "🆕";
  if (name.includes("استرجاع") || name.includes("مسترج")) return "↩️";
  if (name.includes("ملغ")) return "❌";
  if (name.includes("معلق")) return "⏳";
  if (name.includes("مستلم")) return "📥";
  if (name.includes("معالجة")) return "🤔";
  if (name.includes("تأكيد") && name.includes("عقار")) return "⏳";
  if (name.includes("عميل")) return "📱";
  if (name.includes("تم تأكيد")) return "🏠";
  if (name.includes("اعتماد")) return "🥳";
  if (name.includes("غير") || name.includes("غير مكتمل")) return "🚫";
  return "🧐";
};

const formatCount = (count) => {
  if (count == null || count === "") return "00";
  const num = Number(count);
  if (Number.isNaN(num)) return "00";
  if (num > 99) return String(num);
  return String(num).padStart(2, "0");
};

export default function OrdersStatusCards({
  statusItems = [],
  activeFilter,
  onFilterChange,
  showAllCard = true,
  allTotal = 0,
  countsById = {},
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
      {showAllCard && (
        <button
          type="button"
          onClick={() => onFilterChange("")}
          className={`bg-white rounded-[20px] border p-4 flex flex-col gap-3 text-right transition-all hover:-translate-y-1 hover:shadow-lg ${
            activeFilter === "" ? "border-brand-main shadow-md ring-2 ring-brand-main/10" : "border-[#E4E4E4]"
          }`}
        >
          <div className="flex items-start justify-between w-full">
            <span className="text-[26px] leading-none">📊</span>
            <span className="text-[28px] font-black text-black leading-none">{formatCount(allTotal)}</span>
          </div>
          <p className="text-[12px] font-bold text-black leading-tight min-h-[32px]">الكل</p>
          <span className="text-[11px] font-bold text-[#10B981] bg-[#E6FFE6] px-3 py-1 rounded-full w-fit">تصفية</span>
        </button>
      )}

      {statusItems?.map((item) => {
        const isActive = String(activeFilter) === String(item.id);
        const count =
          countsById[item.id] ??
          item.orders_count ??
          item.count ??
          item.total ??
          item.contracts_count ??
          0;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onFilterChange(item.id)}
            className={`bg-white rounded-[20px] border p-4 flex flex-col gap-3 text-right transition-all hover:-translate-y-1 hover:shadow-lg ${
              isActive ? "border-brand-main shadow-md ring-2 ring-brand-main/10" : "border-[#E4E4E4]"
            }`}
          >
            <div className="flex items-start justify-between w-full">
              <span className="text-[26px] leading-none">{getStatusEmoji(item.name)}</span>
              <span className="text-[28px] font-black text-black leading-none">{formatCount(count)}</span>
            </div>
            <p className="text-[12px] font-bold text-black leading-tight min-h-[32px]">{item.name}</p>
            <span className="text-[11px] font-bold text-[#10B981] bg-[#E6FFE6] px-3 py-1 rounded-full w-fit">تصفية</span>
          </button>
        );
      })}
    </div>
  );
}
