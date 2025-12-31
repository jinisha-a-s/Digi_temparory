import { configureStore } from '@reduxjs/toolkit';

// ======================
// Auth Slices
// ======================
import authReducer from '../features/auth/authSlice.js';
import instructorAuthReducer from '../features/auth/instructorAuthSlice.js';
import instructorProfileReducer from '../features/auth/instructorProfileslice.js';

// ======================
// Instructor User Management
// ======================
import usersReducer from '../features/instructor/userManagement/allUserSlice.js';
import studentReducer from '../features/instructor/userManagement/studentDetailsSlice.js';

// ======================
// Instructor Courses
// ======================
import courseReducer from '../features/instructor/addCourse/AddCourseAuthSlice.js';
import addContentReducer from '../features/instructor/addCourse/addContentSlice.js';
import addLessonReducer from '../features/instructor/addCourse/addLessonSlice.js';
import conceptReducer from "../features/instructor/addCourse/addConceptSlice.js";
import addLabReducer from '../features/instructor/addCourse/addLabSlice.js';
import addQuizReducer from '../features/instructor/addCourse/addQuizSlice.js';
import viewReducer from '../features/instructor/addCourse/viewSlice.js';
import lessonViewReducer from '../features/instructor/addCourse/lessonViewSlice.js';
import addPDFReducer from '../features/instructor/addCourse/addPDFSlice.js';
import addWeblink from '../features/instructor/addCourse/addWeblinkSlice.js';
import NotePadReducer from '../features/instructor/addCourse/notePadSlice.js';

// ======================
// Instructor Schedule / Class
// ======================
import scheduleReducer from '../features/instructor/addCourse/scheduleClassSlice.js';
import ScheduleEditorReducer from '../features/instructor/scheduleClass/UpdateCalenderSlice.js';
import addMeetingLinkReducer from "../features/instructor/scheduleClass/meetingLink/addMeetingLinkSlice.js";
import meetingLinksReducer from "../features/instructor/scheduleClass/meetingLink/meetingLinkSlice.js";
import editMeetingLinkReducer from "../features/instructor/scheduleClass/meetingLink/editMeetingLinkSlice.js";

// ======================
// Instructor Batch Management
// ======================
import newBatchReducer from '../features/instructor/assignBatch/createNewBatchSlice.js';
import batchesReducer from '../features/instructor/assignBatch/assignBatchSlice.js';
import selectBatchReducer from '../features/instructor/assignBatch/SelectBatchSlice.js';

// ======================
// Student Courses
// ======================
import studentCoursesReducer from '../features/student/myCourse/newCoursePurchase/newCoursePurchase.js';
import courseOverviewReducer from "../features/student/myCourse/newCoursePurchase/courseOverviewSlice.js";
import checkOutReducer from '../features/student/myCourse/newCoursePurchase/checkOutSlice.js';
import MyCoursePageReducer from '../features/student/myCourse/existingCourse/myCourseSlice.js';
import studentCalendarReducer from "../features/student/myCourse/existingCourse/studentCalenderSlice.js";
import zoomLinkReducer from "../features/student/myCourse/existingCourse/zoomLinkPageSlice.js";

// ======================
// Student Profile
// ======================
import profileReducer from '../features/student/myProfile/myProfileSlice.js';
import editProfileReducer from '../features/student/myProfile/editProfileSlice.js';

export const store = configureStore({
  reducer: {
    // Auth
    auth: authReducer,
    instructorAuth: instructorAuthReducer,
    instructorProfile: instructorProfileReducer,

    // Instructor User Management
    users: usersReducer,
    student: studentReducer,

    // Instructor Courses
    course: courseReducer,
    addContent: addContentReducer,
    addLesson: addLessonReducer,
    concept: conceptReducer,
    lab: addLabReducer,
    quiz: addQuizReducer,
    courseDetails: viewReducer,
    lessonView: lessonViewReducer,
    pdf: addPDFReducer,
    weblink: addWeblink,
    notes: NotePadReducer,

    // Instructor Schedule / Class
    schedule: scheduleReducer,
    scheduleClass: ScheduleEditorReducer,
    addMeetingLink: addMeetingLinkReducer,
    meetingLink: meetingLinksReducer,
    editMeetingLink: editMeetingLinkReducer,

    // Instructor Batch Management
    newBatch: newBatchReducer,
    batches: batchesReducer,
    selectBatch: selectBatchReducer,

    // Student Courses
    studentCourses: studentCoursesReducer,
    courseOverview: courseOverviewReducer,
    checkOut: checkOutReducer,
    myCourse: MyCoursePageReducer,
    calendar: studentCalendarReducer,
    zoomLink: zoomLinkReducer,

    // Student Profile
    myProfile: profileReducer,
    editProfile: editProfileReducer,
  },
});

export default store;
