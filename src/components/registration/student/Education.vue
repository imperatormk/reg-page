<template lang="pug">
  v-container(grid-list-xl)
    v-layout(wrap, align-center)
      v-flex(xs12, sm12, d-flex)
        h1.label Tell us about your education.
      v-flex(xs12, sm6, d-block)
        PropertyItem(:data="fields.selUniversity")
          .field-label.demiBold(slot="title") University
          v-select.br5.demiBold(:items='source.universities', background-color='#f5f5f5', v-model='fields.selUniversity.value', item-text='title', :label='`eg. ${source.universities[0].title}`', solo)
      v-flex(xs12, sm6, d-block)
        PropertyItem(:data="fields.selField")
          .field-label.demiBold(slot="title") Field of Study
          v-select.demiBold(:items='source.studyFields', background-color='#f5f5f5', v-model='fields.selField.value', item-text='title', :label='`eg. ${source.studyFields[0].title}`', solo)
      v-flex(xs12, sm6, d-block)
        PropertyItem(:data="fields.selYear")
          .field-label.demiBold(slot="title") Expected Year of Graduation
          v-select.demiBold(:items='source.years', background-color='#f5f5f5', v-model='fields.selYear.value', :label='`eg. ${source.years[0]}`', solo)
      v-flex(xs12, sm6, d-block)
        PropertyItem(:data="fields.selGpa")
          .field-label.demiBold(slot="title") Cumulative GPA
          v-text-field.br5.demiBold(v-model="fields.selGpa.value" solo background-color="#f5f5f5" max="4" min="0" suffix='/4.0' type="number")
      v-flex(flex-column)
        PropertyItem(:data="fields.degree")
          .field-label.demiBold(slot="title") Degree
          .flex.flex-wrap.p10.style-1.of-scroll(style="height:130px;")
            v-btn.demiBold(v-for="degree in source.degrees" :key="degree.id" :class="isDegreeSelected(degree)" @click="setDegree(degree)") {{ degree.title }}
</template>

<script>
import PropertyItem from '@/components/common/PropertyItem'
import pagesList, { studentPagesData } from '@/components/registration/page_list'

const PAGE_ID = pagesList.studentPagesList.education

export default {
  created() {
    this.fields = this.$store.getters.getById(PAGE_ID)
  },
  data() {
    return {
      source: studentPagesData.find(item => item.pageId === PAGE_ID).fields,
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
    getPlaceholder(arr) {
      if (!arr.length) return ''
      const firstItem = arr[0].title || arr[0]
      return `eg. ${firstItem}`
    },
    selectFirstElement(key, arr) {
      if (this[key] == null) {
        this[key] = arr[0].id != null ? arr[0].id : 0
      }
    },
    setDegree(degree) {
      const prevDegree = this.fields.degree.value
      if (prevDegree != null && prevDegree === degree.id) {
        this.fields.degree.value = null
      } else {
        this.fields.degree.value = degree.id
      }
    },
    isDegreeSelected(degree) {
      const isSelected = this.fields.degree.value != null && degree != null && this.fields.degree.value === degree.id
      return {
        p10: true,
        btn: true,
        'button-chip': true,
        'btn-selected': isSelected
      }
    }
  },
  components: {
    PropertyItem
  }
}
</script>