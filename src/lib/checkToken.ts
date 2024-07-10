import {jwtDecode} from "jwt-decode";

export default function isTokenValid(): boolean {
  const token = localStorage.getItem("everybodyeats_token");
  if (token) {
    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("everybodyeats_token");
        return false;
      } else {
        return true;
      }
    } catch (error) {
      localStorage.removeItem("everybodyeats_token");
      return false;
    }
  } else {
    return false;
  }
}

export const getUserId = () => {
  const token = localStorage.getItem("everybodyeats_token");
  if (token) {
    try {
      const decodedToken: { userId: string } = jwtDecode(token);
      return decodedToken.userId;
    } catch (error) {
      console.log(error);
      return '';
    }
  } else {
    return '';
  }

}
