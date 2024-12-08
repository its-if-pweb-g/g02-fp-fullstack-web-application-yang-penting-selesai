export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center md:my-20">
      <main>{children}</main>
    </div>
  );
}
