import Image from "next/image";
import rial from "@/public/images/rial.svg";
import redRial from "@/public/images/redRial.svg";
import employeeIcon from "@/public/images/employeeicon.svg";
import dollarIcon from "@/public/images/dollarIcon.svg";
import Link from "next/link";

export default function AnalsCard({ item }) {
    return (
        <div className="flex flex-col gap-4 p-[20px_25px] bg-white rounded-[24px] border border-[#E4E4E4] max-[1700px]:p-[15px_20px]">
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-1.5">
                    <span className="text-black text-[18px] font-semibold">{item.value}</span>
                    <span className="text-[#A3A3A3] text-[12px] font-normal">{item.name}</span>
                </div>
                {
                    item.valueType === "price" ? <Image src={item.type === "totalLoss" ? redRial : rial} alt="Aakdi" width={22} height={22} className="object-contain" /> : <Image src={employeeIcon} alt="Aakdi" width={28} height={28} className="object-contain" />
                }
            </div>
            <div className="flex justify-end w-full">
                <Link href={"#"} className="bg-[#FAFAFA] rounded-[24px] text-[#A3A3A3] text-[12px] font-medium p-[8px_18px] transition-all hover:bg-brand-main hover:text-white">
                    عــرض
                </Link>
            </div>
        </div>
    );
}