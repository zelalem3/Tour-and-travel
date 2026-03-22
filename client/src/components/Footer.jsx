import React from "react";
import {
    Box,
    FooterContainer,
    Row,
    Column,
    FooterLink,
    Heading,
    BottomRow,
    MottoBar,
    SocialGrid,
    SocialIcon
} from "./FooterStyle";

import { Facebook, Instagram, Twitter, Music2 as Tiktok } from "lucide-react";

const Footer = () => {
    return (
        <Box>
            <FooterContainer>
                <MottoBar>
                    <p>Authentic • Responsible • Unforgettable</p>
                </MottoBar>

                <Row>
                    <Column>
                        <Heading>Travel Ethiopia</Heading>
                        <p style={{ 
                            color: "rgba(255,255,255,0.7)", 
                            fontSize: "14px", 
                            lineHeight: "1.6",
                            textAlign: "inherit" 
                        }}>
                            Discover the soul of the Abyssinian highlands with the locals who know it best.
                        </p>
                    </Column>

                    <Column>
                        <Heading>Quick Links</Heading>
                        <FooterLink href="#tours">Popular Tours</FooterLink>
                        <FooterLink href="#destinations">Destinations</FooterLink>
                        <FooterLink href="#about">Our Story</FooterLink>
                    </Column>

                    <Column>
                        <Heading>Traveler Tools</Heading>
                        <FooterLink href="#">Booking Guide</FooterLink>
                        <FooterLink href="#">Visa Info</FooterLink>
                        <FooterLink href="#">Health & Safety</FooterLink>
                    </Column>

                    <Column>
                        <Heading>Follow Our Journey</Heading>
                        <SocialGrid>
                            <SocialIcon href="#" aria-label="Facebook"><Facebook size={20} /></SocialIcon>
                            <SocialIcon href="#" aria-label="Instagram"><Instagram size={20} /></SocialIcon>
                            <SocialIcon href="#" aria-label="Twitter"><Twitter size={20} /></SocialIcon>
                            <SocialIcon href="#" aria-label="TikTok"><Tiktok size={20} /></SocialIcon>
                        </SocialGrid>
                    </Column>
                </Row>

                <BottomRow>
                    &copy; {new Date().getFullYear()} Travel Ethiopia. All Rights Reserved.
                </BottomRow>
            </FooterContainer>
        </Box>
    );
};

export default Footer;