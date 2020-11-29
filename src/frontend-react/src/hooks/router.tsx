import { useMemo } from 'react';
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import queryString from 'query-string';

type Query = {
  [key: string]: string;
};

export const history = createBrowserHistory();

export function useRouter<ParamTypes, MatchTypes>() {
  const params = useParams<ParamTypes>();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch<MatchTypes>();

  const query: Query = useMemo<Query>(() => {
    const parsed = { ...queryString.parse(location.search) };
    const query: Query = {};
    Object.keys(parsed).forEach((key) => {
      query[key] = decodeURIComponent(parsed[key] as string);
    });

    return query;
  }, [location.search]);

  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query,
      params,
      match,
      location,
      history,
    };
  }, [params, match, location, history, query]);
}
