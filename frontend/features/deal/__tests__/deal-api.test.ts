import { dealApi } from '../api/deal-api';
import { apiWrapper } from '@/lib/api/api-wrapper';
import { apiURLs } from '@/utils/apiUrls';

jest.mock('@/lib/api/api-wrapper', () => ({
  apiWrapper: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockGet = apiWrapper.get as jest.Mock;
const mockPost = apiWrapper.post as jest.Mock;
const mockPatch = apiWrapper.patch as jest.Mock;
const mockDelete = apiWrapper.delete as jest.Mock;

const WS = 'ws1';
const DEAL_ID = 'deal1';

describe('Deal API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createDeal', () => {
    it('should send POST with deal payload', async () => {
      const payload = { title: 'Big Deal', value: 5000 };
      mockPost.mockResolvedValue({ id: DEAL_ID, ...payload });

      const result = await dealApi.createDeal(WS, payload as any);

      expect(mockPost).toHaveBeenCalledWith(apiURLs.DEAL.create(WS), payload);
      expect(result.title).toBe('Big Deal');
    });

    it('should propagate creation error', async () => {
      mockPost.mockRejectedValue(new Error('Validation failed'));

      await expect(
        dealApi.createDeal(WS, {} as any),
      ).rejects.toThrow('Validation failed');
    });
  });

  describe('getDealsByWorkspaceId', () => {
    it('should fetch all deals for workspace', async () => {
      const deals = [{ id: 'd1' }, { id: 'd2' }];
      mockGet.mockResolvedValue(deals);

      const result = await dealApi.getDealsByWorkspaceId(WS);

      expect(mockGet).toHaveBeenCalledWith(apiURLs.DEAL.getAll(WS), undefined);
      expect(result).toHaveLength(2);
    });

    it('should pass filters when provided', async () => {
      const filters = { status: 'won' };
      mockGet.mockResolvedValue([]);

      await dealApi.getDealsByWorkspaceId(WS, filters as any);

      expect(mockGet).toHaveBeenCalledWith(apiURLs.DEAL.getAll(WS), filters);
    });
  });

  describe('getDealById', () => {
    it('should fetch a single deal', async () => {
      const deal = { id: DEAL_ID, title: 'Big Deal' };
      mockGet.mockResolvedValue(deal);

      const result = await dealApi.getDealById(WS, DEAL_ID);

      expect(mockGet).toHaveBeenCalledWith(apiURLs.DEAL.getById(WS, DEAL_ID));
      expect(result.title).toBe('Big Deal');
    });
  });

  describe('updateDeal', () => {
    it('should send PATCH with updated payload', async () => {
      const payload = { title: 'Updated Deal', value: 8000 };
      mockPatch.mockResolvedValue({ id: DEAL_ID, ...payload });

      const result = await dealApi.updateDeal(WS, DEAL_ID, payload as any);

      expect(mockPatch).toHaveBeenCalledWith(apiURLs.DEAL.update(WS, DEAL_ID), payload);
      expect(result.value).toBe(8000);
    });
  });

  describe('deleteDeal', () => {
    it('should send DELETE for deal', async () => {
      mockDelete.mockResolvedValue({ message: 'Deleted' });

      const result = await dealApi.deleteDeal(WS, DEAL_ID);

      expect(mockDelete).toHaveBeenCalledWith(apiURLs.DEAL.delete(WS, DEAL_ID));
      expect(result).toEqual({ message: 'Deleted' });
    });

    it('should propagate delete error', async () => {
      mockDelete.mockRejectedValue(new Error('Not authorized'));
      await expect(dealApi.deleteDeal(WS, 'bad')).rejects.toThrow('Not authorized');
    });
  });
});
