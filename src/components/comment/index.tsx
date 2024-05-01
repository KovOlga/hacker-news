import { Accordion, Div, Group, RichCell } from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";
import { IComment } from "../../types/data";
import { newsApi } from "../../services/api";

interface ICommentProps {
  comment: IComment;
}

const Comment: FC<ICommentProps> = ({ comment }) => {
  const infoStyle = { color: "var(--vkui--color_text_subhead)" };
  const [trigger, result, lastPromiseInfo] =
    newsApi.useLazyGetCommentKidsQuery();
  // const [comm, setComm] = useState({})

  useEffect(() => {
    if (result && result.data) {
      console.log("result", result);
    }
  }, [result]);

  const handleAccordionClick = async (commentId: number) => {
    console.log("id", commentId);
    if (comment.kids) {
      trigger(commentId);
    }
  };

  return (
    <Group key={comment.id}>
      <Accordion onChange={(e) => e && handleAccordionClick(comment.id)}>
        <Accordion.Summary iconPosition="before">
          <RichCell caption={`Дата: ${comment.time}`} text={comment.text}>
            {comment.by}
          </RichCell>
        </Accordion.Summary>

        {comment.kids &&
          result &&
          result.data &&
          result.data.map((comment) => {
            return (
              <Accordion.Content>
                <Comment key={comment.id} comment={comment} />
              </Accordion.Content>
            );
          })}
      </Accordion>
    </Group>
  );
};

export default Comment;
