<template lang="pug">
  v-container(grid-list-xl)
    h1.label Tell us about your experience
    div
      PropertyItem(:data="fields.numYears")
        .desc-label(slot="title") How many years of experience do you have?
        .flex.space-between.align-center.p10
          range-slider.yearSlider(min="0" max="5" step="1" v-model="fields.numYears.value")
          v-chip.chip {{ fields.numYears.value }} years
    div
      PropertyItem(:data="fields.selectedAreas")
        .desc-label(slot="title") What areas have you had most experience with?
        .flex.align-center.p10.flex-wrap.style-1.of-scroll(style="height:130px;")
          v-btn(v-for="area in source.areas" :key="area.id" :class="isAreaSelected(area.id)" @click="toggleAreaSelected(area.id)") {{ area.title }}
</template>

<script>
import PropertyItem from '@/components/common/PropertyItem'
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
import pagesList, { studentPagesData } from '@/components/registration/page_list'

const PAGE_ID = pagesList.studentPagesList.technical.experience

export default {
  created() {
    this.fields = this.$store.getters.getById(PAGE_ID, 'technical').fields
  },
  data() {
    return {
      source: studentPagesData.find(obj => Object.keys(obj).includes('technical')).technical.find(item => item.pageId === PAGE_ID).fields,
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
    isAreaSelected(areaId) {
      const isSelected = this.fields.selectedAreas.value.find(id => id === areaId) != null
      return {
        p10: true,
        btn: true,
        'button-chip': true,
        'btn-selected': isSelected
      }
    },
    toggleAreaSelected(areaId) {
      const isSelected = this.fields.selectedAreas.value.find(id => id === areaId) != null
      if (!isSelected) {
        this.fields.selectedAreas.value.push(areaId)
      } else {
        this.fields.selectedAreas.value = this.fields.selectedAreas.value.filter(id => id !== areaId)
      }
    }
  },
  components: {
    RangeSlider,
    PropertyItem
  }
}
</script>

<style lang="scss" scoped>
  .select-box {
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 3px 1px -2px rgba(100, 100, 100, 0.1), 0 2px 2px 0 rgba(100, 100, 100, 0.1), 0 1px 5px 0 rgba(100, 100, 100, 0.1);
  }
  .md-field.md-theme-default:before {
    background-color: transparent;
  }
  .md-field.md-theme-default:after {
    background-color: transparent;
  }
  .yearSlider {
    width: 100%;
  }
  .chip {
    color: #8c8c8c !important;
    background-color: #ececec;
    font-size: 20px;
    padding: 5px 10px;
    height: 42px !important;
  }
</style>