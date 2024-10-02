const NUM_WORKERS=Math.round(.5*navigator.hardwareConcurrency)||2;(()=>{const e=(()=>{let e=0;return()=>e++})();const n=new Map;const r=Array.from({length:NUM_WORKERS},(()=>new Worker("worker.js")));let t=0;r.forEach((e=>{e.onmessage=({data:e})=>{"ready"===e.type&&++t==NUM_WORKERS&&console.log("Engine is Ready"),"done"===e.type&&function({result:e,search_id:r}){const t=n.get(r);e&&t.resolveSearch(e),++t.numWorkersDone==t.numWorkersInvolved&&(n.delete(r),t.resolveSearch(null))}(e)},e.onerror=()=>{}})),globalThis.search=function(o,{min_step:s=null,max_step:a=null}={}){if(!isEngineReady())throw new Error(`engine isn't ready yet (num workers loaded: ${t} / ${NUM_WORKERS})`);const l=function(e,n,r){const t=Math.floor(304804/(r-1));if((!n||n>t)&&(n=t),e||(e=1),e>n)return[];if(n-e<1e3)return[{min_step:e,max_step:n}];const o=[],s=(n+1-e)/NUM_WORKERS;let a=e;for(let e=1;e<=NUM_WORKERS;++e){let r=Math.round(a),t=Math.round(a+=s)-1;e==NUM_WORKERS&&(t=n),o.push({min_step:r,max_step:t})}return o}(+s,+a,o.length);if(0===l.length)return console.warn("no steps to check"),Promise.resolve(null);const i=e(),c=new Promise((e=>{n.set(i,{numWorkersInvolved:l.length,numWorkersDone:0,resolveSearch:e})}));for(let e=0;e<l.length;++e){const{min_step:n,max_step:t}=l[e];r[e].postMessage({search_id:i,pattern:o,min_step:n,max_step:t})}return c},globalThis.isEngineReady=()=>t==NUM_WORKERS})();