"use client";

import { Check, Copy, Image } from 'lucide-react';
import React from 'react'
import ryal from '@/public/images/greenRial.svg';
import { toast } from 'sonner';

export default function ContractEmployeeTable() {
  /*-------------------------------------------------------------------------------------*/
  // table headers
  const tableHeaders = [
    "رقم العقد",
    "رقــم جوال العميل",
    "نــوع العقــد",
    "الدفـــع",
    "مستلم منذ",
    "الحالة",
    "الاسـتلام"
  ];
  return (
    <div className='mt-4'>

      <h2 className="text-lg font-bold">العقــود التي وثقــها الموظــف :</h2>
      < div className="w-full overflow-x-auto bg-white rounded-[24px] border border-[#E4E4E4] mt-4 shadow-sm" >
        <table className="w-full border-collapse">
          <thead className="bg-[#FAFAFA]">
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} className="text-right p-[15px_20px] text-[#A3A3A3] text-[13px] font-medium border-b border-[#E4E4E4] whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='max-h-[50vh]! overflow-y-auto no-scrollbar'>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#fafafa] transition-all">
                <td
                  className="p-[15px_20px]">
                  <div className='flex items-center gap-2'>
                    <span className='text-black text-xs'>000001</span>
                    <Copy onClick={() => {
                      navigator.clipboard.writeText("000001")
                      toast.success("تم نسخ رقم العقد")
                    }} size={14} className='text-black cursor-pointer' />
                  </div>
                </td>
                <td className='p-[15px_20px]'>
                  <div className='flex items-center gap-2'>
                    <span className='text-black  text-xs'>010483892195</span>
                    <Copy onClick={() => {
                      navigator.clipboard.writeText("010483892195")
                      toast.success("تم نسخ رقم الجوال")
                    }} size={14} className='text-black cursor-pointer' />
                  </div>
                </td>
                <td className="p-[15px_20px]">
                  <div className="flex items-center gap-1.5 ">
                    <span className='bg-blue-600/20 text-blue-600 text-xs p-2 rounded'>سكني</span>
                  </div>
                </td>
                <td className="p-[15px_20px]">
                  <div className="flex items-center gap-1.5 text-green-600 font-bold text-[13px]">
                    <span>249.99</span>
                    <Check size={14} className='text-green-600' />
                  </div>
                </td>
                <td className="p-[15px_20px]">
                  <div className="flex items-center gap-1.5 text-black font-bold text-[13px]">
                    <span>10 شهور</span>
                  </div>
                </td>
                <td className='p-[15px_20px]'>
                  <div className="flex items-center gap-1.5 ">
                    <span className='bg-blue-600/20 text-blue-600 text-xs rounded p-2'>تم التوثيق</span>
                  </div>
                </td>
                <td className='p-[15px_20px]'>
                  <div className="flex items-center gap-1.5 ">
                    <span className=' text-sm p-2'> يوسف عبدالله </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    </div >
  )
}
