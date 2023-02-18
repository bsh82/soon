import {FastifyRequest, FastifyReply} from "fastify";
import {LOGIN_TYPE} from "@user/UserConstants";
import {checkSSO, parseJWT} from "@utils/OAuth2Utils";
import {haqqaton} from "@config/haqqaton.config";
import {OAuth2Client} from "google-auth-library";

const _google = haqqaton.oauth.google;
const oAuth2Client = new OAuth2Client(_google.clientId, _google.clientSecret, "postmessage");
// const authorizeUrl = oAuth2Client.generateAuthUrl({
//   access_type: "offline",
//   scope: "https://www.googleapis.com/auth/userinfo.profile",
// });

export default async function (fastify: any) {
  // fastify.get("/callback", async (req: FastifyRequest, reply: FastifyReply) => {
  //   console.log(req);
  //   const {token} = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
  //   const {id_token}: any = token;
  //   const data = parseJWT(id_token);
  //   const ssoid = data?.sub;
  //   const email = data?.email;
  //   const nickname = data?.name;
  //   const login = await checkSSO(LOGIN_TYPE.GOOGLE, ssoid, {email, nickname});
  //   reply.send(login);
  // });

  // Front에서 넘어온, code 처리
  fastify.post("/callback", async (req: FastifyRequest<{Body: {code: any}}>, reply: FastifyReply) => {
    const {tokens} = await oAuth2Client.getToken(req.body.code);
    const {id_token}: any = tokens;
    const profile = parseJWT(id_token);
    const ssoid = profile?.sub;
    const email = profile?.email;
    const nickname = profile?.name;
    console.log("Parsed jwt >> ", profile);
    const login = await checkSSO(LOGIN_TYPE.GOOGLE, ssoid, {email, nickname});
    // console.log("login ", login);
    reply.send(login);
  });
}
