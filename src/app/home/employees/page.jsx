import AddNewEmployeeDialog from '@/components/employees/add-employee-dialog';
import Header from '@/components/home/Header';
import { Button } from '@/components/ui/button';
import greenRial from '@/public/images/greenRial.svg';
import { Ban, Blocks, Edit, Eye, Trash2, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EmployeesPage() {
  /*-------------------------------------------------------------------------------------*/
  // table headers
  const tableHeaders = [
    "الاسـم",
    "المسمي الوظيفي",
    "الراتب الاساسي",
    "رقــم الجـوال",
    "البريد الالكتروني",
    "الاجـــراءات",
  ];
  return (
    <div>
      {/* app header */}
      <Header page='welcome' title="الموظفين" isMain={false} first="الرئيــسية" firstURL="/" second='الموظفين' secondURL="/home/employees" />
      {/* page header */}
      <div className='flex items-center  justify-between'>
        <h3 className='text-xl font-bold'>الموظفين</h3>
        <AddNewEmployeeDialog />
      </div>
      {/* page content */}
      <div className="w-full overflow-x-auto bg-white rounded-[24px] border border-[#E4E4E4] mt-4 shadow-sm">
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
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr  key={index} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#fafafa] transition-all">
                <td className="p-[15px_20px]">
                  <div className='flex items-center gap-2'>
                    <div className='size-8 rounded-full bg-brand-main flex items-center justify-center'>
                      <User className='w-4 h-4 text-white' />
                    </div>
                    <span className='text-black text-xs'>محمد احمد</span>
                  </div>
                </td>
                <td className='p-[15px_20px]'>
                  <span className='bg-black text-white p-2 rounded-full text-xs'>موظف</span>
                </td>
                <td className="p-[15px_20px]">
                  <div className="flex items-center gap-1.5 text-[#007C13] font-bold text-[13px]">
                    <span>999</span>
                    <Image src={greenRial} alt="rial" width={14} height={14} />
                  </div>
                </td>
                <td className='p-[15px_20px]'>
                  <span className='text-black text-xs'>0500000000</span>
                </td>
                <td className='p-[15px_20px]'>
                  <span className='text-black text-xs'>ahmed@gmail.com</span>
                </td>
                <td className='p-[15px_20px]'>
                  <div className='flex items-center gap-2'>
                    <Link href="/home/employees/1" className="bg-brand-hover/20 text-black size-8 rounded-full flex items-center justify-center hover:bg-brand-hover hover:text-white transition-all"  >
                      <Eye className='size-4' />
                    </Link>
                    <Button variant="outline" size="icon"  >
                      <Ban />
                    </Button>
                    <Button className="bg-green-600/20 text-green-600" size="icon"  >
                      <Edit />
                    </Button>
                    <Button className="bg-red-600/20 text-red-600" size="icon"  >
                      <Trash2 />
                    </Button>
                  </div>
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}