# 노드 이미지를 최신 버전으로 가져옴
FROM node:latest as build

# working directory 지정
WORKDIR /app

# dependency 설치 
COPY . .
RUN yarn install
# 실제 환경 배포시 yarn build를 사용
# 작성한 Dockerfile은 개발용으로 작성 (로컬 파일을 컨테이너화 한것과 동일함)


# 환경 변수 설정하기
ENV React_APP_NAME="Contentsbank"

# 앱 실행
CMD ["yarn", "start"]

# example-fe라는 이름으로 도커 이미지 빌드
# docker build -t example-fe .

# 도커 이미지 실행 (3000포트로), 만약 실행중인 도커 컨테이너가 있다면 중지 후 다시 시작
# docker run -v ${PWD}:/app -p 3000:3000 --rm example-fe