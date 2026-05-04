import { Image } from 'lucide-react';
import React from 'react'
import ryal from '@/public/images/greenRial.svg';

export default function NotesTable() {
  /*-------------------------------------------------------------------------------------*/
  // table headers
  const tableHeaders = [
    "تاريخ الإضافة",
    "الملاحظة",
  ];
  return (
    <div className='mt-4'>
      <h2 className="text-lg font-bold">ملاحظات :</h2>
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
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#fafafa] transition-all">
                <td className="p-[15px_20px]">
                  <div className='flex items-center gap-2'>
                    <span className='text-black text-sm'>01 أغسطس 2025</span>
                  </div>
                </td>
                <td className="p-[15px_20px]">
                  <div className='flex items-center gap-2'>
                    <span className='text-black text-xs '>تمت ملاحظة تقصير الموظف في تسليم المهام ضمن الوقت المحدد خلال الشهر الماضي</span>
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
