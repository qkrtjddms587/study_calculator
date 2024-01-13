import { useState } from "react";
import { keyframes, styled } from "styled-components";
import { IMemory } from "../Calculator";

interface IMemoryProps {
  memory: IMemory[];
  setValue: (value: string) => void;
}

const Wrapper = styled.div<{ $active: boolean }>`
  top: 0;
  left: 0;
  position: absolute;
  margin: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: rgba(0, 0, 0, 0.5);
  background-color: ${(props) => (props.$active ? "#EEEEEE" : "white")};
  box-shadow: 5px 5px 1px 1px ${(props) => (props.$active ? "black" : "white")};
  border-radius: 20px;
  transition: all 0.7s ease-in-out;
  width: ${(props) => (props.$active ? "25vw" : "50px")};
  @media screen and (max-width: 500px) {
    width: ${(props) => (props.$active ? "55vw" : "50px")};
  }
  height: ${(props) => (props.$active ? "50vh" : "50px")};
`;

const IconWrapper = styled.div`
  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: all 0.15s cubic-bezier(1, 1, 0, 0);
    &:hover {
      color: black;
    }
    &:active {
      transform: translate(2px, 2px);
    }
  }
`;
const openMemoryAnimation = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`;

const MemoryDisplay = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  overflow: scroll;
  animation: ${openMemoryAnimation} 0.2s ease-in;
`;

const MemoryItems = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const MemoryItem = styled.div`
  padding: 5px;
`;

const Item = styled.span`
  transition: color 0.2s ease-in;
  &:hover {
    color: black;
  }
`;

function Memory({ memory, setValue }: IMemoryProps) {
  const [openMemory, setOpenMemory] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const toggleCalMemory = () => {
    setOpenMemory((prev) => !prev);
    if (!showMemory) {
      setTimeout(() => setShowMemory((prev) => !prev), 500);
    } else {
      setShowMemory((prev) => !prev);
    }
  };
  const handleMemoryClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const value = target.innerText;
    !value.includes("=") && setValue(value);
  };
  return (
    <Wrapper $active={openMemory}>
      <IconWrapper>
        <svg
          onClick={toggleCalMemory}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </IconWrapper>
      {showMemory ? (
        <MemoryDisplay>
          <MemoryItems onClick={handleMemoryClick}>
            {memory
              .slice(0)
              .reverse()
              .map((obj, i) => (
                <MemoryItem key={i}>
                  <Item>{obj.cal}</Item> = <Item>{obj.ans}</Item>
                </MemoryItem>
              ))}
          </MemoryItems>
        </MemoryDisplay>
      ) : (
        ""
      )}
    </Wrapper>
  );
}

export default Memory;
