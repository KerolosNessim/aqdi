"use client"
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { Edit, Plus, X } from 'lucide-react';
import { useState } from 'react';
import AddEmployeeForm from './add-employee-form';
export default function AddNewEmployeeDialog({ isEdit = false }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog dir='rtl' open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {isEdit ? (
          <Button className=" text-white">
            <Edit />
            تعديل
          </Button>
        ) : (
          <Button className='bg-brand-hover text-white h-12'>
            إضافة موظف جديد
            <Plus className='w-4 h-4' />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent closeButton={false} className="max-w-3xl">
        <DialogHeader>
          <div dir='rtl' className='flex items-center justify-between  border-b pb-4'>
            {/* header and close button */}
            <h2 className='text-xl font-bold'>إضاة موظف جديد</h2>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              <X className='w-4 h-4' />
            </Button>
          </div>

          <AddEmployeeForm isEdit={isEdit} />

        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
