import styled from "styled-components";
import { motion } from "framer-motion";
import { duration } from "moment";
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


  - variants
    애니메이션의 한 stage. 일일이 적었던 설정값들을 분리된 object로 옮김으로써 코드 정리 및 간결화 가능. 이름도 내맘대로 지정 가능.
    object에 사용할 animation 정의 후, 
    태그에 해당 object를 variant로 지정해 준다
    시작은 initial, 끝은 animate 
    transition등 효과는 animate에 넣어줌
    <Box variants={myVars} initial="start" animate="end" />
    - 부모 컴포넌트가 variant,initial,animate를 가지고 있으면, 이를 모든 자식 요소에게 자동으로 동시 적용해준다! 자식 요소에 일일이 지정해 줄 필요 없고, 다른 걸 지정해 주면 동시 적용됨.
    - orchestration: 자식 요소에 ani 지정 가능

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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
    background-color: #fff;
    height: 70px;
    width: 70px;
    place-self: center;
    border-radius: 35px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
    start: {
        opacity: 0,
        scale: 0.5,
    },
    end: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            duration: 1,
            bounce: 0.5,
            delayChildren: 1,
            staggerChildren: 0.2,
        },
    },
};
const circleVariants = {
    start: {
        opacity: 0,
        y: 10,
    },
    end: {
        opacity: 1,
        y: 0,
    },
};

function App() {
    return (
        <Wrapper>
            <Box variants={boxVariants} initial="start" animate="end">
                <Circle variants={circleVariants} />
                <Circle variants={circleVariants} />
                <Circle variants={circleVariants} />
                <Circle variants={circleVariants} />
            </Box>
        </Wrapper>
    );
}

export default App;
