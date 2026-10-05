var $=function(i){return document.getElementById(i)};
function esc(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
document.querySelectorAll("[data-invite]").forEach(function(a){a.href=INVITE;if(INVITE!="#"){a.target="_blank";a.rel="noopener"}});
var nav=$("nav"),bur=$("bur");
bur.addEventListener("click",function(){var o=nav.classList.toggle("open");bur.setAttribute("aria-expanded",o)});
nav.addEventListener("click",function(e){if(e.target.closest(".nl a"))nav.classList.remove("open")});
var tt,ts=$("toast");
function cpy(t,cb){function done(){if(cb)cb();ts.innerHTML="Copied <b>"+esc(t)+"</b>";ts.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){ts.classList.remove("on")},1500)}
 function fb(){var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{document.execCommand("copy")}catch(x){}a.remove();done()}
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,fb)}else fb()}
(function(){var pg=$("prog"),tp=$("top"),k=0;addEventListener("scroll",function(){if(k)return;k=1;requestAnimationFrame(function(){k=0;var m=document.documentElement.scrollHeight-innerHeight;pg.style.transform="scaleX("+(m>0?Math.min(1,scrollY/m):0)+")";tp.classList.toggle("on",scrollY>700)})},{passive:true});tp.onclick=function(){scrollTo({top:0})};
 var c=document.querySelector(".cur"),x=0,y=0,q=0;addEventListener("pointermove",function(e){if(e.pointerType!="mouse")return;x=e.clientX;y=e.clientY;c.style.opacity=1;if(!q){q=1;requestAnimationFrame(function(){q=0;c.style.transform="translate3d("+x+"px,"+y+"px,0)"})}},{passive:true});
 if("IntersectionObserver" in window){var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.1});document.querySelectorAll(".rvt").forEach(function(el){el.classList.add("rv");io.observe(el)})}})();
