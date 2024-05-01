import { FC, useEffect } from "react";
import {
  Accordion,
  Div,
  Group,
  Link,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  RichCell,
  Title,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import PersikImage from "../assets/persik.png";
import { useGetNewsItemByIdQuery } from "../services/api";
import { Icon24ExternalLinkOutline } from "@vkontakte/icons";

export const NewsItem: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<"id">();

  // const { data, error, isLoading } = useGetNewsByIdQuery(Number(params?.id));
  const { data, error, isLoading } = useGetNewsItemByIdQuery(8863);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const infoStyle = { color: "var(--vkui--color_text_subhead)" };

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
            return (
              <Group key={comment.id}>
                <Accordion>
                  <Accordion.Summary iconPosition="before">
                    <RichCell
                      caption={`Дата: ${comment.time}`}
                      text={comment.text}
                    >
                      {comment.by}
                    </RichCell>
                  </Accordion.Summary>
                  <Accordion.Content>
                    <Div style={infoStyle}>
                      Внешний вид профиля ВКонтакте действительно обновился. К
                      прежнему варианту вернуться уже не получится. В центре
                      внимания нового дизайна — личность человека и его
                      увлечения. Новый формат профиля особенно удобен для
                      авторов контента и станет для них цифровой визиткой.
                    </Div>
                  </Accordion.Content>
                </Accordion>
              </Group>
            );
          })}
        </>
      )}
      {/* <Placeholder>
        <img width={230} src={PersikImage} alt="Persik The Cat" />
      </Placeholder> */}
    </Panel>
  );
};
