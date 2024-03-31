<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
    <el-form-item v-if="tenantMode" prop="tenantId">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.tenantId"
                auto-complete="off"
                :placeholder="$t('login.tenantId')">
        <i slot="prefix" class="icon-quanxian"/>
      </el-input>
    </el-form-item>
    <el-form-item prop="username">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.username"
                auto-complete="off"
                :placeholder="$t('login.username')">
        <i slot="prefix" class="icon-yonghu"/>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                :type="passwordType"
                v-model="loginForm.password"
                auto-complete="off"
                :placeholder="$t('login.password')">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"/>
        <i slot="prefix" class="icon-mima"/>
      </el-input>
    </el-form-item>
    <el-form-item v-if="this.website.captchaMode" prop="code">
      <el-row :span="24">
        <el-col :span="16">
          <el-input size="small"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.code"
                    auto-complete="off"
                    :placeholder="$t('login.code')">
            <i slot="prefix" class="icon-yanzhengma"/>
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <img :src="loginForm.image" class="login-code-img" @click="refreshCode"
            />
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 size="small"
                 @click.native.prevent="handleLogin"
                 class="login-submit">{{$t('login.submit')}}
      </el-button>
      <el-button type="danger"
                 size="small"
                 @click.native.prevent="handleRegister"
                 class="register-submit">{{ $t('login.register') }}
      </el-button>
    </el-form-item>
    <el-dialog title="用户信息选择"
               append-to-body
               :visible.sync="userBox"
               width="350px">
      <avue-form :option="userOption" v-model="userForm" @submit="submitLogin"/>
    </el-dialog>
    <el-dialog title="用户信息注册" append-to-body v-model="registerBox" width="350px">
      <avue-form :option="registerOption" v-model="registerForm" @submit="submitRegister" />
    </el-dialog>
  </el-form>
</template>

