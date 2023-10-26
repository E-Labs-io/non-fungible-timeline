/** @format */

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Layout, TextExpandList } from "components/common";
import faqQuestions from "constants/faqQuestions";
import About from "components/faq/About";
import FAQComponent from "components/faq/faqComponent";
import { useWindowSize } from "e-labs_generic-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Section = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  transform: translateY(${(props) => (props.active ? "0" : "100%")});
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: transform 0.5s ease, opacity 0.5s ease;
  padding: 20px;
`;

function FAQ() {
  const scrollContainerRef = useRef(null);

  const sections = [
    <About key="about" />,
    <FAQComponent key="faq" faqQuestions={faqQuestions} />,
  ];

  const [activeSection, setActiveSection] = useState(0);
  const { height } = useWindowSize();

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = (e) => {
      const scrollDistance = height * activeSection;

      if (e.deltaY > 0 && activeSection < sections.length - 1) {
        setActiveSection(activeSection + 1);
      } else if (e.deltaY < 0 && activeSection > 0) {
        setActiveSection(activeSection - 1);
      }

      scrollContainer.scrollTo({
        top: scrollDistance,
        behavior: "smooth",
      });
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleScroll);
      }
    };
  }, [activeSection, height]);

  return (
    <Layout>
      <Wrapper ref={scrollContainerRef}>
        {sections.map((section, index) => (
          <Section
            key={index}
            id={`section-${index}`}
            active={activeSection === index}
          >
            {section}
          </Section>
        ))}
      </Wrapper>
    </Layout>
  );
}

export default FAQ;
