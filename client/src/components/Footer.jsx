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

// 1. Updated Imports to use FontAwesome for brand consistency
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTiktok, 
  FaTelegramPlane 
} from "react-icons/fa";

const Footer = () => {
    return (
        <Box>
            <div style={{
                width: '100px',
                height: '2px',
                background: '#fbbf24',
                margin: '-20px auto 60px auto', 
                borderRadius: '10px',
                opacity: '0.6'
            }}></div>
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
                        {/* 2. Updated Social Icons Section */}
                        <Heading>Follow Our Journey</Heading>
                        <SocialGrid>
                            <SocialIcon href="https://facebook.com/travelethiopia" target="_blank" aria-label="Facebook">
                                <FaFacebookF size={18} />
                            </SocialIcon>
                            <SocialIcon href="https://instagram.com/travelethiopia" target="_blank" aria-label="Instagram">
                                <FaInstagram size={18} />
                            </SocialIcon>
                            <SocialIcon href="https://twitter.com/travelethiopia" target="_blank" aria-label="Twitter">
                                <FaTwitter size={18} />
                            </SocialIcon>
                           
                            <SocialIcon href="https://tiktok.com/@travelethiopia" target="_blank" aria-label="TikTok">
                                <FaTiktok size={18} />
                            </SocialIcon>
                            <SocialIcon href="https://t.me/travelethiopia" target="_blank" aria-label="Telegram">
                                <FaTelegramPlane size={18} />
                            </SocialIcon>
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