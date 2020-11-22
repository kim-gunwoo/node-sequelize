## NODE Sequelize 예제

```bash
# dependencies
npm i sequelize // 시퀄라이즈 설치
npm i mysql2 // mysql2 설치
npm i maraidb //마리아디비

# sequelize-cli 전역설치
npm i -g sequelize-cli // sequelize-cli를 전역으로 설치
sequelize init 을 통해 기본 models/index.js 생성

# 호출 정보
기본 : http://localhost:{PORT}/user/
body json
{
    usernm: usernm,
    loginid: loginid,
    email: email,
    pwd: pwd
}
method : get , 호출경로 : /:아이디

method : post , 호출경로 : /

method : path , 호출경로 : /

method : delete , 호출경로 : /

```

## 참고

https://sequelize.org/
