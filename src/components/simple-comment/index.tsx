import { Div, RichCell } from "@vkontakte/vkui";
import { IComment } from "../../types/data";
import { FC } from "react";

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

export default SimpleComment;
