export default function LayeringCard({ item }) {
    return (
        <div className="flex justify-between items-center p-[20px_25px] bg-white rounded-[24px] border border-[#E4E4E4] max-[1700px]:p-[15px_20px]">
            <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-2.5">
                    <span className="text-[#A3A3A3] text-[12px] font-normal">{item.name}</span>
                    {item.percentage && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#f9f9f9]">
                            <span className="text-[10px] text-[#0c6055] font-medium">{item.percentage}</span>
                        </div>
                    )}
                </div>
                <div className="lower">
                    <span className="text-black text-[18px] font-semibold">{item.value}</span>
                </div>
            </div>
        </div>
    );
}