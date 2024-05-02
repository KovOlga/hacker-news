import { Accordion, Div, Group, RichCell } from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";
import { IComment } from "../../types/data";
import { newsApi } from "../../services/api";

interface ICommentProps {
  comment: IComment;
}

const CommentAccordion: FC<ICommentProps> = ({ comment }) => {
  const [trigger, result, lastPromiseInfo] =
    newsApi.useLazyGetCommentKidsQuery();

  useEffect(() => {
    if (result && result.data) {
      // console.log("result", result);
    }
  }, [result]);

  const handleAccordionClick = async (commentId: number) => {
    // console.log("id", commentId);
    if (commentId) {
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
          result.data.loadedKids &&
          result.data.loadedKids.map((comment) => {
            return (
              <Accordion.Content key={comment.id}>
                <SimpleComment comment={comment} />
              </Accordion.Content>
            );
          })}
      </Accordion>
    </Group>
  );
};

const SimpleComment: FC<{ comment: IComment }> = ({ comment }) => {
  console.log("comment", comment);
  return (
    <>
      <RichCell caption={`Дата: ${comment.time}`} text={comment.text}>
        {comment.by}
      </RichCell>
      {comment.loadedKids && (
        <Div>
          {comment.loadedKids.map((comment) => {
            return <SimpleComment comment={comment} key={comment.id} />;
          })}
        </Div>
      )}
    </>
  );
};

export default CommentAccordion;
