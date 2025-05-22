"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movie_service_1 = __importDefault(require("../services/movie.service"));
class MovieController {
    static getMovieByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const movie = yield new movie_service_1.default().getMovieByName(name);
            res.status(200).json({ message: "Filme encontrado", movie });
        });
    }
    static getMovieRecommendations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const pages = req.query.pages || {};
            const recommendations = yield new movie_service_1.default().getMovieRecommendations(userId, pages);
            res.status(200).json({ message: "Sugestões de filmes", recommendations });
        });
    }
    static getUpcomingMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page } = req.query;
            const upcoming = yield new movie_service_1.default().getUpcomingMovies(String(page));
            res
                .status(200)
                .json({ message: "Filmes em lançamento resgatados", upcoming });
        });
    }
    static getMovieDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId } = req.params;
            const movieDetails = yield new movie_service_1.default().getMovieDetails(movieId);
            res.status(200).json({
                message: "Detalhes do filmes retornados com sucesso.",
                movieDetails,
            });
        });
    }
    static getMovieByGenre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { vote_average, page, genre } = req.params;
            const movies = yield new movie_service_1.default().getMovieByGenre({
                vote_average,
                page,
                genre,
            });
            res.status(200).json({ message: "Filmes retornados com sucesso", movies });
        });
    }
    static getTrendingMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const trending = yield new movie_service_1.default().getTrendingMovies();
            res.status(200).json({ message: "Filmes que estão em trending", trending });
        });
    }
}
exports.default = MovieController;
//# sourceMappingURL=movie.controller.js.map