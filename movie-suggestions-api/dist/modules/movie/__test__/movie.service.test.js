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
const cache_1 = __importDefault(require("../../../core/utils/cache"));
const reaction_repository_1 = __importDefault(require("../../reaction/repository/reaction.repository"));
const movie_service_1 = __importDefault(require("../services/movie.service"));
const validation_error_1 = require("../../../core/errors/validation.error");
const not_found_error_1 = require("../../../core/errors/not-found.error");
const internal_server_error_1 = require("../../../core/errors/internal-server.error");
jest.mock('axios');
jest.mock('../../../core/utils/cache');
jest.mock('../../reaction/repository/reaction.repository');
jest.mock('../../../infra/redis/client', () => ({
    redisClient: {
        setEx: jest.fn(),
    },
}));
describe('MovieService', () => {
    let movieService;
    let reactionRepoMock;
    beforeEach(() => {
        reactionRepoMock = new reaction_repository_1.default();
        movieService = new movie_service_1.default(reactionRepoMock);
        jest.clearAllMocks();
    });
    describe('getMovieByName', () => {
        it('should throw ValidationError if name is empty', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(movieService.getMovieByName('')).rejects.toBeInstanceOf(validation_error_1.ValidationError);
        }));
        it('should return cached result if present', () => __awaiter(void 0, void 0, void 0, function* () {
            const fakeCache = {
                total_results: 1,
                results: [],
                page: 1,
                total_pages: 1,
            };
            cache_1.default.mockResolvedValue(fakeCache);
            const result = yield movieService.getMovieByName('Inception');
            expect(cache_1.default).toHaveBeenCalledWith('Inception');
            expect(result).toEqual(fakeCache);
        }));
        it('should throw NotFoundError when no movies found', () => __awaiter(void 0, void 0, void 0, function* () {
            cache_1.default.mockResolvedValue(null);
            axios_1.default.get.mockResolvedValue({
                data: { total_results: 0, results: [] },
            });
            yield expect(movieService.getMovieByName('Unknown')).rejects.toBeInstanceOf(not_found_error_1.NotFoundError);
        }));
        it('should return movies sorted with combinedScore', () => __awaiter(void 0, void 0, void 0, function* () {
            cache_1.default.mockResolvedValue(null);
            const movies = [
                {
                    id: 1,
                    vote_average: 8,
                    popularity: 10,
                    title: 'A',
                    overview: '',
                    release_date: '',
                    poster_path: '',
                    genre_ids: [],
                    vote_count: 100,
                    media_type: 'movie',
                    original_title: '',
                },
                {
                    id: 2,
                    vote_average: 7,
                    popularity: 5,
                    title: 'B',
                    overview: '',
                    release_date: '',
                    poster_path: '',
                    original_title: '',
                    genre_ids: [],
                    media_type: 'movie',
                    vote_count: 50,
                },
            ];
            axios_1.default.get.mockResolvedValue({
                data: {
                    total_results: 2,
                    results: movies,
                    page: 1,
                    total_pages: 1,
                },
            });
            const result = yield movieService.getMovieByName('Test');
            expect(result.results[0].combinedScore).toBeDefined();
            expect(result.results[0].combinedScore).toBeGreaterThan(result.results[1].combinedScore);
        }));
        it('should throw InternalServerError on axios failure', () => __awaiter(void 0, void 0, void 0, function* () {
            cache_1.default.mockResolvedValue(null);
            axios_1.default.get.mockRejectedValue(new Error('network error'));
            yield expect(movieService.getMovieByName('Error')).rejects.toBeInstanceOf(internal_server_error_1.InternalServerError);
        }));
    });
    describe('getMovieRecommendations', () => {
        it('should throw ValidationError if userId is not numeric', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(movieService.getMovieRecommendations('abc')).rejects.toBeInstanceOf(validation_error_1.ValidationError);
        }));
        it('should return cached recommendations if present', () => __awaiter(void 0, void 0, void 0, function* () {
            const fakeCache = [
                { movieTitle: 'A', recommendations: [] },
            ];
            cache_1.default.mockResolvedValue(fakeCache);
            const result = yield movieService.getMovieRecommendations('1');
            expect(cache_1.default).toHaveBeenCalledWith('1');
            expect(result).toEqual(fakeCache);
        }));
        it('should throw NotFoundError when no liked movies', () => __awaiter(void 0, void 0, void 0, function* () {
            cache_1.default.mockResolvedValue(null);
            reactionRepoMock.getLikedMovies.mockResolvedValue([]);
            yield expect(movieService.getMovieRecommendations('1')).rejects.toBeInstanceOf(not_found_error_1.NotFoundError);
        }));
        it('should return formatted recommendations with combinedScore', () => __awaiter(void 0, void 0, void 0, function* () {
            cache_1.default.mockResolvedValue(null);
            reactionRepoMock.getLikedMovies.mockResolvedValue([
                { movieId: '10', movieTitle: 'X' },
            ]);
            const recommendationData = {
                page: 1,
                results: [
                    {
                        id: 20,
                        vote_average: 8,
                        popularity: 10,
                        title: 'Movie 1',
                        overview: 'Test movie',
                        release_date: '2024-01-01',
                        poster_path: '/test.jpg',
                        genre_ids: [1],
                        vote_count: 100,
                        media_type: 'movie',
                        original_title: 'Movie 1',
                    },
                ],
                total_pages: 1,
                total_results: 1,
            };
            axios_1.default.get.mockResolvedValue({ data: recommendationData });
            const result = yield movieService.getMovieRecommendations('1');
            expect(result[0].movieTitle).toBe('X');
            expect(result[0].recommendations[0].combinedScore).toBeDefined();
            expect(result[0].recommendations[0].combinedScore).toBeGreaterThan(0);
        }));
        it('should throw InternalServerError if fetchFromTMDB fails', () => __awaiter(void 0, void 0, void 0, function* () {
            cache_1.default.mockResolvedValue(null);
            reactionRepoMock.getLikedMovies.mockResolvedValue([
                { movieId: '10', movieTitle: 'X' },
            ]);
            axios_1.default.get.mockRejectedValue(new Error('fail'));
            yield expect(movieService.getMovieRecommendations('1')).rejects.toBeInstanceOf(internal_server_error_1.InternalServerError);
        }));
    });
});
//# sourceMappingURL=movie.service.test.js.map