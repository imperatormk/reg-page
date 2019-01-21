import helpers from '@/helpers'

const initialPagesList = {
  acctype: 'acctype'
}

const studentPagesList = {
  acctype: 'acctype',
  account: 'account',
  education: 'education',
  work: 'work',
  roles: 'roles',
  experience: 'experience',
  technicalRoles: 'technicalRoles',
  industries: 'industries',
  skills: 'skills',
  jobSearchProgress: 'jobSearchProgress',
  transcript: 'transcript'
}

const employeerPagesList = {
  acctype: 'acctype',
  account: 'account'
}

export default {
  initialPagesList,
  studentPagesList,
  employeerPagesList
}

const studentPagesFields = [{
  pageId: studentPagesList.account,
  fields: {
    firstName: {
      value: '',
      required: true
    },
    lastName: {
      value: '',
      required: true
    },
    city: {
      value: '',
      required: true
    }
  }
},
{
  pageId: studentPagesList.education,
  fields: {
    selUniversity: {
      value: null,
      required: true
    },
    selField: {
      value: null,
      required: true
    },
    selYear: {
      value: null,
      required: true
    },
    selGpa: {
      value: null,
      required: true
    },
    degree: {
      value: null,
      required: true
    },
  }
},
{
  pageId: studentPagesList.work,
  fields: {
    officialCoop: {
      value: [],
      required: true
    },
    availability: {
      value: [],
      required: true
    },
    termLength: {
      value: [],
      required: true
    },
    locationPref: {
      value: [],
      required: true
    },
  }
},
{
  pageId: studentPagesList.roles,
  fields: {
    selectedRole: {
      value: null,
      required: true
    }
  }
},
{
  pageId: studentPagesList.experience,
  fields: {
    selectedAreas: {
      value: [],
      required: true
    },
    numYears: {
      value: 1,
      required: true
    }
  }
},
{
  pageId: studentPagesList.technicalRoles,
  fields: {
    rolePref: {
      value: [],
      required: true
    },
  }
},
{
  pageId: studentPagesList.industries,
  fields: {
    selectedIndustries: {
      value: [],
      required: true
    }
  }
},
{
  pageId: studentPagesList.skills,
  fields: {
    selectedSkills: {
      value: [],
      required: true
    }
  }
},
{
  pageId: studentPagesList.jobSearchProgress,
  fields: {
    jobSearch: {
      value: 0,
      required: true
    },
    companySize: {
      value: [],
      required: true
    },
  }
},
{
  pageId: studentPagesList.transcript,
  fields: {
    resume: {
      value: [],
      required: true
    },
    linkedIn: {
      value: '',
      required: true
    },
    gitHub: {
      value: '',
      required: true
    },
    website: {
      value: '',
      required: true
    }
  }
}]

const employeerPagesFields = [{
  pageId: employeerPagesList.account,
  fields: {
    firstName: {
      value: '',
      required: true
    },
    lastName: {
      value: '',
      required: true
    },
    companyName: {
      value: '',
      required: true
    },
    companyWebsite: {
      value: '',
      required: true
    },
    email: {
      value: '',
      required: true
    },
    city: {
      value: '',
      required: true
    },
    phoneNumber: {
      value: '',
      required: true
    },
  }
}]

const studentPagesData = []
const initialPagesData = []

const setSourceData = function f(key, data) {
  if (key === 'initial') {
    data.forEach(dataObj => initialPagesData.push(dataObj))
    const roleTypes = helpers.setImageData(initialPagesData.find(obj => obj.pageId === 'acctype').fields.roleTypes)
    initialPagesData.find(obj => obj.pageId === 'acctype').fields.roleTypes = roleTypes
  } else if (key === 'student') {
    data.forEach(dataObj => studentPagesData.push(dataObj))
    const roleTypes = helpers.setImageData(studentPagesData.find(obj => obj.pageId === 'roles').fields.roleTypes)
    studentPagesData.find(obj => obj.pageId === 'roles').fields.roleTypes = roleTypes
  }
}

export { studentPagesFields }
export { employeerPagesFields }
export { studentPagesData }
export { initialPagesData }
export { setSourceData }

