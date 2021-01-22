import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// react component for creating beautiful carousel
import Carousel from "react-slick";

// core components
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import Card from "../Card/Card.js";

import YouTube from 'react-youtube-embed'
import CardImage from './CardImage.jsx';

import  { useState, useEffect } from 'react';


export default function SectionCarousel({data}){
    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true
    };

    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
      if(data){
        var filterImages = data.filter(info => info.tipo !== 'video');
        setImages(filterImages);

        var filterVideos = data.filter(info => info.tipo !== 'imagen');
        setVideos(filterVideos);
      }
        
    },[data]);

    return (
      <GridContainer>
        <GridItem >
            <Carousel {...settings}>
                {
                  images.map((media,i) =>{
                      return <CardImage key={i} image={media.url}/>
                  })
                }    
            </Carousel>
        </GridItem>
        <GridItem >
          {
            videos.map((media,i) =>{
              return (
                <Card key={i}>
                  <YouTube id={media.url}/>
                </Card> 
              )
            })
          }                   
        </GridItem>
      </GridContainer>
    );
  }