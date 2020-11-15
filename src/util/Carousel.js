import React from "react";
import { Carousel } from "react-responsive-carousel";
import {
  selectResolutionSelection,
  selectLanguageSelection,
} from "../redux/settingsSlice";
import { useSelector } from "react-redux";
import {imageUrlConverter} from "./ImageUrlConverter";

// const tooglesGroupId = 'Toggles';
// const valuesGroupId = 'Values';
// const mainGroupId = 'Main'
// const getConfigurableProps = () => ({
//     showArrows: Boolean('showArrows', true, tooglesGroupId),
//     showStatus: Boolean('showStatus', true, tooglesGroupId),
//     showIndicators: Boolean('showIndicators', true, tooglesGroupId),
//     infiniteLoop: Boolean('infiniteLoop', true, tooglesGroupId),
//     showThumbs: Boolean('showThumbs', true, tooglesGroupId),
//     useKeyboardArrows: Boolean('useKeyboardArrows', true, tooglesGroupId),
//     autoPlay: Boolean('autoPlay', true, tooglesGroupId),
//     stopOnHover: Boolean('stopOnHover', true, tooglesGroupId),
//     swipeable: Boolean('swipeable', true, tooglesGroupId),
//     dynamicHeight: Boolean('dynamicHeight', true, tooglesGroupId),
//     emulateTouch: Boolean('emulateTouch', true, tooglesGroupId),
//     thumbWidth: Number('thumbWidth', 100, {}, valuesGroupId),
//     selectedItem: Number('selectedItem', 0, {}, valuesGroupId),
//     interval: Number('interval', 3000, {}, valuesGroupId),
//     transitionTime: Number('transitionTime', 150, {}, valuesGroupId),
//     swipeScrollTolerance: Number('swipeScrollTolerance', 5, {}, valuesGroupId),
// });
const configProps = {
  autoPlay: true,
  infiniteLoop: true,
  showThumbs: false,
  showIndicators: true,
  useKeyboardArrows: true,
  stopOnHover: false,
  swipeable: true,
  interval: 2000,
  dynamicHeight: false,
  stopOnHover:true,
};
export default ({ photoTutorial, photoTutorialBengali }) => {
  const resulationSelector = useSelector(selectResolutionSelection);
  const language  = useSelector(selectLanguageSelection);
  console.log("language", language)
  console.log("resulationSelector", resulationSelector)

  const photos = (pt) => {
    return pt.map((ele, index) => (
      <div>
        <img src={`${imageUrlConverter(ele)}&res=${resulationSelector}`} alt="sowdamart.com" />
      </div>
    ));
  };
  return (
    <Carousel {...configProps}>
      {language === "en" ? photos(photoTutorial) : photos(photoTutorialBengali)}
    </Carousel>
  );
};
