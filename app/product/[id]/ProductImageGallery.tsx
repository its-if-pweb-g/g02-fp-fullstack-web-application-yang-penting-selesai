const ProductImageGallery = ({ images }: { images: string[] }) => {
  return (
      <div className="flex space-x-4 mb-4">
          {images.map((image, index) => (
              <img key={index} src={image} alt={`Product Image ${index + 1}`} className="w-32 h-32 object-cover" />
          ))}
      </div>
  );
};

export default ProductImageGallery;
