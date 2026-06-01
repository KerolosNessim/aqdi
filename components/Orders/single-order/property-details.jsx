import React from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { ContractStepEditor } from "./contract-edit/contract-step-editor";
import {
  STEP1_ADDRESS_FIELDS,
  STEP1_PROPERTY_FIELDS,
} from "./contract-edit/contract-field-schemas";

const copy = (value) => {
  if (!value) return;
  navigator.clipboard.writeText(String(value));
  toast.success("تم النسخ بنجاح");
};

const DetailCard = ({ label, value, icon, borderColor = "border-gray-200" }) => (
  <div
    className={`bg-white p-4 rounded-[16px] shadow-sm flex items-center justify-between border-r-4 ${borderColor} relative transition-all hover:shadow-md`}
  >
    <div className="flex flex-col gap-1 text-right w-full">
      <span className="text-gray-400 text-xs font-medium">{label}</span>
      <div className="flex items-center gap-2">
        {icon && (
          <div className="text-gray-400 cursor-pointer" onClick={() => copy(value)}>
            {icon}
          </div>
        )}
        <span className="text-gray-800 font-bold text-sm lg:text-base">{value}</span>
      </div>
    </div>
  </div>
);

export default function PropertyDetails({ data }) {
  const nationalAddress = [
    {
      label: "المدينة",
      value: data?.step1?.city_name || data?.step1?.property_city_id || "---",
      icon: <Copy size={14} />,
      borderColor: "border-blue-500",
    },
    {
      label: "المنطقة",
      value: data?.step1?.property_place_name || data?.step1?.property_place_id || "---",
      icon: <Copy size={14} />,
      borderColor: "border-pink-500",
    },
    { label: "الشارع", value: data?.step1?.street || "---", icon: <Copy size={14} />, borderColor: "border-orange-500" },
    { label: "الحي", value: data?.step1?.neighborhood || "---", icon: <Copy size={14} />, borderColor: "border-purple-500" },
    { label: "رقم الإضافي", value: data?.step1?.extra_figure || "---", icon: <Copy size={14} />, borderColor: "border-green-500" },
    { label: "رقم المبنى", value: data?.step1?.building_number || "---", icon: <Copy size={14} />, borderColor: "border-blue-400" },
    { label: "الرمز البريدي", value: data?.step1?.postal_code || "---", icon: <Copy size={14} />, borderColor: "border-gray-800" },
  ];

  const propertyDetails = [
    { label: "استخدام العقار", value: data?.step1?.property_usages_name || "---", borderColor: "border-blue-600" },
    { label: "نوع العقار", value: data?.step1?.property_type_name || "---", borderColor: "border-lime-500" },
    { label: "إجمالي عدد الوحدات في كل طابق", value: data?.step1?.number_of_units_per_floor || "---", borderColor: "border-orange-500" },
    { label: "إجمالي عدد الطوابق", value: data?.step1?.number_of_floors || "---", borderColor: "border-gray-200" },
    { label: "عمر العقار", value: data?.step1?.age_of_the_property || "---", borderColor: "border-sky-400" },
    { label: "إجمالي عدد الوحدات في العقار", value: data?.step1?.number_of_units_in_realestate || "---", borderColor: "border-purple-600" },
    { label: "إسم مالك العقار", value: data?.contract_summary?.name_owner || "---", icon: <Copy size={14} />, borderColor: "border-gray-300" },
  ];

  return (
    <div dir="rtl">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <ContractStepEditor
            title="العنوان الوطني للعقار"
            step="step1"
            fields={STEP1_ADDRESS_FIELDS}
          >
            <div className="bg-gray-100/50 p-6 rounded-[28px] border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nationalAddress.map((item, index) => (
                  <DetailCard key={index} {...item} />
                ))}
              </div>
            </div>
          </ContractStepEditor>
        </div>

        <div>
          <ContractStepEditor
            title="تفاصيل العقار"
            step="step1"
            fields={STEP1_PROPERTY_FIELDS}
          >
            <div className="bg-gray-100/50 p-6 rounded-[28px] border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {propertyDetails.map((item, index) => (
                  <DetailCard key={index} {...item} />
                ))}
              </div>
            </div>
          </ContractStepEditor>
        </div>
      </div>
    </div>
  );
}
