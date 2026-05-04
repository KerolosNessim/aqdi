"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImageUp } from "lucide-react";

// Zod schema for validation
const employeeSchema = z.object({
  firstName: z.string().min(2, "الإسم يجب أن يكون على الأقل حرفين"),
  lastName: z.string().min(2, "الرتب الأنساني يجب أن يكون على الأقل حرفين"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  image: z
    .any()
    .refine((files) => files?.length > 0, "الرجاء اختيار صورة"),
});

export default function AddEmployeeForm({ isEdit = false }) {
  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: isEdit ? "محمد" : "",
      lastName: isEdit ? "احمد" : "",
      password: isEdit ? "123456" : "",
      email: isEdit ? "ahmed@gmail.com" : "",
      phone: isEdit ? "01023456789" : "",
      image:  null,
    },
  });

  const [preview, setPreview] = useState(isEdit ? "/images/defaultUser.jpg" : null);

  // Watch image changes for preview
  const imageFile = form.watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else if (!isEdit) {
      setPreview(null);
    }
  }, [imageFile, isEdit]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="min-h-30 p-6 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="flex items-center gap-2 flex-col ">
                    {preview ? (
                      <Image
                        width={100}
                        height={100}
                        src={preview}
                        alt="preview"
                        className="size-20 object-cover rounded-full border"
                      />
                    ) :
                      (
                        <div className="size-20 bg-white rounded-full flex items-center justify-center">
                          <ImageUp className="size-8" />
                        </div>
                      )
                    }

                    <span className="text-black text-sm">إضغط هنا لاختيــار الصور</span>
                    <span className="text-gray-500 text-xs">اسحب وادرج ملفاتك أو تصفح png - jepg</span>
                  </div>
                </div>
              </FormLabel>
              <FormControl>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                  className="border rounded p-2 w-full hidden"
                />
              </FormControl>
              <FormMessage />

            </FormItem>
          )}
        />

        {/* Name Fields */}
        <div dir='rtl' className="grid grid-cols-2 gap-4 text-right">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الإسم</FormLabel>
                <FormControl>
                  <Input className="h-12" placeholder="أكتب هنا ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الرتب الأنساني</FormLabel>
                <FormControl>
                  <Input className="h-12" placeholder="أكتب هنا ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem dir='rtl' className="text-right">
              <FormLabel >كلمة المرور</FormLabel>
              <FormControl>
                <Input className="h-12" type="password" placeholder="أكتب هنا ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email and Phone */}
        <div dir='rtl' className="grid grid-cols-2 gap-4 text-right">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input className="h-12" placeholder="أكتب هنا ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                  <Input className="h-12" placeholder="أكتب هنا ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button size="lg" type="submit" className="block w-fit mx-auto bg-brand-hover text-white">
          حفظ
        </Button>
      </form>
    </Form>
  );
}