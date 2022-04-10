import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { handleLogin } from "../api/login";
import { uploadStudentInfo, searchJob, getAllStudentInfo} from "../api/user";
import { getNoVerifyJob } from '../api/teacher';
// import SockJS from "sockjs-client";
import  '../utils/sockjs';
import Stomp from "stompjs";
import {  Message, Notify } from 'element-ui'
import { updateUserOnlineState } from "../api/wechat";


Vue.use(Vuex);

const store = new Vuex.Store({
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    userType: -1,
    // tabActive: '',
    jobList: [],
    sessions:{},//聊天记录
    users:[],//用户列表
    currentUser:null,//当前登录用户,
    stomp:null,
    photos:{},
    isDot:{},//两用户之间是否有未读信息
    currentSession: {}
  },

  mutations: {
    setData(state, payload) {

      for (let key in payload) {
        state[key] = payload[key];
        console.log('******************');
        console.log(state[key]);
        console.log(payload[key]);
        console.log(key);
      }
    },
    changeCurrentSession (state,currentSession) {
      //切换到当前用户就标识消息已读
      // Vue.set(state.isDot,state.currentUser.userName+"#"+currentSession.userName,false);
      //更新当前选中的用户
      state.currentSession =currentSession;
    },
    //修改当前聊天窗口列表
    changeCurrentList(state,currentList){
      state.currentList=currentList;
    },
     //保存单聊数据
     addMessage (state,msg) {
      let message=state.sessions[state.currentUser.sno+"#"+msg.to];
      if (!message){
        //创建保存消息记录的数组
        console.log('第一次创建聊天');
        Vue.set(state.sessions,state.currentUser.sno+"#"+msg.to,[]);
      }
      console.log('往聊天中持续添加数值了');
      state.sessions[state.currentUser.sno+"#"+msg.to].push({
        content:msg.content,
        date: new Date(),
        fromNickname:msg.fromNickname,
        messageTypeId:msg.messageTypeId,
        self:!msg.notSelf,
      });


     

      console.log('$$$$$$$$$$$$$$$');
      console.log(state.sessions);
    },
      /**
     *  获取本地聊天记录，同步数据库的记录保存到localStorage中。
     *  不刷新情况下都是读取保存再localStorage中的记录
     * @param state
     * @constructor
     */
       INIT_DATA (state) {
        //同步数据库中的群聊数据
        // getRequest("/groupMsgContent/").then(resp=>{
        //   if (resp){
        //     Vue.set(state.sessions,'群聊',resp);
        //   }
        // })
    },
    //保存系统所有用户
    INIT_USER(state,data){
      state.users=data;
    },

   
  },
  actions: {
     //请求并保存所有系统用户
    async GET_USERS(state){
      const studentList =  await getAllStudentInfo();
      console.log('得到的用户信息是-----');
      console.log(studentList);
      state.commit('setData', {
        users: [...studentList]
      });
      let photos = {};
      studentList.forEach((student) => {
           photos[student.sno] = student.headerPhoto
      });
      state.commit('setData', {
        photos: photos
      });

      // state.users = [...studentList];

    },
    async getNoVerifyJob(context) {

      const data = await getNoVerifyJob();

    
      context.commit('setData', {
        jobList: [...data]
      });

    },

    async searchJob(context, payload) {
      const {
        data
      } = await searchJob({'status': 1, ...payload});

      if (data.status === 200) {

        console.error('我拿到的岗位信息是', data.data);
        context.commit('setData',  {
          jobList: {...data.data}
        });

      }
     
    },
      /**
     * 作用：初始化数据
     * action函数接受一个与store实例具有相同方法和属性的context对象
     * @param context
     */
       initData (context) {
        //初始化聊天记录
        context.commit('INIT_DATA');
        //获取用户列表
        context.dispatch('GET_USERS');
        setInterval(function(){
       
          this.dispatch('GET_USERS');

        }.bind(context), 5000);
      },

       /**
     * 实现连接服务端连接与消息订阅
     * @param context 与store实例具有相同方法和属性的context对象
     */
    connect(context){
      console.log('开始连接服务器');
      console.log(context.state.currentUser.userName);
      //连接Stomp站点
      context.state.stomp=Stomp.over(new SockJS(`http://127.0.0.1:8888/ws/ep/`, null, {timeout: 1500}));
      context.state.stomp.connect({},success=>{
        console.log('与服务器成功建立连接');
        setInterval(() => {
          updateUserOnlineState();
        }, 1000 * 2);
        
        /**
         * 订阅系统广播通知消息
         */
        context.state.stomp.subscribe("/topic/notification",msg=>{
          console.log('%%%%%%%%%%%');
          //判断是否是系统广播通知
            Notification.info({
              title: '系统消息',
              message: msg.body.substr(5),
              position:"top-right"
            });
            //更新用户列表（的登录状态）
            context.commit('GET_USERS');
        });
        /**
         * 订阅私人消息
         */
        context.state.stomp.subscribe(`/queue/chat/${context.state.currentUser.sno}`,msg=>{
          console.log('接收到从远端传动的要死了');
          console.log(msg.body);
          //接收到的消息数据
          let receiveMsg=JSON.parse(msg.body);
          //没有选中用户或选中用户不是发来消息的那一方
          if (!context.state.currentSession||receiveMsg.from!=context.state.currentSession.username){
            // Notification.info({
            //   title:'【'+receiveMsg.fromNickname+'】发来一条消息',
            //   message:receiveMsg.content.length<8?receiveMsg.content:receiveMsg.content.substring(0,8)+"...",
            //   position:"bottom-right"
            // });

            // Notify({
            //   title: '【'+receiveMsg.fromNickname+'】发来一条消息',
            //   message: receiveMsg.content.length<8?receiveMsg.content:receiveMsg.content.substring(0,8)+"...",
            //   type: 'info'
            // });
            Message({
              message: '【'+receiveMsg.fromNickname+'】发来一条消息',
            })
  
  

            console.log('------收到的消息为-------');
            console.log(msg.body);

            console.log('---------------------');



            //默认为消息未读
            Vue.set(context.state.isDot,context.state.currentUser.username+"#"+receiveMsg.from,true);
          }
          //标识这个消息不是自己发的
          receiveMsg.notSelf=true;
          //获取发送方
          receiveMsg.to=receiveMsg.from;
          //提交消息记录
          context.commit('addMessage',receiveMsg);
        })
      },error=>{
        Notification.info({
          title: '系统消息',
          message: "无法与服务端建立连接，请尝试重新登陆系统~",
          position:"top-right"
        });
      })
    },

     //与Websocket服务端断开连接
     disconnect(context){
      if (context.state.stomp!=null) {
        context.state.stomp.disconnect();
        console.log("关闭连接~");
        updateUserOnlineState('0');
      }
     },


  },
  getters: {
    jobInfoList(state) {
      console.log('加工工资');
      console.log(state.jobList);
     return  state.jobList.map((job) => {
       job.money = job.salaryMin + '-' + job.salaryMax + '*' + job.month;
       return job;

      });

    }
  }
});

export default store;
