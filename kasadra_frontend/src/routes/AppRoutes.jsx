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
        <Route path="/instructor/home" element={<InstructorhomePage />} />

        {/* User Management */}
        {/* ------------------------ */}
        <Route
          path="/instructor/user-management"
          element={<UserManagement />}
        />
        <Route
          path="/instructor/user-management/:studentId"
          element={<StudentDetails />}
        />

        {/* Add Course */}
        {/* ------------------------ */}
        <Route path="/instructor/add-course" element={<AddCourse />} />
        <Route path="/add-new-course" element={<AddNewCourse />} />
        <Route path="/courses/:courseId/add-content" element={<AddContent />} />
        <Route
          path="/instructor/course/:courseId/schedule"
          element={<AddScheduleClass />}
        />
        <Route path="/instructor/course/:courseId/view" element={<View />} />
        <Route
          path="/instructor/lesson-view/:courseId/:lessonId"
          element={<LessonView />}
        />
        <Route
          path="/instructor/:courseId/:lessonId/lesson-content"
          element={<LessonContent />}
        />
        <Route
          path="/instructor/:courseId/:lessonId/addpdf"
          element={<AddPDF />}
        />
        <Route
          path="/instructor/:courseId/:lessonId/addweblink"
          element={<AddWeblink />}
        />
        <Route
          path="/instructor/:courseId/:lessonId/notepad"
          element={<NotePad />}
        />

        <Route
          path="/instructor/lesson-view/:lessonId"
          element={<LessonView />}
        />
        <Route
          path="/instructor/:courseId/:lessonId/lesson-content"
          element={<LessonContent />}
        />
        <Route
          path="/instructor/:courseId/:lessonId/addpdf"
          element={<AddPDF />}
        />
        <Route
          path="/instructor/:courseId/:lessonId/addweblink"
          element={<AddWeblink />}
        />

        <Route
          path="/instructor/add-lesson/:courseId"
          element={<AddLesson />}
        />
        <Route
          path="/instructor/add-concept/:courseId"
          element={<AddConcept />}
        />
        <Route
          path="/instructor/:courseId/:lessonId/addlab"
          element={<AddLab />}
        />
        <Route
          path="/instructor/:courseId/:lessonId/addquiz"
          element={<AddQuiz />}
        />

        {/* SCHEDULE CLASS */}
        <Route
          path="/instructor/schedule-class"
          element={<EditScheduleClass />}
        />
        <Route
          path="/instructor/schedule-class/:courseId"
          element={<ScheduleEditor />}
        />

        {/* View Course  */}

        <Route path="/instructor/view-course" element={<ViewCourse />} />

        {/* ASSIGN BATCH */}

        <Route path="/instructor/assign-batch" element={<AssignBatch />} />
        <Route
          path="/instructor/assign-batch/create-new-batch"
          element={<CreateNewBatch />}
        />
        <Route
          path="/instructor/assign-batch/select"
          element={<SelectBatch />}
        />

        {/* LIVE CLASS UPDATE */}
        <Route
          path="/instructor/live-student-activity"
          element={<LiveStudentActivity />}
        />

        {/* ADD MEETING LINK */}
        <Route path="/instructor/meeting-link" element={<MeetingLink />} />
        <Route
          path="/instructor/edit-meeting-link/:id"
          element={<EditMeetingLink />}
        />
        <Route
          path="/instructor/add-meeting-link"
          element={<AddMeetingLink />}
        />
      </Route>

      {/* Catch all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
