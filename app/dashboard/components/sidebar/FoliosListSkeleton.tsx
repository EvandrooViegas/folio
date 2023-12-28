import { Skeleton } from "@/components/ui/skeleton"
export default function FoliosListSkeleton() {
    return (
        <ul className="flex flex-col gap-1 w-full ">
            {Array(5).fill(0).map((s, idx) => (
                <li key={idx}>
                    <Skeleton className="w-full h-[20px] rounded-full" />
                </li>
            ))}
        </ul>
    )
}