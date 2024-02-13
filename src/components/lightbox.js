import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Lightbox from "lightbox-react";
import "lightbox-react/style.css";
export default function MediaCover(props) {
    const [photoIndex, setphotoIndex] = useState(0);
    const [images, setImages] = useState([]);
    useEffect(() => {
        setImages(props.gallery);
    }, [props.gallery]);
    return (_jsx("div", { children: props.isOpen && (_jsx(Lightbox, { mainSrc: images[photoIndex], nextSrc: images[(photoIndex + 1) % images.length], prevSrc: images[(photoIndex + images.length - 1) % images.length], onCloseRequest: () => props.setisOpen(false), onMovePrevRequest: () => setphotoIndex((photoIndex + images.length - 1) % images.length), onMoveNextRequest: () => setphotoIndex((photoIndex + 1) % images.length) })) }));
}
