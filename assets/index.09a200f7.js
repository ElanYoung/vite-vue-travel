import{S as r,P as o}from"./swiper.4e9cfd53.js";import{n as s}from"./index.97db1f43.js";import{g as _}from"./request.ac743b1f.js";r.use([o]);const c={name:"ImageGallery",props:{images:{type:Array,default:()=>[]}},data(){return{}},mounted(){this.initSwiper()},methods:{initSwiper(){this.swiper=new r(".swiper-container",{pagination:{el:".swiper-pagination",clickable:!0,type:"fraction"},autoplay:!1,loop:!1,observer:!0,observeParents:!0})},onClickGallery(){this.$emit("close")}}};var d=function(){var a=this,e=a._self._c;return e("div",{staticClass:"container",on:{click:a.onClickGallery}},[e("div",{staticClass:"image-gallery-wrapper"},[e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper"},a._l(a.images,function(n){return e("div",{key:n,staticClass:"swiper-slide"},[e("img",{staticClass:"swiper-image",attrs:{src:n}})])}),0),e("div",{staticClass:"swiper-pagination"})])])])},p=[],m=s(c,d,p,!1,null,"6ead4005",null,null);const i=m.exports;const u={name:"FadeAnimation",data(){return{}},methods:{}};var v=function(){var a=this,e=a._self._c;return e("transition",[a._t("default")],2)},f=[],h=s(u,v,f,!1,null,"3994939b",null,null);const l=h.exports;const g={name:"DetailBanner",components:{FadeAnimation:l,ImageGallery:i},props:{name:{type:String,default:""},banner:{type:String,default:""},images:{type:Array,default:()=>[]}},data(){return{showGallery:!1}},methods:{onShowGallery(){this.showGallery=!0},onCloseGallery(){this.showGallery=!1}}};var w=function(){var a=this,e=a._self._c;return e("div",{staticClass:"container"},[e("div",{staticClass:"banner-wrapper",on:{click:a.onShowGallery}},[e("img",{staticClass:"banner-wrapper__image",attrs:{src:a.banner}}),e("div",{staticClass:"banner-wrapper__info"},[e("div",{staticClass:"banner-wrapper__info__title"},[a._v(a._s(a.name))]),e("div",{staticClass:"banner-wrapper__info__number-wrapper"},[e("span",{staticClass:"iconfont iconpic"}),e("span",{staticClass:"banner-wrapper__info__number-wrapper__number"},[a._v(a._s(a.images.length))])])])]),e(l,[e(i,{directives:[{name:"show",rawName:"v-show",value:a.showGallery,expression:"showGallery"}],attrs:{images:a.images},on:{close:a.onCloseGallery}})],1)],1)},y=[],b=s(g,w,y,!1,null,"88eb10fe",null,null);const C=b.exports;const x={name:"DetailHeader",data(){return{showAbsolute:!0,opacityStyle:{opacity:0}}},mounted(){window.addEventListener("scroll",this.onScroll)},destroyed(){window.removeEventListener("scroll",this.onScroll)},methods:{onScroll(){const{scrollTop:t}=document.documentElement||document.body.scrollTop;this.showAbsolute=!(t>60),this.opacityStyle.opacity=t/140>1?1:t/140}}};var $=function(){var a=this,e=a._self._c;return e("div",{staticClass:"container"},[e("router-link",{directives:[{name:"show",rawName:"v-show",value:a.showAbsolute,expression:"showAbsolute"}],staticClass:"header-absolute",attrs:{to:"/"}},[e("div",{staticClass:"iconfont iconback header-absolute__back-icon"})]),e("div",{directives:[{name:"show",rawName:"v-show",value:!a.showAbsolute,expression:"!showAbsolute"}],staticClass:"header-fixed",style:a.opacityStyle},[e("router-link",{attrs:{to:"/"}},[e("div",{staticClass:"iconfont iconback header-fixed__back-icon"})]),e("span",[a._v("\u666F\u70B9\u8BE6\u60C5")])],1)],1)},S=[],G=s(x,$,S,!1,null,"4891d84b",null,null);const k=G.exports;const A={name:"Detail",components:{DetailBanner:C,DetailHeader:k},data(){return{sightName:"",bannerImage:"",galleryImages:[]}},mounted(){this.getDetailData()},methods:{getDetailData(){_("/detail",{id:this.$route.params.id}).then(t=>{if(t.code===0){const{sight_name:a,banner_image:e,gallery_images:n}=t.data;this.sightName=a,this.bannerImage=e,this.galleryImages=n}})}}};var D=function(){var a=this,e=a._self._c;return e("div",[e("detail-banner",{attrs:{name:a.sightName,banner:a.bannerImage,images:a.galleryImages}}),e("detail-header")],1)},I=[],F=s(A,D,I,!1,null,"b7615a67",null,null);const E=F.exports;export{E as default};