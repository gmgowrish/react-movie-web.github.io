import { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";

/** Fetch a single TMDB endpoint. Pass a falsy path to skip. */
export function useTmdb(path, params = {}) {
  const key = path ? path + JSON.stringify(params) : "";
  const [state, setState] = useState({ data: null, loading: Boolean(path), error: null });

  useEffect(() => {
    if (!path) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    const ctrl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    tmdb(path, params, ctrl.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== "AbortError") setState({ data: null, loading: false, error });
      });
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}

/** Paginated TMDB list with `loadMore` for infinite scrolling. */
export function usePaginated(path, params = {}) {
  const key = path ? path + JSON.stringify(params) : "";
  const [pageState, setPageState] = useState({ key, page: 1 });
  const page = pageState.key === key ? pageState.page : 1;
  const [state, setState] = useState({ items: [], totalPages: 1, loading: true, error: null });

  useEffect(() => {
    if (!path) {
      setState({ items: [], totalPages: 1, loading: false, error: null });
      return;
    }
    const ctrl = new AbortController();
    setState((s) => ({ ...s, items: page === 1 ? [] : s.items, loading: true, error: null }));
    tmdb(path, { ...params, page }, ctrl.signal)
      .then((data) =>
        setState((s) => {
          const prev = page === 1 ? [] : s.items;
          const seen = new Set(prev.map((i) => `${i.media_type || ""}-${i.id}`));
          const fresh = data.results.filter((i) => !seen.has(`${i.media_type || ""}-${i.id}`));
          return {
            items: [...prev, ...fresh],
            totalPages: Math.min(data.total_pages || 1, 500),
            totalResults: data.total_results,
            loading: false,
            error: null,
          };
        })
      )
      .catch((error) => {
        if (error.name !== "AbortError") setState((s) => ({ ...s, loading: false, error }));
      });
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, page]);

  const hasMore = page < state.totalPages;
  const loadMore = () => {
    if (!state.loading && hasMore) setPageState({ key, page: page + 1 });
  };

  return { ...state, hasMore, loadMore };
}
