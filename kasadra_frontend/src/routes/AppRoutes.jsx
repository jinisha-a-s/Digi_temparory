import { Routes, Route, Navigate } from "react-router-dom";

// ======================
// Public Pages
// ======================
import Home from "../pages/common/Home";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import InstructorSignin from "../pages/auth/InstructorSignin";
import InstructorSignup from "../pages/auth/InstructorSignup";

// ======================
// Student Pages
// ======================
import StudenthomePage from '../pages/student/StudenthomePage';
import MyProfile from "../pages/student/myProfile/MyProfile";
import EditProfile from "../pages/student/myProfile/EditProfile";
import CheckOut from "../pages/student/myCourse/newCoursePurchase/CheckOut";
import NewCoursePurchase from '../pages/student/myCourse/newCoursePurchase/NewCoursePurchase';
import Confirmation from "../pages/student/myCourse/newCoursePurchase/ConfirmationPage";
import MyCoursePage from "../pages/student/myCourse/existingCourse/MyCoursePage";
import CourseOverview from "../pages/student/myCourse/newCoursePurchase/CourseOverview";
import StudentCalendar from "../pages/student/myCourse/existingCourse/StudentCalender";
import ZoomLinkPage from "../pages/student/myCourse/existingCourse/ZoomLinkPage";
import StudentLessonContent from "../pages/student/myCourse/existingCourse/StudentLessonContent";
import StudentCourseLayout from "../layouts/StudentCourseLayout";

// ======================
// Instructor Pages
// ======================
import InstructorhomePage from "../pages/instructor/InstructorhomePage";
import UserManagement from "../pages/instructor/userManagement/UserManagement";
import StudentDetails from '../pages/instructor/userManagement/StudentDetails';
import AddCourse from "../pages/instructor/addCourse/Addcourse";
import AddNewCourse from "../pages/instructor/addCourse/AddNewCourse";
import AddContent from '../pages/instructor/addCourse/AddContent';
import AddLesson from '../pages/instructor/addCourse/AddLesson';
import AddConcept from '../pages/instructor/addCourse/AddConcept';
import AddLab from '../pages/instructor/addCourse/AddLab';
import AddQuiz from '../pages/instructor/addCourse/AddQuiz';
import LessonView from '../pages/instructor/addCourse/LessonView';
import LessonContent from '../pages/instructor/addCourse/LessonContent';
import AddPDF from '../pages/instructor/addCourse/AddPDF';
import AddWeblink from '../pages/instructor/addCourse/AddWeblink';
import NotePad from '../pages/instructor/addCourse/Notepad';
import View from '../pages/instructor/addCourse/View';
import ViewCourse from '../pages/instructor/addCourse/ViewCourse';
import AddScheduleClass from '../pages/instructor/addCourse/AddScheduleClass';
// import EditScheduleClass from "../pages/instructor/scheduleClass/ScheduleClass";
import UpdateCalender from "../pages/instructor/scheduleClass/UpdateCalender";
import AssignBatch from "../pages/instructor/assignBatch/AssignBatch";
import CreateNewBatch from "../pages/instructor/assignBatch/CreateNewBatch";
import SelectBatch from "../pages/instructor/assignBatch/SelectBatch";
import LiveStudentActivity from "../pages/instructor/liveClassUpdate/LiveStudentActivity";
import MeetingLink from "../pages/instructor/scheduleClass/meetingLink/MeetingLink";
import EditMeetingLink from "../pages/instructor/scheduleClass/meetingLink/EditMeetingLink";
import AddMeetingLink from "../pages/instructor/scheduleClass/meetingLink/AddMeetingLink";
import InstructorLayout from "../layouts/InstructorLayout";

