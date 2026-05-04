import React, { useState } from 'react';
import { Copy, MapPin, Edit, Bell, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TbPentagonMinus } from 'react-icons/tb';
import { MdChevronLeft } from 'react-icons/md';
import NotClear from './not-clear';
import { Dialog, DialogContent, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { HiMiniBellAlert } from 'react-icons/hi2';

const DetailCard = ({ label, value, icon, borderColor = "border-gray-200" }) => (
  <div className={`bg-white p-4 rounded-[16px] shadow-sm flex items-center justify-between border-r-4 ${borderColor} relative transition-all hover:shadow-md`}>
    <div className="flex flex-col gap-1 text-right w-full">
      <span className="text-gray-400 text-xs font-medium">{label}</span>
      <div className="flex items-center gap-2">
        {icon && <div className="text-gray-400">{icon}</div>}
        <span className="text-gray-800 font-bold text-sm lg:text-base">{value}</span>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title }) => (
  <div className="flex items-center justify-between mb-4 px-2">
    <div className="flex items-center gap-2">
      <FileText className="text-green-600 w-5 h-5" />
      <h3 className="text-gray-800 font-bold text-lg">{title}</h3>
    </div>
    <button className="flex items-center gap-1.5 text-green-600 transition-colors text-sm">
      <Edit size={16} />
      <span>تعديل</span>
    </button>
  </div>
);

export default function PropertyDetails({ data }) {
  const [open, setOpen] = useState(false);


  const nationalAddress = [
    { label: "المدينة", value: data?.step1?.property_city?.name_ar || data?.step1?.property_city_id || "---", icon: <Copy size={14} />, borderColor: "border-blue-500" },
    { label: "المنطقة", value: data?.step1?.property_region?.name_ar || data?.step1?.property_place_id || "---", icon: <Copy size={14} />, borderColor: "border-pink-500" },
    { label: "الشارع", value: data?.step1?.street || "---", icon: <Copy size={14} />, borderColor: "border-orange-500" },
    { label: "الحي", value: data?.step1?.neighborhood || "---", icon: <Copy size={14} />, borderColor: "border-purple-500" },
    { label: "رقم الإضافي", value: data?.step1?.extra_figure || "---", icon: <Copy size={14} />, borderColor: "border-green-500" },
    { label: "رقم المبنى", value: data?.step1?.building_number || "---", icon: <Copy size={14} />, borderColor: "border-blue-400" },
    { label: "الرمز البريدي", value: data?.step1?.postal_code || "---", icon: <Copy size={14} />, borderColor: "border-gray-800" },
  ];

  const propertyDetails = [
    { label: "استخدام العقار", value: data?.step1?.property_usages_id || "---", borderColor: "border-blue-600" },
    { label: "نوع العقار", value: data?.step1?.property_type_id || "---", borderColor: "border-lime-500" },
    { label: "إجمالي عدد الوحدات في كل طابق", value: data?.step1?.number_of_units_per_floor || "---", borderColor: "border-orange-500" },
    { label: "رقم العقار", value: data?.step1?.number_of_units_in_realestate || "---", borderColor: "border-green-500" },
    { label: "إجمالي عدد الطوابق", value: data?.step1?.number_of_floors || "---", borderColor: "border-gray-200" },
    { label: "عمر العقار", value: data?.step1?.age_of_the_property || "---", borderColor: "border-sky-400" },
    { label: "إجمالي عدد الوحدات في العقار", value: data?.step1?.number_of_units_in_realestate || "---", borderColor: "border-purple-600" },
    { label: "إسم مالك العقار", value: data?.contract_summary?.name_owner || "---", icon: <Copy size={14} />, borderColor: "border-gray-300" },
  ];

  return (
    <div dir="rtl">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* National Address Section */}
        <div>
          <SectionHeader title="العنوان الوطني للعقار" />
          <div className="bg-gray-100/50 p-6 rounded-[28px] border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nationalAddress.map((item, index) => (
                <DetailCard key={index} {...item} />
              ))}
            </div>

            <div className="mt-12 flex justify-start">
              {/* dropdown */}
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <Button className="text-xs p-4 bg-pink-200 text-pink-600 rounded-full">
                    إرسال خطأ <HiMiniBellAlert />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="p-4 rounded-3xl">
                  <DropdownMenuGroup className="space-y-2">
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                      <TbPentagonMinus />
                      صورة الصك غير واضحة
                      <MdChevronLeft />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Property Details Section */}
        <div>
          <SectionHeader title="تفاصيل العقار" />
          <div className="bg-gray-100/50 p-6 rounded-[28px] border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {propertyDetails.map((item, index) => (
                <DetailCard key={index} {...item} />
              ))}
            </div>
          </div>
        </div>

      </div>



      {/* dialogs */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent closeButton={false}>
          <DialogHeader>
            <DialogDescription>
              <NotClear setOpen={setOpen} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
