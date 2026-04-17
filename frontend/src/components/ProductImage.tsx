import { useMemo, useState } from "react";
type ProductImageProps = {
  source: string;
  placeholderImg?: string;
  alt: string;
  disabledWithError?: boolean;
  className?: string;
};

const ProductImage = ({
  source,
  placeholderImg,
  alt,
  disabledWithError = false,
  className = "",
}: ProductImageProps) => {
  const src = useMemo(() => source, [source]);
  const picture = document.querySelector('#product-image')



  const handelError = (e) => {
    if (!disabledWithError) {
      e.target.src = placeholderImg;
    
    
    } else {
      e.target.style.display = "none";
    }
  };
  return (
    <img
    id="product-image"
      className={className}
      src={src || placeholderImg}
      alt={alt}
      onError={handelError}
    />
  );
};

export default ProductImage;
