export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-10 px-10">
      <main>{children}</main>
    </div>
  );
}
