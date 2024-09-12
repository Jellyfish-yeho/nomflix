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
    invisible: { x: 500, opacity: 0, scale: 0 },
    visible: { x: 0, opacity: 1, scale: 1, transition: { duration: 1 } },
    exit: { x: -500, opacity: 0, scale: 0, transition: { duration: 1 } },
};

function App() {
    const [visible, setVisible] = useState(1);
    const nextPlease = () => setVisible((prev) => (prev === 6 ? 6 : prev + 1));
    const prevPlease = () => setVisible((prev) => (prev === 1 ? 1 : prev - 1));
    return (
        <Wrapper>
            <AnimatePresence>
                {[1, 2, 3, 4, 5, 6].map((i) =>
                    i === visible ? (
                        <Box
                            variants={box}
                            initial="invisible"
                            animate="visible"
                            exit="exit"
                            key={i}
                        >
                            {i}
                        </Box>
                    ) : null
                )}
            </AnimatePresence>
            <button onClick={prevPlease}>prev</button>
            <button onClick={nextPlease}>next</button>
        </Wrapper>
    );
}

export default App;
