import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import Home from "../pages/common/Home";
import InstructorSignin from "../pages/auth/InstructorSignin";
import InstructorSignup from "../pages/auth/InstructorSignup";
import InstructorhomePage from "../pages/instructor/InstructorhomePage";
import AddCourse from "../pages/instructor/addCourse/Addcourse";
import AddNewCourse from "../pages/instructor/addCourse/AddNewCourse";
import UserManagement from "../pages/instructor/userManagement/UserManagement";
import InstructorProtectedRoute from "./InstructorProtectedRoute";
import StudentProtectedRoute from "./StudentProtectedRoute";
import StudentDetails from '../pages/instructor/userManagement/StudentDetails';
import AddContent from '../pages/instructor/addCourse/AddContent';
import AddLesson from '../pages/instructor/addCourse/AddLesson';
import AddConcept from '../pages/instructor/addCourse/AddConcept'
import AddLab from '../pages/instructor/addCourse/AddLab';
import AddQuiz from '../pages/instructor/addCourse/AddQuiz';
import AddScheduleClass from '../pages/instructor/addCourse/AddScheduleClass';
import View from '../pages/instructor/addCourse/View'
import LessonView from '../pages/instructor/addCourse/LessonView'

import CheckOut from "../pages/student/myCourse/newCoursePurchase/CheckOut";

