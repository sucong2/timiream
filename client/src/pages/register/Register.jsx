import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("비밀번호가 일치하지않습니다!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const toLoginPage = () => {
    history.push("/");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">링킹[LINKING]</h3>
          <span className="loginDesc">
            : 선생님과 연락하는 가장 진보된 서비스
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="사용자 이름"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="아이디"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="비밀번호"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="비밀번호 확인"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginRegisterButton" type="submit" >회원가입</button>
            
          </form>
          <button className="haveaccount" onClick={toLoginPage}><span>이미 계정이 있으신가요 ?</span></button>
        </div>
      </div>
    </div>
  );
}
