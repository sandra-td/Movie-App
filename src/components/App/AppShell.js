import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../../css/style.css";
import PrivateRoute from "../PrivateRoute";
import Navbar from "../Navbar";
import MovieDetails from "../MovieDetails";
import LoginPage from "../LoginPage";
import StartPage from "../../views/StartPage";
import PopularMovies from "../../views/PopularMovies";
import TopRatedMovies from "../../views/TopRatedMovies";
import Profile from "../Profile/Profile";
import SimilarMoviesList from "../../views/SimilarMoviesList";
import RecommendationsList from "../../views/RecommendationsList";
import UpcomingMoviesList from "../../views/UpcomingMoviesList";
import SearchResults from "../../views/SearchResults";
import People from "../People";
import NotFound from "../NotFound";
import Footer from "../Footer";

const AppShell = () => {
    return (
        <div className="App">
            <main className="main-container">
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={StartPage} />
                        <Route
                            path="/popular-movies"
                            component={PopularMovies}
                        />
                        <Route
                            path="/toprated-movies"
                            component={TopRatedMovies}
                        />
                        <Route
                            path="/upcoming-movies"
                            component={UpcomingMoviesList}
                        />
                        <Route path="/search/:id" component={SearchResults} />
                        <Route
                            path="/similar-movies/:id"
                            component={SimilarMoviesList}
                        />
                        <Route
                            path="/recommended-movies/:id"
                            component={RecommendationsList}
                        />
                        <Route
                            exact
                            path="/movie/:id"
                            component={MovieDetails}
                        />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/person/:id" component={People} />
                        <PrivateRoute path="/profile" component={Profile} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </main>
            <Footer />
        </div>
    );
};

export default AppShell;
