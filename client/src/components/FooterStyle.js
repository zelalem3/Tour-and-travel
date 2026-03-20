import styled from "styled-components";

// Ensure EVERY component has the 'export' keyword
export const Box = styled.div`
    width: 100%;
    background: #020617; 
    color: #fff;
    padding: 60px 20px 40px 20px;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
`;

export const FooterContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

export const MottoBar = styled.div`
    text-align: center;
    margin-bottom: 60px;
    p {
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 6px;
        font-weight: 700;
        color: #fbbf24;
    }
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-gap: 40px;
    margin-bottom: 40px;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;


export const Heading = styled.p`
    font-size: 17px;
    /* This adds the bold coloring you asked for */
    color: #fbbf24; 
    margin-bottom: 25px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    position: relative;

    /* Optional: Adds a small accent line under the colored headings */
    &::after {
        content: '';
        display: block;
        width: 40px;
        height: 3px;
        background: #fbbf24;
        margin-top: 8px;
        border-radius: 2px;
    }
`;

export const FooterLink = styled.a`
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 12px;
    font-size: 15px;
    text-decoration: none;
    transition: 0.3s ease;
    &:hover { color: #fbbf24; transform: translateX(5px); }
`;

export const SocialGrid = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 10px;
`;

export const SocialIcon = styled.a`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fbbf24;
    transition: all 0.4s ease;
    &:hover {
        background: #fbbf24;
        color: #020617;
        transform: translateY(-5px);
    }
`;

// THIS WAS LIKELY THE MISSING PIECE:
export const BottomRow = styled.div`
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 30px;
    text-align: center;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
`;