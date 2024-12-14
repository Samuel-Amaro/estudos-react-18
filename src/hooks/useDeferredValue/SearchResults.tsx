import { fetchData } from "./data";

export default function SearchResults({ query }: { query: string }) {
  if (query === "") {
    return null;
  }

  const albums: {
    id: number;
    title: string;
    year: number;
  }[] = use(fetchData(`/search?q=${query}`));
  console.log(albums);

  if (albums.length === 0) {
    return (
      <p>
        No matches for <i>"{query}"</i>
      </p>
    );
  }

  return (
    <ul>
      {albums.map((album) => (
        <li key={album?.id}>
          {album?.title} ({album?.year})
        </li>
      ))}
    </ul>
  );
}

// This is a workaround for a bug to get the demo running.
// TODO: replace with real implementation when the bug is fixed.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function use(promise: any) {
  if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else if (promise.status === "pending") {
    throw promise;
  } else {
    promise.status = "pending";
    promise.then(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result: any) => {
        promise.status = "fulfilled";
        promise.value = result;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (reason: any) => {
        promise.status = "rejected";
        promise.reason = reason;
      },
    );
    throw promise;
  }
}
