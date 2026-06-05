import api from "./axios";

export const getCurrentJournal =
  async () => {

    const response =
      await api.get(
        "/journal/current"
      );

    return response.data;
};

export const getJournalQuestions =
  async (journalId) => {

    const response =
      await api.get(
        `/journal/questions/${journalId}`
      );

    return response.data;
};

export const submitJournal =
  async (data) => {

    const response =
      await api.post(
        "/journal/submit",
        data
      );

    return response.data;
};

export const getJournalHistory =
  async () => {

    const response =
      await api.get(
        "/journal/history"
      );

    return response.data;
};