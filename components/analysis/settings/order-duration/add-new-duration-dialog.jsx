"use client"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog"
import { Loader2, Plus, X } from 'lucide-react'
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from '@/src/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
export default function AddNewDurationDialog() {
  const [open, setOpen] = useState(false);
  const [durationName, setDurationName] = useState("");
  const [durationType, setDurationType] = useState("");
  const [durationNote, setDurationNote] = useState("");

  const queryClient = useQueryClient();

  function addNewDuration() {
    return axiosInstance.post("/admin/contract-periods/create", {
      period: durationName,
      contract_type: durationType,
      note_ar: durationNote,
    })
  }

  const { mutate: addNewDurationMutate, isPending: addNewDurationPending } = useMutation({
    mutationFn: addNewDuration,
    onSuccess: (res) => {
      toast.success(res?.data?.message || "تم إضافة مدة جديدة بنجاح");
      setOpen(false);
      setDurationName("");
      setDurationType("");
      setDurationNote("");
      queryClient.invalidateQueries({ queryKey: ["contract-periods"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء إضافة مدة جديدة");
    }
  })

  const handleSubmit = () => {
    addNewDurationMutate();
  };
  return (
    <Dialog dir='rtl' open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className='bg-brand-hover text-white h-12'>
          إضافة مدة جديدة
          <Plus className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent closeButton={false} className="max-w-3xl">
        <DialogHeader>
          <div className='flex items-center justify-between  border-b pb-6'>
            {/* header and close button */}
            <h2 className='text-xl font-bold'>إضــافة مدة جديدة</h2>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              <X className='w-4 h-4' />
            </Button>
          </div>

          <div className='space-y-4'>
          <div dir='rtl' className='flex gap-4 items-center text-right'>

            <div className="space-y-2 grow">
              <label className="text-sm font-medium">
                مدة العقد <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="اكتب هنا ..."
                value={durationName}
                onChange={(e) => setDurationName(e.target.value)}
                className='h-12'
              />
            </div>

            {/* تصنيف الوحدة */}
            <div className="space-y-2 grow">
              <label className="text-sm font-medium">
                نوع العقد <span className="text-red-500">*</span>
              </label>

              <Select dir='rtl' onValueChange={setDurationType}>
                <SelectTrigger className='h-12'>
                  <SelectValue placeholder="اختر نوع العقد سكني - تجاري ..." />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="housing">سكني</SelectItem>
                  <SelectItem value="commercial">تجاري</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="space-y-2 text-right">
              <label className="text-sm font-medium">
                ملاحظات <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="اكتب هنا ..."
                value={durationNote}
                onChange={(e) => setDurationNote(e.target.value)}
                className='h-24'
              />
            </div>
          </div>

          {/* زر الإضافة */}
          <Button
            disabled={addNewDurationPending}
            onClick={handleSubmit}
            className="mx-auto block  h-12 bg-brand-hover "
          >
            {addNewDurationPending ? <Loader2 className='animate-spin' /> : "إضافة"}
          </Button>
          </div>

        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
