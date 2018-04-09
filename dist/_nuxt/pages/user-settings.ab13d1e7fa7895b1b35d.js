webpackJsonp([6,8],{"/ndC":function(s,e,t){"use strict";var r=function(){var s=this.$createElement;return(this._self._c||s)("h2",{staticClass:"text-white pt-5 mt-5 mb-3"},[this._v(this._s(this.title))])};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},"5Jv2":function(s,e,t){"use strict";var r=t("p8vp"),a=t("xPgl"),n=t("VU/8")(r.a,a.a,!1,null,null,null);n.options.__file="components/user/Credentials.vue",e.a=n.exports},"6TIL":function(s,e,t){"use strict";var r=t("lVf9");e.a=r.default},BwE6:function(s,e,t){"use strict";e.a={computed:{title:function(){return this.$t(this.$store.state.page+".title")}}}},Q0kk:function(s,e,t){"use strict";var r=function(){var s=this.$createElement,e=this._self._c||s;return e("div",[e("page-header"),e("b-row",[e("b-col",{staticClass:"pt-3",attrs:{xl:"4",lg:"6",md:"6",sm:"12"}},[e("credentials",{staticClass:"h-100"})],1)],1)],1)};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},azPJ:function(s,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t("6TIL"),a=t("VU/8")(r.a,null,!1,null,null,null);a.options.__file="pages/user-settings.vue",e.default=a.exports},fVOj:function(s,e,t){"use strict";var r=t("BwE6"),a=t("/ndC"),n=t("VU/8")(r.a,a.a,!1,null,null,null);n.options.__file="components/PageHeader.vue",e.a=n.exports},lVf9:function(s,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t("pYb+"),a=t("Q0kk"),n=t("VU/8")(r.a,a.a,!1,null,null,null);n.options.__file="pages/_lang/user-settings.vue",e.default=n.exports},p8vp:function(s,e,t){"use strict";var r=t("IoX+"),a=t.n(r),n=t("OfXs"),i=t.n(n),o=t("D4uH");e.a={data:function(){return{formError:null,formSuccess:null,formUsername:"",formPassword:"",formRepeatPassword:"",errorDismissSecs:5,errorDismissCountDown:0,successDismissSecs:5,successDismissCountDown:0,busy:!1}},components:{Icon:o.a},computed:{usernameFeedback:function(){return this.formUsername.length>0?this.$t("user.credentials.username.feedback.not_empty"):""},usernameState:function(){return 0===this.formUsername.length?null:this.formUsername.length>3?"valid":"invalid"},passwordFeedback:function(){return this.formPassword.length>0?this.$t("user.credentials.password.feedback.not_empty"):""},passwordState:function(){return 0===this.formPassword.length?null:this.formPassword.length>6?"valid":"invalid"},repeatPasswordFeedback:function(){if(0!==this.formRepeatPassword.length&&this.formRepeatPassword!==this.formPassword)return this.$t("user.credentials.password.feedback.password_no_match")},repeatPasswordState:function(){return this.formRepeatPassword===this.formPassword?this.passwordState:"invalid"},disabledSubmit:function(){return!("valid"===this.usernameState&&"valid"===this.passwordState&&"valid"===this.repeatPasswordState)}},mounted:function(){this.formUsername=this.$store.getters.getUsername},methods:{errorCountDownChanged:function(s){this.errorDismissCountDown=s},successCountDownChanged:function(s){this.successDismissCountDown=s},errorShowAlert:function(){this.errorDismissCountDown=this.errorDismissSecs},successShowAlert:function(){this.successDismissCountDown=this.successDismissSecs},updateUser:function(){var s=i()(a.a.mark(function s(){var e;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,this.busy=!0,s.next=4,this.$store.dispatch("updateUser",{id:this.$store.state.user.id,username:this.formUsername,password:this.formPassword});case 4:e=s.sent,this.formUsername="",this.formPassword="",this.formRepeatPassword="",this.formError=null,!0===e.success?(this.formSuccess=this.$i18n.t("user.credentials.success"),this.successShowAlert()):this.formError=e.message,this.busy=!1,s.next=18;break;case 13:s.prev=13,s.t0=s.catch(0),this.busy=!1,this.formError=s.t0.message,this.errorShowAlert();case 18:case"end":return s.stop()}},s,this,[[0,13]])}));return function(){return s.apply(this,arguments)}}()}}},"pYb+":function(s,e,t){"use strict";var r=t("fVOj"),a=t("5Jv2");e.a={middleware:"authenticated",components:{PageHeader:r.a,Credentials:a.a},head:function(){return{title:this.$t("user.title")}},mounted:function(){this.$store.commit("SET_PAGE","user")}}},xPgl:function(s,e,t){"use strict";var r=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("b-card",{attrs:{"no-body":"","bg-variant":"dark","text-variant":"white"}},[t("b-card-header",{staticClass:"clearfix"},[t("h4",{staticClass:"float-left mb-0 mt-2"},[s._v(s._s(s.$t("user.credentials.title")))]),s.busy?t("icon",{staticClass:"switch-icon",attrs:{name:"sync",pulse:""}}):s._e()],1),t("b-card-body",[t("div",{staticClass:"small",domProps:{innerHTML:s._s(s.$t("user.credentials.description"))}}),t("b-form",{on:{submit:function(e){return e.preventDefault(),s.updateUser(e)}}},[t("transition",{attrs:{name:"slide"}},[t("b-alert",{attrs:{variant:"warning",dismissible:"",show:s.errorDismissCountDown},on:{dismissed:function(e){s.errorDismissCountdown=0},"dismiss-count-down":s.errorCountDownChanged}},[s._v("\n          "+s._s(s.formError)+"\n        ")])],1),t("transition",{attrs:{name:"slide"}},[t("b-alert",{attrs:{variant:"success",dismissible:"",show:s.successDismissCountDown},on:{dismissed:function(e){s.successDismissCountdown=0},"dismiss-count-down":s.successCountDownChanged}},[s._v("\n          "+s._s(s.formSuccess)+"\n        ")])],1),t("b-form-group",{attrs:{id:"usernameGroup",label:s.$t("user.credentials.username.title"),"label-for":"username",feedback:s.usernameFeedback,state:s.usernameState,description:s.$t("user.credentials.username.description")}},[t("b-form-input",{attrs:{id:"username",type:"text",state:s.usernameState,required:""},model:{value:s.formUsername,callback:function(e){s.formUsername=e},expression:"formUsername"}})],1),t("b-form-group",{attrs:{id:"passwordGroup",label:s.$t("user.credentials.password.title"),"label-for":"password",feedback:s.passwordFeedback,state:s.passwordState,description:s.$t("user.credentials.password.description")}},[t("b-form-input",{attrs:{id:"password",type:"password",state:s.passwordState,required:""},model:{value:s.formPassword,callback:function(e){s.formPassword="string"==typeof e?e.trim():e},expression:"formPassword"}})],1),t("b-form-group",{attrs:{id:"repeatPasswordGroup",label:s.$t("user.credentials.password.repeat"),"label-for":"repeatPassword",feedback:s.repeatPasswordFeedback,state:s.repeatPasswordState}},[t("b-form-input",{staticClass:"mt-2",attrs:{id:"repeatPassword",type:"password",state:s.repeatPasswordState,required:""},model:{value:s.formRepeatPassword,callback:function(e){s.formRepeatPassword="string"==typeof e?e.trim():e},expression:"formRepeatPassword"}})],1),t("b-button",{attrs:{type:"submit",variant:"light",disabled:s.disabledSubmit}},[s._v(s._s(s.$t("user.credentials.submit")))])],1)],1)],1)};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a}});