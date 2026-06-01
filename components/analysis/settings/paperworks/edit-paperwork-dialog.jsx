"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/src/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditPaperworkDialog({ paperwork }) {
  const [open, setOpen] = useState(false);
  const [nameAr, setNameAr] = useState(paperwork?.name_ar || "");
  const [nameEn, setNameEn] = useState(paperwork?.name_en || "");
  const [contractType, setContractType] = useState(paperwork?.contract_type || "housing");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!open) return;
    setNameAr(paperwork?.name_ar || "");
    setNameEn(paperwork?.name_en || "");
    setContractType(paperwork?.contract_type || "housing");
  }, [open, paperwork]);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      axiosInstance.post(`/admin/paperworks/${paperwork?.id}`, {
        name_ar: nameAr,
        name_en: nameEn,
        contract_type: contractType,
      }),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "تم تعديل ورقة العمل بنجاح");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["paperworks"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء تعديل ورقة العمل");
    },
  });

  return (
    <Dialog dir="rtl" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-hover/20 text-brand-hover text-xs">تعديل</Button>
      </DialogTrigger>
      <DialogContent closeButton={false} className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between border-b pb-6">
            <h2 className="text-xl font-bold">تعديل ورقة العمل</h2>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4 text-right">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                الاسم بالعربية <span className="text-red-500">*</span>
              </label>
              <Input
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                الاسم بالإنجليزية <span className="text-red-500">*</span>
              </label>
              <Input
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="h-12"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">نوع العقد</label>
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="housing">سكني</SelectItem>
                  <SelectItem value="commercial">تجاري</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              disabled={isPending || !nameAr.trim() || !nameEn.trim()}
              onClick={() => mutate()}
              className="mx-auto block h-12 bg-brand-hover"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "تعديل"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
