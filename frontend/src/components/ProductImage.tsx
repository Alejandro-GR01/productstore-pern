import { useState, useEffect, useRef } from "react";
import PlaceholderImg from "/image-broken.png";

type ProductImageProps = {
  source: string;
  placeholderImg?: string;
  alt: string;
  disabledWithError?: boolean;
  className?: string;
};

const ProductImage = ({
  source,
  placeholderImg = PlaceholderImg,
  alt,
  disabledWithError = false,
  className = "",
}: ProductImageProps) => {
  const [hasError, setHasError] = useState(false);
  const prevSourceRef = useRef(source);

  // Reset error state solo cuando source cambia a un valor diferente
  useEffect(() => {
    if (source !== prevSourceRef.current) {
      prevSourceRef.current = source;
      setHasError(false);
    }
  }, [source]);

  const handleError = () => {
    if (hasError) return; // Evitar loops infinitos si el placeholder también falla
    setHasError(true);
  };

  const shouldHide = disabledWithError && hasError;
  const displaySrc = !source || hasError ? placeholderImg : source;

  return (
    <img
      className={`w-full h-auto min-h-32 object-cover object-center  ${className}`}
      src={displaySrc}
      alt={alt}
      onError={handleError}
      style={{
        ...(shouldHide && { display: "none" }),
      }}
    />
  );
};

export default ProductImage;