import StudenthomePage from '../pages/student/StudenthomePage'
import NewCoursePurchase from '../pages/student/myCourse/newCoursePurchase/NewCoursePurchase'
import CourseOverview from "../pages/student/myCourse/newCoursePurchase/CourseOverview";
import MyCoursePage from "../pages/student/myCourse/existingCourse/MyCoursePage";
import AssignBatch from "../pages/instructor/assignBatch/AssignBatch";
import CreateNewBatch from "../pages/instructor/assignBatch/CreateNewBatch";
import MyProfile from "../pages/student/myProfile/MyProfile";
import EditProfile from "../pages/student/myProfile/EditProfile";
import LiveStudentActivity from "../pages/instructor/liveClassUpdate/LiveStudentActivity";
import Confirmation from "../pages/student/myCourse/newCoursePurchase/ConfirmationPage"
import LessonContent from "../pages/instructor/addCourse/LessonContent";
import AddPDF from "../pages/instructor/addCourse/AddPDF";
import EditScheduleClass from "../pages/instructor/scheduleClass/ScheduleClass";
import ScheduleEditor from "../pages/instructor/scheduleClass/ScheduleEditor";
import AddWeblink from "../pages/instructor/addCourse/AddWeblink";
import NotePad from "../pages/instructor/addCourse/Notepad";
import MeetingLink from "../pages/instructor/scheduleClass/meetingLink/MeetingLink";
import EditMeetingLink from "../pages/instructor/scheduleClass/meetingLink/EditMeetingLink";
import AddMeetingLink from "../pages/instructor/scheduleClass/meetingLink/AddMeetingLink";
import SelectBatch from "../pages/instructor/assignBatch/SelectBatch";
import StudentCalendar from "../pages/student/myCourse/existingCourse/StudentCalender";
import ViewCourse from "../pages/instructor/addCourse/ViewCourse";
import ZoomLinkPage from "../pages/student/myCourse/existingCourse/ZoomLinkPage";
import StudentCourseLayout from "../layouts/StudentCourseLayout";
import StudentLessonContent from "../pages/student/myCourse/existingCourse/StudentLessonContent";
import InstructorLayout from "../layouts/InstructorLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/student-signin" element={<Signin />} />
      <Route path="/student-signup" element={<Signup />} />
      <Route path="/instructor-signin" element={<InstructorSignin />} />
      <Route path="/instructor-signup" element={<InstructorSignup />} />

      {/* Student Protected Routes */}
      <Route element={<StudentProtectedRoute />}>
        <Route path="/student/home" element={<StudenthomePage />} />

        {/* Student Profile */}
        <Route path="/student/profile/:studentId" element={<MyProfile />} />
        <Route path="/student/profile/:studentId/edit" element={<EditProfile />} />

        {/* Student My Course */}
        <Route path="/student/checkout" element={<CheckOut />} />
        <Route path="/student/confirmation" element={<Confirmation />} />

        {/* later add student pages */}

        <Route path="/student/new-course" element={<NewCoursePurchase />} />
        <Route path="/student/my-course" element={<MyCoursePage />} />
        <Route
          path="/student/course/:courseId/course-overview"
          element={<CourseOverview />}
        />


        {/* COURSE AREA WITH SIDEBAR */}
        <Route path="/student/course/:courseId" element={<StudentCourseLayout />}  >

          <Route path="calendar" element={<StudentCalendar />} />
          <Route path="zoom" element={<ZoomLinkPage />} />

          {/* ✅ LESSON CONTENT ROUTE */}
          <Route path="lesson/:lessonId" element={<StudentLessonContent />} />
          <Route path="lesson/:lessonId/:contentType" element={<StudentLessonContent />} />
        </Route>


      </Route>
      {/* <Route
        path="/student/calendar/:studentId/:courseId/student-calendar"
        element={<StudentCalendar />}
      />
      <Route
        path="/student/zoom/:studentId/:courseId"
        element={<ZoomLinkPage />}
      /> */}

      {/* Instructor Protected Routes */}
      {/* --------------------------------- */}
      <Route element={<InstructorProtectedRoute />}>

        <Route path="/instructor" element={<InstructorLayout />}>

          <Route index element={<Navigate to="user-management" replace />} />

          {/* USER MANAGEMENT */}
          <Route path="user-management" element={<UserManagement />} />
          <Route
            path="user-management/:studentId"
            element={<StudentDetails />}
          />

          {/* ADD COURSE */}
         
          <Route path="add-new-course" element={<AddNewCourse />} />
           <Route path="add-course" element={<AddCourse />} />
          <Route path="courses/:courseId/add-content" element={<AddContent />} />

          <Route
            path="course/:courseId/schedule"
            element={<AddScheduleClass />}
          />
          <Route
            path="course/:courseId/view"
            element={<View />}
          />

          {/* LESSON FLOW */}
          <Route
            path="lesson-view/:courseId/:lessonId"
            element={<LessonView />}
          />
          <Route
            path=":courseId/:lessonId/lesson-content"
            element={<LessonContent />}
          />
          <Route
            path=":courseId/:lessonId/addpdf"
            element={<AddPDF />}
          />
          <Route
            path=":courseId/:lessonId/addweblink"
            element={<AddWeblink />}
          />
          <Route
            path=":courseId/:lessonId/notepad"
            element={<NotePad />}
          />
          <Route
            path=":courseId/:lessonId/addlab"
            element={<AddLab />}
          />
          <Route
            path=":courseId/:lessonId/addquiz"
            element={<AddQuiz />}
          />

          <Route
            path="add-lesson/:courseId"
            element={<AddLesson />}
          />
          <Route
            path="add-concept/:courseId"
            element={<AddConcept />}
          />

          {/* SCHEDULE CLASS */}
          <Route
            path="schedule-class"
            element={<EditScheduleClass />}
          />
          <Route
            path="schedule-class/:courseId"
            element={<ScheduleEditor />}
          />

          {/* VIEW COURSE */}
          <Route path="view-course" element={<ViewCourse />} />

          {/* ASSIGN BATCH */}
          <Route path="assign-batch" element={<AssignBatch />} />
          <Route
            path="assign-batch/create-new-batch"
            element={<CreateNewBatch />}
          />
          <Route
            path="assign-batch/select"
            element={<SelectBatch />}
          />

          {/* LIVE CLASS UPDATE */}
          <Route
            path="live-student-activity"
            element={<LiveStudentActivity />}
          />

          {/* MEETING LINK */}
          <Route path="meeting-link" element={<MeetingLink />} />
          <Route
            path="edit-meeting-link/:id"
            element={<EditMeetingLink />}
          />
          <Route
            path="add-meeting-link"
            element={<AddMeetingLink />}
          />

        </Route>
      </Route>


      {/* Catch all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
