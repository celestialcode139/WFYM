/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ProfileImage1 from "../assets/images/profileimages/1.png";
import Lightbox from "lightbox-react";
import "lightbox-react/style.css";

export default function MediaCover(props: any) {
  const images = [ProfileImage1, ProfileImage1, ProfileImage1];
  const [photoIndex, setphotoIndex] = useState(0);

  return (
    <div>
      {props.isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => props.setisOpen(false)}
          onMovePrevRequest={() =>
            setphotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setphotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
}
