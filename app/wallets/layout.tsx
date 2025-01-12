import AnimatedGridBackground from "@/components/grid";

// wallets/layout.tsx
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
