import { FC, useEffect, useState } from "react";
import {
  Accordion,
  Div,
  Group,
  Link,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  RichCell,
  Title,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { newsApi, useGetNewsItemByIdQuery } from "../services/api";
import { Icon24ExternalLinkOutline } from "@vkontakte/icons";
import Comment from "../components/comment";

export const NewsItem: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  // const params = useParams<"id">();

  // const { data, error, isLoading } = useGetNewsByIdQuery(Number(params?.id));
  const { data, error, isLoading } = useGetNewsItemByIdQuery(8863);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Вернуться назад
      </PanelHeader>
      {data && (
        <>
          <RichCell
            text={`Автор: ${data.newsItem.by}`}
            caption={`Дата: ${data.newsItem.time}`}
            after={
              <Link href={data.newsItem.url} target="_blank">
                Перейти к новости{" "}
                <Icon24ExternalLinkOutline width={16} height={16} />
              </Link>
            }
          >
            <Title level="2" style={{ marginBottom: 16 }}>
              {data.newsItem.title}
            </Title>
          </RichCell>
          <Div>{`Кол-во комментариев: ${data.newsItem.descendants}`}</Div>
          {data.comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        </>
      )}
    </Panel>
  );
};
