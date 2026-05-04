"use client"
import React from 'react'
import CommentForm from './comment-form'
import CommentCard from './comment-card'
import { useSidebarStore } from '@/src/stores/sidebar-store'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { axiosInstance } from '@/src/utils/axios'

export default function CommentList() {
  const { orderId } = useSidebarStore();
  function getOrderComments() {
    return axiosInstance.get(`/admin/orders/${orderId}/comments`)
      .then((res) => res?.data)
      .catch((err) => {
        throw err;
      })
  }
  const { data, isLoading } = useQuery({
    queryKey: ['orderComments', orderId],
    queryFn: getOrderComments
  })
  const comments = data?.data?.items
  console.log({comments})
  return (
    <div className='flex flex-col gap-6'>
      <CommentForm  />

      <div className='flex flex-col gap-4'>
        <p className='font-bold  text-black'>ملاحظات الموظفيــن :</p>
        {
          isLoading ? (
            <div className='flex items-center justify-center'>
              <Loader2 className='animate-spin h-6 w-6 text-brand-main' />
            </div>
          ) : (
            comments?.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))
          )
        }

      </div>
    </div>
  )
}
