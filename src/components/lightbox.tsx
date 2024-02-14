/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ProfileImage1 from "../assets/images/profileimages/1.png";
import ProfileImage2 from "../assets/images/profileimages/2.png";
import Lightbox from "lightbox-react";
import "lightbox-react/style.css";

export default function MediaCover(props: any) {
  const [photoIndex, setphotoIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(props.gallery)
  }, [props.gallery])

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
