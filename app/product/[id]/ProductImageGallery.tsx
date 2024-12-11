import Image from "next/image";

const ProductImageGallery = ({ images }: { images: string | null }) => {
  return (
    <div className="flex grid-flow-row space-x-4 mb-4">
      <img
        src={images || "/images/placeholder.png"}
        alt={`Product Image`}
        className="w-full h-auto object-cover hover:scale-105 transition-all duration-300 ease-in-out"
      />
    </div>
  );
};

export default ProductImageGallery;
