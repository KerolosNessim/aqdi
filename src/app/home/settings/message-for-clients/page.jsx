"use client"
import React from 'react';
import Header from '@/components/home/Header';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import AddNewMessageForClientDialog from '@/components/analysis/settings/message-for-clients/add-message-for-client';
import DisplayMessageForClientDialog from '@/components/analysis/settings/message-for-clients/display-message-for-client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/src/utils/axios';
import { toast } from 'sonner';
import Loader from '@/components/home/loader';
import { Trash2, Loader2 } from 'lucide-react';

export default function TermsPage() {
  const queryClient = useQueryClient();

  // Fetch client message alerts
  const { data: alertsResponse, isLoading } = useQuery({
    queryKey: ["message-alerts-client"],
    queryFn: () => axiosInstance.get("/admin/message-alerts/client").then(res => res.data)
  });

  const alerts = alertsResponse?.data?.items || alertsResponse?.data || [];
console.log(alerts)
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosInstance.post(`/admin/message-alerts/client/${id}/delete`),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "تم حذف الرسالة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["message-alerts-client"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ أثناء حذف الرسالة");
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen p-6" dir="rtl">
      <Header 
        page='welcome' 
        title={"الإعـدادات"} 
        isMain={false} 
        first="الرئيــسية" 
        firstURL="/" 
        second='الإعـدادات' 
        secondURL="/home/settings" 
        third="رســائل توضيحية للعمــلاء" 
        thirdURL="/home/settings/message-for-clients" 
      />

      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>رســائل توضيحية للعمــلاء</h2>
        <AddNewMessageForClientDialog />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
        {alerts?.map((item) => (
          <div className='bg-gray-200 rounded-[16px] border border-[#E4E4E4] p-4    transition-all group' key={item.id}>
            <div className='flex items-center justify-between'>
              <h3>{item.section?.name_ar || 'بدون قسم'}</h3>
              <div className='flex items-center gap-2'>
                <AddNewMessageForClientDialog isEdit={true} messageAlert={item} />
                <Button 
                  disabled={deleteMutation.isPending} 
                  onClick={() => deleteMutation.mutate(item.id)} 
                  className='bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold rounded-lg h-9 w-9 p-0 flex items-center justify-center'
                >
                  {deleteMutation.isPending && deleteMutation.variables === item.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 size={15} />
                  )}
                </Button>
              </div>
            </div>
            <div className=' mt-4 flex items-center justify-between'>
              <p>{item?.message || 'بدون بند'}</p>
              <DisplayMessageForClientDialog messageAlert={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
