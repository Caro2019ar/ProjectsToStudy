import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
//import Like from './common/like';
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		sortColumn: { path: "title", order: "asc" },
	};

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres: genres });
	}
	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};
	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};
	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handleDelete = (movie) => {
		//    console.log(movie._id);
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies: movies });
		//pqp, é setState(e parênteses direto cabeça)
	};
	getPageData = () => {
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			movies: allMovies,
		} = this.state;
		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter((m) => m.genre._id === selectedGenre._id)
				: allMovies;
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, sortColumn } = this.state;

		if (count === 0) return <p>There are no movies</p>;

		const { totalCount, data: movies } = this.getPageData();

		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={this.state.genres}
						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>

				<div className="col">
					<p>Showing {totalCount} movies</p>
					<MoviesTable
						movies={movies}
						onLike={this.handleLike}
						sortColumn={sortColumn}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
