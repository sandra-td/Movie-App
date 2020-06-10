export default {
    movies: {
        movieDetails: null,
        cast: [],
        isFetchingDetails: false,
        isFetchDetailsSuccess: false,
        similarMovies: [],
        recommendedMovies: [],
        similarMoviesAll: [],
        recommendedMoviesAll: [],
        isFetchingLatest: true,
        rated: false
    },
    auth: {
        isSignedIn: false,
        accountId: "",
        sessionId: ""
    },
    profile: {
        isFetching: false,
        favoriteMovies: [],
        watchlistMovies: [],
        favorite: false,
        watchlist: false,
        rated: false,
        lists: {
            userLists: [],
            isFetching: false,
            currentList: null,
            currentListItems: [],
            isFetchingCurrentList: true,
            inputName: "",
            inputDescription: "",
            searchQuery: null,
            suggestions: [],
            isFetchingSuggestions: false,
            isItemOnList: false
        },
        searched: false,
        fetchFailed: false,
        opened: false
    },
    startPage: {
        isFetching: false,
        isSuccess: false,
        nowPlaying: [],
        popular: [],
        upcoming: [],
        topRated: [],
        latestMovie: []
    },
    search: {
        query: "",
        isFetching: true,
        results: []
    },
    people: {
        details: null,
        isFetching: false
    }
};
