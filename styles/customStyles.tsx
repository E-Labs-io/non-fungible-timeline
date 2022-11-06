/** @format */
import styled, { keyframes, css } from "styled-components";

const moveGradient = keyframes`
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
  }
`;

const flashyBackgroundCSS = css`
  ::before,
  ::after {
    content: "";
    border-radius: 8px;
    position: absolute;
    top: -4px;
    left: -4px;
    background: linear-gradient(
      45deg,
      red,
      blue,
      green,
      yellow,
      #e11d74,
      black,
      #ffff00,
      #aa0000
    );
    background-size: 400%;
    width: calc(100% + 8px);
    height: calc(100% + 8px);

    animation: ${moveGradient} 25s linear infinite;
  }

  ::after {
    filter: blur(25px);
  }
`;

export { flashyBackgroundCSS };
