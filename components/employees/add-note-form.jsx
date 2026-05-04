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
import { Textarea } from "../ui/textarea";

// Zod schema for validation
const employeeSchema = z.object({
  date: z.string().min(2, "التاريخ يجب أن يكون على الأقل حرفين"),
  note: z.string().min(2, "الملاحظة يجب أن تكون على الأقل حرفين"),
});

export default function AddEmployeeForm() {
  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      date: "",
      note: "",
    },
  });


  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


        {/* Name Fields */}
        <div dir='rtl' className="space-y-4 text-right">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel>التاريخ</FormLabel>
                <FormControl>
                  <Input className="h-12" placeholder="أكتب هنا ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel>الملاحظة</FormLabel>
                <FormControl>
                  <Textarea className="h-40" placeholder="أكتب هنا ..." {...field} />
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