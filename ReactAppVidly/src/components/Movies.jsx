import React, { Component } from "react";
import { Link} from "react-router-dom";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		searchQuery: "", 
		selectedGenre: null,
		sortColumn: { path: "title", order: "asc" },
	};

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres: genres });
	}
	handleDelete = (movie) => {
		//    console.log(movie._id);
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies: movies });
		//pqp, é setState(e parênteses direto cabeça)
	};
	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, searchQuery:"", currentPage: 1 });
	};

	// No query recebemos uma string. Deixamos o resultado no currentPage (na pagina) 1.
	handleSearch = query => {
		this.setState({searchQuery: query, selectedGenre:null, currentPage:1})
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};
	
	getPageData = () => {
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			searchQuery,
			movies: allMovies,
		} = this.state;


		let filtered = allMovies;
		 if (searchQuery)
		 	filtered = allMovies.filter(m =>
			 m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
			 else if (selectedGenre && selectedGenre._id)
			 filtered = allMovies.filter((m) =>m.genre._id === selectedGenre._id)


		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, sortColumn, selectedGenre,
			searchQuery } = this.state;

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
					
				<Link to="/movies/new" className="btn btn-primary btn-sm" style={{marginBottom:20}} >
					New Movie
				</Link>
					<p>Showing {totalCount} movies</p>
					{/* SearchBox é um "controlled component" por isso não tem state, recebe dados pelo props */}
					<SearchBox value={searchQuery} onChange={this.handleSearch}/>
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
