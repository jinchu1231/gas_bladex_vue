export const optionParent = {
  height: 'auto',
  calcHeight: 365,
  tip: false,
  tree: true,
  border: true,
  index: true,
  selection: true,
  viewBtn: true,
  searchShow: false,
  menuWidth: 150,
  dialogWidth: 880,
  dialogHeight: 320,
  column: [
    {
      label: "字典编号",
      prop: "code",
      search: true,
      span: 24,
      rules: [
        {
          required: true,
          message: "请输入字典编号",
          trigger: "blur"
        }
      ]
    },
    {
      label: "字典名称",
      prop: "dictValue",
      search: true,
      align: "center",
      rules: [
        {
          required: true,
          message: "请输入字典名称",
          trigger: "blur"
        }
      ]
    },
    {
      label: "字典排序",
      prop: "sort",
      type: "number",
      align: "right",
      width: 80,
      hide: true,
      rules: [
        {
          required: true,
          message: "请输入字典排序",
          trigger: "blur"
        }
      ]
    },
    {
      label: "是否封存",
      prop: "isSealed",
      type: "select",
      align: "center",
      width: 80,
      dicData: [
        {
          label: "否",
          value: 0
        },
        {
          label: "是",
          value: 1
        }
      ],
      valueDefault: 0,
      slot: true,
      rules: [
        {
          required: true,
          message: "请选择是否封存",
          trigger: "blur"
        }
      ]
    },
    {
      label: "字典备注",
      prop: "remark",
      hide: true
    }
  ]
};

export const optionChild = {
  height: 'auto',
  calcHeight: 365,
  tip: false,
  tree: true,
  border: true,
  index: true,
  selection: true,
  viewBtn: true,
  searchShow: false,
  menuWidth: 150,
  dialogWidth: 880,
  dialogHeight: 320,
  column: [
    {
      label: "字典编号",
      prop: "code",
      addDisabled: true,
      editDisabled: true,
      search: true,
      span: 24,
      rules: [
        {
          required: true,
          message: "请输入字典编号",
          trigger: "blur"
        }
      ]
    },
    {
      label: "字典名称",
      prop: "dictValue",
      search: true,
      align: "center",
      rules: [
        {
          required: true,
          message: "请输入字典名称",
          trigger: "blur"
        }
      ]
    },
    {
      label: "上级字典",
      prop: "parentId",
      type: "tree",
      dicData: [],
      hide: true,
      props: {
        label: "title"
      },
      addDisabled: true,
      editDisabled: true,
      rules: [
        {
          required: false,
          message: "请选择上级字典",
          trigger: "click"
        }
      ]
    },
    {
      label: "字典键值",
      prop: "dictKey",
      width: 80,
      rules: [
        {
          required: true,
          message: "请输入字典键值",
          trigger: "blur"
        }
      ]
    },
    {
      label: "字典排序",
      prop: "sort",
      type: "number",
      align: "right",
      width: 80,
      rules: [
        {
          required: true,
          message: "请输入字典排序",
          trigger: "blur"
        }
      ]
    },
    {
      label: "是否封存",
      prop: "isSealed",
      type: "select",
      align: "center",
      width: 80,
      dicData: [
        {
          label: "否",
          value: 0
        },
        {
          label: "是",
          value: 1
        }
      ],
      valueDefault: 0,
      slot: true,
      rules: [
        {
          required: true,
          message: "请选择是否封存",
          trigger: "blur"
        }
      ]
    },
    {
      label: "字典备注",
      prop: "remark",
      hide: true
    }
  ]
};
