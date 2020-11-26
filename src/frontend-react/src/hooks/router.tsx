import { useMemo, useCallback } from 'react';
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { createBrowserHistory, Location } from 'history';
import queryString from 'query-string';

export const history = createBrowserHistory();

export function useRouter<ParamTypes, MatchTypes>() {
  const params = useParams<ParamTypes>();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch<MatchTypes>();
  const parsed = { ...queryString.parse(location.search) };

  const query: any = {};

  Object.keys(parsed).forEach((key) => {
    query[key] = decodeURIComponent(parsed[key] as string);
  });

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
