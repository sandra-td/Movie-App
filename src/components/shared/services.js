
export const sortDates = (items) => {

    let movies = items.slice(0, items.length)
    let sorted = false;

    while (sorted === false) {
        sorted = true;
        for (let i = 0; i < movies.length - 1; i++) {

            if (!movies[i] || !movies[i].release_date) {
                movies.splice(i, 1)
                continue;
            }
            if (!movies[i + 1] || !movies[i + 1].release_date) {
                movies.splice(i + 1, 1)
                continue;
            }

            let movie1 = movies[i];
            let movie2 = movies[i + 1]
            let dateString1 = String(movie1.release_date)
            const year1 = dateString1.slice(0, 4)
            let dateString2 = String(movie2.release_date)
            const year2 = dateString2.slice(0, 4)
            if (year1 < year2) {
                movies[i] = movie2;
                movies[i + 1] = movie1;
                sorted = false;

            }

        }
    }
    return movies;
}


export const returnLanguageString = language => {
    switch (language) {
        case "en":
            return "English"
        case "hi":
            return "Hindu"
        case "ko":
            return "Korean"
        case "es":
            return "Spanish"
        case "it":
            return "Italian"
        case "de":
            return "German"
        case "se":
            return "Swedish"
        case "sr":
            return "Serbian"
        case "fr":
            return "French"
        case "ja":
            return "Japanese"
        case "ru":
            return "Russian"
        default:
            return language
    }
}

export const getHighestRatedMovies = (movies) => {

    let goodMovies = []
    let voteCountSum = 0
    for (let movie of movies) {
        voteCountSum += Number(movie.vote_count)
    }
    let summary = voteCountSum / movies.length
    for (let movie of movies) {
        if (movie.vote_count > summary) {
            goodMovies.push(movie)
        }
    }

    if (goodMovies.length < 5) {
        let filteredMovies = movies.filter(item => {
            return !goodMovies.includes(item)
        })
        let sortedMovies = [...goodMovies, ...filteredMovies]
        return sortedMovies.slice(0, 5);
    }

    let sorted = false
    while (sorted === false) {
        sorted = true;
        for (let i = 0; i < goodMovies.length - 1; i++) {
            let movie1 = goodMovies[i];
            let movie2 = goodMovies[i + 1]
            if (movie1.vote_average < movie2.vote_average) {
                goodMovies[i] = movie2;
                goodMovies[i + 1] = movie1;
                sorted = false;
            }
        }
    }
    let sortedMovies = goodMovies.slice(0, 5)
    return sortedMovies;

}
