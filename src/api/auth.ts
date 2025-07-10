import axios from "axios";

/* 이메일 인증번호 발송 */
export const sendEmailCode = async (email: string) => {
    const response = await axios.post(
        "http://35.184.113.72/api/v1/auth/email/send",
        { email },
    );
    return response.data;
};

/* 이메일 인증번호 확인 */
export const verifyEmailCode = async (email: string, code: string) => {
    const response = await axios.post(
        "http://35.184.113.72/api/v1/auth/email/verify",
        {
            email,
            code,
        },
    );
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
    const response = await axios.post(
        "http://35.184.113.72/api/v1/auth/signup",
        {
            email,
            password,
            nickname,
            birthday,
            gender,
        },
    );
    return response.data;
};
