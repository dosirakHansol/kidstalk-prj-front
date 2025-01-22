import styled from "styled-components";
import { MyInfo } from "../../containers/MyInfo";
import { InfoList } from "../../containers/InfoList";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { logoutAuth } from "../../store/authSlice";
import { useRouter } from "next/router";

const SMyInfoPage = styled.div`
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;
export default function MyInfoPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const onClickLogout = useCallback(
    (e: EventListener) => {
      dispatch(logoutAuth());
      router.push("/");
    },
    [dispatch]
  );
  return (
    <SMyInfoPage>
      <MyInfo onClickLogout={onClickLogout}></MyInfo>
      <InfoList />
    </SMyInfoPage>
  );
}
