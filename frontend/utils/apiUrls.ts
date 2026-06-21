export const apiURLs = {
  AUTH: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
    me: "/api/auth/mee",
    refresh: "/api/auth/refresh",
    changePassword: "/api/auth/changePassword",
    forgotPassword: "/api/auth/forgot-password",
    verifyResetCode: "/api/auth/verify-reset-code",
    resetPassword: "/api/auth/reset-password",
    verifyEmail: "/api/auth/verify-email",
    sendVerification: "/api/auth/send-verification",
  },

  FILE: {
    uploadImg: "/api/upload/image",
    uploadMultipleImges: "/api/upload/images",
    deleteImage: "/api/upload/image",
  },

  USER: {
    updateUser: "/api/users/update",
    getAllUsers: "/api/users",
    getUserById: (id: string) => `/api/users/${id}`,
    deleteUserById: (id: string) => `/api/users/${id}`,
  },

  WORKSPACE: {
    create: "/api/workspace",
    getAll: "/api/workspace",
    getById: (workspaceId: string) => `/api/workspace/${workspaceId}`,
    updateById: (workspaceId: string) => `/api/workspace/${workspaceId}`,
    deleteById: (workspaceId: string) => `/api/workspace/${workspaceId}`,

    invite: {
      createLink: (workspaceId: string) =>
        `/api/workspace/${workspaceId}/invite/link`,

      createByEmail: (workspaceId: string) =>
        `/api/workspace/${workspaceId}/invite/email`,

      getActive: (workspaceId: string) =>
        `/api/workspace/${workspaceId}/invites`,

      revoke: (workspaceId: string, inviteId: string) =>
        `/api/workspace/${workspaceId}/invites/${inviteId}`,
    },

    joinByToken: (token: string) => `/api/workspace/join/${token}`,

    members: {
      getAll: (workspaceId: string) => `/api/workspace/${workspaceId}/members`,

      updateRole: (workspaceId: string) =>
        `/api/workspace/${workspaceId}/members`,

      remove: (workspaceId: string) => `/api/workspace/${workspaceId}/members`,
    },
  },

  PIPELINE: {
    create: (workspaceId: string) => `/api/pipeline/${workspaceId}/create`,
    getAll: (workspaceId: string) => `/api/pipeline/${workspaceId}/all`,
    getById: (workspaceId: string, pipelineId: string) =>
      `/api/pipeline/${workspaceId}/pipeline/${pipelineId}`,
    updateById: (workspaceId: string, pipelineId: string) =>
      `/api/pipeline/${workspaceId}/pipelines/${pipelineId}/update`,
    deleteById: (workspaceId: string, pipelineId: string) =>
      `/api/pipeline/${workspaceId}/pipelines/${pipelineId}/delete`,
  },
  PIPELINE_STAGE: {
    create: (workspaceId: string, pipelineId: string) =>
      `/api/pipeline-stage/${workspaceId}/pipelines/${pipelineId}/stages`,
    bulkCreate: (workspaceId: string, pipelineId: string) =>
      `/api/pipeline-stage/${workspaceId}/pipelines/${pipelineId}/bulkStage`,
    update: (workspaceId: string, pipelineId: string, stageId: string) =>
      `/api/pipeline-stage/${workspaceId}/pipelines/${pipelineId}/stages/${stageId}`,
    delete: (workspaceId: string, pipelineId: string, stageId: string) =>
      `/api/pipeline-stage/${workspaceId}/pipelines/${pipelineId}/stages/${stageId}`,
    reorder: (workspaceId: string, pipelineId: string) =>
      `/api/pipeline-stage/${workspaceId}/pipelines/${pipelineId}/stages/reorder`,
  },

  LEAD: {
    create: (workspaceId: string, pipelineId: string) =>
      `/api/leads/${workspaceId}/pipelines/${pipelineId}/leads`,
    getAll: (workspaceId: string, pipelineId: string) =>
      `/api/leads/${workspaceId}/pipelines/${pipelineId}/leads`,
    getById: (workspaceId: string, pipelineId: string, leadId: string) =>
      `/api/leads/${workspaceId}/pipelines/${pipelineId}/leads/${leadId}`,
    update: (workspaceId: string, pipelineId: string, leadId: string) =>
      `/api/leads/${workspaceId}/pipelines/${pipelineId}/leads/${leadId}`,
    moveToStage: (workspaceId: string, pipelineId: string, leadId: string) =>
      `/api/leads/${workspaceId}/pipelines/${pipelineId}/leads/${leadId}/stage`,
    assign: (workspaceId: string, pipelineId: string, leadId: string) =>
      `/api/leads/${workspaceId}/pipelines/${pipelineId}/leads/${leadId}/assign`,
    convert: (workspaceId: string, pipelineId: string, leadId: string) =>
      `/api/leads/${workspaceId}/pipelines/${pipelineId}/leads/${leadId}/convert`,
    markLost: (workspaceId: string, pipelineId: string, leadId: string) =>
      `/api/leads/${workspaceId}/pipelines/${pipelineId}/leads/${leadId}/lost`,
    archive: (workspaceId: string, pipelineId: string, leadId: string) =>
      `/api/leads/${workspaceId}/pipelines/${pipelineId}/leads/${leadId}`,
  },

  CONTACT: {
    getAll: (workspaceId: string) => `/api/contact/${workspaceId}/contacts`,
    getById: (workspaceId: string, contactId: string) =>
      `/api/contact/${workspaceId}/contacts/${contactId}`,
    create: (workspaceId: string) => `/api/contact/${workspaceId}/contacts`,
    update: (workspaceId: string, contactId: string) =>
      `/api/contact/${workspaceId}/contacts/${contactId}`,
    delete: (workspaceId: string, contactId: string) =>
      `/api/contact/${workspaceId}/contacts/${contactId}`,
  },
};
