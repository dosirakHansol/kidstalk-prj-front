import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { requestDetail } from "../api/board";

const SBoardDetail = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const BoardForm = styled.div`
  border-radius: 5px;
  height: 100%;
  background: #eee;
  overflow: hidden;
  border: none;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.3);
`;
const BoardTitle = styled.div`
  padding: 10px 5px;
  text-align: left;
  background-color: orange;
  border: none;
`;
const BoardContent = styled.div`
  padding: 10px;
  text-align: left;
  color: black;
  border: none;
`;
export default function BoardDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useQuery({
    queryKey: ["boardDetail", id],
    queryFn: () => requestDetail(Number(id)),
    enabled: !!id,
  });
  return (
    <SBoardDetail>
      <BoardForm>
        <BoardTitle>제목</BoardTitle>

        <BoardContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorem
          laboriosam dolore voluptates, perspiciatis distinctio minima quibusdam
          voluptatem necessitatibus placeat nemo, dolor sunt rerum vel vero
          dicta aspernatur voluptatum blanditiis reiciendis quas quaerat
          impedit, aperiam modi? Nihil aperiam temporibus quis aspernatur natus,
          animi illum praesentium ab fugiat iure fugit laudantium.
        </BoardContent>
      </BoardForm>
    </SBoardDetail>
  );
}
