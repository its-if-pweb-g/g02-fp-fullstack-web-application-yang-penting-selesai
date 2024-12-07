import Link from "next/link";

export default function CategoriesCard() {
  return (
    <div className="mx-auto max-w-screen-xl p-4 sm:px-6 sm:py-12 lg:px-8 ">
      <h2 className="text-2xl font-bold text-center mb-10">Categories</h2>
      <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col rounded-lg bg-zinc-50 border-[1px] px-4 py-8 text-center cursor-pointer transition-color ease-in-out duration-300 hover:shadow-xl hover:shadow-zinc-50  hover:bg-[#def59f] ">
          <Link href="/categories/electronics">
            <img
              src="/img/responsive.png"
              alt="beauty & care"
              className="w-16 h-16 mx-auto"
            />
            <p className="text-base text-gray-800 font-semibold mt-4">
              Electronic Device
            </p>
          </Link>
        </div>
        <div className="flex flex-col rounded-lg bg-zinc-50 border-[1px] px-4 py-8 text-center cursor-pointer transition-color ease-in-out duration-300 hover:shadow-xl hover:shadow-zinc-50  hover:bg-[#def59f] ">
          <Link href="/categories/fashion">
            <img
              src="/img/fashionIcon.png"
              alt="beauty & care"
              className="w-16 h-16 mx-auto"
            />
            <p className="text-base text-gray-800 font-semibold mt-4">
              Fashion
            </p>
          </Link>
        </div>
        <div className="flex flex-col rounded-lg bg-zinc-50  border-[1px] px-4 py-8 text-center cursor-pointer transition-color ease-in-out duration-300 hover:shadow-xl hover:shadow-zinc-50  hover:bg-[#def59f] ">
          <Link href="/categories/sports">
            <img
              src="/img/sportIcon.png"
              alt="beauty & care"
              className="w-16 h-16 mx-auto"
            />
            <p className="text-base text-gray-800 font-semibold mt-4">Sports</p>{" "}
          </Link>
        </div>
        <div className="flex flex-col rounded-lg bg-zinc-50 border-[1px] px-4 py-8 text-center cursor-pointer transition-color ease-in-out duration-300 hover:shadow-xl hover:shadow-zinc-50  hover:bg-[#def59f] ">
          <Link href="/categories/beauty-and-care">
            <img
              src="/img/skin-care.png"
              alt="beauty & care"
              className="w-16 h-16 mx-auto"
            />
            <p className="text-base text-gray-800 font-semibold mt-4">
              Beauty & Care
            </p>
          </Link>
        </div>
      </dl>
    </div>
  );
}
