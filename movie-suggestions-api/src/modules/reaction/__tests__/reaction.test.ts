import { ValidationError } from '../../../core/errors/validation.error';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import ReactionRepository from '../repository/reaction.repository';
import ReactionService from '../services/reaction.service';

type InvalidReaction = Omit<CreateReactionDto, 'userId'>;

jest.mock('../repository/reaction.repository');

describe('ReactionService.post', () => {
  let service: ReactionService;
  let repoMock: jest.Mocked<ReactionRepository>;

  beforeEach(() => {
    jest.clearAllMocks();

    repoMock = new ReactionRepository() as jest.Mocked<ReactionRepository>;
    service = new ReactionService(repoMock);
  });

  it('should call repository.post when parsed data is correct', async () => {
    const validReaction: CreateReactionDto = {
      movieId: '550',
      userId: 2,
      type: 'LIKE',
      movieTitle: 'Batman',
    };
    await service.toggleReaction(validReaction);
    expect(repoMock.createReaction).toHaveBeenCalledWith(validReaction);
  });

  it('should throw Validation Error when missing userId', async () => {
    const invalidReaction: InvalidReaction = {
      movieId: '550',
      movieTitle: 'Fight club',
      type: 'LIKE',
    };
    await expect(
      // @ts-expect-error: testando cenário de DTO faltando campos
      service.toggleReaction(invalidReaction),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});
