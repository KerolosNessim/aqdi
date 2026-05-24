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

import DeedOwners from '@/components/Orders/single-order/deed-owners'
import { axiosInstance } from '@/src/utils/axios'
import { useQuery } from '@tanstack/react-query'
import PropertyDetails from '@/components/Orders/single-order/property-details'
import UnitDetailes from '@/components/Orders/single-order/unit-detailes'
import ContractTenant from '@/components/Orders/single-order/contract-tenant'
import FinancialDetailes from '@/components/Orders/single-order/financial-detailes'
import OrderDetailsActions from '@/components/Orders/single-order/order-details-actions'
import LeaseRenewalOrderView from '@/components/Orders/single-order/lease-renewal/lease-renewal-order-view'
import Loader from '@/components/home/loader'

const OrderDetailsPage = () => {
  const { id } = useParams()
  const tabStyle = "max-lg:flex-1 flex items-center text-xs gap-1 py-3 px-4 bg-gray-200 rounded-full border border-gray-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-transparent"

  function getSingleOrder() {
    return axiosInstance(`admin/orders/${id}`)
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ['single-order', id],
    queryFn: getSingleOrder,
  })
  const orderData = data?.data?.data
  const isLeaseRenewal =
    orderData?.contract_summary?.instrument_type_key === "lease_renewal"

  if (isLoading) return <Loader />
  if (error || !orderData) {
    return (
      <div className="p-6 text-center text-[#A3A3A3]" dir="rtl">
        تعذر تحميل بيانات الطلب
      </div>
    )
  }

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
        {isLeaseRenewal ? (
          <LeaseRenewalOrderView orderData={orderData} />
        ) : (
          <Tabs defaultValue={tabsButtons[0].value}>
            <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-3 mb-4">
              <OrderDetailsActions orderData={orderData} />
              <TabsList className="bg-transparent h-fit gap-1 flex-wrap justify-start">
                {[...tabsButtons].reverse().map((tab, index) => (
                  <TabsTrigger key={tab.value} value={tab.value} className={tabStyle}>
                    {tab.icon}
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabsButtons.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </section>
    </div>
  )
}

export default OrderDetailsPage
