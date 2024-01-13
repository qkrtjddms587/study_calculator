import React, { useEffect } from "react";
import { styled } from "styled-components";

interface IButtonsProps {
  handleClick: (value: string) => void;
}

const BtnWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  height: 50vh;
  min-height: 220px;
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  box-shadow: 5px 5px 1px 1px rgba(0, 0, 0, 0.2);
  transition: all 0.1s cubic-bezier(1, 1, 0, 0);
  cursor: pointer;
  &:active {
    background-color: white;
    color: black;
    transform: translate(5px, 5px);
    box-shadow: none;
  }
`;

const element = [
  "AC",
  "(",
  ")",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  ".",
  "0",
  "CE",
  "=",
];

function Buttons({ handleClick }: IButtonsProps) {
  return (
    <BtnWrapper
      onClick={(e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        handleClick(target.innerText);
      }}
    >
      {element.map((value) => (
        <Btn key={value}>{value}</Btn>
      ))}
    </BtnWrapper>
  );
}

export default Buttons;