<script>
  import {mapGetters} from "vuex";
  import {info} from "@/api/system/tenant";
  import {getCaptcha} from "@/api/user";
  import {getTopUrl} from "@/util/util";

  export default {
    name: "userlogin",
    data() {
      return {
        tenantMode: this.website.tenantMode,
        loginForm: {
          //租户ID
          tenantId: "000000",
          //部门ID
          deptId: "",
          //角色ID
          roleId: "",
          //用户名
          username: "admin",
          //密码
          password: "admin",
          //账号类型
          type: "account",
          //验证码的值
          code: "",
          //验证码的索引
          key: "",
          //预加载白色背景
          image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        },
        loginRules: {
          tenantId: [
            {required: false, message: "请输入租户ID", trigger: "blur"}
          ],
          username: [
            {required: true, message: "请输入用户名", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"},
            {min: 1, message: "密码长度最少为6位", trigger: "blur"}
          ]
        },
        passwordType: "password",
        userBox: false,
        userForm: {
          deptId: '',
          roleId: ''
        },
        userOption: {
          labelWidth: 70,
          submitBtn: true,
          emptyBtn: false,
          submitText: '登录',
          column: [
            {
              label: '部门',
              prop: 'deptId',
              type: 'select',
              props: {
                label: 'deptName',
                value: 'id'
              },
              dicUrl: '/api/blade-system/dept/select',
              span: 24,
              display: false,
              rules: [{
                required: true,
                message: "请选择部门",
                trigger: "blur"
              }],
            },
            {
              label: '角色',
              prop: 'roleId',
              type: 'select',
              props: {
                label: 'roleName',
                value: 'id'
              },
              dicUrl: '/api/blade-system/role/select',
              span: 24,
              display: false,
              rules: [{
                required: true,
                message: "请选择角色",
                trigger: "blur"
              }],
            },
          ]
        },
        registerBox: false,
        registerForm: {},
        registerOption: {
          labelWidth: 90,
          submitBtn: true,
          emptyBtn: false,
          submitText: '注册',
          column: [
            {
              label: '租户编号',
              prop: 'tenantId',
              span: 24,
              rules: [
                {
                  required: true,
                  message: '请填写租户编号',
                  trigger: 'blur',
                },
              ],
            },
            {
              label: '用户姓名',
              prop: 'name',
              span: 24,
              rules: [
                {
                  required: true,
                  message: '请输入用户姓名',
                  trigger: 'blur',
                },
              ],
            },
            {
              label: '用户账号',
              prop: 'account',
              span: 24,
              rules: [
                {
                  required: true,
                  message: '请填写用户账号',
                  trigger: 'blur',
                },
              ],
            },
            {
              label: '手机',
              prop: 'phone',
              span: 24,
            },
            {
              label: '邮箱',
              prop: 'email',
              span: 24,
            },
            {
              label: '密码',
              prop: 'password',
              span: 24,
              rules: [
                {
                  required: true,
                  message: '请填写密码',
                  trigger: 'blur',
                },
              ],
            },
            {
              label: '确认密码',
              prop: 'password2',
              span: 24,
              rules: [
                {
                  required: true,
                  message: '请填写确认密码',
                  trigger: 'blur',
                },
              ],
            },
          ],
        },
      };
    },
    created() {
      this.getTenant();
      this.refreshCode();
    },
    mounted() {
      this.$nextTick(() => {});
    },
    watch: {
      'loginForm.deptId'() {
        const column = this.findObject(this.userOption.column, "deptId");
        if (this.loginForm.deptId.includes(",")) {
          column.dicUrl = `/api/blade-system/dept/select?deptId=${this.loginForm.deptId}`;
          column.display = true;
        } else {
          column.dicUrl = '';
        }
      },
      'loginForm.roleId'() {
        const column = this.findObject(this.userOption.column, "roleId");
        if (this.loginForm.roleId.includes(",")) {
          column.dicUrl = `/api/blade-system/role/select?roleId=${this.loginForm.roleId}`;
          column.display = true;
        } else {
          column.dicUrl = '';
        }
      }
    },
    computed: {
      ...mapGetters(["tagWel", "userInfo"])
    },
    props: [],
    methods: {
      refreshCode() {
        if (this.website.captchaMode) {
          getCaptcha().then(res => {
            const data = res.data;
            this.loginForm.key = data.key;
            this.loginForm.image = data.image;
          })
        }
      },
      showPassword() {
        this.passwordType === ""
          ? (this.passwordType = "password")
          : (this.passwordType = "");
      },
      submitLogin (form, done) {
        if (form.deptId !== '') {
          this.loginForm.deptId = form.deptId;
        }
        if (form.roleId !== '') {
          this.loginForm.roleId = form.roleId;
        }
        this.handleLogin();
        done();
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '登录中,请稍后。。。',
              spinner: "el-icon-loading"
            });
            this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
              if (this.website.switchMode) {
                const deptId = this.userInfo.dept_id;
                const roleId = this.userInfo.role_id;
                if (deptId.includes(",") || roleId.includes(",")) {
                  this.loginForm.deptId = deptId;
                  this.loginForm.roleId = roleId;
                  this.userBox = true;
                  this.$store.dispatch("LogOut").then(() => {
                    loading.close();
                  });
                  return false;
                }
              }
              this.$router.push({path: this.tagWel.value});
              loading.close();
            }).catch(() => {
              loading.close();
              this.refreshCode();
            });
          }
        });
      },
      handleRegister() {
        this.registerBox = true;
      },
      submitRegister(form, done) {
        if (form.tenantId === '') {
          this.$message.warning('请先输入租户编号');
          done();
          return;
        }
        if (form.account === '') {
          this.$message.warning('请先输入账号名称');
          done();
          return;
        }
        if (form.password === '' || form.password2 === '') {
          this.$message.warning('请先输入密码');
          done();
          return;
        }
        if (form.password !== form.password2) {
          this.$message.warning('两次密码输入不一致');
          done();
          return;
        }

        const loading = this.$loading({
          lock: true,
          text: '注册中,请稍后',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        this.$store
          .dispatch('RegisterUser', form)
          .then(() => {
            this.$alert('注册成功，请耐心等待管理员审核后分配权限', '注册成功', {
              confirmButtonText: '确定',
              callback: () => {
                this.$router.push(this.tagWel);
              },
            });
            this.registerBox = false;
          })
          .catch(err => {
            console.log(err);
          });
        loading.close();
        done();
      },
      getTenant() {
        let domain = getTopUrl();
        // 临时指定域名，方便测试
        //domain = "https://bladex.cn";
        info(domain).then(res => {
          const data = res.data;
          if (data.success && data.data.tenantId) {
            this.tenantMode = false;
            this.loginForm.tenantId = data.data.tenantId;
            this.$parent.$refs.login.style.backgroundImage = `url(${data.data.backgroundUrl})`;
          }
        })
      }
    }
  };
</script>

<style>
</style>
