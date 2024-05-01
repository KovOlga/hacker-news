import { FC } from "react";
import {
  Div,
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
import { useGetNewsByIdQuery } from "../services/api";
import { Icon24ExternalLinkOutline } from "@vkontakte/icons";

export const NewsItem: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<"id">();

  // const { data, error, isLoading } = useGetNewsByIdQuery(Number(params?.id));
  const { data, error, isLoading } = useGetNewsByIdQuery(8863);

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
            text={`Автор: ${data.by}`}
            caption={`Дата: ${data.time}`}
            after={
              <Link href={data.url} target="_blank">
                Перейти к новости{" "}
                <Icon24ExternalLinkOutline width={16} height={16} />
              </Link>
            }
          >
            <Title level="2" style={{ marginBottom: 16 }}>
              {data.title}
            </Title>
          </RichCell>
          <Div>{`Кол-во комментариев: ${data.descendants}`}</Div>
        </>
      )}
      {/* <Placeholder>
        <img width={230} src={PersikImage} alt="Persik The Cat" />
      </Placeholder> */}
    </Panel>
  );
};
