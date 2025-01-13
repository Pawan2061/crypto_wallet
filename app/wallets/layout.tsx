import RecoilContextProvider from "@/components/contextProvider";
import AnimatedGridBackground from "@/components/grid";
import { RecoilRoot } from "recoil";

export default function WalletsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AnimatedGridBackground />
      {children}
    </div>
  );
}
