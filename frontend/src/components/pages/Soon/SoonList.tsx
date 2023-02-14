import {Box, Stack} from "@mui/material";
import {useState} from "react";
import {Button, makeStyles, TextField} from "@material-ui/core";
import UserCard from "@layout/Card";
import { addSoonQuery, getSoonListQuery } from "@recoils/api/Soon";
import Loading from "components/Loading/Loading";
import Error from "components/Error/Error";

export default function SoonList() {
  const userid = 1 //TODO: user#
  return (
    <Box>
      <Stack direction={"row"}>
        <Box>{MySoon(userid)}</Box>
      </Stack>
      <Stack direction={"row"}>
        <Box>{SoonAddButton(userid)}</Box>
        <Box>{SoonDeleteButton(userid)}</Box>
      </Stack>
    </Box>
  );
}

function MySoon(userid: number) {
  const {isLoading, isError, data, error} = getSoonListQuery(userid)
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error error={error} />;
  }
  console.log("data >>", data)
  return (
    <div>
      {data?.map((
        {soonid, soonwon}: any) => (
        <UserCard
          key={soonid}
          userid={soonwon.userid}
          nickname={soonwon.nickname}
        />
      ))}
    </div>
  );
}

function SoonAddButton(userid: number) {
  const buttonStyle = {
    size: "small",
    width: "30px",
    height: "23px",
  };

  const [textFieldOpen, setTextFieldOpen] = useState(false);
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const swid = Number(text);
      console.log("순원 추가 >>", swid);
      console.log("id 타입 >>", typeof(swid));
      addSoonQuery(userid,swid);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        style={buttonStyle}
        onClick={() => {
          setTextFieldOpen(!textFieldOpen);
        }}>
        +
      </Button>
      {textFieldOpen && (
        <form onSubmit={handleSubmit}>
          <TextField label="순원id를 입력해주세요" value={text} onChange={handleChange} />
          <Button type="submit" variant="contained">
            순원추가
          </Button>
        </form>
      )}
    </Box>
  );
}

function SoonDeleteButton(userid: number) {
  const buttonStyle = {
    size: "small",
    width: "30px",
    height: "23px",
  };

  const [textFieldOpen, setTextFieldOpen] = useState(false);
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // const response = await axios.delete("http://13.125.79.139/", {Body: {sjid: "내 순장id", swid: Number(text)/*<-순원id로 추가*/}});
      // console.log(response.data);
      const response = text;
      console.log("순원 삭제 >>", text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        style={buttonStyle}
        onClick={() => {
          setTextFieldOpen(!textFieldOpen);
        }}>
        -
      </Button>
      {textFieldOpen && (
        <form onSubmit={handleSubmit}>
          <TextField label="순원id를 입력해주세요" value={text} onChange={handleChange} />
          <Button type="submit" variant="contained">
            순원삭제
          </Button>
        </form>
      )}
    </Box>
  );
}
