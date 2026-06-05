import api from "./axios";

export const getQuestions = async () => {

  const response =
    await api.get(
      "/assessment/questions"
    );

  return response.data;
};

export const submitAssessment =
  async (answers) => {

    const response =
      await api.post(
        "/assessment/submit",
        {
          answers
        }
      );

    return response.data;
};

export const getLatestAssessment =
  async () => {

    const response =
      await api.get(
        "/assessment/latest"
      );

    return response.data;
};