'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import bluelogo from '@/public/images/blue-logo.svg';
import waving from '@/public/images/waving.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import Image from 'next/image';
import { useState } from 'react';
import 'react-phone-number-input/style.css';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/src/utils/axios';
import { useUserStore } from '@/src/stores/user-store';
import { useRouter } from 'next/navigation';
import { setAuthCookie } from '@/src/app/actions/auth';
import { enrichUserWithRolePermissions } from '@/src/lib/permissions';
import { toast } from 'sonner';

export default function LoginPage() {
  const { setAuth } = useUserStore();
  const router = useRouter();
  
  const FormSchema = z.object({
    email: z.string().email().nonempty("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    remember: z.boolean().refine(value => value === true, {
      message: "Please check the 'Remember me' box",
    }),
  });
  
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });
  

  const {mutate ,isPending}=useMutation({
    mutationFn:async(data)=>{
      const res = await axiosInstance.post('/admin/employees/login',data)
      return res.data
    },
    onSuccess: async (response) => {
      if (response?.success && response?.data?.token) {
        const userWithPermissions = await enrichUserWithRolePermissions(
          response.data,
          (roleId) => axiosInstance.get(`/admin/roles/${roleId}`).then((res) => res?.data)
        );
        toast.success(response?.message);
        setAuth(userWithPermissions, userWithPermissions?.token);
        await setAuthCookie(userWithPermissions?.token);
        router.push('/home');
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
      console.error('Login error:', error);
    }
  })
  const onSubmit = (formdata) => {
    const data = {
      email: formdata.email,
      password: formdata.password,
    }
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA] relative overflow-hidden p-4" dir="rtl">
      <div className="w-full max-w-[580px] bg-white rounded-[40px] border border-[#F0F0F0] shadow-2xl p-[50px_60px] relative z-10 max-[768px]:p-8 max-[480px]:p-6 max-[480px]:rounded-[24px]">
        <div className="flex items-center gap-3 mb-10">
          <Link href="/" className="transition-transform hover:scale-105">
            <div className="w-[60px] h-[60px] rounded-[18px] bg-white border flex items-center justify-center shadow-sm">
              <Image src={bluelogo} alt="logo" className="w-[45px] h-auto object-contain" />
            </div>
          </Link>
          <Image src={waving} alt="Welcome" className="w-[40px] h-auto object-contain" />
        </div>
        
        <h2 className="text-[32px] font-bold text-black mb-2 font-sans tracking-tight">مرحبـــــاً بعودتـــك !.</h2>
        <p className="text-[15px] text-[#A3A3A3] mb-10 font-medium">لوحة تحكم الموظفيــن.</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormField name="email" control={form.control} render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-2.5">
                  <FormLabel className="text-[14px] font-bold text-black flex items-center gap-1">
                    البريـــد الإلكتـــرونـــي <span className="text-[#FF4444]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                        type="email" 
                        className="h-[54px] rounded-[16px] border-[#EEEEEE] bg-[#F9F9F9] px-5 focus-visible:ring-1 focus-visible:ring-brand-main focus-visible:border-brand-main text-[14px]" 
                        placeholder="أدخل بريدك الإلكتروني هنــا ..." 
                        {...field} 
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-[#FF4444] text-[12px] mt-1" />
              </FormItem>
            )} />
            
            <FormField name="password" control={form.control} render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-2.5">
                  <FormLabel className="text-[14px] font-bold text-black flex items-center gap-1">
                    كلمة المرور <span className="text-[#FF4444]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                        type="password" 
                        className="h-[54px] rounded-[16px] border-[#EEEEEE] bg-[#F9F9F9] px-5 focus-visible:ring-1 focus-visible:ring-brand-main focus-visible:border-brand-main text-[14px]" 
                        placeholder="أدخل كلمة المرور هنــا ..."  
                        {...field} 
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-[#FF4444] text-[12px] mt-1" />
              </FormItem>
            )} />
            
            <FormField name="remember" control={form.control} render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between w-full mt-2">
                  <FormControl>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                          <input 
                              type="checkbox" 
                              className="peer appearance-none w-5 h-5 rounded-[6px] border-2 border-[#EEEEEE] bg-[#F9F9F9] checked:bg-brand-main checked:border-brand-main transition-all cursor-pointer"
                              checked={field.value} 
                              onChange={field.onChange} 
                          />
                          <i className="fa-solid fa-check absolute text-white text-[11px] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></i>
                      </div>
                      <span className="text-[13px] font-medium text-[#616161] group-hover:text-black transition-colors">تــذكرني</span>
                    </label>
                  </FormControl>
                  <Link href="/reset" className="text-[13px] font-medium text-brand-main hover:text-brand-hover transition-colors">
                    هل نسيــت كلمة المــرور !
                  </Link>
                </div>
                <FormMessage className="text-[#FF4444] text-[12px]" />
              </FormItem>
            )} />
            
            <div className="mt-4">
               <Button 
                type="submit" 
                className="w-full h-[58px] rounded-[20px] bg-black hover:bg-brand-main hover:shadow-lg hover:shadow-brand-main/20 text-white font-bold text-[16px] transition-all duration-300 flex items-center justify-center gap-3 group" 
                disabled={isPending}
              > 
                <span>{isPending ? "جار التحقق ..." : "تسجيـــل الدخــول"}</span>
                {!isPending && (
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover:-translate-y-1">
                        <i className="fa-solid fa-arrow-up rotate-[-45deg] text-[14px]"></i>
                    </span>
                )}
              </Button> 
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
