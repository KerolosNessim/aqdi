import { Copy, Edit, FileText } from 'lucide-react';
import React from 'react'

function ContractTenant({data}) {
  const unitGeneralDetails = [
    { label: "نــوع المستأجر", value: data?.step3?.tenant_role_name || "---", icon: <Copy size={14} />, borderColor: "border-blue-500" },
    { label: "رقــم هويـة المستأجر", value: data?.step3?.tenant_id_num || "---", icon: <Copy size={14} />, borderColor: "border-yellow-400" },
    { label: "تــاريخ ميـلاد المستأجر ", value: data?.step3?.tenant_dob || "---", borderColor: "border-blue-600" },
    { label: "رقـم جــوال المستأجر", value: data?.step3?.tenant_mobile || "---", icon: <Copy size={14} />, borderColor: "border-green-500" },
  ];

  const roomDetails = [
    { label: "نوع العقــد", value: data?.step4?.contract_type_name || "---", borderColor: "border-blue-500" },
    { label: "تــاريخ بدء العقــد", value: data?.step4?.contract_starting_date || "---", borderColor: "border-purple-500" },
    { label: "مــدة العقــد", value: data?.step4?.contract_duration || "---", borderColor: "border-gray-200" },
  ];
  return (
    <div>      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Room Details Section */}
      <div className="bg-gray-100/50 p-6 rounded-[28px] border border-gray-100">
        <SectionHeader title="نوع العقد تــاريخ بــدء العقــد  :" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roomDetails.map((item, index) => (
            <DetailCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Unit Details Section */}
      <div className="bg-gray-100/50 p-6 rounded-[28px] border border-gray-100">
        <SectionHeader title="تفــاصيل المستأجر :" />
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {unitGeneralDetails.map((item, index) => (
            <DetailCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div></div>
  )
}

export default ContractTenant


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