// ======================
// Protected Routes
// ======================
import InstructorProtectedRoute from "./InstructorProtectedRoute";
import StudentProtectedRoute from "./StudentProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================== */}
      {/* Public Routes */}
      {/* ================== */}
      <Route path="/" element={<Home />} />
      <Route path="/student-signin" element={<Signin />} />
      <Route path="/student-signup" element={<Signup />} />
      <Route path="/instructor-signin" element={<InstructorSignin />} />
      <Route path="/instructor-signup" element={<InstructorSignup />} />

      {/* ================== */}
      {/* Student Protected Routes */}
      {/* ================== */}
      <Route element={<StudentProtectedRoute />}>
        <Route path="/student/home" element={<StudenthomePage />} />

        {/* Profile */}
        <Route path="/student/profile/:studentId" element={<MyProfile />} />
        <Route path="/student/profile/:studentId/edit" element={<EditProfile />} />

        {/* Courses */}
        <Route path="/student/checkout" element={<CheckOut />} />
        <Route path="/student/confirmation" element={<Confirmation />} />
        <Route path="/student/new-course" element={<NewCoursePurchase />} />
        <Route path="/student/my-course" element={<MyCoursePage />} />
        <Route path="/student/course/:courseId/course-overview" element={<CourseOverview />} />

        {/* Course Sidebar Layout */}
        <Route path="/student/course/:courseId" element={<StudentCourseLayout />}>
          <Route path="calendar" element={<StudentCalendar />} />
          <Route path="zoom" element={<ZoomLinkPage />} />
          <Route path="lesson/:lessonId" element={<StudentLessonContent />} />
          <Route path="lesson/:lessonId/:contentType" element={<StudentLessonContent />} />
        </Route>
      </Route>

      {/* ================== */}
      {/* Instructor Protected Routes */}
      {/* ================== */}
      <Route element={<InstructorProtectedRoute />}>
        <Route path="/instructor" element={<InstructorLayout />}>

          {/* Default page */}
          <Route index element={<Navigate to="user-management" replace />} />

          {/* User Management */}
          <Route path="user-management" element={<UserManagement />} />
          <Route path="user-management/:studentId" element={<StudentDetails />} />

          {/* Course Management */}
          <Route path="add-new-course" element={<AddNewCourse />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="courses/:courseId/add-content" element={<AddContent />} />
          <Route path="course/:courseId/view" element={<View />} />
          <Route path="view-course" element={<ViewCourse />} />

          {/* Lesson Management */}
          <Route path="lesson-view/:courseId/:lessonId" element={<LessonView />} />
          <Route path=":courseId/:lessonId/lesson-content" element={<LessonContent />} />
          <Route path=":courseId/:lessonId/addpdf" element={<AddPDF />} />
          <Route path=":courseId/:lessonId/addweblink" element={<AddWeblink />} />
          <Route path=":courseId/:lessonId/notepad" element={<NotePad />} />
          <Route path=":courseId/:lessonId/addlab" element={<AddLab />} />
          <Route path=":courseId/:lessonId/addquiz" element={<AddQuiz />} />
          <Route path="add-lesson/:courseId" element={<AddLesson />} />
          <Route path="add-concept/:courseId" element={<AddConcept />} />

          {/* Schedule Class */}
          <Route path="course/schedule" element={<AddScheduleClass />} />
          {/* <Route path="schedule-class" element={<EditScheduleClass />} /> */}
          <Route path="schedule-class/:courseId" element={<UpdateCalender />} />

          {/* Assign Batch */}
          <Route path="assign-batch" element={<AssignBatch />} />
          <Route path="assign-batch/create-new-batch" element={<CreateNewBatch />} />
          <Route path="assign-batch/select" element={<SelectBatch />} />

          {/* Live Class & Meeting Links */}
          <Route path="live-student-activity" element={<LiveStudentActivity />} />
          <Route path="meeting-link" element={<MeetingLink />} />
          <Route path="edit-meeting-link/:id" element={<EditMeetingLink />} />
          <Route path="add-meeting-link" element={<AddMeetingLink />} />

        </Route>
      </Route>

      {/* ================== */}
      {/* Catch All */}
      {/* ================== */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRoutes;
