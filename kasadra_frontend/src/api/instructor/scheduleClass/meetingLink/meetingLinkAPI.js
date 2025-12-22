import api from "../../../axiosInstance";

export const getMeetingLinksByInstructor = async (instructorId) => {
  try {
    const response = await api.get(`/meeting-links/${instructorId}`, {
      headers: { "X-Role": "instructor" },
    });
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching meeting links:", error);
    throw error;
  }
};

// ✅ Delete meeting link by ID
export const deleteMeetingLinkById = async (meetingId) => {
  try {
    const response = await api.delete(`/meeting-links/${meetingId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting meeting link:", error);
    throw error;
  }
};
