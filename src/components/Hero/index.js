import React, { useState, useEffect } from 'react';
import { Spring } from 'react-spring/renderprops';
import {
  HeroContainer,
  HeroContent,
  HeroTitle,
  HeroSubTitle,
  ShowcaseOverlay,
  ShowcaseVideo,
  ScrollDiv,
  Line,
} from './styles';
import Header from '../Header';

export default function Hero() {
  const [YValue, setYValue] = useState(0);
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 4400);
  }, []);

  const [isInside, setIsInside] = useState(false);
  useEffect(() => {
    function handleScroll() {
      const { scrollY } = window;
      if (scrollY < window.innerHeight) setYValue(scrollY);
      setIsInside(scrollY >= window.innerHeight);
    }

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return (
    <HeroContainer>
      {isVisible && <Header isInside={isInside} />}
      <Spring config={{ duration: 5500 }} from={{ opacity: 1 }} to={{ opacity: 0.8 }}>
        {props => <ShowcaseOverlay style={props} />}
      </Spring>
      <ShowcaseVideo top={YValue}>
        <source
          src="https://res.cloudinary.com/de5fzxeki/video/upload/v1560271425/showcase_tj2xzl.mp4"
          type="video/mp4"
        />
        <source
          src="https://res.cloudinary.com/de5fzxeki/video/upload/v1560269772/showcase_r6yik5.webm"
          type="video/webm"
        />
      </ShowcaseVideo>
      <HeroContent>
        <Spring from={{ bottom: -100 }} to={{ bottom: 0 }}>
          {props => <HeroTitle style={props}>I&apos;m Marvin Cayetano</HeroTitle>}
        </Spring>
        <Spring config={{ duration: 2500 }} from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <HeroSubTitle style={props}>
              A computer engineering graduate from Alqonquin College located in Ottawa, Canada.
            </HeroSubTitle>
          )}
        </Spring>
      </HeroContent>
      <ScrollDiv>{isVisible && <Line />}</ScrollDiv>
    </HeroContainer>
  );
}
