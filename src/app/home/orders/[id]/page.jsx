"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/home/Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PiFilesLight } from "react-icons/pi";
import { TbPentagonMinus } from "react-icons/tb";
import { FaRegFileLines } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { LuShieldMinus } from "react-icons/lu";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BiSolidCopy } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";

import { toast } from 'sonner'
import DeedOwners from '@/components/Orders/single-order/deed-owners'
import { axiosInstance } from '@/src/utils/axios'
import { useQuery } from '@tanstack/react-query'
import ChangeStatusDialog from '@/components/Orders/change-status-dialog'
import PropertyDetails from '@/components/Orders/single-order/property-details'
import UnitDetailes from '@/components/Orders/single-order/unit-detailes'
import ContractTenant from '@/components/Orders/single-order/contract-tenant'
import FinancialDetailes from '@/components/Orders/single-order/financial-detailes'
const OrderDetailsPage = () => {
  const { id } = useParams()
  const tabStyle = "max-lg:flex-1 flex items-center text-xs gap-1 py-3 px-4 bg-gray-200 rounded-full border border-gray-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-transparent"

  //get single order
  function getSingleOrder() {
    return axiosInstance(`admin/orders/${id}`)
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ['single-order', id],
    queryFn: getSingleOrder,
  })
  const orderData = data?.data?.data


  const tabsButtons = [
    {
      value: "deed-owners",
      label: "الصك - الملاك",
      icon: <PiFilesLight size={20} />,
      content: <DeedOwners data={orderData} />
    },
    {
      value: "property-details",
      label: "تفاصيل العقار",
      icon: <TbPentagonMinus size={20} />,
      content: <PropertyDetails data={orderData} />
    },
    {
      value: "units-details",
      label: "تفاصيل الوحدات",
      icon: < FaRegFileLines size={20} />,
      content:<UnitDetailes data={orderData} />
    },
    {
      value: "contract-tenant",
      label: "العقد - المستأجر",
      icon: < FaEdit size={20} />,
      content: <ContractTenant data={orderData} />
    },
    {
      value: "financial-data",
      label: "البيانات المالية - الشروط",
      icon: <LuShieldMinus size={20} />,
      content: <FinancialDetailes data={orderData} />
    }
  ]

  return (
    <div>
      <Header isSingleOrder={true} orderId={id} page='welcome' title={"جميع الطلبات"} first="الرئيــسية" firstURL="/" second="جميع الطلبات" secondURL="/orders" third={id} thirdURL={`/home/orders/${id}`} />

      <section>
        <Tabs dir="rtl" defaultValue={tabsButtons[0].value} >
          <TabsList className='bg-transparent h-fit gap-1 w-full justify-between max-lg:flex-wrap max-lg:gap-3'>
            {tabsButtons.map((tab, index) => (
              <TabsTrigger key={index} value={tab.value} className={tabStyle}>
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
            {/* card */}
            <div className='flex items-center gap-2'>
              <div className='p-3 flex items-center gap-4  rounded-2xl text-xs' style={{ backgroundColor: orderData?.contract_status?.color }}>
                <p className='text-black flex flex-col font-semibold'>حــالة الطلب
                  <span className='font-normal'>{orderData?.contract_status?.name||"قيد المعالجه"}</span>
                </p>
                <ChangeStatusDialog orderId={orderData?.contract_summary?.id} queryKey={['single-order', orderData?.id]} />
              </div>
              <div onClick={() => {
                navigator.clipboard.writeText(orderData?.uuid)
                toast.success("تم نسخ رقم الطلب")
              }} className=' text-black p-3 flex items-center gap-2 bg-gray-200 border border-gray-300 rounded-2xl text-xs'>
                <BiSolidCopy size={20} />
                <div className=' flex flex-col font-semibold'>
                  رقم الطلب
                  <span className=' font-normal'>{orderData ? orderData?.uuid : "---" }</span>
                </div>
              </div>
              <div onClick={() => {
                navigator.clipboard.writeText(orderData?.user?.mobile)
                toast.success("تم نسخ رقم الجوال")
              }} className=' text-black p-3 flex items-center gap-2 bg-gray-200 border border-gray-300 rounded-2xl text-xs'>
                <BiSolidCopy size={20} />
                <div className=' flex flex-col font-semibold'>
                  رقــم الجــوال
                  <span className=' font-normal'>{orderData?.user?.mobile}</span>

                </div>
                <IoLogoWhatsapp className='text-2xl text-green-500' />

              </div>


            </div>
          </TabsList>

          {tabsButtons.map((tab, index) => (
            <TabsContent key={index} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  )
}

export default OrderDetailsPage