import { useState, useEffect, useRef } from "react";

type ProductImageProps = {
  source: string;
  placeholderImg?: string;
  alt: string;
  disabledWithError?: boolean;
  className?: string;
};

const ProductImage = ({
  source,
  placeholderImg = '/image-broken.png',
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
    setHasError(true);
  };

  const handleLoad = () => {
    setHasError(false);
  };

  const shouldHide = disabledWithError && hasError;
  const displaySrc = !source || hasError ? placeholderImg : source;

  return (
    <img
      className={className}
      src={displaySrc}
      alt={alt}
      onError={handleError}
      onLoadedData={handleLoad}
      style={{
        ...(shouldHide && { display: "none" }),
      }}
    />
  );
};

export default ProductImage;