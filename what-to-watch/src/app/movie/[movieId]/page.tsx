const MoviePage = ({ params }: { params: { movieId: number } }) => {
  return <div>{params.movieId}</div>;
};

export default MoviePage;
