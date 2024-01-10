import { css, keyframes, styled } from "styled-components";
import { IMemory } from "../Calculator";
import Memory from "./Memory";

interface IDisplayProps {
  memory: IMemory[];
  value: string;
  braket: string;
  actionDisplay: boolean;
  isShowAns: boolean;
  setValue: (value: string) => void;
}

const Wrapper = styled.div`
  height: 80px;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 5vh;
  box-shadow: 5px 5px 1px 1px rgba(0, 0, 0, 0.2);
  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  position: relative;
`;

const MainDisplay = styled.span<{ $active: boolean }>`
  font-size: 40px;
  @media screen and (max-width: 500px) {
    font-size: 25px;
  }
  ${(props) =>
    props.$active &&
    css`
      animation: ${valueIndiAnimation} 0.2s ease-in;
    `}
`;

const SubDisplay = styled.span<{ $active: boolean }>`
  margin-bottom: 10px;
  font-size: 25px;
  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
  transform-origin: top right;
  ${(props) =>
    props.$active &&
    css`
      animation: ${calIndiAnimation} 0.2s ease-in;
    `}
`;

const Braket = styled.span`
  color: rgba(0, 0, 0, 0.3);
`;

const valueIndiAnimation = keyframes`
    0% {
        transform:translateY(+30px);
    }
    100% {
        transform:translateY(0);
    }
`;

const calIndiAnimation = keyframes`
    0% {
        transform:scale(2.5);
    }
    100% {
        transform:scale(1);
    }
`;

function Display({
  memory,
  value,
  braket,
  actionDisplay,
  isShowAns,
  setValue,
}: IDisplayProps) {
  return (
    <Wrapper>
      <Memory memory={memory} setValue={setValue} />
      <SubDisplay $active={actionDisplay}>
        {!memory[0]
          ? ""
          : isShowAns
          ? `Ans = ${memory[memory.length - 1].ans}`
          : `${memory[memory.length - 1].cal} =`}
      </SubDisplay>
      <MainDisplay $active={actionDisplay}>
        {value === "" ? memory[memory.length - 1].ans : value}
        <Braket>{braket}</Braket>
      </MainDisplay>
    </Wrapper>
  );
}

export default Display;
