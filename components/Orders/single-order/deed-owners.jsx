"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { BiEdit, BiSolidCopy } from "react-icons/bi";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { ContractStepEditor } from "./contract-edit/contract-step-editor";
import {
  SUMMARY_OWNER_FIELDS,
  SUMMARY_AGENT_FIELDS,
} from "./contract-edit/contract-field-schemas";

const OrderSectionErrorMenu = dynamic(
  () => import("@/components/Orders/messages/order-section-error-menu"),
  { ssr: false }
);



const display = (value) => {
  if (value === null || value === undefined || value === "") return "--";
  return value;
};

const resolveImageUrl = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value.trim() || null;
  if (typeof value === "object") {
    return value.url || value.path || value.full_url || value.src || null;
  }
  return null;
};

const INSTRUMENT_IMAGE_FIELDS = [
  { key: "image_instrument", label: "صورة الصك" },
  { key: "image_instrument_from_the_front", label: "صورة الصك من الأمام" },
  { key: "image_instrument_from_the_back", label: "صورة الصك من الخلف" },
  {
    key: "copy_power_of_attorney_from_heirs_to_agent",
    label: "نسخة الوكالة من الورثة للوكيل",
  },
  {
    key: "copy_of_the_endowment_registration_certificate",
    label: "نسخة شهادة تسجيل الوقف",
  },
  { key: "copy_of_the_trusteeship_deed", label: "نسخة صك النظارة" },
];

 const copy = (value) => {
  if (!value) return;
  navigator.clipboard.writeText(value);
  toast.success("تم النسخ بنجاح");
};

const InfoItem = ({ value, label }) => (
  <div>
    <p
      onClick={() => copy(value)}
      className="flex items-center gap-1 cursor-pointer"
    >
      {display(value)}
      {value && <BiSolidCopy size={16} />}
    </p>
    <p className="text-xs text-gray-400">{label}</p>
  </div>
);

const DeedOwners = ({ data }) => {
  const galleryRef = useRef(null);

const orderData = data?.contract_summary

  /* ================= Images ================= */
  const images = INSTRUMENT_IMAGE_FIELDS.map(({ key, label }) => {
    const url = resolveImageUrl(orderData?.[key]);
    if (!url) return null;

    return {
      original: url,
      thumbnail: url,
      description: label,
      originalAlt: label,
    };
  }).filter(Boolean);

  /* ================= Owner ================= */
  const owner = {
    name: orderData?.name_owner,
    phone: orderData?.property_owner_mobile,
    birthDate: orderData?.property_owner_dob,
    nationalId: orderData?.property_owner_id_num,
    iban: orderData?.property_owner_iban,
  };

  const location = {
    region: orderData?.relation_labels?.property_region,
    city: orderData?.relation_labels?.property_city,
    district: orderData?.neighborhood,
    street: orderData?.street,
  };

  /* ================= Agent ================= */
  const agent = {
    name: orderData?.name_owner,
    phone: orderData?.mobile_of_property_owner_agent,
    birthDate: orderData?.dob_of_property_owner_agent,
    nationalId: orderData?.id_num_of_property_owner_agent,
  };

  return (
    <div className="flex items-start gap-4" dir="rtl">
      {/* images */}
      {images.length > 0 && (
      <div className="w-1/3">
        <div className="flex items-center gap-1 text-xs">
          <p>صـورة الصك :</p>
          <Button variant="ghost" className="p-0 text-xs">
            <BiEdit size={16} className="text-green-500" />
            تعديل
          </Button>
        </div>

        
        <div dir="ltr" className="bg-gray-200 p-6 rounded-3xl">
          <ImageGallery ref={galleryRef} items={images} />
        </div>
      </div>
      )}

      {/* info */}
      <div className="w-2/3 space-y-10">
        {/* owner */}
        <div className="w-full">
          <ContractStepEditor
            title="بيــانات المــلاك"
            step="summary"
            fields={SUMMARY_OWNER_FIELDS}
          >
            <div className="flex justify-between gap-4">
              <div className="space-y-6 flex-1">
                <div className="grid grid-cols-3 gap-4">
                  <InfoItem value={owner.nationalId} label="رقم الهوية" />
                  <InfoItem value={owner.birthDate} label="تاريخ الميلاد" />
                  <InfoItem value={owner.phone} label="رقم الجوال" />
                  <InfoItem value={owner.name} label="اسم المالك" />
                  <div className="col-span-2">
                    <InfoItem value={owner.iban} label="ايبان المالك" />
                  </div>
                </div>
              </div>

              <OrderSectionErrorMenu
                label="إرسال خطأ"
                orderData={data}
                context="owner"
              />
            </div>
          </ContractStepEditor>
        </div>

        {orderData?.add_legal_agent_of_owner === 1 && (
          <div className="w-full">
            <ContractStepEditor
              title="بيــانات الوكيل"
              step="summary"
              fields={SUMMARY_AGENT_FIELDS}
            >
              <div className="flex justify-between bg-gray-100 p-6 rounded-3xl gap-4">
                <div className="space-y-6 flex-1">
                  <div className="grid grid-cols-3 gap-4">
                    <InfoItem value={agent.nationalId} label="رقم الهوية" />
                    <InfoItem value={agent.birthDate} label="تاريخ الميلاد" />
                    <InfoItem value={agent.phone} label="رقم الجوال" />
                    <InfoItem value={agent.name} label="اسم الوكيل" />
                  </div>
                </div>

                <OrderSectionErrorMenu
                  label="خطأ الوكيل"
                  orderData={data}
                  context="agent"
                />
              </div>
            </ContractStepEditor>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeedOwners;