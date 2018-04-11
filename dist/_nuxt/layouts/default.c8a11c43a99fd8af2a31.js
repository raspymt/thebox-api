webpackJsonp([11],{"/eYj":function(t,e,a){"use strict";var o=a("0RfW"),n=a("ezBE"),i=a("VU/8")(o.a,n.a,!1,null,null,null);i.options.__file="components/MainHeader.vue",e.a=i.exports},"0RfW":function(t,e,a){"use strict";var o=a("NYxO"),n=a("D4uH"),i=a("rXhX");e.a={components:{Icon:n.a},data:function(){return{bodyBgVariant:"dark",textModal:"",okTitle:"",cancelTitle:"",hideFooter:!1,restarting:!1}},computed:Object(o.mapGetters)(["isAuthenticated"]),methods:{hideModal:function(){this.$refs.powerModal.$off("hide"),this.$refs.powerModal.$off("ok"),this.$refs.powerModal.hide(),this.textModal="",this.okTitle="",this.cancelTitle="",this.bodyBgVariant="dark",this.restarting=!1,this.hideFooter=!1,this.$store.dispatch("statuses",a("7h6E").api)},shutdownModal:function(){var t=this;this.textModal=this.$i18n.t("system.power.modal.shutdowntext"),this.okTitle=this.$i18n.t("system.power.modal.shutdownok"),this.cancelTitle=this.$i18n.t("system.power.modal.shutdowncancel"),this.$refs.powerModal.show(),this.$refs.powerModal.$on("ok",function(e){e.preventDefault(),t.$refs.powerModal.$on("hide",function(t){t.preventDefault()}),t.bodyBgVariant="danger",t.hideFooter=!0,t.textModal=t.$i18n.t("system.power.modal.shutdownconfirmation"),t.$store.dispatch("poweroff"),Object(i.a)(t.$axios,t.hideModal)})},restartModal:function(){var t=this;this.textModal=this.$i18n.t("system.power.modal.restarttext"),this.okTitle=this.$i18n.t("system.power.modal.restartok"),this.cancelTitle=this.$i18n.t("system.power.modal.restartcancel"),this.$refs.powerModal.show(),this.$refs.powerModal.$on("ok",function(e){e.preventDefault(),t.$refs.powerModal.$on("hide",function(t){t.preventDefault()}),t.bodyBgVariant="warning",t.hideFooter=!0,t.textModal=t.$i18n.t("system.power.modal.restartconfirmation"),t.restarting=!0,t.$store.dispatch("reboot"),Object(i.a)(t.$axios,t.hideModal)})},path:function(t){return"en"===this.$i18n.locale?t:"/"+this.$i18n.locale+t},title:function(){return"The box"}}}},DLCH:function(t,e,a){"use strict";var o=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("main-header"),e("main",[e("b-container",{staticClass:"mb-4",attrs:{fluid:""}},[e("nuxt")],1)],1)],1)};o._withStripped=!0;var n={render:o,staticRenderFns:[]};e.a=n},EEA4:function(t,e,a){"use strict";var o=a("/eYj");e.a={components:{MainHeader:o.a}}},Ma2J:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("EEA4"),n=a("DLCH"),i=a("VU/8")(o.a,n.a,!1,null,null,null);i.options.__file="layouts/default.vue",e.default=i.exports},ezBE:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("header",[a("b-navbar",{attrs:{toggleable:"md",type:"dark",variant:"dark",fixed:"top"}},[a("b-navbar-toggle",{attrs:{target:"nav_collapse"}}),a("b-navbar-brand",{attrs:{to:t.path("/")}},[a("icon",{attrs:{name:"stop",scale:"1.2"}}),t._v("\n      The Box\n    ")],1),a("b-collapse",{attrs:{"is-nav":"",id:"nav_collapse"}},[t.isAuthenticated?a("b-navbar-nav",[a("b-nav-item",{attrs:{to:t.path("/applications"),exact:""}},[t._v(t._s(t.$t("links.applications")))]),a("b-nav-item",{attrs:{to:t.path("/wifi"),exact:""}},[t._v(t._s(t.$t("links.wifi")))]),a("b-nav-item",{attrs:{to:t.path("/medias"),exact:""}},[t._v(t._s(t.$t("links.medias")))])],1):t._e(),a("b-navbar-nav",{staticClass:"ml-auto"},[t.isAuthenticated?a("b-nav-item-dropdown",{attrs:{text:"User",right:"","no-caret":""}},[a("template",{slot:"button-content"},[a("icon",{attrs:{name:"user",scale:"1.5"}})],1),a("b-dropdown-item",{attrs:{to:t.path("/user-settings"),exact:""}},[t._v(t._s(t.$t("links.profile")))]),a("b-dropdown-item",{attrs:{to:t.path("/logout"),exact:""}},[t._v(t._s(t.$t("links.logout")))])],2):t._e(),a("b-nav-item-dropdown",{attrs:{text:"Lang",right:"","no-caret":""}},[a("template",{slot:"button-content"},[a("icon",{attrs:{name:"globe",scale:"1.5"}})],1),"en"!==t.$i18n.locale?a("b-dropdown-item",{attrs:{to:t.$route.fullPath.replace(/^\/[^\/]+/,""),exact:""}},[t._v("\n            EN\n          ")]):t._e(),"fr"!==t.$i18n.locale?a("b-dropdown-item",{attrs:{to:"/fr"+t.$route.fullPath,exact:""}},[t._v("\n            FR\n          ")]):t._e()],2),t.isAuthenticated?a("b-nav-item-dropdown",{attrs:{text:"Power",right:"","no-caret":""}},[a("template",{slot:"button-content"},[a("icon",{attrs:{name:"power-off",scale:"1.5"}})],1),a("b-dropdown-item",{on:{click:function(e){t.shutdownModal()}}},[t._v(t._s(t.$t("links.shutdown")))]),a("b-dropdown-item",{on:{click:function(e){t.restartModal()}}},[t._v(t._s(t.$t("links.restart")))])],2):t._e()],1)],1)],1),a("b-modal",{ref:"powerModal",attrs:{centered:"","ok-title":t.okTitle,"cancel-title":t.cancelTitle,"hide-header":"","hide-footer":t.hideFooter,"body-bg-variant":t.bodyBgVariant,"body-text-variant":"white","footer-bg-variant":"dark","ok-variant":"light","cancel-variant":"danger"}},[a("p",{staticClass:"text-center"},[t.restarting?a("icon",{attrs:{name:"sync",pulse:"",scale:"3"}}):t._e()],1),a("p",{staticClass:"text-center"},[t._v(t._s(t.textModal))])])],1)};o._withStripped=!0;var n={render:o,staticRenderFns:[]};e.a=n},rXhX:function(t,e,a){"use strict";e.a=function t(e,a){setTimeout(function(){e.get("online").then(function(t){a()}).catch(function(o){console.log(o),t(e,a)})},5e3)}}});