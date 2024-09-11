import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
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
    태그에 해당 object를 variant로 지정해 준다. 
    시작은 initial, 끝은 animate 
    transition등 효과는 animate에 넣어줌
    <Box variants={myVars} initial="start" animate="end" />
    - 이 prop들의 값은 string으로 들어가기만 하면 된다. 즉, 조건문도 사용 가능하다는 것.
    - 부모 컴포넌트가 variant,initial,animate를 가지고 있으면, 이를 모든 자식 요소에게 자동으로 동시 적용해준다! 자식 요소에 일일이 지정해 줄 필요 없고, 다른 걸 지정해 주면 동시 적용됨.
  
  - orchestration: 자식 요소에 ani 지정 가능

  - while~ prop: 특정 상태에 애니메이션 지정(ex.hover)

  * 색상값들은 rgba 나 hex같은 numeric value를 넣어야 애니메이션이 발생한다. (점진적 변화)

  - drag: 요소 드래그 활성화. x, y 로 수평/수직 방향 제한 가능
  - dragConstraints: 드래그 범위 제한. top/bottom/left/right 범위 지정 가능. 값을 모두 0으로 하면 중앙으로 되돌아가진다
  특정 요소 안에서만 가능하게 하려면 해당 요소에 ref를 등록 후 이를 dragConstraint로 지정하면 됨.
  - dragSnapToOrigin: dragConstraints에서 값을 0으로 한것과 같은 효과. 중앙으로 되돌아감.
  - dragElastic: 드래그에 저항하는 힘. 0 과 1사이의 값.

  - motionValue : 애니메이션 수치 트래킹
  이 값이 업데이트되어도, react의 rendering cycle을 trigger시키지 않는다. 즉, motionValue는 state값이 아님.
  값 확인 방법: useMotionValue의 기본값 0으로 설정, css에 넣어주기, x.get()
  const x = useMotionValue(0); 
  useEffect(() => { x.onChange(() => console.log(x.get()));}, [x]);
  <Box style={{ x }} drag="x" dragSnapToOrigin />
  -> style이 바뀌면 x값도 바뀜.
  값 설정 방법: x.set()

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
    width: 100px;
    height: 100px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
    const x = useMotionValue(0);
    useEffect(() => {
        x.onChange(() => console.log(x.get()));
    }, [x]);
    return (
        <Wrapper>
            <button onClick={() => x.set(200)}>click me</button>
            <Box style={{ x }} drag="x" dragSnapToOrigin />
        </Wrapper>
    );
}

export default App;
