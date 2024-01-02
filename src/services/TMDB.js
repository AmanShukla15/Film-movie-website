import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;


export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({

        // Get genres
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
        }),

        // Get movies by [type]
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {

                // Get Movies by search
                if (searchQuery) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
                }

                //   getmovies by categories
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
                }

                //   getmovies by genres
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
                }
                
                //   get popular movies
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`
            }
        })
    }),
});

export const {
    useGetGenresQuery,
    useGetMoviesQuery,

} = tmdbApi;
