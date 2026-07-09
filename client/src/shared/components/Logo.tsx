import { Radar } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex items-center gap-2">
            <Radar className="w-5 h-5 text-[#7C6AEF]" strokeWidth={1.75} />
            <span className="font-medium text-[#E4E2ED] tracking-tight">ScoutVeil</span>
        </div>
    )
}