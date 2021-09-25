import { useContext, useRef } from "react";
import "./login.css";
import { loginCall, kakaoLoginCall} from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  const toRegisterPage = () => {
    history.push("/register");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">링킹[LINKING]</h3>
          <span className="loginDesc">
            
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="아이디"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="비밀번호"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "로그인"
              )}
            </button>
          </form>
          <div className="loginBox">
          <button className="kakaologinButton" onClick={kakaoLoginCall} >카카오 로그인</button>
            
            <button className="loginRegisterButton" onClick={toRegisterPage}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "새로운 계정 생성"
              )}
            </button>
          <span className="loginForgot">비밀번호를 잊으셨습니까?</span>
          </div>
            
        </div>
      </div>
    </div>
  );
}
