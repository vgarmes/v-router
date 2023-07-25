interface Props {
  routeParams: { query: string };
}

function SearchPage({ routeParams }: Props) {
  return <h1>{`Search: ${routeParams.query}`}</h1>;
}

export default SearchPage;
