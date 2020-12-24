import React from "react";
import { useSelector } from "react-redux";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../../redux/settingsSlice";
import "./feature-gallery.css";
import { imageUrlConverter } from "../../util/ImageUrlConverter";
export default function FeatureGallery({ gallery }) {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language = useSelector(selectLanguageSelection);

  return (
    <div className="feature__gallery">
      {gallery.map((ele, index) => (
        <div className="gallery__item">
          <img
            src={`${imageUrlConverter(`${ele.photoG}&res=${resulationSelector}`)}`}
            alt={ele.titleG}
          />
          <div className="gallery__text">
            {language == "en" ? (
              <div className="text--wraper">
              <span className="gallery__text--title">{ele.titleG}</span>
                <span className="gallery__text--desc">
                  {ele.shortDescriptionG}
                </span>
              </div>
            ) : (
              <div className="text--wraper">
                <span className="gallery__text--title">{ele.titleBanglaG}</span>
                <span className="gallery__text--desc">
                  {ele.shortDescriptionBanglaG}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
      {/* {language === "en"?( <img
        src={`${advertisiment.photo}&res=${resulationSelector}`}
        alt={advertisiment.name}
      />):( <img
        src={`${advertisiment.photoBangla}&res=${resulationSelector}`}
        alt={advertisiment.name}
      />)}
      */}
    </div>
  );
}
