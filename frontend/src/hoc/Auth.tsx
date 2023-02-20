import {getAuthUserQuery} from "@recoils/user/query";
import Error from "components/Error/Error";
import Loading from "components/Loading/Loading";
import {FC} from "react";
import {Navigate} from "react-router-dom";

export default (SpecificComponent: FC, option: boolean | null, loginUser?: any) => {
  const Component = () => {
    // const {isLoading, isError, data, error} = getAuthUserQuery();
    // console.log("data >", data);
    // if (isError) {
    //   return <Error error={error} />;
    // }
    // if (isLoading) {
    //   return <Loading />;
    // }

    // T = login, F = Not Login, null = Anyone
    if (option == true && (loginUser == "" || loginUser == null)) {
      if (loginUser == null || loginUser?.userid == undefined) {
        return <Navigate to="/login" replace={true} />;
      } else {
        return <SpecificComponent />;
      }
    } else if (option == false) {
      if (loginUser) {
        <Navigate to="/" replace={true} />;
      } else {
        return <SpecificComponent />;
      }
      return <SpecificComponent />;
    } else {
      return <SpecificComponent />;
    }
  };
  return <Component />;
};
