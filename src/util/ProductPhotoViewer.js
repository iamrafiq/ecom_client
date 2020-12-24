import React from "react";
import { useEffect, useState } from "react";
import { imageUrlConverter } from "./ImageUrlConverter";

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import "./productPhotoViewer.css";
const ProductPhotoViewer = ({ photosUrl, alt }) => {
  const [active, setActive] = useState({
    url: photosUrl[0],
    index: 0,
  });

  useEffect(() => {}, []);
  const onClickThumb = (index) => {
    setActive({ url: photosUrl[index], index: index });
    console.log("on click thumb");
  };
  return (
    <div className="main-container">
      {active && (
        <InnerImageZoom src={`${imageUrlConverter(`${active.url}&res=${"medium"}`)}`} zoomSrc={`${imageUrlConverter(`${active.url}&res=${"high"}`)}`}/>
      )}

      {photosUrl && photosUrl.length > 1 && (
        <div className="thumbs">
          {photosUrl.map((url, index) => {
            if (active.index === index) {
              return (
                <img
                  className="group round-circle-border"
                  src={`${imageUrlConverter(`${photosUrl[index]}&res=${"low"}`)}`}
                  alt={alt}
                  onClick={() => onClickThumb(index)}
                />
              );
            } else {
              return (
                <img
                  className="group"
                  src={`${imageUrlConverter(`${photosUrl[index]}&res=${"low"}`)}`}
                  alt={alt}
                  onClick={() => onClickThumb(index)}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default ProductPhotoViewer;
