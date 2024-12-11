import Link from "next/link";

const CATEGORIES_CARD = [
  {
    name: "Electronics Device",
    image: "/img/responsive.png",
    href: "/category?name=Electronics",
  },
  {
    name: "Fashion",
    image: "/img/fashionIcon.png",
    href: "/category?name=Fashion",
  },
  {
    name: "Sports",
    image: "/img/sportIcon.png",
    href: "/category?name=Sports",
  },
  {
    name: "Beauty & Care",
    image: "/img/skin-care.png",
    href: "/category?name=Beauty+&+Care",
  },
];

export default function CategoriesCard() {
  return (
    <div className="mx-auto max-w-screen-xl p-4 sm:px-6 sm:py-12 lg:px-8 ">
      <h2 className="text-2xl font-bold text-center mb-10">Categories</h2>
      <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES_CARD.map((category) => (
          <div
            key={category.name}
            className="flex flex-col rounded-lg bg-zinc-50 border-[1px] px-4 py-8 text-center cursor-pointer transition-color ease-in-out duration-300 hover:shadow-xl hover:shadow-zinc-50  hover:bg-[#def59f] ">
            <Link href={category.href}>
              <img
                src={category.image}
                alt={category.name}
                className="w-16 h-16 mx-auto"
              />
              <p className="text-base text-gray-800 font-semibold mt-4">
                {category.name}
              </p>
            </Link>
          </div>
        ))}
      </dl>
    </div>
  );
}
