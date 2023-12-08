import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "./style.css";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    slider: {
      position: "sticky",
      top: "0px",
    },
    swipeContainer: {
      padding: "0px 15px",
      height: "96%",
      display: "flex",
      alignItems: "end",
    },
    name: {
      color: "white",
    },
    desg: {
      color: "white!important",
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
    console.log("props.data", props.data[0]);
  }, []);
  useEffect(() => {
    props.currentIndex(currentIndex);
  }, [currentIndex]);

  const calculateAge = (birthDate: any) => {
    var birthDateObject: any = new Date(birthDate);
    var currentDate: any = new Date();
    var timeDifference = currentDate - birthDateObject;
    var age = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));

    return age;
  };

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
              sx={{
                backgroundImage: `url(${val.result_user_id?.profile_images})`,
              }}
            >
              <Box className={`${classes.swipeContainer}`}>
                <Box>
                  <Typography className={`f-22-bold mb-10 ${classes.name}`}>
                    {`${val.result_user_id?.first_name} ${val.result_user_id?.last_name}`}
                    , {calculateAge(val.result_user_id?.dob)}
                  </Typography>
                  <Typography className={`p-12 ${classes.desg}`}>
                    {val.result_user_id?.user_details?.profession}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
