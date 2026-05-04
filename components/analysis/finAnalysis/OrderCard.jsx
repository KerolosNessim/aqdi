import Image from "next/image";
import rial from "@/public/images/rial.svg";
import redRial from "@/public/images/redRial.svg";
import orderIcon from "@/public/images/ordericon.svg";
import Link from "next/link";
export default function OrderCard({ item }) {

    return (
        <div className={`flex justify-between items-center p-[20px_25px] bg-white rounded-[24px] border border-[#E4E4E4] max-[1700px]:p-[15px_20px] ${item.type === "onlyNumberTwoSpace" ? "col-span-2" : ""}`}>
            <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-2.5">
                    <span className="text-[#A3A3A3] text-[12px] font-normal">{item.name}</span>
                    {item.percentage && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#f9f9f9]">
                            <span className={`text-[10px] font-medium ${item.percentage.includes("-") ? "text-[#E24444]" : "text-[#0c6055]"}`}>{item.percentage}</span>
                            <i className={`text-[8px] ${item.percentage.includes("-") ? "fa-solid fa-arrow-down text-[#E24444]" : "fa-solid fa-arrow-up text-[#0c6055]"}`}></i>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2.5">
                    <span className={`text-[18px] font-semibold ${item.type === "totalLoss" ? "text-[#E24444]" : "text-black"}`}>{item.value}</span>
                    {
                        item.valueType === "price" ? <Image src={item.type === "totalLoss" ? redRial : rial} alt="Aakdi" width={20} height={20} /> : null
                    }
                </div>
            </div>
            <div className="flex flex-col items-end gap-2.5">
                <div className="w-[30px] h-[30px] rounded-full bg-[#FAFAFA] flex items-center justify-center">
                    <Image src={orderIcon} alt="Aakdi" width={16} height={16} />
                </div>
                {item.link && (
                    <Link href={item.link} className="bg-[#FAFAFA] rounded-[24px] text-[#A3A3A3] text-[12px] font-medium p-[8px_18px] transition-all hover:bg-brand-main hover:text-white">
                        عــرض
                    </Link>
                )}
            </div>
        </div>
    );
}