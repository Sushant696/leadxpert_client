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
    getAllByWorkspace: (workspaceId: string) => `/api/leads/${workspaceId}/all`,
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

  NOTE: {
    create: (workspaceId: string) => `/api/notes/${workspaceId}/notes`,
    getByEntity: (workspaceId: string, entityType: string, entityId: string) =>
      `/api/notes/${workspaceId}/notes/${entityType}/${entityId}`,
    update: (workspaceId: string, noteId: string) =>
      `/api/notes/${workspaceId}/notes/${noteId}`,
    delete: (workspaceId: string, noteId: string) =>
      `/api/notes/${workspaceId}/notes/${noteId}`,
  },

  DEAL: {
    create: (workspaceId: string) => `/api/deals/${workspaceId}/deals`,
    getAll: (workspaceId: string) => `/api/deals/${workspaceId}/deals`,
    getById: (workspaceId: string, dealId: string) =>
      `/api/deals/${workspaceId}/deals/${dealId}`,
    update: (workspaceId: string, dealId: string) =>
      `/api/deals/${workspaceId}/deals/${dealId}`,
    delete: (workspaceId: string, dealId: string) =>
      `/api/deals/${workspaceId}/deals/${dealId}`,
  },

  TASK: {
    create: (workspaceId: string) => `/api/tasks/${workspaceId}/tasks`,
    getAll: (workspaceId: string) => `/api/tasks/${workspaceId}/tasks`,
    update: (workspaceId: string, taskId: string) =>
      `/api/tasks/${workspaceId}/tasks/${taskId}`,
    complete: (workspaceId: string, taskId: string) =>
      `/api/tasks/${workspaceId}/tasks/${taskId}/complete`,
    delete: (workspaceId: string, taskId: string) =>
      `/api/tasks/${workspaceId}/tasks/${taskId}`,
  },
};
