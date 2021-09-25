import axios from "axios";
const {Kakao} = window;
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};


export const kakaoLoginCall = async (dispatch) => {
  Kakao.Auth.login({
    success: function (response) {
      Kakao.API.request({
        url: '/v2/user/me',
        success: async (response) => {
            dispatch({ type: "LOGIN_START" });
            try {
              const user = {
                username: response.username,
                email: response.email,
                password: response.access_token
              };
              const authRes = await axios.post("/auth/kakaoLogin", user);
              dispatch({ type: "LOGIN_SUCCESS", payload: authRes.data });
            } catch (err) {
              dispatch({ type: "LOGIN_FAILURE", payload: err });
            }
           console.log(response)
        },
        fail: function (error) {
          console.log(error)
        },
      })
    },
    fail: function (error) {
      console.log(error)
    },
  })
};

export const logoutCall = async (dispatch) => {
  dispatch({ type: "LOGOUT_START" });
  try {
    const res = await axios.get("/auth/logout");
    dispatch({ type: "LOGOUT_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGOUT_FAILURE", payload: err });
  }
};