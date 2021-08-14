# BoilerPlate 환경 설정
```shell
# ================== Server 구축 ==================

# 디렉토리 안에서 -> 모든 설정 다 enter
npm init

# index.js 생성 
vim index.js

# express 설치 -> package.json에 dependency 추가됨
npm install express --save

# mongoose 설치 -> package.json에 dependency 추가됨
npm install mongoose --save

# body-parser 설치 -> package.json에 dependency 추가됨
npm install body-parser --save

# 서버 실행
npm run start

# 매번 서버 내리고 올리기 힘듬 -> daemon 필요, 로컬에서만 하겠다 -dev -> devDependencies에 들어감
npm install nodemon --save-dev

# 비밀번호 암호화
npm install bcrypt --save

# JSON Web Token 설치
npm install jsonwebtoken -- save

# 쿠키 변환
npm install cookie-parser --save

# server, client 디렉토리 나눠주기
# index.js 및 package.json 경로 수정 필요

# ================== Client 구축 ==================
# client 디렉토리 이동
cd client

# 오래 걸림
npx create-react-app .

# client에서 react 시작
npm run start 

# React-Router-Dom 설치
npm install react-router-dom --save

# axios 요청하기 위함(비동기) - #21
npm install axios --save

# ================== Client & Server 동시 구동 ==================
# concurrently 설치(서버 디렉토리에서)
npm install concurrently --save

# CSS Framework 설치(클라이언트 디렉토리)
# ant.design
npm install antd --save
```
