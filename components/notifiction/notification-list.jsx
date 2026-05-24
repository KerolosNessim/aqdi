"use client"
import React from 'react'
import NotifictionCard from './notifiction-card'
import { Clock, Hand, Loader2, X } from 'lucide-react'
import { LuTimerReset } from 'react-icons/lu'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/src/utils/axios'
import { useSidebarStore } from '@/src/stores/sidebar-store'
import { Button } from '../ui/button'

export default function NotificationList() {
  const {  setDisplayedPart } = useSidebarStore();
  function getUnreceivedOrders() {
    return axiosInstance.get('/admin/orders?is_received=false&per_page=100')
      .then((res) => res?.data)
      .catch((err) => {
        throw err;
      })
  }
  const { data, isLoading } = useQuery({
    queryKey: ['unReceivedOrders'],
    queryFn: getUnreceivedOrders
  })

  const responseData = data?.data;
  const unreceivedOrders = responseData?.items ?? (Array.isArray(responseData) ? responseData : []);
  const totalCount = responseData?.pagination?.total ?? unreceivedOrders.length;



  return (
    isLoading ? <div className='h-full flex items-center justify-center'>
      <Loader2 className='animate-spin h-12 w-12 text-brand-hover' />
    </div> :
      <div className='space-y-4 '>
        <div className='flex items-center gap-2'>
          <p className='font-bold text-lg text-black '>الإشعارات</p>
          <Button onClick={() => setDisplayedPart('default')} className="size-8 rounded-full flex items-center justify-center ms-auto">
            <X className='h-4 w-4' />
          </Button>
        </div>
        <div className='bg-white rounded-[18px] p-4 border border-[#F0F0F0] shadow flex flex-col gap-3.5' >
          {/* Top Row: Time and Notification Icon */}
          <div className='flex items-center justify-between w-full'>
            <p className='font-bold text-lg text-black '>طلبـــات جديــد</p>
            <div className=' flex items-center justify-center  text-[30px]'>
              🎉
            </div>
          </div>

          <p className='font-black text-black text-4xl flex items-center gap-2'>
            {totalCount}
            <LuTimerReset className='text-green-700' />

          </p>
        </div>
        {unreceivedOrders.map((order) => (
          <NotifictionCard key={order?.id} order={order} />
        ))}
      </div>
  )
}
