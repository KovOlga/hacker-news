import { Accordion, Group, RichCell } from "@vkontakte/vkui";
import { FC, useEffect } from "react";
import { IComment } from "../../types/data";
import { newsApi } from "../../services/api";
import SimpleComment from "../simple-comment";
import { convertTimeStampToDate } from "../../types/utils";

interface ICommentProps {
  comment: IComment;
}

const CommentAccordion: FC<ICommentProps> = ({ comment }) => {
  const [trigger, result] = newsApi.useLazyGetCommentKidsQuery();

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
          <RichCell
            caption={`Дата: ${convertTimeStampToDate(comment.time)}`}
            text={comment.text}
          >
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

export default CommentAccordion;
