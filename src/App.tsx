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
*/

const Wrapper = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, rgb(137, 234, 203), rgb(255, 178, 91));
`;

const Box = styled(motion.div)`
    width: 200px;
    height: 100px;
    border-radius: 50px;
    background-color: #fff;
    position: absolute;
    top: 100px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const boxVariants = {
    initial: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, rotateZ: 360 },
    leaving: { opacity: 0, scale: 0, y: 50 },
};

function App() {
    const [showing, setShowing] = useState(false);
    return (
        <Wrapper>
            <button onClick={() => setShowing((prev) => !prev)}>Click</button>
            <AnimatePresence>
                {showing ? (
                    <Box
                        variants={boxVariants}
                        initial="initial"
                        animate="visible"
                        exit="leaving"
                    />
                ) : null}
            </AnimatePresence>
        </Wrapper>
    );
}

export default App;
