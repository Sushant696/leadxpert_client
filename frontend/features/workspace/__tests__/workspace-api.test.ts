import { workspaceApi } from '../api/workspace-api';
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

describe('Workspace API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createWorkspace', () => {
    it('should send POST with workspace data', async () => {
      const payload = { name: 'My Workspace', description: 'desc' };
      mockPost.mockResolvedValue({ id: 'w1', ...payload });

      const result = await workspaceApi.createWorkspace(payload as any);

      expect(mockPost).toHaveBeenCalledWith(apiURLs.WORKSPACE.create, payload);
      expect(result).toEqual({ id: 'w1', ...payload });
    });

    it('should propagate error on create failure', async () => {
      mockPost.mockRejectedValue(new Error('Create failed'));

      await expect(
        workspaceApi.createWorkspace({ name: 'fail' } as any),
      ).rejects.toThrow('Create failed');
    });
  });

  describe('getUserWorkspaces', () => {
    it('should fetch all user workspaces', async () => {
      const workspaces = [{ id: 'w1', name: 'WS1' }, { id: 'w2', name: 'WS2' }];
      mockGet.mockResolvedValue(workspaces);

      const result = await workspaceApi.getUserWorkspaces();

      expect(mockGet).toHaveBeenCalledWith(apiURLs.WORKSPACE.getAll);
      expect(result).toHaveLength(2);
    });
  });

  describe('updateWorkspace', () => {
    it('should send PATCH with updated data', async () => {
      const data = { name: 'Updated WS' };
      mockPatch.mockResolvedValue({ id: 'w1', ...data });

      const result = await workspaceApi.updateWorkspace('w1', data as any);

      expect(mockPatch).toHaveBeenCalledWith(apiURLs.WORKSPACE.updateById('w1'), data);
      expect(result.name).toBe('Updated WS');
    });
  });

  describe('deleteById', () => {
    it('should send DELETE for workspace', async () => {
      mockDelete.mockResolvedValue({ message: 'Deleted' });

      const result = await workspaceApi.deleteById('w1');

      expect(mockDelete).toHaveBeenCalledWith(apiURLs.WORKSPACE.deleteById('w1'));
      expect(result).toEqual({ message: 'Deleted' });
    });

    it('should propagate error on delete failure', async () => {
      mockDelete.mockRejectedValue(new Error('Not found'));
      await expect(workspaceApi.deleteById('bad')).rejects.toThrow('Not found');
    });
  });

  describe('getDashboardStats', () => {
    it('should fetch dashboard stats for workspace', async () => {
      const stats = { totalLeads: 10, totalDeals: 5 };
      mockGet.mockResolvedValue(stats);

      const result = await workspaceApi.getDashboardStats('w1');

      expect(mockGet).toHaveBeenCalledWith(apiURLs.WORKSPACE.dashboardStats('w1'));
      expect(result).toEqual(stats);
    });
  });
});
