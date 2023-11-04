import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"

export default function Feature({
    title,
    description,
    src,
    cols
}: {
    title: string,
    description?: string,
    src?: string | StaticImport,
    cols: number
}) {
    return (
        <div style={{
            "gridColumn": `span ${cols}`
        }} className={` bg-gray-1 flex flex-col p-8 items-center justify-center rounded-2xl gap-2`}>
            <h6 className="text-4xl font-black">{title}</h6>
            <p className="font-semibold text-2xl text-center text-gray-2">{description}</p>
                {!!src && (
                    <div className="relative w-full h-full  pt-[52%] ">
                        <Image src={src} fill className="object-contain object-right-bottom translate-x-8 translate-y-8" alt={`${title} image`} />
                    </div>
                )}
        </div>
    )
}