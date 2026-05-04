"use client"
import Header from '@/components/home/Header'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Loader2, Pentagon } from 'lucide-react';
import AddNewTypeDialog from '@/components/analysis/settings/unit-types/add-new-type-dialog';
import { axiosInstance } from '@/src/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import EditTypeUnitDialog from '@/components/analysis/settings/unit-types/edit-type-unit-dialog';
import AddNewPropertyTypeDialog from '@/components/analysis/settings/property-types/add-new-property-type-dialog';
import EditTypePropertyDialog from '@/components/analysis/settings/property-types/edit-type-property-dialog';
import AddNewDurationDialog from '@/components/analysis/settings/order-duration/add-new-duration-dialog';
import EditDurationDialog from '@/components/analysis/settings/order-duration/edit-duration-dialog';
export default function OrderDurationPage() {
  const [activeTab, setActiveTab] = useState("housing");
  const queryClient = useQueryClient();

  // get all unit types
  function getOrderDurations() {
    return axiosInstance(`/admin/contract-periods?contract_type=${activeTab}`);
  }

  const { data: orderDurations, isLoading: orderDurationsLoading } = useQuery({
    queryKey: ["contract-periods", activeTab],
    queryFn: getOrderDurations,
  })

  const data = orderDurations?.data?.data?.data;


  // delete unit type
  function deleteOrderDuration(id) {
    return axiosInstance.post(`/admin/contract-periods/${id}/delete`);
  }

  const { mutate: deleteOrderDurationMutate, isPending: deleteOrderDurationPending } = useMutation({
    mutationFn: deleteOrderDuration,
    onSuccess: (res) => {
      toast.success(res?.data?.message || "تم حذف المدة بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["contract-periods", activeTab]
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف المدة");
    }
  })



  return (
    <div className='p-6'>
      <Header page='welcome' title={"الإعـدادات"} isMain={false} first="الرئيــسية" firstURL="/" second='الإعـدادات' secondURL="/home/settings" third="مدة العقد" thirdURL="/home/settings/order-duration" />
      <div>
        <Tabs dir='rtl' defaultValue={activeTab} className="w-full">
          <div className='flex items-center justify-between mb-4'>
            <TabsList className="bg-transparent gap-4">
              <TabsTrigger value="housing" onClick={() => setActiveTab("housing")} className="data-[state=active]:bg-brand-hover data-[state=active]:text-white font-bold p-4 px-8 rounded-full gap-2 bg-gray-200"> <Pentagon className='w-4 h-4' />سكني</TabsTrigger>
              <TabsTrigger value="commercial" onClick={() => setActiveTab("commercial")} className="data-[state=active]:bg-brand-hover data-[state=active]:text-white font-bold p-4 px-8 rounded-full gap-2 bg-gray-200"> <Building2 className='w-4 h-4' />تجاري</TabsTrigger>
            </TabsList>
            <AddNewDurationDialog />
          </div >
          <TabsContent value="housing" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data?.map((item) => (
              <div className='bg-gray-200 rounded-[16px] border border-[#E4E4E4] p-4    transition-all group' key={item.id}>
                <h3>{item?.contract_type }</h3>
                <div className=' mt-4'>
                  <p className='text-sm font-bold'> مدة العقد : {item.period}</p>
                  <div className='flex items-center justify-end gap-2 mt-4'>
                    <EditDurationDialog duration={item} />
                    <Button disabled={deleteOrderDurationPending} onClick={() => deleteOrderDurationMutate(item.id)} className='bg-red-500/20 text-red-500 text-xs'>
                      حذف
                    </Button>
                  </div>

                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="commercial" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data?.map((item) => (
              <div className='bg-gray-200 rounded-[16px] border border-[#E4E4E4] p-4    transition-all group' key={item.id}>
                <h3>{item?.contract_type }</h3>
                <div className=' mt-4'>
                  <p className='text-sm font-bold'> مدة العقد : {item.period}</p>
                  <div className='flex items-center justify-end  gap-2 mt-4'>
                    <EditDurationDialog duration={item} />
                    <Button disabled={deleteOrderDurationPending} onClick={() => deleteOrderDurationMutate(item.id)} className='bg-red-500/20 text-red-500 text-xs'>
                      حذف
                    </Button>
                  </div>

                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

      </div>

    </div>
  )
}
