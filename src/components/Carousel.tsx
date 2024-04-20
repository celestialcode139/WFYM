/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { makeStyles } from "@mui/styles";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Image from "./Image";

const useStyles = makeStyles(() => {
  return {
    slider: {
      position: "sticky",
      top: "0px",
    },
    swipeContainer: {
      // padding: "0px 15px",
      height: "100%",
      display: "flex",
      alignItems: "end",
      position: "relative"
    },
    swipeImage: {
      position: "absolute",
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    swipeContent:{
      zIndex:999999,
      padding:"5px 15px"
    },
    name: {
      color: "white",
      mixBlendMode: "difference"
    },
    desg: {
      color: "white!important",
      mixBlendMode: "difference"
    },
  };
});
 
export default function Carousel(props: any) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

   
  const handleIndexChanged = (index: any) => {
    setCurrentIndex(index.activeIndex);
  };

  useEffect(() => {
    props.currentIndex(currentIndex);
  }, [currentIndex, props]);

   
  const calculateAge = (birthDate: any) => {
    const birthDateObject: any = new Date(birthDate);
    const currentDate: any = new Date();
    const timeDifference = currentDate - birthDateObject;
    const age = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));

    return age;
  };

  useEffect(() => {
    console.log("props.data:", props?.data[currentIndex]?.result_user_id?.user_details.images);

  }, [props.data])


  return (
    <Box className={`${classes.slider}`} sx={{ paddingTop: "50px" }}>
      <Swiper
        onSnapIndexChange={handleIndexChanged}
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {props.data.map((val: any, i: number) => (
          <SwiperSlide key={i}>
            <Box
              onClick={() => {
                navigate(`/dash/view-matchprofile/${val?.result_user_id?._id}`);
              }}
              className="hw100 ofitt-cover bg-cover"
            // sx={{
            //   backgroundImage: `url(${val.result_user_id?.profile_images})`,
            // }}
            >
              <Box className={`${classes.swipeContainer}`}>
                <Box className={`${classes.swipeContent}`}>
                  <Typography className={`f-22-bold mb-10 ${classes.name}`}>
                    {`${val.result_user_id?.first_name} ${val.result_user_id?.last_name}`}
                    , {calculateAge(val.result_user_id?.dob)}
                  </Typography>
                  <Typography className={`p-12 ${classes.desg}`}>
                    {val.result_user_id?.user_details?.profession}
                  </Typography>
                </Box>
                <Image className={`${classes.swipeImage}`} src={val?.result_user_id?.user_details.images}></Image>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
