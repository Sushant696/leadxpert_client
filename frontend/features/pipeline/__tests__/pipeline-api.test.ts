import { pipelineApi } from '../api/pipeline-api';
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
const PIPE = 'pipe1';

describe('Pipeline API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPipeline', () => {
    it('should send POST with pipeline data', async () => {
      const data = { name: 'Sales Pipeline' };
      mockPost.mockResolvedValue({ id: PIPE, ...data });

      const result = await pipelineApi.createPipeline(WS, data as any);

      expect(mockPost).toHaveBeenCalledWith(apiURLs.PIPELINE.create(WS), data);
      expect(result.name).toBe('Sales Pipeline');
    });

    it('should propagate creation error', async () => {
      mockPost.mockRejectedValue(new Error('Duplicate name'));

      await expect(
        pipelineApi.createPipeline(WS, { name: 'dup' } as any),
      ).rejects.toThrow('Duplicate name');
    });
  });

  describe('getPipelines', () => {
    it('should fetch all pipelines for workspace', async () => {
      const pipelines = [{ id: 'p1' }, { id: 'p2' }];
      mockGet.mockResolvedValue(pipelines);

      const result = await pipelineApi.getPipelines(WS);

      expect(mockGet).toHaveBeenCalledWith(apiURLs.PIPELINE.getAll(WS));
      expect(result).toHaveLength(2);
    });
  });

  describe('getSinglePipeline', () => {
    it('should fetch a single pipeline by id', async () => {
      const pipeline = { id: PIPE, name: 'Sales', stages: [] };
      mockGet.mockResolvedValue(pipeline);

      const result = await pipelineApi.getSinglePipeline(WS, PIPE);

      expect(mockGet).toHaveBeenCalledWith(apiURLs.PIPELINE.getById(WS, PIPE));
      expect(result.name).toBe('Sales');
    });
  });

  describe('updatePipeline', () => {
    it('should send PATCH with updated data', async () => {
      const data = { name: 'Renamed Pipeline' };
      mockPatch.mockResolvedValue({ id: PIPE, ...data });

      const result = await pipelineApi.updatePipeline(WS, PIPE, data as any);

      expect(mockPatch).toHaveBeenCalledWith(apiURLs.PIPELINE.updateById(WS, PIPE), data);
      expect(result.name).toBe('Renamed Pipeline');
    });
  });

  describe('deletePipeline', () => {
    it('should send DELETE for pipeline', async () => {
      mockDelete.mockResolvedValue({ message: 'Deleted' });

      const result = await pipelineApi.deletePipeline(WS, PIPE);

      expect(mockDelete).toHaveBeenCalledWith(apiURLs.PIPELINE.deleteById(WS, PIPE));
      expect(result).toEqual({ message: 'Deleted' });
    });

    it('should propagate delete error', async () => {
      mockDelete.mockRejectedValue(new Error('Forbidden'));
      await expect(pipelineApi.deletePipeline(WS, 'bad')).rejects.toThrow('Forbidden');
    });
  });
});
