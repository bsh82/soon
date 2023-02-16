import {axiosProcess, server} from "@recoils/consonants";

export async function getGoogleInfoAxios(code: string) {
  return axiosProcess(async () => {
    return await server.post("/auth/google/callback", {code});
  });
}
export async function getToken({userid, ssoid}: {userid: string; ssoid: string}) {
  return axiosProcess(async () => {
    return await server.post("/auth/token", {userid, ssoid});
  });
}
