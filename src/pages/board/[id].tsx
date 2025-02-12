import styled from "styled-components";
import BoardDetail from "../../containers/BoardDetail";
import { CommentList } from "../../containers/CommentList";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createComment, requestCommentList } from "../../api/comment";
import { ChangeEvent, useCallback, useState } from "react";
import { useRouter } from "next/router";

const SBoardDetailPage = styled.div`
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  padding: 10px;
  height: 100%;
`;
export default function BoardDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: commentList,
    isLoading: commentLoading,
    error: commentError,
  } = useQuery({
    queryKey: ["commentList", id],
    queryFn: () => requestCommentList(Number(id)),
    enabled: !!id,
  });
  const [commentData, setCommentData] = useState<string>("");
  const commentMutation = useMutation({
    mutationKey: ["comment"],
    mutationFn: createComment,
  });

  const onChangeComment = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const { value } = e.target;

      setCommentData(value);
    },
    [commentData]
  );

  const onSubmitComment = useCallback(() => {
    commentMutation.mutate({
      description: commentData,
      boardId: id,
      parentId: 0,
    });
  }, [commentData]);
  return (
    <SBoardDetailPage>
      <BoardDetail></BoardDetail>
      <CommentList
        onChange={onChangeComment}
        data={commentData}
        commentList={commentList?.data.commentList}
        onSubmit={onSubmitComment}
      />
    </SBoardDetailPage>
  );
}
