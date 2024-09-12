import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/*
  layout prop : 이 속성을 준 element의 layout이 바뀔 때, 자동으로 animate 된다 ㄷㄷㄷ
  - framerMotion이 css 변화를 감지
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
    height: 400px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
    background-color: #cc00ff;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
    const [clicked, setClicked] = useState(false);
    const toggleClicked = () => setClicked((prev) => !prev);
    return (
        <Wrapper onClick={toggleClicked}>
            <Box
                style={{
                    justifyContent: clicked ? "center" : "flex-start",
                    alignItems: clicked ? "center" : "flex-start",
                }}
            >
                <Circle layout />
            </Box>
        </Wrapper>
    );
}

export default App;
