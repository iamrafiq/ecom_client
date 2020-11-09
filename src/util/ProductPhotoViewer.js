import React from "react";
import { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import "./productPhotoViewer.css";
const ProductPhotoViewer = ({ photosUrl, alt }) => {
  const [active, setActive] = useState({
    url: photosUrl[0],
    index: 0,
  });
  useEffect(() => {
  },[]);
  const onClickThumb = (index) => {
    setActive({ url: photosUrl[index], index: index });
    console.log("on click thumb");
  };
  return (
    <div className="main-container">
      <div className="image-mag">
        {active && (
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: { alt },
                isFluidWidth: true,
                src: `${active.url}&res=${"high"}`,
              },
              largeImage: {
                src: `${active.url}&res=${"high"}`,
                width: 1200,
                height: 1800,
              },
              lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
              isHintEnabled: true,
              shouldHideHintAfterFirstActivation: false,
              enlargedImagePosition: "over",
            }}
          />
        )}

        {photosUrl && photosUrl.length > 1 && (
          <div className="thumbs">
            {photosUrl.map((url, index) => {
              if (active.index === index){
                return ( <img
                  className="group round-circle-border"
                  src={`${photosUrl[index]}&res=${"low"}`}
                  alt={alt}
                  onClick={() => onClickThumb(index)}
                />)
              }else{
                return ( <img
                  className="group"
                  src={`${photosUrl[index]}&res=${"low"}`}
                  alt={alt}
                  onClick={() => onClickThumb(index)}
                />)
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPhotoViewer;
