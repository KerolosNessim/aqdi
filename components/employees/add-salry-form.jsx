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
  date2: z.string().min(2, "التاريخ يجب أن يكون على الأقل حرفين"),
  salary: z.string().min(2, "الراتب يجب أن يكون على الأقل حرفين"),
  sale: z.string().min(2, "الخصم يجب أن يكون على الأقل حرفين"),
  bonus: z.string().min(2, "المكافأة يجب أن تكون على الأقل حرفين"),
  total: z.string().min(2, "المجموع يجب أن يكون على الأقل حرفين"),

});

export default function AddSalaryForm() {
  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      date: "",
      date2: "",
      salary: "",
      sale: "",
      bonus: "",
      total: "",
    },
  });


  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


        {/* Name Fields */}
        <div dir='rtl' className="grid grid-cols-2 gap-4 text-right">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel>تـاريخ الاضــافة  </FormLabel>
                <FormControl>
                  <Input className="h-12" placeholder="أكتب هنا ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date2"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel>تـاريخ الاستحقاق  </FormLabel>
                <FormControl>
                  <Input className="h-12" placeholder="أكتب هنا ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel>الراتب الأساسي </FormLabel>
                <FormControl>
                  <Input className="h-12" placeholder="أكتب هنا ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sale"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel>الخصم </FormLabel>
                <FormControl>
                  <Input className="h-12" placeholder="أكتب هنا ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bonus"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel>المكافأة </FormLabel>
                <FormControl>
                  <Input className="h-12" placeholder="أكتب هنا ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel>المجموع </FormLabel>
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