import Vue from "vue";
import Router from "vue-router";

const Login = () => import("../views/Login.vue");
const MyContent = () => import("../views/MyContent.vue");
const Home = () => import("../components/Home.vue");
const Job = () => import("../views/Job.vue");
const HRInformation = () => import("../components/Job/HRInformation.vue");
const PublishJob = () => import("../components/Company/PublishJob.vue");
const SubmitResume = () => import("../views/SubmitResume.vue");
const VarifyJob = () => import("../components/Teacher/VerifyJob.vue");
const VarifyCompany = () => import("../components/Teacher/VerifyCompany.vue");
const Upload = () => import("../components/Upload.vue");
const TeacherHome = () => import("../components/Teacher/Home.vue");
const ChatRoom = () => import("../views/ChatRoom.vue");
const ManagerJob = () => import("../components/Company/ManagerJob.vue");
const JobProcess = () => import("../components/Student/JobProcess.vue");
const InterestJob = () => import("../components/Company/InterestJob.vue");
const TieBa = () => import("../views/TieBa.vue");
const CommentContainer = () => import("../views/CommentContainer.vue");
const JobInformation = () => import("../components/Teacher/JobInformation.vue");
const JobIntention = () => import("../components/Company/JobIntention.vue");
const Inform = () => import("../components/Student/Inform.vue");

Vue.use(Router);

const companyRouter = [
  {
    name: "enterpriseHome",
    path: "enterpriseHome",
    component: PublishJob
  },
  {
    name: 'managerjob',
    path: 'managerjob',
    component: ManagerJob,
  },
  {
    path: 'interestJob',
    component: InterestJob
  }, 
  {
    path: 'jobIntention',
    component: JobIntention
  }
];

const sutdentRouter = [
  {
    name: "home",
    path: "home",
    component: Home
  },
  {
    path: "job",
    component: Job,
    children: [
      {
        path: "job",
        component: HRInformation
      }
    ]
  },
  {
    path: "ask",
    component: SubmitResume
  },
  {
    path: "upload",
    component: Upload
  }, {
    path: 'chat',
    component: ChatRoom
  },
  {
    path: 'jobProcess',
    component: JobProcess
  },
  {
    path: 'inform',
    component: Inform
  }
];

const teacherRouter = [
  {
    path: "verify",
    name: "????????????",
    component: VarifyJob
  },

  {
    path: "verifyCompany",
    name: "????????????",
    component: VarifyCompany
  },
  {
    path: "teacherHome",
    name: "teacherHome",
    component: TeacherHome
  },{
    path: 'jobInformation',
    component: JobInformation
  }
];

const router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    // {
    //   path: '/Luck',
    //   name: 'Luck',
    //   // ???????????????????????????????????????????????????meta??????
    //   meta: {
    //   requireAuth: true
    //   },
    //   component: ''
    // },
    // {
    //   path: '/content',
    //   component: Content
    // }

    {
      path: "/content",
      name: "content",
      component: MyContent,
      children: [
        ...sutdentRouter,

        ...companyRouter,
        ...teacherRouter,
        {
          path: 'personalCenter',
          component: TieBa
        },
        {
          path: 'comment',
          component: CommentContainer
        }
       
      ]
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatRoom
    },
  ],
  mode: "history"
});

// ?????????????????????????????? ??????????????????
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(res => res.meta.requireAuth)) {
//     // ??????????????????????????????
//     if (localStorage.getItem("username")) {
//       // ??????????????????
//       next();
//     } else {
//       // ?????????????????????????????????
//       next({
//         path: "/Register",
//         query: { redirect: to.fullPath }
//       });
//     }
//   } else {
//     next();
//   }
// });

export default router;
