import React, {useRef, useState} from "react";
import PropTypes from 'prop-types';

import {convertImageToBlob} from "utils/convertImageToBlob";
import Header from "components/Posts/Header";
import SvgIcon from "components/SvgIcon";
import Container from "components/Posts//Container";
import Settings from "./Settings";
import FilteredImage from "./FilteredImage";
import Finish from "../Finish";


import imageRotateLeft from './icons/rotate-left.svg';
import imageRotateRight from './icons/rotate-right.svg';

import styles from './filters.module.css';

const filters = {
  settings: [
    {
      name: 'contrast',
      value: '100%',
    },
    {
      name: 'hue',
      value: '0deg'
    },
    {
      name: 'brightness',
      value: '100%'
    },
    {
      name: 'saturate',
      value: '100%'
    },
    {
      name: 'sepia',
      value: '0%'
    },
    {
      name: 'invert',
      value: '0%'
    },
    {
      name: 'blur',
      value: '0px'
    },
    {
      name: 'opacity',
      value: '100%'
    }
  ]
};

const makeFilter = (settings) =>
  `
  contrast(${settings[0].value}) 
  hue-rotate(${settings[1].value}) 
  brightness(${settings[2].value}) 
  saturate(${settings[3].value}) 
  sepia(${settings[4].value}) 
  invert(${settings[5].value}) 
  blur(${settings[6].value}) 
  opacity(${settings[7].value})
  `;

const Filters = ({media, goBack, upload}) => {
  const [settings, setSettings] = useState(filters.settings);
  const [mediaSrc, setMediaSrc] = useState(null);
  const [isFinish, setIsFinish] = useState(false);
  const [rotateAngel, setRotateAngel] = useState(0);
  let imageRef = useRef(null);

  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    switch (name) {
      case 'contrast':
        settings[0].value = value + '%';
        setSettings([
          ...settings
        ]);
        break;
      case 'hue':
        settings[1].value = value + 'deg';
        setSettings([
          ...settings
        ]);
        break;
      case 'brightness':
        settings[2].value = value + '%';
        setSettings([
          ...settings
        ]);
        break;
      case 'saturate':
        settings[3].value = value + '%';
        setSettings([
          ...settings
        ]);
        break;
      case 'sepia':
        settings[4].value = value + '%';
        setSettings([
          ...settings
        ]);
        break;
      case 'invert':
        settings[5].value = value + '%';
        setSettings([
          ...settings
        ]);
        break;
      case 'blur':
        settings[6].value = value + 'px';
        setSettings([
          ...settings
        ]);
        break;
      case 'opacity':
        settings[7].value = value + '%';
        setSettings([
          ...settings
        ]);
        break;
      default:
        break;
    }
  };

  const uploadWithOtherData = ({caption, location, marks}) => {
    upload({
      image: mediaSrc,
      settings: settings,
      caption,
      location,
      marks
    });
  };

  const applyFiltersToImage = async () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = media.width;
    canvas.height = media.height;

    context.filter = makeFilter(settings);

    const transX = canvas.width * 0.5;
    const transY = canvas.height * 0.5;

    context.translate(transX, transY);

    context.rotate(rotateAngel * (Math.PI / 180));

    context.translate(-transX, -transY);

    const blob = await convertImageToBlob(media.image);
    const image = new Image();
    image.src = window.URL.createObjectURL(blob);

    image.onload = function () {
      context.drawImage(image, 0, 0);
      setMediaSrc(canvas.toDataURL());
    };
  };

  const goFinish = async () => {
    await applyFiltersToImage();
    setIsFinish(true);
  };

  const goFilters = () => {
    setIsFinish(false);
  };

  const rotateLeft = () => {
    setRotateAngel(rotateAngel - 90);
  };

  const rotateRight = () => {
    setRotateAngel(rotateAngel + 90)
  };

  return (
    <>
      {
        isFinish ? <Finish upload={uploadWithOtherData} goBack={goFilters} media={mediaSrc}/>
          :
          <Container>
            <Header goNext={goFinish} goBack={goBack} title={'Filters'} nextButtonText={'Finish'}/>
            <div className={styles.wrapper}>
              <FilteredImage imageRef={imageRef} media={media.image} filter={makeFilter(settings)} rotateAngel={rotateAngel}/>
              <div className={styles.iconsContainer}>
                <SvgIcon title='Rotate left' className={styles.icon} icon={imageRotateLeft} onClick={rotateLeft}/>
                <SvgIcon title='Rotate right' className={styles.icon} icon={imageRotateRight} onClick={rotateRight}/>
              </div>
              <Settings settings={settings} url={media.image} onChange={handleChange}/>
            </div>
          </Container>
      }
    </>
  )
};

Filters.propTypes = {
  media: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    image: PropTypes.string
  }),
  goBack: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired
};

export default Filters;
