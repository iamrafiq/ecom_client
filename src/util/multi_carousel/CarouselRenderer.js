import React from "react";

import Carousel from "react-multi-carousel";
import OfferProduct, {  } from "../../component_ui/product/OfferProduct";
// import { Image } from "semantic-ui-react";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    paritialVisibilityGutter: 30
  }
};
const images = [
  "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
];

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div className="carousel-button-group"> // remember to give it position:absolute
        <div className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()} style={{position:"absolute", top:"50%", left:"0px", fontSize:"30px"}}> A</div>
        <div onClick={() => next()} style={{position:"absolute", top:"50%", right:"0px", fontSize:"30px"}} >A</div>
      </div>
    );
  };
// Because this is an inframe, so the SSR mode doesn't not do well here.
// It will work on real devices.
const CarouselRenderer = ({ deviceType, products }) => {
  return (
    <Carousel
    //   ssr
    //   partialVisbile={false}
    //   deviceType={deviceType}
    //   responsive={responsive}
    //   infinite={true}
    //   autoPlay={deviceType !== "mobile" ? true : false}
    //   removeArrowOnDeviceType={["tablet", "mobile"]}
    //   autoPlaySpeed={2000}
    swipeable={false}
    draggable={false}
    showDots={false}
    responsive={responsive}
    ssr={true} // means to render carousel on server-side.
    infinite={true}
    autoPlay={deviceType !== "mobile" ? true : false}
    autoPlaySpeed={2000}
    keyBoardControl={true}
    // arrows={false} 
    // renderButtonGroupOutside={true}
    // customButtonGroup={<ButtonGroup />}
    
    // customTransition="all .5"
    // transitionDuration={500}
    containerClass="carousel-container"
     removeArrowOnDeviceType={["tablet", "mobile"]}
    deviceType={deviceType}
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
    >
      {/* {images.map(image => {
        return (
          <img
            draggable={false}
            style={{ width: "100%", height: "250px" }}
            src={image}
          />
        );
      })} */}
      {products.map((ele, index)=>(
      <OfferProduct product={ele}></OfferProduct>     
      ))}
      {products.map((ele, index)=>(
      <OfferProduct product={ele}></OfferProduct>     
      ))}
      {products.map((ele, index)=>(
      <OfferProduct product={ele}></OfferProduct>     
      ))}
      {products.map((ele, index)=>(
      <OfferProduct product={ele}></OfferProduct>     
      ))}
      {products.map((ele, index)=>(
      <OfferProduct product={ele}></OfferProduct>     
      ))}
       {/* <OfferProduct product={product}></OfferProduct>
      <OfferProduct product={product}></OfferProduct>
      <OfferProduct product={product}></OfferProduct>
      <OfferProduct product={product}></OfferProduct>
      <OfferProduct product={product}></OfferProduct>
      <OfferProduct product={product}></OfferProduct>
      <OfferProduct product={product}></OfferProduct>
      <OfferProduct product={product}></OfferProduct>
      <OfferProduct product={product}></OfferProduct>
      <OfferProduct product={product}></OfferProduct>

      <OfferProduct product={product}></OfferProduct>
      <OfferProduct product={product}></OfferProduct> */}

    </Carousel>
  );
};

export default CarouselRenderer;