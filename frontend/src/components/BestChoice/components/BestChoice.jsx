import React, {Component} from 'react';
import {Container, Left, Paragraph, Right, Subtitle, Title, Underline} from "../styles";
import choice from '../assets/choice.png';

class BestChoice extends Component{
    render() {
        return (
            <Container>
                <Left>
                    <Title>Best Choice for <Underline>Travellers</Underline></Title>
                    <Subtitle>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit laborum.</Subtitle>
                    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</Paragraph>
                </Left>
                <Right src={choice}/>
            </Container>
        );
    }
}
export default BestChoice;
