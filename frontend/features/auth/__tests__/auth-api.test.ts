import { authApi } from '../auth-api';
import axiosInstance from '@/lib/api/axios';
import { apiWrapper } from '@/lib/api/api-wrapper';
import { apiURLs } from '@/utils/apiUrls';

jest.mock('@/lib/api/axios', () => ({
  __esModule: true,
  default: { post: jest.fn(), get: jest.fn(), request: jest.fn() },
}));

jest.mock('@/lib/api/api-wrapper', () => ({
  apiWrapper: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;
const mockApiWrapper = apiWrapper as jest.Mocked<typeof apiWrapper>;

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- LOGIN (uses axiosInstance directly) ---
  describe('login', () => {
    it('should call correct endpoint with credentials', async () => {
      const credentials = { email: 'test@example.com', password: 'pass123' };
      mockAxios.post.mockResolvedValue({ data: { token: 'tok', user: { id: '1' } } });

      const result = await authApi.login(credentials);

      expect(mockAxios.post).toHaveBeenCalledWith(apiURLs.AUTH.login, credentials);
      expect(result).toEqual({ token: 'tok', user: { id: '1' } });
    });

    it('should propagate error on invalid credentials', async () => {
      mockAxios.post.mockRejectedValue(new Error('Invalid credentials'));

      await expect(
        authApi.login({ email: 'a@b.com', password: 'wrong' }),
      ).rejects.toThrow('Invalid credentials');
    });
  });

  // --- REGISTER (uses axiosInstance directly) ---
  describe('register', () => {
    it('should call correct endpoint with registration data', async () => {
      const data = { name: 'Jane', email: 'jane@test.com', password: 'secure1' };
      mockAxios.post.mockResolvedValue({ data: { token: 'abc', user: { id: '2', ...data } } });

      const result = await authApi.register(data);

      expect(mockAxios.post).toHaveBeenCalledWith(apiURLs.AUTH.register, data);
      expect(result.user.email).toBe('jane@test.com');
    });

    it('should propagate duplicate-email error', async () => {
      mockAxios.post.mockRejectedValue(new Error('Email already exists'));

      await expect(
        authApi.register({ name: 'X', email: 'dup@x.com', password: 'p' }),
      ).rejects.toThrow('Email already exists');
    });
  });

  // LOGOUT (uses apiWrapper) 
  describe('logout', () => {
    it('should call logout endpoint via apiWrapper', async () => {
      mockApiWrapper.post.mockResolvedValue({ message: 'Logged out' });

      const result = await authApi.logout();

      expect(mockApiWrapper.post).toHaveBeenCalledWith(apiURLs.AUTH.logout);
      expect(result).toEqual({ message: 'Logged out' });
    });

    it('should propagate logout error', async () => {
      mockApiWrapper.post.mockRejectedValue(new Error('Logout failed'));
      await expect(authApi.logout()).rejects.toThrow('Logout failed');
    });
  });

  // GET CURRENT USER (uses apiWrapper) 
  describe('getCurrentUser', () => {
    it('should call /me endpoint and return user', async () => {
      const user = { id: '1', name: 'Current', email: 'c@t.com' };
      mockApiWrapper.post.mockResolvedValue(user);

      const result = await authApi.getCurrentUser();

      expect(mockApiWrapper.post).toHaveBeenCalledWith(apiURLs.AUTH.me);
      expect(result).toEqual(user);
    });
  });

  //  FORGOT PASSWORD (uses axiosInstance)
  describe('forgotPassword', () => {
    it('should send forgot-password request', async () => {
      mockAxios.post.mockResolvedValue({ data: { message: 'Email sent' } });

      const result = await authApi.forgotPassword({ email: 'u@t.com' });

      expect(mockAxios.post).toHaveBeenCalledWith(apiURLs.AUTH.forgotPassword, { email: 'u@t.com' });
      expect(result).toEqual({ message: 'Email sent' });
    });
  });

  // RESET PASSWORD (uses axiosInstance)
  describe('resetPassword', () => {
    it('should send reset-password request', async () => {
      const data = { token: 'tok', password: 'newpass' };
      mockAxios.post.mockResolvedValue({ data: { message: 'Password reset' } });

      const result = await authApi.resetPassword(data);

      expect(mockAxios.post).toHaveBeenCalledWith(apiURLs.AUTH.resetPassword, data);
      expect(result).toEqual({ message: 'Password reset' });
    });
  });

  // VERIFY EMAIL (uses apiWrapper)
  describe('verifyEmail', () => {
    it('should verify email with code', async () => {
      const data = { email: 'v@t.com', code: '123456' };
      mockApiWrapper.post.mockResolvedValue({ message: 'Verified' });

      const result = await authApi.verifyEmail(data);

      expect(mockApiWrapper.post).toHaveBeenCalledWith(apiURLs.AUTH.verifyEmail, data);
      expect(result).toEqual({ message: 'Verified' });
    });
  });

  // VERIFY RESET CODE (uses axiosInstance)
  describe('verifyResetCode', () => {
    it('should verify reset code and return temp token', async () => {
      const data = { email: 'r@t.com', code: '654321' };
      mockAxios.post.mockResolvedValue({ data: { valid: true, token: 'tmp' } });

      const result = await authApi.verifyResetCode(data);

      expect(mockAxios.post).toHaveBeenCalledWith(apiURLs.AUTH.verifyResetCode, data);
      expect(result).toEqual({ valid: true, token: 'tmp' });
    });
  });

  // SEND VERIFICATION (uses apiWrapper) 
  describe('sendVerification', () => {
    it('should send verification email', async () => {
      mockApiWrapper.post.mockResolvedValue({ message: 'Sent' });

      const result = await authApi.sendVerification();

      expect(mockApiWrapper.post).toHaveBeenCalledWith(apiURLs.AUTH.sendVerification);
      expect(result).toEqual({ message: 'Sent' });
    });
  });

  // JOIN WORKSPACE BY TOKEN (uses axiosInstance) 
  describe('joinWorkspaceByToken', () => {
    it('should call join endpoint with auth header', async () => {
      mockAxios.post.mockResolvedValue({ data: { workspace: { id: 'w1' } } });

      const result = await authApi.joinWorkspaceByToken('invite_tok', 'access_tok');

      expect(mockAxios.post).toHaveBeenCalledWith(
        apiURLs.WORKSPACE.joinByToken('invite_tok'),
        {},
        { headers: { Authorization: 'Bearer access_tok' } },
      );
      expect(result).toEqual({ workspace: { id: 'w1' } });
    });
  });
});
