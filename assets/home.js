(function(){
 if('scrollRestoration' in history)history.scrollRestoration='manual';if(!location.hash)scrollTo(0,0);
 var cats=["Config","Fun","Info","Leveling","Logging","Moderation","Music","Nsfw","Social","Utility"];
 $("cur").textContent=CURRENCY;$("cc2").textContent=C.length;$("s").textContent=STATS.servers;$("u").textContent=STATS.users;$("cc").textContent=C.length;
 /* count-up */
 if(!matchMedia("(prefers-reduced-motion:reduce)").matches)["s","u","cc"].forEach(function(id){var el=$(id),t=el.textContent,x=t.match(/([\d,.]+)(.*)/);if(!x)return;var n=parseFloat(x[1].replace(/,/g,"")),c=x[1].indexOf(",")>-1,t0=performance.now()+500;(function f(now){var k=Math.max(0,Math.min(1,(now-t0)/1500)),v=n*(1-Math.pow(1-k,3));el.textContent=(c?Math.round(v).toLocaleString("en-US"):Math.round(v))+x[2];if(k<1)requestAnimationFrame(f)})(performance.now())});
 /* terminal demo, uses real command data */
 var PK=["antinuke","ban","mplay","setup","automod","purge","lock","ticket","mfilter","verify","warn","leaderboard"],ty=$("ty"),tr=$("tr"),pi=0;
 function show(c){$("tn").textContent="&"+c[0];$("tt").textContent=c[1];$("td").textContent=c[2];tr.classList.add("on")}
 function pick(n){return C.filter(function(c){return c[0]==n})[0]||C[0]}
 function run(){var c=pick(PK[pi++%PK.length]),s="&"+c[0],i=0;tr.classList.remove("on");
  (function t(){if(document.hidden)return setTimeout(t,600);ty.textContent=s.slice(0,++i);if(i<s.length)return setTimeout(t,75);show(c);
   setTimeout(function(){(function d(){if(document.hidden)return setTimeout(d,600);ty.textContent=s.slice(0,--i);if(i>0)return setTimeout(d,30);run()})()},2800)})()}
 if(matchMedia("(prefers-reduced-motion:reduce)").matches){var c0=pick("antinuke");ty.textContent="&"+c0[0];show(c0)}else setTimeout(run,1400);
 /* category pills */
 $("catp").innerHTML=cats.map(function(k){var n=C.filter(function(c){return c[1]==k}).length;return'<a href="commands/index.html?c='+k+'">'+(k=="Nsfw"?"NSFW":k)+' <small>'+n+'</small></a>'}).join("");
 /* spotlight */
 document.addEventListener("pointermove",function(e){var t=e.target.closest&&e.target.closest(".bc");if(t){var r=t.getBoundingClientRect();t.style.setProperty("--mx",e.clientX-r.left+"px");t.style.setProperty("--my",e.clientY-r.top+"px")}},{passive:true});
 /* marquee + eq */
 var w=["ANTINUKE","MODERATION","MUSIC","LEVELING","AUTOMOD","LOGGING","TICKETS","VERIFY",C.length+" COMMANDS"],m=w.map(function(x){return"<span>"+x+"</span><span>&#10022;</span>"}).join("");$("mqi").innerHTML=m+m;
 var eq="";for(var i=0;i<22;i++)eq+='<i style="--i:'+i+'"></i>';$("eq").innerHTML=eq;
 /* premium */
 var sel=null;
 $("plans").innerHTML=PLANS.map(function(p){return'<div class="pl gl bl'+(p.pop?' pop':'')+'">'+(p.pop?'<span class="badge">Best value</span>':'')+'<h3>'+p.name+'</h3><div class="price">'+(p.price==null?'Custom':CURRENCY+p.price)+(p.price!=null?' <small>/ '+p.days+'d</small>':'')+'</div><div class="per">'+(p.price!=null?CURRENCY+(p.price/p.days).toFixed(1)+' per day':'One-time, never expires')+'</div><button class="btn'+(p.pop?'':' g')+'" data-plan="'+p.id+'" type="button">'+(p.price==null?'Ask for price':'Buy now')+'</button></div>'}).join("");
 $("pf").innerHTML=FEATS.map(function(f){return"<span>"+f+"</span>"}).join("");
 $("plans").addEventListener("click",function(e){var b=e.target.closest("[data-plan]");if(!b)return;sel=PLANS.filter(function(p){return p.id==b.dataset.plan})[0];var o=$("order");o.hidden=false;$("sum").innerHTML='Plan: <b>'+sel.name+'</b> &middot; Price: <b>'+(sel.price==null?'to be confirmed':CURRENCY+sel.price)+'</b>';$("msg").hidden=true;o.scrollIntoView({behavior:"smooth",block:"center"})});
 $("o-go").addEventListener("click",function(){var u=$("o-user").value.trim(),g=$("o-guild").value.trim(),m=$("msg");m.hidden=false;
  if(!sel||!u||!g){m.style.color="#ff8a8a";m.textContent="Enter your Discord username/ID and the server ID.";return}
  var t="Horizen Premium order\nPlan: "+sel.name+"\nPrice: "+(sel.price==null?"ask":CURRENCY+sel.price)+"\nUser: "+u+"\nServer ID: "+g;
  cpy(t,function(){m.style.color="#6ee7a0";m.textContent="Order details copied. Send them to the Horizen team to complete payment."});
  if(ORDER_URL!="#")window.open(ORDER_URL,"_blank","noopener")});
})();
