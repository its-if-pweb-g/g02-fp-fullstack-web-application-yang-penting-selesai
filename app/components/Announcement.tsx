import Link from "next/link";

export default function Announcement() {
  return (
    <div className="bg-[#bade57] px-4 py-3 text-[#1A1A19] hidden md:block">
      <p className="text-center text-sm font-medium">
        🔥 12.12 MEGA SALE IS HERE! 🔥{" "}
        <Link href="#">Limited Time Offers – Don’t Miss Out! ✅</Link>
      </p>
    </div>
  );
}
