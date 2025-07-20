import React, { useState, useEffect } from "react";
import { fetchImageWithCache } from "../../utils/imageCache";

const Image = ({
  fileId: source,
  alt = "Image",
  className = "",
  fallbackImage = "",
  onLoad,
  onError,
  style = {},
  ...restProps
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      if (!source) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);

        // Check if fileId is a URL (string containing http/https, svg, or data URL)
        if (
          typeof source === "string" &&
          (source.includes("http") ||
            source.includes("svg") ||
            source.startsWith("data:"))
        ) {
          if (isMounted) {
            setImageUrl(source);
            setLoading(false);
          }
          return;
        }

        // Otherwise treat as a file ID and fetch from backend
        const imageData = await fetchImageWithCache(source);

        if (!imageData) {
          setError(true);
          setLoading(false);
          return;
        }

        if (isMounted) {
          const formattedUrl = imageData.startsWith("data:")
            ? imageData
            : `data:image/jpeg;base64,${imageData}`;

          setImageUrl(formattedUrl);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading image:", err);
        if (isMounted) {
          setError(true);
          setLoading(false);
          if (onError) onError(err);
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [source, onError]);

  const handleImageLoad = (e) => {
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e) => {
    console.error("Image load error for:", source);
    setError(true);
    if (onError) onError(e);
  };

  if (loading) {
    return <div className={`${className} bg-gray-200 animate-pulse`} />;
  }

  if (error && fallbackImage) {
    return (
      <img
        src={fallbackImage}
        alt={alt}
        className={className}
        style={style}
        onLoad={handleImageLoad}
        {...restProps}
      />
    );
  }

  if (error) {
    return (
      <div
        className={`${className} bg-primary flex items-center justify-center`}
      ></div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      style={style}
      onLoad={handleImageLoad}
      onError={handleImageError}
      {...restProps}
    />
  );
};

export default Image;