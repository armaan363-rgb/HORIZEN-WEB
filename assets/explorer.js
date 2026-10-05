(function(){
 var cats=["Config","Fun","Info","Leveling","Logging","Moderation","Music","Nsfw","Social","Utility"],P=new URLSearchParams(location.search),cur=cats.indexOf(P.get("c"))>-1?P.get("c"):"Config",lim=60,STEP=60;
 var grid=$("grid"),chips=$("chips"),q=$("q"),more=$("more"),rc=$("rc"),warn=$("warn"),empty=$("empty");
 if(P.get("q"))q.value=P.get("q");
 chips.innerHTML=cats.map(function(k){return'<button class="chip" type="button" data-c="'+k+'" data-n="'+C.filter(function(c){return c[1]==k}).length+'" aria-pressed="false">'+(k=="Nsfw"?"NSFW":k)+'</button>'}).join("");
 q.placeholder="Search all "+C.length+" commands";
 function items(){var v=q.value.toLowerCase().trim();return C.filter(function(c){return v?(c[0]+" "+c[1]+" "+c[2]).toLowerCase().indexOf(v)>-1:c[1]==cur})}
 function render(){var v=q.value.trim(),l=items(),s=l.slice(0,lim);
  chips.querySelectorAll(".chip").forEach(function(b){b.setAttribute("aria-pressed",!v&&b.dataset.c==cur)});
  grid.innerHTML=s.map(function(c){return'<article class="cd"><div class="r"><span class="nm">'+esc(c[0])+'</span><span class="tag">'+esc(c[1])+'</span></div><p class="ds">'+esc(c[2])+'</p><div class="us"><code>'+esc(c[3])+'</code><button class="cp" type="button" data-t="'+esc(c[3])+'">Copy</button></div></article>'}).join("");
  rc.innerHTML='<span>'+(v?'Results for &ldquo;'+esc(v)+'&rdquo;':(cur=="Nsfw"?"NSFW":cur))+'</span><span>'+Math.min(lim,l.length)+' of '+l.length+' commands</span>';
  more.hidden=l.length<=lim;empty.hidden=l.length>0;warn.hidden=!(cur=="Nsfw"&&!v)}
 chips.addEventListener("click",function(e){var b=e.target.closest(".chip");if(!b)return;cur=b.dataset.c;q.value="";lim=STEP;render()});
 q.addEventListener("input",function(){lim=STEP;render()});
 $("moreb").addEventListener("click",function(){lim+=STEP;render()});
 grid.addEventListener("click",function(e){var b=e.target.closest(".cp");if(!b)return;cpy(b.dataset.t,function(){b.textContent="Copied";setTimeout(function(){b.textContent="Copy"},1200)})});
 document.addEventListener("keydown",function(e){if(e.key=="/"&&document.activeElement!=q){e.preventDefault();q.focus()}});
 render();
})();
