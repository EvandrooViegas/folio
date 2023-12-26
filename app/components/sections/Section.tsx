import { HTMLAttributes } from "react";

export default function Section({
  children,
  ...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLElement>) {
  return (
    <section {...rest} className={`${rest?.className} px-8`}>
      <div className="max-app-width mx-auto  h-full">{children}</div>
    </section>
  );
}
