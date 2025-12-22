// import api from "../../axiosInstance"; // your axios setup

// // Create note
// export const createNoteAPI = async (noteData) => {
//   const response = await api.post("/courses/notes", noteData, {
//     headers: {
//       "Content-Type": "application/json",
//       "X-Role": "instructor",
//     },
//   });
//   return response; // return backend response
// };

import api from "../../axiosInstance";

// Create note API
export const createNoteAPI = async (noteData) => {
  const response = await api.post("/courses/notes", noteData, {
    headers: {
      "Content-Type": "application/json",
      "X-Role": "instructor",
    },
  });
  return response.data; // return backend JSON only
};
