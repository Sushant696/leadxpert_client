import { leadApi } from '../api/lead-api';
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
const LEAD = 'lead1';

describe('Lead API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllLeads', () => {
    it('should fetch all leads by workspace', async () => {
      const leads = [{ id: 'l1', title: 'Lead A' }];
      mockGet.mockResolvedValue({ leads });

      const result = await leadApi.getAllLeads(WS);

      expect(mockGet).toHaveBeenCalledWith(apiURLs.LEAD.getAllByWorkspace(WS), undefined);
      expect(result.leads).toHaveLength(1);
    });

    it('should pass filter options when provided', async () => {
      const options = { status: 'new', page: 1 };
      mockGet.mockResolvedValue({ leads: [] });

      await leadApi.getAllLeads(WS, options as any);

      expect(mockGet).toHaveBeenCalledWith(apiURLs.LEAD.getAllByWorkspace(WS), options);
    });
  });

  describe('createLead', () => {
    it('should send POST with lead data', async () => {
      const payload = { title: 'New Lead', contactId: 'c1' };
      mockPost.mockResolvedValue({ id: LEAD, ...payload });

      const result = await leadApi.createLead(WS, PIPE, payload as any);

      expect(mockPost).toHaveBeenCalledWith(apiURLs.LEAD.create(WS, PIPE), payload);
      expect(result.title).toBe('New Lead');
    });
  });

  describe('getLeadById', () => {
    it('should fetch a single lead', async () => {
      const lead = { id: LEAD, title: 'Lead A', stage: 'new' };
      mockGet.mockResolvedValue(lead);

      const result = await leadApi.getLeadById(WS, PIPE, LEAD);

      expect(mockGet).toHaveBeenCalledWith(apiURLs.LEAD.getById(WS, PIPE, LEAD));
      expect(result.id).toBe(LEAD);
    });
  });

  describe('updateLead', () => {
    it('should send PATCH with updated data', async () => {
      const data = { title: 'Updated Lead' };
      mockPatch.mockResolvedValue({ id: LEAD, ...data });

      const result = await leadApi.updateLead(WS, PIPE, LEAD, data as any);

      expect(mockPatch).toHaveBeenCalledWith(apiURLs.LEAD.update(WS, PIPE, LEAD), data);
      expect(result.title).toBe('Updated Lead');
    });
  });

  describe('moveLeadToStage', () => {
    it('should move lead to a new stage', async () => {
      const data = { stageId: 'stage2' };
      mockPatch.mockResolvedValue({ id: LEAD, stage: 'stage2' });

      const result = await leadApi.moveLeadToStage(WS, PIPE, LEAD, data as any);

      expect(mockPatch).toHaveBeenCalledWith(apiURLs.LEAD.moveToStage(WS, PIPE, LEAD), data);
      expect(result.stage).toBe('stage2');
    });
  });

  describe('assignLeadToUser', () => {
    it('should assign lead to a user', async () => {
      const data = { userId: 'u1' };
      mockPatch.mockResolvedValue({ id: LEAD, assignee: 'u1' });

      const result = await leadApi.assignLeadToUser(WS, PIPE, LEAD, data as any);

      expect(mockPatch).toHaveBeenCalledWith(apiURLs.LEAD.assign(WS, PIPE, LEAD), data);
      expect(result.assignee).toBe('u1');
    });
  });

  describe('convertLeadToDeal', () => {
    it('should convert a lead to deal', async () => {
      mockPatch.mockResolvedValue({ id: LEAD, converted: true });

      const result = await leadApi.convertLeadToDeal(WS, PIPE, LEAD);

      expect(mockPatch).toHaveBeenCalledWith(apiURLs.LEAD.convert(WS, PIPE, LEAD), {});
      expect(result.converted).toBe(true);
    });
  });

  describe('archiveLead', () => {
    it('should archive (delete) a lead', async () => {
      mockDelete.mockResolvedValue({ message: 'Archived' });

      const result = await leadApi.archiveLead(WS, PIPE, LEAD);

      expect(mockDelete).toHaveBeenCalledWith(apiURLs.LEAD.archive(WS, PIPE, LEAD));
      expect(result).toEqual({ message: 'Archived' });
    });
  });
});
