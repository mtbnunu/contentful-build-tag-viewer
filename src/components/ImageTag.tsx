import React, { useEffect, useState } from "react";

const ImageTag = (props: {
  imageUrl: string;
  pollingInterval: number;
  altText?: string;
}) => {
  const [timestamp, setTimestamp] = useState(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(function () {
      setTimestamp(new Date().getTime());
    }, props.pollingInterval);
    return () => {
      clearInterval(interval);
    };
  }, [timestamp, props.pollingInterval]);

  const formatImageUrl = (url: string) => {
    try {
      const newUrl = new URL(url);
      newUrl.searchParams.set("timestamp", timestamp.toString());
      return newUrl.toString();
    } catch (e) {
      console.warn("bad url?");
    }
  };

  return (
    <img
      src={formatImageUrl(props.imageUrl)}
      alt={props.altText}
      style={{ marginRight: 2, display: "inline" }}
    />
  );
};

export default ImageTag;
