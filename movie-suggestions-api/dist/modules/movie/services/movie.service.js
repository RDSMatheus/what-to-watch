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
const axios_1 = __importDefault(require("axios"));
const reaction_repository_1 = __importDefault(require("../../reaction/repository/reaction.repository"));
const internal_server_error_1 = require("../../../core/errors/internal-server.error");
const not_found_error_1 = require("../../../core/errors/not-found.error");
const validation_error_1 = require("../../../core/errors/validation.error");
const env_1 = require("../../../config/env");
const cache_1 = __importDefault(require("../../../core/utils/cache"));
const base_error_1 = require("../../../core/errors/base.error");
const client_1 = require("../../../infra/redis/client");
class MovieService {
    constructor(reactionRepository) {
        this.reactionRepository = reactionRepository !== null && reactionRepository !== void 0 ? reactionRepository : new reaction_repository_1.default();
    }
    getMovieByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name)
                    throw new validation_error_1.ValidationError('Insira o nome de um filme');
                const cachedMovie = yield (0, cache_1.default)(name);
                if (cachedMovie)
                    return cachedMovie;
                const data = yield this.fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=pt-BR&page=1`);
                if (!data.total_results)
                    throw new not_found_error_1.NotFoundError('Filme não encontrado.');
                const genres = yield this.getGenres();
                const resultsCombinedScore = data.results.map((movie) => (Object.assign(Object.assign({}, movie), { poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`, combinedScore: this.calculateCombinedScore(movie), genre_names: this.mapGenres(movie, genres) })));
                const resultsSortedByScore = this.sortMovies(resultsCombinedScore);
                const movie = Object.assign(Object.assign({}, data), { results: resultsSortedByScore });
                yield client_1.redisClient.setEx(name, 3600, JSON.stringify(movie));
                return movie;
            }
            catch (error) {
                if (error instanceof validation_error_1.ValidationError || error instanceof not_found_error_1.NotFoundError) {
                    throw error;
                }
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
    getMovieRecommendations(userId, pagesMap) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cacheKey = `recommendations:${userId}:${JSON.stringify(pagesMap)}`;
                const cachedRecommendations = yield (0, cache_1.default)(cacheKey);
                if (cachedRecommendations)
                    return cachedRecommendations;
                const id = Number(userId);
                if (!id) {
                    throw new validation_error_1.ValidationError('Insira o ID do usuário');
                }
                const likedMovies = yield this.reactionRepository.getLikedMovies(id);
                if (!likedMovies.length)
                    throw new not_found_error_1.NotFoundError('Não há filmes para se basear recomendações');
                const fetchedMovies = yield Promise.all(likedMovies.map((movie) => __awaiter(this, void 0, void 0, function* () {
                    const page = pagesMap[movie.movieId] || '1';
                    const data = yield this.fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movie.movieId}/recommendations?language=pt-BR&page=${page}`);
                    const genres = yield this.getGenres();
                    const resultsCombinedScore = data.results.map((movie) => (Object.assign(Object.assign({}, movie), { poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`, combinedScore: this.calculateCombinedScore(movie), genre_names: this.mapGenres(movie, genres) })));
                    const resultsSortedByScore = this.sortMovies(resultsCombinedScore);
                    const recommendations = {
                        movieTitle: movie.movieTitle,
                        recommendations: resultsSortedByScore,
                        page: data.page,
                        total_pages: data.total_pages,
                        total_results: data.total_results,
                    };
                    yield client_1.redisClient.setEx(cacheKey, 3600, JSON.stringify(recommendations));
                    return recommendations;
                })));
                return fetchedMovies;
            }
            catch (error) {
                if (error instanceof validation_error_1.ValidationError || error instanceof not_found_error_1.NotFoundError) {
                    throw error;
                }
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
    getTrendingMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = 'trending';
                const cached = yield (0, cache_1.default)(key);
                if (cached)
                    return cached;
                const data = yield this.fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/week?language=pt-BR');
                if (!data)
                    throw new internal_server_error_1.InternalServerError();
                const genres = yield this.getGenres();
                const resultWithImgAndGenres = data.results.map((movie) => (Object.assign(Object.assign({}, movie), { poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`, combinedScore: this.calculateCombinedScore(movie), genre_names: this.mapGenres(movie, genres) })));
                const trending = Object.assign(Object.assign({}, data), { results: resultWithImgAndGenres });
                yield client_1.redisClient.setEx(key, 3600, JSON.stringify(trending));
                return trending;
            }
            catch (error) {
                if (error instanceof Error)
                    throw new base_error_1.ErrorBase(400, error.message);
                throw error;
            }
        });
    }
    getGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = 'genres';
                const cached = yield (0, cache_1.default)(key);
                if (cached)
                    return cached;
                const data = yield this.fetchFromTMDB('https://api.themoviedb.org/3/genre/movie/list?language=pt');
                if (!data)
                    throw new internal_server_error_1.InternalServerError();
                yield client_1.redisClient.setEx(key, 3600, JSON.stringify(data));
                return data;
            }
            catch (error) {
                if (error instanceof base_error_1.ErrorBase)
                    throw error;
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
    mapGenres(movie, genres) {
        return movie.genre_ids.map((id) => { var _a; return ((_a = genres.genres.find((g) => g.id === id)) === null || _a === void 0 ? void 0 : _a.name) || 'Desconhecido'; });
    }
    calculateCombinedScore(movie) {
        return movie.vote_average * 0.6 + movie.popularity * 0.4;
    }
    sortMovies(movies) {
        return movies.sort((a, b) => b.combinedScore - a.combinedScore);
    }
    fetchFromTMDB(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(url, {
                    headers: { Authorization: `Bearer ${env_1.ENV.TMBD_TOKEN}` },
                });
                return data;
            }
            catch (_a) {
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
}
exports.default = MovieService;
//# sourceMappingURL=movie.service.js.map