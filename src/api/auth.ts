import { axiosInstance, axiosNotApi } from "./index";

/* 이메일 인증번호 발송 */
export const sendEmailCode = async (email: string) => {
    const response = await axiosInstance.post("auth/email/send", {
        email,
    });
    return response.data;
};

/* 이메일 인증번호 확인 */
export const verifyEmailCode = async (email: string, code: string) => {
    const response = await axiosInstance.post("auth/email/verify", {
        email,
        code,
    });
    return response.data;
};

/* 회원가입 */
export const signUp = async (
    email: string,
    password: string,
    nickname: string,
    birthday: string,
    gender: string,
) => {
    const response = await axiosInstance.post("auth/signup", {
        email,
        password,
        nickname,
        birthday,
        gender,
    });
    return response.data;
};

/* 로그인 */
export const login = async (username: string, password: string) => {
    const response = await axiosInstance.post("auth/login", {
        username,
        password,
    });
    return response.data;
};

/* 소셜 로그인 추가 정보 입력 */
export const firstRegist = async (
    nickname: string,
    birthday: string,
    gender: string,
) => {
    const response = await axiosInstance.put("auth/oauth/first-regist", {
        nickname,
        birthday,
        gender,
    });
    return response.data;
};

/* 로그아웃 */
export const logout = async () => {
    return await axiosNotApi.get("auth/logout");
};
