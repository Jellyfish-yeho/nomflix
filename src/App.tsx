import styled from "styled-components";
import {
    motion,
    useMotionValue,
    useScroll,
    useTransform,
    useViewportScroll,
} from "framer-motion";
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
  값 설정 방법: x.set(), useTransform
- useTransform : 특정 값의 변화에 따라 변화 비율에 맞는 다른 값 리턴. = interpolation
  const scale = useTransform(x, [-200, 0, 200], [2, 1, 0.1]);
  - useScroll: scroll의 motionValue 를 리턴. 
  scrollX/Y= scrolled pixel amount
  scrollX/YProgress= 0 ~ 1 사이 % 값

  - svg animation
  svg > path : fill, stroke, strokeWidth...

  - 특정 animation만 다르게 실행하기
  (animation 속성에 들어가는 값에 쓰면 모든 속성에 동시 적용)
  transition={{
      default: { duration: 3 },
      fill: { duration: 2, delay: 5 },
  }}


*/

const Wrapper = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, rgb(137, 234, 203), rgb(255, 178, 91));
`;

const Svg = styled.svg`
    width: 200px;
    height: 200px;
    path {
        stroke: white;
        stroke-width: 2;
    }
`;

const svg = {
    start: { fill: "rgba(255,255,255,0)", pathLength: 0 },
    end: {
        fill: "rgba(255,255,255,1)",
        pathLength: 1,
    },
};

function App() {
    return (
        <Wrapper>
            <Svg xmlns="http://www.w3.org/2000/Svg" viewBox="0 0 448 512">
                <motion.path
                    variants={svg}
                    initial="start"
                    animate="end"
                    transition={{
                        default: { duration: 3 },
                        fill: { duration: 2, delay: 3 },
                    }}
                    d="M224 373.1c-25.2-31.7-40.1-59.4-45-83.2-22.6-88 112.6-88 90.1 0-5.5 24.3-20.3 52-45 83.2zm138.2 73.2c-42.1 18.3-83.7-10.9-119.3-50.5 103.9-130.1 46.1-200-18.9-200-54.9 0-85.2 46.5-73.3 100.5 6.9 29.2 25.2 62.4 54.4 99.5-32.5 36.1-60.6 52.7-85.2 54.9-50 7.4-89.1-41.1-71.3-91.1 15.1-39.2 111.7-231.2 115.9-241.6 15.8-30.1 25.6-57.4 59.4-57.4 32.3 0 43.4 25.9 60.4 59.9 36 70.6 89.4 177.5 114.8 239.1 13.2 33.1-1.4 71.3-37 86.6zm47-136.1C280.3 35.9 273.1 32 224 32c-45.5 0-64.9 31.7-84.7 72.8C33.2 317.1 22.9 347.2 22 349.8-3.2 419.1 48.7 480 111.6 480c21.7 0 60.6-6.1 112.4-62.4 58.7 63.8 101.3 62.4 112.4 62.4 62.9 .1 114.9-60.9 89.6-130.2 0-3.9-16.8-38.9-16.8-39.6z"
                />
            </Svg>
        </Wrapper>
    );
}

export default App;
