import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../styles/carousel.css';
import { CarouselImages } from '@/app/assets';


export default function CarouselComponent() {
    return (
        <MDBCarousel showIndicators showControls fade touch interval={2000}>
            {
                CarouselImages?.map((image) => {
                    return (
                        <MDBCarouselItem itemId={image?.id} key={image?.id}>
                            <img src={image?.url}
                                className='d-block w-100' alt='...' />
                        </MDBCarouselItem>
                    )
                })
            }
        </MDBCarousel>
    );
}