# 노드 이미지를 최신 버전으로 가져옴
FROM node:latest as build
# 1. nginx 설치

# Node.js 앱을 위한 app 폴더 생성
RUN mkdir -p /app

# 어플리케이션 폴더를 WORKDIR명령어로 지정 - 서버 가동용
WORKDIR /app

# 가능한 package.json 과 package-lock.json을 모두 복사하기 위해서 와일드 카드 사용
COPY . /app

# install and cache app dependencies 
COPY ./package*.json ./

# 의존성 설치
RUN npm install

# 앱 소스코드 추가
# COPY App.tsx /app/

# 앱이 3000번 포트에 바인딩 되어있기 때문에 컨테이너의 3000번 포트를 열어줌
# EXPOSE 3000
# 인자값을 지정하지 않을시 node app.js를 실행
CMD [ "npm", "start" ]
# 2. build


# 3. ./client/build -> nginx root directory에 복사










# working directory 지정
# WORKDIR /app

# dependency 설치 
# COPY . /app/
# RUN yarn install
# 실제 환경 배포시 yarn build를 사용
# 작성한 Dockerfile은 개발용으로 작성 (로컬 파일을 컨테이너화 한것과 동일함)


# 환경 변수 설정하기
# ENV React_APP_NAME="Contentsbank"

# 앱 실행
# CMD ["npm", "start"]

# example-fe라는 이름으로 도커 이미지 빌드
# docker build -t example-fe .

# 도커 이미지 실행 (3000포트로), 만약 실행중인 도커 컨테이너가 있다면 중지 후 다시 시작
# docker run -v ${PWD}:/app -p 3000:3000 --rm example-fe

