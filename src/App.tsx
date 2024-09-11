import styled from "styled-components";
import { motion } from "framer-motion";
/* 
  framer motion
  https://www.framer.com/docs/animation

  1. <motion.html태그명> 으로 사용
    <motion.div></motion.div>
  2. styled-component와 같이 사용하기 
    const Box = styled(motion.div)``
  
  - animation 넣기
     <Box
          transition={{ delay: 3, duration: 3 }}
          animate={{ borderRadius: "100px" }}
      />
    물리 법칙 적용과 유사한 원리로 동작

*/

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #89eacb, #13312a);
`;

const Box = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
    return (
        <Wrapper>
            <Box
                transition={{ type: "spring", delay: 1 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotateZ: 360 }}
            />
        </Wrapper>
    );
}

export default App;
