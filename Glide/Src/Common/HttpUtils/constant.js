let API_KEY = "14c16d56f2647e61c2faef5355014969"
export const FETCH_POPULAR_MOVIE = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=`
export const FETCH_MOVIE_LIST = `https://api.themoviedb.org/4/list/`
export const FETCH_HEIGHEST_RATED_MOVIE = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=`