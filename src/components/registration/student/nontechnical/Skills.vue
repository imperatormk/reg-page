<template lang="pug">
  v-container(grid-list-xl)
    v-flex(xs12, sm12, d-flex).p70-bot
      h1.label What are your strongest skills?
    v-layout(wrap align-center)
      v-flex(flex-column)
        PropertyItem(:data="fields.selectedSkills")
          .field-label.alternate(slot="title") Choose as many that apply
          .flex(slot="misc")
            v-text-field(v-model="criteria" placeholder="Search skills")
          .flex-wrap.p10.p-left-0.style-1.of-scroll(style="height:130px;")
            v-btn(v-for="skill in getVisibleSkills" :key="skill.id" :class="isSkillSelected(skill.id)" @click="toggleSkillSelected(skill.id)") {{ skill.title }}
</template>

<script>
import PropertyItem from '@/components/common/PropertyItem'
import pagesList, { studentPagesData } from '@/components/registration/page_list'

const PAGE_ID = pagesList.studentPagesList.nontechnical.skills

export default {
  created() {
    this.fields = this.$store.getters.getById(PAGE_ID, 'nontechnical').fields
  },
  data() {
    return {
      criteria: '',
      source: studentPagesData.find(obj => Object.keys(obj).includes('nontechnical')).nontechnical.find(item => item.pageId === PAGE_ID).fields,
      fields: {}
    }
  },
  watch: {
    fields: {
      handler: function f(val) {
        this.$store.dispatch('dataChange', {
          pageId: PAGE_ID,
          fields: val
        })
      },
      deep: true
    }
  },
  methods: {
    isSkillSelected(skillId) {
      const isSelected = this.fields.selectedSkills.value.find(id => id === skillId) != null
      return {
        p10: true,
        btn: true,
        'button-chip': true,
        'btn-selected': isSelected
      }
    },
    toggleSkillSelected(skillId) {
      const isSelected = this.fields.selectedSkills.value.find(id => id === skillId) != null
      if (!isSelected) {
        this.fields.selectedSkills.value.push(skillId)
      } else {
        this.fields.selectedSkills.value = this.fields.selectedSkills.value.filter(id => id !== skillId)
      }
    }
  },
  computed: {
    getVisibleSkills() {
      if (!this.criteria.trim()) return this.source.skills
      return this.source.skills.filter(skill => skill.title.toLowerCase().includes(this.criteria.trim()))
    }
  },
  components: {
    PropertyItem
  }
}
</script>