webpackJsonp([10,12],{"/TYz":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Zy+k"),s=n("VU/8")(i.a,null,!1,null,null,null);s.options.__file="pages/index.vue",e.default=s.exports},"/ndC":function(t,e,n){"use strict";var i=function(){var t=this.$createElement;return(this._self._c||t)("h2",{staticClass:"text-white pt-5 mt-5 mb-3"},[this._v(this._s(this.title))])};i._withStripped=!0;var s={render:i,staticRenderFns:[]};e.a=s},Ax89:function(t,e,n){"use strict";var i=n("fVOj");e.a={middleware:"authenticated",components:{PageHeader:i.a},head:function(){return{title:this.$t("index.title")}},mounted:function(){this.$store.commit("SET_PAGE","index")}}},BnOl:function(t,e,n){"use strict";var i=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("page-header"),e("p",[this._v("\n    Hello "+this._s(this.$store.getters.getUsername)+"\n  ")]),e("p",[this._v("\n    "+this._s(this.$t("index.content.description"))+"\n  ")])],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[]};e.a=s},BwE6:function(t,e,n){"use strict";e.a={computed:{title:function(){return this.$t(this.$store.state.page+".title")}}}},VRz5:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Ax89"),s=n("BnOl"),r=n("VU/8")(i.a,s.a,!1,null,null,null);r.options.__file="pages/_lang/index.vue",e.default=r.exports},"Zy+k":function(t,e,n){"use strict";var i=n("VRz5");e.a=i.default},fVOj:function(t,e,n){"use strict";var i=n("BwE6"),s=n("/ndC"),r=n("VU/8")(i.a,s.a,!1,null,null,null);r.options.__file="components/PageHeader.vue",e.a=r.exports}});