현재 자신의 환경이 웹팩과 같은 번들링 도구나 babel과 컴파일러(?)를 사용할 수 없는 상황일 때, <br />
그래도 어떻게 조금이라도 용량들을 압축시켜 사용자 환경을 개선시킬 수 없을까 <br/>
할 때를 생각해서 해서 여러 pakage들을 합쳐서 만든 초간단 압축기입니다.

이것을 만들 때 신경 쓴 부분은 보통 다른 압축기를 쓰면 원본은 유지한 채로 다른 폴더에 압축된 파일들이 생기는데

전 이부분이 너무 번거롭다고 생각하여 파일들이 그 위치 그대로에 압축된 채로 있으면 좋겠다고 생각했습니다.

### usage

```npm install``` or ```yarn install``` 

```npm run build``` or ```yarn build```
