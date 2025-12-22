import api from "../../../axiosInstance";

// Get single meeting link by meetingId + instructorId
export const getMeetingLinkById = async (meetingId, instructorId) => {
  try {
    const response = await api.get(`/meeting-links/${instructorId}`, {
      headers: { "X-Role": "instructor" },
    });

    if (!response.data?.data) throw new Error("No meeting links found");

    const meeting = response.data.data.find((m) => m.id === Number(meetingId));

    if (!meeting) throw new Error("Meeting link not found");

    return { data: meeting };
  } catch (err) {
    throw new Error(err?.message || "API error");
  }
};

// ---------------------------------------------------------
// 🚀 Update meeting link (NO NaN allowed)
// ---------------------------------------------------------
export const updateMeetingLinkById = async (meetingId, meetingData) => {
  try {
    // 🔥 FIX: Ensure values are numbers
    const payload = {
      instructor_id: Number(meetingData.instructor_id),
      course_id: Number(meetingData.course_id),
      batch_id: Number(meetingData.batch_id),
      meeting_url: meetingData.meeting_url?.trim(),
    };

    // ❗ If any field becomes NaN → STOP
    if (
      isNaN(payload.instructor_id) ||
      isNaN(payload.course_id) ||
      isNaN(payload.batch_id)
    ) {
      throw new Error("Invalid course or batch or instructor data");
    }

    const response = await api.put(`/meeting-links/${meetingId}`, payload, {
      headers: { "X-Role": "instructor" },
    });

    if (!response.data?.data) throw new Error("Failed to update meeting link");

    return response.data;
  } catch (err) {
    throw new Error(err?.message || "API error");
  }
};
