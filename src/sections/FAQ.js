import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";
import { useStore } from "../state";

// const faqs = [
//     {
//         question: "Who runs this site?",
//         answer: "Generation Zero, a youth-led climate advocacy group in New Zealand.",
//     },
//     {
//         question: "How are candidates scored?",
//         answer: "Candidates are scored based on their responses to our survey and public climate policies. See the scoring process for details.",
//     },
//     {
//         question: "Where does the data come from?",
//         answer: "Candidate and region data is sourced from Coda and official council sources.",
//     },
//     {
//         question: "How can I contact you?",
//         answer: "Email us at hello@genzero.org.nz or use the contact form on the site.",
//     },
//     // Add more Q&A pairs as needed
// ];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    let faqs = useStore((state) => state.faq);

    if (!Array.isArray(faqs) || faqs.length === 0) {
        faqs = [];
    } else {
        faqs = faqs.filter((f) => f.Question && f.Answer);
    }

    const toggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <FAQContainer>
            <BackButton to="/" component={RouterLink}>
                ← Back to Home
            </BackButton>
            <Title>Frequently Asked Questions</Title>
            {faqs.map((faq, idx) => (
                <FAQItem key={idx}>
                    <Question
                        onClick={() => toggle(idx)}
                        open={openIndex === idx}
                    >
                        {faq.Question}
                        <Arrow open={openIndex === idx}>▼</Arrow>
                    </Question>
                    {openIndex === idx && <Answer>{faq.Answer}</Answer>}
                </FAQItem>
            ))}
        </FAQContainer>
    );
};

export default FAQ;

// Styled components
const FAQContainer = styled.div`
    width: 80%;
    margin: 40px auto;
    padding: 24px;
    background: #fffbe9;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(55, 47, 11, 0.08);
    position: relative;
`;

const BackButton = styled(RouterLink)`
    position: absolute;
    top: 24px;
    left: 24px;
    color: #e24f33;
    font-weight: 600;
    text-decoration: none;
    font-size: 1.1em;
    background: none;
    border: none;
    padding: 0;
    z-index: 2;
    &:hover {
        text-decoration: underline;
        color: #b93c1e;
    }
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 32px;
    font-family: "Barlow Condensed", "Helvetica", "Arial", sans-serif;
`;

const FAQItem = styled.div`
    margin-bottom: 18px;
`;

const Question = styled.button`
    width: 100%;
    background: none;
    border: none;
    font-size: 1.15em;
    font-weight: bold;
    text-align: left;
    padding: 12px 0;
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #372f0b;
    border-bottom: 1px solid #e24f33;
    transition: background 0.2s;
    &:hover {
        background: #f8e8d8;
    }
`;

const Arrow = styled.span`
    margin-left: 12px;
    font-size: 1em;
    transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s;
`;

const Answer = styled.div`
    padding: 12px 0 0 0;
    color: #372f0b;
    font-size: 1em;
    line-height: 1.5;
    text-align: left;
`;
