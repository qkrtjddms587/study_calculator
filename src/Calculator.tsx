import React, { useState } from "react";
import { styled } from "styled-components";
import Display from "./components/Display";
import Buttons from "./components/Buttons";

export interface IMemory {
  cal: string;
  ans: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const CalWrapper = styled.div`
  width: 50%;
  @media screen and (max-width: 500px) {
    width: 80%;
  }
  height: 70vh;
  font-size: 30px;
  color: white;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  box-shadow: 5px 5px 1px 1px rgba(0, 0, 0, 0.2);
  min-height: 370px;
  user-select: none;
`;

const operator = ["÷", "×", "+", "-"];

function Calculator() {
  const MemoButtons = React.memo(Buttons);
  const [value, setValue] = useState("0");
  const [memory, setMemory] = useState<IMemory[]>([]);
  const [braket, setBraket] = useState("");
  const [isShowAns, setIsShowAns] = useState(false);
  const [actionDisplay, setActionDisplay] = useState(false);
  const handleClick = (btnValue: string) => {
    const isNum = Number.isInteger(+btnValue);
    setIsShowAns(true);
    setActionDisplay(false);
    if (isNum) {
      if (value === "0") {
        if (btnValue === "0") {
          return;
        }
        return setValue(btnValue);
      }
      setValue((prev) => prev + btnValue);
    } else if (btnValue === "AC") {
      setBraket("");
      setValue("0");
    } else if (btnValue === "(") {
      if (value !== "0") {
        setValue((prev) => prev + btnValue);
      } else {
        setValue(btnValue);
      }
      setBraket((prev) => prev + ")");
    } else if (btnValue === ")") {
      if (value.includes("(")) {
        setBraket((prev) => prev.slice(0, -1));
        setValue((prev) => prev + ")");
      }
    } else if (btnValue === "CE") {
      if (value !== "0") {
        if (value[value.length - 1] === "(") {
          setBraket((prev) => prev.slice(0, -1));
        } else if (value[value.length - 1] === ")") {
          setBraket((prev) => prev + ")");
        } else if (value.length === 1) {
          return setValue("0");
        }
        setValue((prev) => prev.slice(0, -1));
      }
    } else if (btnValue === ".") {
      const dot = value.split(/\d/).filter((blank) => blank !== "");
      const haveDot = dot[dot.length - 1] === ".";
      if (!haveDot) {
        setValue((prev) => prev + btnValue);
      }
    } else if (operator.includes(btnValue)) {
      if (!operator.includes(value[value.length - 2])) {
        if (value === "") {
          setValue(memory[memory.length - 1].ans);
        }
        setValue((prev) => prev + ` ${btnValue} `);
      }
    } else if (btnValue === "=") {
      if (value !== "") {
        setIsShowAns(false);
        if (operator.includes(value[value.length - 1])) {
          setValue(value);
        }
        const ansValue = eval(
          value.replaceAll("×", "*").replaceAll("÷", "/") + braket
        );
        if (!memory[0]) {
          setMemory([{ cal: value + braket, ans: ansValue }]);
        } else {
          setMemory((prev) => [
            ...prev,
            { cal: value + braket, ans: ansValue },
          ]);
        }
        setValue("");
        setBraket("");
        setActionDisplay(true);
      }
    }
  };
  return (
    <Wrapper>
      <CalWrapper>
        <Display
          memory={memory}
          value={value}
          braket={braket}
          actionDisplay={actionDisplay}
          isShowAns={isShowAns}
          setValue={setValue}
        />
        <MemoButtons handleClick={handleClick} />
      </CalWrapper>
    </Wrapper>
  );
}

export default Calculator;
