"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, Trash2, Eye, User, Edit, FilePenLine, Plus, Wallet, Clock, Ban } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import AddNoteDialog from "./add-note-dialog";
import AddSalaryDialog from "./add-salary-dialog";
import AddNewEmployeeDialog from "./add-employee-dialog";

export default function EmployeeDetailsCard() {
  return (
    <div dir="rtl" className="text-right">
      <h2 className="text-lg font-bold">بيــانــات الموظـف :</h2>
      <div dir="rtl" className="grid grid-cols-3 gap-4  mt-4">
        {/* Right Profile Card */}
        <div className="bg-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">

          <div className="relative size-28 rounded-full ">

            <Image
              src="/images/defaultUser.jpg" // حط صورة هنا
              fill
              alt="avatar"
              className=" rounded-full object-cover"
            />
          </div>
          {/* 
          <div className='size-30! rounded-full bg-brand-main flex items-center justify-center'>
            <User className='size-15 text-white' />
          </div> */}

          <h3 className="mt-3 font-bold text-lg">يوسف عبد الله</h3>
          <p className="text-sm text-muted-foreground">
            موظف خدمة عملاء
          </p>

          <Button
            size="icon"
            className="mt-3 bg-green-600 hover:bg-green-700 text-white rounded-full"
          >
            <FaWhatsapp size={18} />
          </Button>
        </div>
        {/* Left Section */}
        <div dir='rtl' className="col-span-2 bg-gray-100 rounded-2xl p-4 flex flex-col justify-between">

          {/* Top Actions */}
          <div className="flex justify-end items-center gap-3">
            <AddNewEmployeeDialog isEdit={true} />
            <AddNoteDialog />
            <AddSalaryDialog />

          </div>

          {/* Middle Info */}
          <div className="flex items-center gap-8 mt-6">
            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="bg-brand-hover text-white p-6 rounded-full">
                <Mail size={20} />
              </div>
              <div className="text-right">
                <p className="font-medium">admin@gmail.com</p>
                <p className="text-sm text-muted-foreground">
                  البريد الإلكتروني
                </p>
              </div>
            </div>
            {/* salary */}
            <div className="flex items-center gap-3">
              <div className="bg-brand-hover text-white p-6 rounded-full">
                <Wallet size={20} />
              </div>
              <div className="text-right">
                <p className="font-medium">2000</p>
                <p className="text-sm text-muted-foreground">
                  الراتب الأساسي
                </p>
              </div>
            </div>
          </div>
          {/* Middle Info */}
          <div className="flex items-center gap-5 mt-10">
            {/* create date */}
            <div className="flex items-center gap-3">
              <div className="bg-black text-white p-6 rounded-full">
                <Clock size={20} />
              </div>
              <div>
                <p>23:18 - 15 سبتمبر 2025</p>
                <p className="text-muted-foreground text-xs">تاريخ الإنشاء</p>
              </div>
            </div>
            {/* update date */}
            <div className="flex items-center gap-3">
              <div className="bg-black text-white p-6 rounded-full">
                <Clock size={20} />
              </div>
              <div>
                <p>23:18 - 15 سبتمبر 2025</p>
                <p className="text-muted-foreground text-xs">تاريخ الإنشاء</p>
              </div>
            </div>

          </div>


          {/* Bottom Actions */}
          <div className="flex gap-3 mt-4 justify-end ">
            <Button size="icon" variant="secondary">
              <Ban size={16} />
            </Button>
            <Button size="icon" variant="destructive">
              <Trash2 size={16} />
            </Button>
          </div>
        </div>


      </div>
    </div>
  );
}