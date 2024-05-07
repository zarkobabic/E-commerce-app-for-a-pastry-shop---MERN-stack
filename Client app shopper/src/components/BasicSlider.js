import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import classes from './BasicSlider.module.css';


function BasicSlider(props){
    return (
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView = {1}
                navigation
                autoplay={true}
                pagination={{clickable: true}}
            >

                {props.adsArray.map((ad)=>{
                    return(
                        <SwiperSlide key={ad.title}>
                            <div className={"flex flex-row " + classes.adContainer}>
                                <img src={ad.image} alt=""/>
                                <div >
                                    <h1>{ad.title}</h1>
                                    <br />
                                    <hr />
                                    <br />
                                    <p>{ad.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}

        </Swiper>

    )


    // return (
    //     <Swiper
    //         modules={[Navigation, Pagination, Autoplay]}
    //         slidesPerView = {1}
    //         navigation
    //         autoplay={true}
    //         pagination={{clickable: true}}
    //     >

    //         <SwiperSlide>
    //             <div className={"flex flex-row " + classes.adContainer}>
    //                 <img src="images/1.jpg" alt=""/>
    //                 <div >
    //                     <h1>Akcija 50% Reforma torta</h1>
    //                     <br />
    //                     <hr />
    //                     <br />
    //                     <p>Samo ovog vikenda od 25.7. - 30.7. po specijalnoj ceni od 1299rsd/kg mozete nabaviti reforma tortu! Prijatan vikend zeli vam tim Slatki Zalogaji!</p>
    //                 </div>
    //             </div>
                
    //         </SwiperSlide>
    //         <SwiperSlide>
    //             <div className={"flex flex-row " + classes.adContainer}>
    //                 <img src="images/1.jpg" alt=""/>
    //                 <div >
    //                     <h1>Akcija 50% Reforma torta</h1>
    //                     <br />
    //                     <hr />
    //                     <br />
    //                     <p>Samo ovog vikenda od 25.7. - 30.7. po specijalnoj ceni od 1299rsd/kg mozete nabaviti reforma tortu! Prijatan vikend zeli vam tim Slatki Zalogaji!</p>
    //                 </div>
    //             </div>
                
    //         </SwiperSlide>
    //     </Swiper>
    // )
}

export default BasicSlider;

