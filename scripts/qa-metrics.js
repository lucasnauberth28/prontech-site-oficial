// Preview-only measurement. This file is injected by the local server, never by the production pages.
(() => {
  let lcp=0,cls=0;
  const output=document.createElement('script');
  output.id='qa-metrics';output.type='application/json';document.body.append(output);
  const update=()=>{
    const n=performance.getEntriesByType('navigation')[0];
    const resources=performance.getEntriesByType('resource');
    output.textContent=JSON.stringify({
      viewport:innerWidth,network:new URL(location.href).searchParams.get('network')||'local',
      navigation:{responseMs:Math.round(n.responseStart),domMs:Math.round(n.domContentLoadedEventEnd),loadMs:Math.round(n.loadEventEnd)},
      paints:performance.getEntriesByType('paint').map(e=>({name:e.name,ms:Math.round(e.startTime)})),
      lcpMs:Math.round(lcp),cls:Number(cls.toFixed(4)),
      transferredBytes:n.transferSize+resources.reduce((s,r)=>s+r.transferSize,0),
      resourceCount:resources.length,
      resources:resources.map(r=>({url:r.name,bytes:r.transferSize,durationMs:Math.round(r.duration)}))
    });
  };
  new PerformanceObserver(list=>{for(const entry of list.getEntries())lcp=entry.startTime;update()}).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)cls+=entry.value;update()}).observe({type:'layout-shift',buffered:true});
  new PerformanceObserver(update).observe({type:'resource',buffered:true});
  addEventListener('load',()=>setTimeout(update,500),{once:true});
})();
