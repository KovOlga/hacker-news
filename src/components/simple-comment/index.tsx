import { Div, RichCell } from "@vkontakte/vkui";
import { IComment } from "../../types/data";
import { FC } from "react";
import { convertTimeStampToDate } from "../../utils/utils";

const SimpleComment: FC<{ comment: IComment }> = ({ comment }) => {
  return (
    <>
      <RichCell
        multiline
        caption={`Дата: ${convertTimeStampToDate(comment.time)}`}
        text={comment.text}
      >
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

export default SimpleComment;
