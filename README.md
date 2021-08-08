# nodejs_restapi
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

# ================== Client 구축 ==================
# client 디렉토리 이동
cd client

# 오래 걸림
npx create-react-app . 
```
