const ProductDescription = ({ description }: { description: string }) => {
  return (
    <div>
      <p className="mb-4 text-sm">{description}</p>
    </div>
  );
};

export default ProductDescription;
