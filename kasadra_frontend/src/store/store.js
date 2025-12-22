import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import instructorAuthReducer from '../features/auth/instructorAuthSlice.js';
import instructorProfileReducer from '../features/auth/instructorProfileslice.js';
import usersReducer from '../features/instructor/userManagement/allUserSlice.js';
import studentReducer from '../features/instructor/userManagement/studentDetailsSlice.js';
import courseReducer from '../features/instructor/addCourse/AddCourseAuthSlice.js';
import addContentReducer from '../features/instructor/addCourse/addContentSlice.js'
import addLessonReducer from '../features/instructor/addCourse/addLessonSlice.js'
import conceptReducer from "../features/instructor/addCourse/addConceptSlice";
import addLabReducer from '../features/instructor/addCourse/addLabSlice.js'
import newBatchReducer from '../features/instructor/assignBatch/createNewBatchSlice.js';

import scheduleReducer from '../features/instructor/addCourse/scheduleClassSlice.js'
import addQuizReducer from '../features/instructor/addCourse/addQuizSlice.js';
import viewReducer from '../features/instructor/addCourse/viewSlice.js';

import studentCoursesReducer from '../features/student/myCourse/newCoursePurchase/newCoursePurchase.js';
import courseOverviewReducer from "../features/student/myCourse/newCoursePurchase/courseOverviewSlice.js";
import MyCoursePageReducer from '../features/student/myCourse/existingCourse/myCourseSlice.js';

import batchesReducer from '../features/instructor/assignBatch/assignBatchSlice.js';
import profileReducer from '../features/student/myProfile/myProfileSlice.js';
import editProfileReducer from '../features/student/myProfile/editProfileSlice.js';
import lessonViewReducer from '../features/instructor/addCourse/lessonViewSlice.js';
import checkOutReducer from '../features/student/myCourse/newCoursePurchase/checkOutSlice.js'
import ScheduleEditorReducer from '../features/instructor/scheduleClass/scheduleEditorSlice.js';
import addPDFReducer from '../features/instructor/addCourse/addPDFSlice.js';
import addWeblink from '../features/instructor/addCourse/addWeblinkSlice.js';
import NotePadReducer from '../features/instructor/addCourse/notePadSlice.js';

import addMeetingLinkReducer from "../features/instructor/scheduleClass/meetingLink/addMeetingLinkSlice.js";
import meetingLinksReducer from "../features/instructor/scheduleClass/meetingLink/meetingLinkSlice.js";
import editMeetingLinkReducer from "../features/instructor/scheduleClass/meetingLink/editMeetingLinkSlice.js";
import selectBatchReducer from '../features/instructor/assignBatch/SelectBatchSlice.js';
import studentCalendarReducer from "../features/student/myCourse/existingCourse/studentCalenderSlice.js";
import zoomLinkReducer from "../features/student/myCourse/existingCourse/zoomLinkPageSlice.js";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    instructorAuth: instructorAuthReducer,
    instructorProfile: instructorProfileReducer,
    student: studentReducer,
    course: courseReducer,
    addContent: addContentReducer,
    lesson: addLessonReducer,
    lab: addLabReducer,
    concept: conceptReducer,
    schedule: scheduleReducer,
    courseDetails: viewReducer,
    newBatch: newBatchReducer,
    quiz: addQuizReducer,
    studentCourses: studentCoursesReducer,
    batches: batchesReducer,
    selectBatch: selectBatchReducer,
    myProfile: profileReducer,
    editProfile: editProfileReducer,
    courseOverview: courseOverviewReducer,
    checkOut: checkOutReducer,
    lessonView: lessonViewReducer,
    myCourse: MyCoursePageReducer,
    scheduleClass: ScheduleEditorReducer,
    pdf: addPDFReducer,
    weblink: addWeblink,
    addMeetingLink: addMeetingLinkReducer,
    meetingLink: meetingLinksReducer,
    editMeetingLink: editMeetingLinkReducer,
    notes: NotePadReducer,
    calendar: studentCalendarReducer,
    zoomLink: zoomLinkReducer,
  },
});

export default store;
