import Vue from 'vue'
import Router from 'vue-router'

import Registration from '@/pages/Registration'
import JobBoard from '@/pages/students/JobBoard'
import SavedJobs from '@/pages/students/SavedJobs'
import Postings from '@/pages/employe/Postings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/register'
    },
    {
      path: '/register',
      name: 'register',
      component: Registration,
    },
    {
      path: '/student',
      component: JobBoard
    },
    {
      path: '/student/jobs',
      component: SavedJobs
    },
    {
      path: '/employe/postings',
      component: Postings
    }
  ],
  mode: 'history'
})
