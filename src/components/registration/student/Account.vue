<template lang="pug">
  v-container(grid-list-xl)
    v-layout(wrap, align-center)
      v-flex(xs12, sm12, d-flex)
        h1.label Account information
      v-flex(xs12, sm6, d-block)
        PropertyItem(:data="fields.firstName")
          .field-label.demiBold(slot="title") First name
          v-text-field.br5.demiBold(v-model="fields.firstName.value" solo background-color="#f5f5f5" placeholder="First name")
      v-flex(xs12, sm6, d-block)
        PropertyItem(:data="fields.lastName")
          .field-label.demiBold(slot="title") Last name
          v-text-field.br5.demiBold(v-model="fields.lastName.value" solo background-color="#f5f5f5" placeholder="Last name")
      v-flex(xs12, sm6, d-block)
        PropertyItem(:data="fields.city")
          .field-label.demiBold(slot="title") City of residence
          v-text-field.br5.demiBold(v-model="fields.city.value" solo background-color="#f5f5f5" placeholder="City, Province (eg.Toronto, ON)")
</template>

<script>
import PropertyItem from '@/components/common/PropertyItem'
import pagesList from '@/components/registration/page_list'

const PAGE_ID = pagesList.studentPagesList.account

export default {
  created() {
    this.fields = this.$store.getters.getById(PAGE_ID)
  },
  data() {
    return {
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
  components: {
    PropertyItem
  }
}
</script>