import React, { Component } from 'react'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './style.css'

const PrevButton = () => {
    return <i className="fas fa-lg fa-angle-left"/>
}

const NextButton = () => {
    return <i className="fas fa-lg fa-angle-right"/>
}

class Ticker extends Component{
    render() {
        const { data } = this.props
        return (
            <Slider infinite={true} autoplay={15000} className="slider text-white" nextButton={<NextButton/>} previousButton={<PrevButton/>}>
                {data && data.map((item, index)=>
                    <div key={index} className="row align-content-center">
                        <h4 className="ml-auto col-md-2 col-4 d-none d-lg-block align-self-center p-0">{item.info.title}</h4>
                        <div className="mr-auto col-md-9 col-9 align-self-center p-0">{item.info.description}</div>
                        <div className="col-12 text-center">{`${index+1}/${data.length}`}</div>
                    </div>
                )}
            </Slider>
        )
    }
}

export default Ticker
