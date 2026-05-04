"use client"
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
export default function AddNewMessageForClientDialog({isEdit}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog dir='rtl' open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button className='bg-red-500/20 text-red-500 text-xs'>
            تعديل
          </Button>
        ) : (
          <Button className='bg-brand-hover text-white h-12'>
            إضافة رساله جديدة
            <Plus className='w-4 h-4' />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent closeButton={false} className="max-w-3xl">
        <DialogHeader>
          <div className='flex items-center justify-between  border-b pb-6'>
            {/* header and close button */}
            <h2 className='text-xl font-bold'>إضــافة رساله جديدة</h2>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              <X className='w-4 h-4' />
            </Button>
          </div>

          <div className='space-y-4'>
            <div dir='rtl' className='space-y-4 text-right'>
              {/* تصنيف الوحدة */}
              <div className="space-y-2 grow">
                <label className="text-sm font-medium">
                  اختر القسم <span className="text-red-500">*</span>
                </label>

                <Select dir='rtl' defaultValue={isEdit ? "option1" : ""}>
                  <SelectTrigger className='h-12'>
                    <SelectValue placeholder="اختر القسم ..." />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="option1">الصك</SelectItem>
                    <SelectItem value="option2">الوثيقه</SelectItem>
                    <SelectItem value="option3">نوع الوحدة</SelectItem>
                    <SelectItem value="option4">رقم وثيقة الملكية</SelectItem>
                    <SelectItem value="option5">تاريخ وثيقة الملكية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* تصنيف الوحدة */}
              <div className="space-y-2 grow">
                <label className="text-sm font-medium">
                  اختر بندالقسم <span className="text-red-500">*</span>
                </label>

                <Select dir='rtl' defaultValue={isEdit ? "option1" : ""}>
                  <SelectTrigger className='h-12'>
                    <SelectValue placeholder="اختر بند القسم ..." />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="option1">الصك</SelectItem>
                    <SelectItem value="option2">الوثيقه</SelectItem>
                    <SelectItem value="option3">نوع الوحدة</SelectItem>
                    <SelectItem value="option4">رقم وثيقة الملكية</SelectItem>
                    <SelectItem value="option5">تاريخ وثيقة الملكية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 grow">
                <label className="text-sm font-medium">
                  الرسالة <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="اكتب هنا ..."
                  defaultValue={isEdit ? "مرحبا بك في منصة عقدي" : ""}
                  className='h-12'
                />
              </div>


            </div>


            {/* زر الإضافة */}
            <Button
              className="mx-auto block  h-12 bg-brand-hover "
            >
              {isEdit ? "تعديل" : "إضافة"}
            </Button>
          </div>

        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
