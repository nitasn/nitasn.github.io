importScripts("engine.js"),Module.onRuntimeInitialized=()=>{self.c_style__search=Module.cwrap("c_style__search","number",["string","number","number","number","number"]),postMessage({type:"ready"})},onmessage=({data:e})=>{const{search_id:s,pattern:r,min_step:t,max_step:n}=e,a=Module._malloc(8),l=c_style__search(r+"\0",+t,+n,a,a+4),[_,u]=new Int32Array(Module.HEAP32.buffer,a,2);Module._free(a),postMessage({type:"done",search_id:s,result:l?{index:_,step:u}:null})};