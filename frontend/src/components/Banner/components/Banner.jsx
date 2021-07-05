import React, {Component} from 'react';
import {Container, Title} from "../styles";
import banner from "../assets/banner.png";

class Banner extends Component{
    render() {
        return (
            <Container img={banner}>
                <Title>About US</Title>
            </Container>
        );
    }
}
export default Banner;
