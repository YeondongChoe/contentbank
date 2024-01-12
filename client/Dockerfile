# 노드 이미지를 최신 버전으로 가져옴
FROM node:20.10.0 as build
# 1. nginx 설치

# Node.js 앱을 위한 app 폴더 생성
RUN mkdir -p /app

# 어플리케이션 폴더를 WORKDIR명령어로 지정 - 서버 가동용
WORKDIR /app

# 가능한 package.json 과 package-lock.json을 모두 복사하기 위해서 와일드 카드 사용
COPY . /app

# 의존성 설치
# RUN sudo apt-get remove npm
# RUN npm cache clean --force
RUN npm install npm@10.3.0
# 서버에 npm 버전 로컬과 동일하게
RUN npm install

# 앱 소스코드 추가
# COPY App.tsx /app/

# 앱이 3000번 포트에 바인딩 되어있기 때문에 컨테이너의 3000번 포트를 열어줌
# EXPOSE 3000
# 인자값을 지정하지 않을시 node app.js를 실행
CMD [ "npm", "start" ]
# 2. build




# 3. ./client/build -> nginx root directory에 복사

