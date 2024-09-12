import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/*
  AnimatePresence : react에서 사라지는 component를 animate하는 component
  - animatePresence component는 항상 visible 상태여야 함
  - 내부에 있는 요소는 condition이 있어야 함
  <AnimatePresence>{showing ? <Box /> : null}</AnimatePresence>
  - 3가지 state 필요: initial, animate, exit 
  <Box
    variants={boxVariants}
    initial="initial"
    animate="visible"
    exit="leaving"
  />

  Slider 만들기
  - next를 누르면 -> 1번:exit실행, 2번 animate 실행
  - 숫자 배열을 i개 만들어서 map 하고 box에 animate를 주었는데...
  -> visible state의 값을 변경하고, 이 값을 Box 의 key로 사용하면 
    react.js는 key가 변경되면서 기존 element가 사라지고 새롭게 생겼다고 생각함 ㄷㄷㄷ
    즉 exit animation이 실행된다는 것. 
  - custom property: variants에 데이터를 보낼 수 있음 
    custom에 값을 보내면, animatePresence에도 같은 custom값을 보낸 후,
    varient를 object를 리턴하는 함수로 변경
    const box = {
      entry: (back: boolean) => ({ x: back ? -500 : 500, opacity: 0, scale: 0 }), 
    }
  - mode="wait" : exit 을 한 후에 animation 실행
*/

const Wrapper = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(135deg, rgb(137, 234, 203), rgb(255, 178, 91));
`;

const Box = styled(motion.div)`
    width: 400px;
    height: 200px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    position: absolute;
    top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const box = {
    entry: (back: boolean) => ({ x: back ? -500 : 500, opacity: 0, scale: 0 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 1 } },
    exit: (back: boolean) => ({
        x: back ? 500 : -500,
        opacity: 0,
        scale: 0,
        transition: { duration: 1 },
    }),
};

function App() {
    const [visible, setVisible] = useState(1);
    const [back, setBack] = useState(false);
    const nextPlease = () => {
        setBack(false);
        setVisible((prev) => (prev === 6 ? 6 : prev + 1));
    };
    const prevPlease = () => {
        setBack(true);
        setVisible((prev) => (prev === 1 ? 1 : prev - 1));
    };
    return (
        <Wrapper>
            <AnimatePresence mode="wait" custom={back}>
                <Box
                    custom={back}
                    variants={box}
                    initial="entry"
                    animate="center"
                    exit="exit"
                    key={visible}
                >
                    {visible}
                </Box>
            </AnimatePresence>
            <button onClick={prevPlease}>prev</button>
            <button onClick={nextPlease}>next</button>
        </Wrapper>
    );
}

export default App;
