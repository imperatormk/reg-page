<template lang="pug">
  v-container(grid-list-xl)
    v-layout(wrap align-center)
      v-flex(xs12, sm12, d-flex)
        h1.label Select your preferred non-technical roles
      v-flex(flex-column)
        PropertyItem(:data="fields.rolePref")
          .field-label.alternate.demiBold(slot="title") Choose as many that apply
          .flex(slot="misc")
            v-text-field(v-model="criteria" placeholder="Search roles")
          .flex-wrap.p10.p-left-0.style-1.of-scroll(style="height:130px;")
            v-btn.demiBold(v-for="role in getVisibleRoles" :key="role.id" :class="isLocationSelected(role.id, 'rolePref')" @click="toggleLocationSelected(role.id, 'rolePref')") {{ role.title }}
</template>

<script>
import PropertyItem from '@/components/common/PropertyItem'
import pagesList, { studentPagesData } from '@/components/registration/page_list'

const PAGE_ID = pagesList.studentPagesList.nontechnical.roles

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
  computed: {
    getVisibleRoles() {
      if (!this.criteria.trim()) return this.source.roles
      return this.source.roles.filter(role => role.title.toLowerCase().includes(this.criteria.trim()))
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
    isButtonSelected(currentVal, expectedVal) {
      const isSelected = currentVal === expectedVal
      return {
        btn: true,
        'btn-selected': isSelected
      }
    },
    setTermLength(termLength) {
      const prevTerm = this.fields.termLength.value
      if (prevTerm != null && prevTerm === termLength) {
        this.fields.termLength.value = null
      } else {
        this.fields.termLength.value = termLength
      }
    },
    toggleLocationSelected(locationId, field) {
      const isSelected = this.fields[field].value.find(id => id === locationId) != null
      if (!isSelected) {
        this.fields[field].value.push(locationId)
      } else {
        this.fields[field].value = this.fields[field].value.filter(id => id !== locationId)
      }
    },
    isLocationSelected(locationId, field) {
      const isSelected = this.fields[field].value.find(id => id === locationId) != null
      return {
        p10: true,
        btn: true,
        'button-chip': true,
        'btn-selected': isSelected
      }
    },
  },
  components: {
    PropertyItem
  }
}
</script>
