import api from "./axios";

export const getDashboard =
  async () => {

    const response =
      await api.get(
        "/admin/dashboard"
      );

    return response.data;
};

export const getUsers =
  async () => {

    const response =
      await api.get(
        "/admin/users"
      );

    return response.data;
};

export const getUser =
  async (id) => {

    const response =
      await api.get(
        `/admin/users/${id}`
      );

    return response.data;
};

export const getQuestions =
  async () => {

    const response =
      await api.get(
        "/admin/questions"
      );

    return response.data;
};

export const addQuestion =
  async (data) => {

    const response =
      await api.post(
        "/admin/questions",
        data
      );

    return response.data;
};

export const deleteQuestion =
  async (id) => {

    const response =
      await api.delete(
        `/admin/questions/${id}`
      );

    return response.data;
};

export const getJournals =
  async () => {

    const response =
      await api.get(
        "/admin/journals"
      );

    return response.data;
};

export const createJournal =
  async (data) => {

    const response =
      await api.post(
        "/admin/journals",
        data
      );

    return response.data;
};

export const getAssessmentReport =
  async () => {

    const response =
      await api.get(
        "/admin/reports/assessments"
      );

    return response.data;
};

export const getJournalReport =
  async () => {

    const response =
      await api.get(
        "/admin/reports/journals"
      );

    return response.data;
};

export const getCompletionReport =
  async () => {

    const response =
      await api.get(
        "/admin/reports/completion"
      );

    return response.data;
};

export const getStudyResponses =
  async () => {

    const response =
      await api.get(
        "/admin/study-responses"
      );

    return response.data;
};