import { Copy, Edit, FileText } from 'lucide-react';
import React from 'react';

const DetailCard = ({ label, value, icon, borderColor = "border-gray-200", highlighted = false, disabled = false }) => {
  const isZero = value === "لا يوجد" || value === 0;
  const isDisabled = disabled || isZero;

  return (
    <div
      className={`
        p-4 rounded-[16px] shadow-sm flex items-center justify-between relative transition-all
        ${highlighted ? 'bg-white border-2 border-blue-500 scale-[1.02] z-10' : 'bg-white'}
        ${isDisabled ? 'bg-gray-100 opacity-60' : 'hover:shadow-md'}
        ${!highlighted && !isDisabled ? `border-r-4 ${borderColor}` : ''}
        ${isDisabled && !highlighted ? 'border-r-4 border-gray-300' : ''}
      `}
    >
      <div className="flex flex-col gap-1 text-right w-full">
        <span className={`${isDisabled ? 'text-gray-400' : 'text-gray-400'} text-xs font-medium`}>{label}</span>
        <div className="flex items-center gap-2">
          {icon && <div className="text-gray-400">{icon}</div>}
          <span className={`font-bold text-sm lg:text-base ${isDisabled ? 'text-gray-400' : 'text-gray-800'}`}>
            {value}
          </span>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ title }) => (
  <div className="flex items-center justify-between mb-4 px-2">
    <div className="flex items-center gap-2">
      <FileText className="text-green-600 w-5 h-5" />
      <h3 className="text-gray-800 font-bold text-lg">{title}</h3>
    </div>
    <button className="flex items-center gap-1.5 text-green-600 hover:text-green-700 transition-colors text-sm font-bold">
      <Edit size={16} />
      <span>تعديل</span>
    </button>
  </div>
);

function FinancialDetailes({ data }) {
  const financialDetails = [
    { label: "مبلغ الإيجار السنوي للوحدة", value: data?.step4?.annual_rent_amount_for_the_unit || "---", borderColor: "border-blue-500" },
    { label: "نـوع الدفع", value: data?.step4?.payment_type_name || "---", borderColor: "border-yellow-400" },
    { label: "الغرامة اليومية", value: data?.step4?.daily_fine || "---", borderColor: "border-red-400" },
    { label: "إجمالي السعر", value: data?.step4?.contract_term_in_years?.price || "---",borderColor: "border-green-500" },
  ];

  const contractDetails = [
    { label: "مدة العقد", value: data?.step4?.contract_term_name || "---", borderColor: "border-purple-500" },
    { label: "تاريخ بداية العقد", value: data?.step4?.contract_starting_date || "---", borderColor: "border-green-500" },
    { label: "نوع التاريخ", value: data?.step4?.type_contract_starting_date === "hijri" ? "هجري" : "ميلادي", borderColor: "border-sky-400" },
  ];

  const otherTerms = [
    { label: "شروط إضافية", value: data?.step4?.other_conditions || "لا يوجد", borderColor: "border-gray-300" },
    { label: "نص الشروط الإضافية", value: data?.step4?.text_additional_terms || "---", borderColor: "border-gray-300" },
  ];

  return (
    <div className="space-y-8" dir="rtl">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Financial Data Section */}
        <div className="bg-gray-100/50 p-6 rounded-[28px] border border-gray-100">
          <SectionHeader title="البيانات المالية :" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {financialDetails.map((item, index) => (
              <DetailCard key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Contract Duration Section */}
        <div className="bg-gray-100/50 p-6 rounded-[28px] border border-gray-100">
          <SectionHeader title="مدة العقد :" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contractDetails.map((item, index) => (
              <DetailCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Other Terms Section */}
      <div className="bg-gray-100/50 p-6 rounded-[28px] border border-gray-100">
        <SectionHeader title="الشروط الإضافية :" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherTerms.map((item, index) => (
            <DetailCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FinancialDetailes;
