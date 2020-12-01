<template>
  <basic-container>
    <avue-crud v-bind="bindVal"
               v-on="onEvent"
               v-model="form"
               :page.sync="page">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   v-if="permission.param_delete"
                   plain
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>

export default window.$crudCommon({
  data() {
    return {}
  },
  methods: {}
}, {
  //模块路径
  name: 'system/param',
})
</script>

<style>
</style>
