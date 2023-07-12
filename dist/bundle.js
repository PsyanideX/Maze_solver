(()=>{"use strict";var e={200:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.getNeighbours=r.getNode=r.clearGrid=r.removeWall=r.addWall=void 0;var a=t(757);function i(e,r){a.mazeProperties.grid[e][r]=-1}function o(e,r){a.mazeProperties.grid[e][r]=0}r.addWall=i,r.removeWall=o,r.clearGrid=function(){if(!a.mazeProperties.isGridClean){for(var e=0;e<a.mazeProperties.timeouts.length;e++)clearTimeout(a.mazeProperties.timeouts[e]);for(a.mazeProperties.timeouts=[],clearInterval(a.mazeProperties.myInterval),e=0;e<a.mazeProperties.grid.length;e++)for(var r=0;r<a.mazeProperties.grid[0].length;r++)a.mazeProperties.grid[e][r]>-1?o(e,r):a.mazeProperties.grid[e][r]<-1&&i(e,r);a.mazeProperties.isGridClean=!0}},r.getNode=function(e,r){return e>=0&&e<a.mazeProperties.grid.length&&r>=0&&r<a.mazeProperties.grid[0].length?a.mazeProperties.grid[e][r]:-2},r.getNeighbours=function(e,r){return[[e[0],e[1]-r],[e[0]+r,e[1]],[e[0],e[1]+r],[e[0]-r,e[1]]]}},178:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0});var a=t(689),i=t(757);function o(){i.mazeProperties.grid=new Array(i.gridSizeX).fill(0).map((function(){return new Array(i.gridSizeY).fill(0)})),i.mazeProperties.startPos=[1,i.gridSizeY-2],i.mazeProperties.targetPos=[i.gridSizeX-2,1]}window?window.onload=function(){o(),(0,a.maze_generators)()}:(o(),(0,a.maze_generators)())},689:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.maze_generators=void 0;var a=t(200),i=t(153),o=t(757);function s(){o.mazeProperties.grid[o.mazeProperties.startPos[1]][o.mazeProperties.startPos[0]]=2,console.log(o.mazeProperties.grid),console.log(o.mazeProperties.startPos),console.log(o.mazeProperties.targetPos),setTimeout((function(){(0,i.maze_solvers)()}),1e3)}function n(e,r){return e=Math.ceil(e),r=Math.floor(r),Math.floor(Math.random()*(r-e))+e}function g(){for(var e=0;e<o.mazeProperties.grid.length;e++)for(var r=0;r<o.mazeProperties.grid[0].length;r++)(0,a.addWall)(e,r)}r.maze_generators=function(){switch(o.mazeProperties.generating=!0,o.mazeProperties.isGridClean=!1,console.info("Starting maze generation"),o.selectedGenAlgorithm){case 1:!function(){g();var e=[1,1];(0,a.removeWall)(e[0],e[1]),o.mazeProperties.grid[e[0]][e[1]]=1;var r=[e];o.mazeProperties.myInterval=window.setInterval((function(){if(0==r.length)return clearInterval(o.mazeProperties.myInterval),(0,a.clearGrid)(),void(o.mazeProperties.generating=!1);e=r.pop();for(var t=[],i=(0,a.getNeighbours)(e,2),s=0;s<i.length;s++)-1!=(0,a.getNode)(i[s][0],i[s][1])&&0!=(0,a.getNode)(i[s][0],i[s][1])||t.push(i[s]);if(t.length>0){r.push(e);var g=t[n(0,t.length)];(0,a.removeWall)((e[0]+g[0])/2,(e[1]+g[1])/2),(0,a.removeWall)(g[0],g[1]),o.mazeProperties.grid[g[0]][g[1]]=1,r.push(g)}else(0,a.removeWall)(e[0],e[1]),o.mazeProperties.grid[e[0]][e[1]]=2}),16)}();break;case 2:default:!function(){!function(){for(var e=0;e<o.mazeProperties.grid.length;e++)for(var r=0;r<o.mazeProperties.grid[0].length;r++)e%2!=0&&r%2!=0||(0,a.addWall)(e,r)}();for(var e=0,r=[],t=1;t<o.mazeProperties.grid.length-1;t++)for(var i=1;i<o.mazeProperties.grid[0].length-1;i++)t%2==1&&i%2==1&&(e++,o.mazeProperties.grid[t][i]=e),(t+i)%2==1&&r.push([t,i]);o.mazeProperties.myInterval=window.setInterval((function(){for(;;){if(1==e)return clearInterval(o.mazeProperties.myInterval),(0,a.clearGrid)(),o.mazeProperties.generating=!1,void s();var t,i=n(0,r.length),g=r[i];if(r.splice(i,1),(t=o.mazeProperties.grid[g[0]-1][g[1]]>-1?[o.mazeProperties.grid[g[0]-1][g[1]],o.mazeProperties.grid[g[0]+1][g[1]]]:[o.mazeProperties.grid[g[0]][g[1]-1],o.mazeProperties.grid[g[0]][g[1]+1]])[0]!=t[1]){for(var l=1;l<o.mazeProperties.grid.length-1;l+=2)for(var m=1;m<o.mazeProperties.grid[0].length-1;m+=2)o.mazeProperties.grid[l][m]==t[0]&&(o.mazeProperties.grid[l][m]=t[1]);return(0,a.removeWall)(g[0],g[1]),void e--}}}),29)}();break;case 3:!function(){g();var e=[1,1];(0,a.removeWall)(e[0],e[1]),o.mazeProperties.grid[e[0]][e[1]]=1;for(var r=[],t=(0,a.getNeighbours)(e,1),i=0;i<t.length;i++)t[i][0]>0&&t[i][0]<o.mazeProperties.grid.length-1&&t[i][1]>0&&t[i][1]<o.mazeProperties.grid[0].length-1&&r.push(t[i]);o.mazeProperties.myInterval=window.setInterval((function(){for(;;){if(0==r.length)return clearInterval(o.mazeProperties.myInterval),(0,a.clearGrid)(),o.mazeProperties.generating=!1,void s();var e=n(0,r.length),t=r[e];r.splice(e,1);var i;i=t[0]%2==0?[[t[0]-1,t[1]],[t[0]+1,t[1]]]:[[t[0],t[1]-1],[t[0],t[1]+1]];var g=void 0,l=!1;if(o.mazeProperties.grid[i[0][0]][i[0][1]]<1?(g=i[0],l=!0):o.mazeProperties.grid[i[1][0]][i[1][1]]<1&&(g=i[1],l=!0),l){(0,a.removeWall)(t[0],t[1]),(0,a.removeWall)(g[0],g[1]),o.mazeProperties.grid[g[0]][g[1]]=1;for(var m=(0,a.getNeighbours)(g,1),p=0;p<m.length;p++)m[p][0]>0&&m[p][0]<o.mazeProperties.grid.length-1&&m[p][1]>0&&m[p][1]<o.mazeProperties.grid[0].length-1&&r.push(m[p]);return}}}),28)}();break;case 4:!function(){g();for(var e=[],r=1;r<o.mazeProperties.grid.length-1;r+=2)for(var t=1;t<o.mazeProperties.grid[0].length-1;t+=2)e.push([r,t]);var i=e[0];e.splice(0,1),o.mazeProperties.grid[i[0]][i[1]]=10;var l=e[n(0,e.length)],m=!0,p=l,P=[];o.mazeProperties.myInterval=window.setInterval((function(){if(0==e.length)return clearInterval(o.mazeProperties.myInterval),(0,a.clearGrid)(),o.mazeProperties.generating=!1,void s();if(m)for(;;){var r=(0,a.getNeighbours)(l,2),t=void 0,i=void 0;do{i=r[t=n(0,r.length)]}while(-2==(0,a.getNode)(i[0],i[1]));if(o.mazeProperties.grid[l[0]][l[1]]=-(t+3),10==o.mazeProperties.grid[i[0]][i[1]])return m=!1,void(l=p);l=i}else if(10==o.mazeProperties.grid[l[0]][l[1]])l=e[n(0,e.length)],m=!0,p=l,P=[];else{t=-o.mazeProperties.grid[l[0]][l[1]]-3;var g=(0,a.getNeighbours)(l,2)[t],d=[(l[0]+g[0])/2,(l[1]+g[1])/2];P.push(l),P.push(d),(0,a.removeWall)(l[0],l[1]),(0,a.removeWall)(d[0],d[1]),o.mazeProperties.grid[l[0]][l[1]]=10;for(var z=0;z<e.length;z++)if(e[z][0]==l[0]&&e[z][1]==l[1]){e.splice(z,1);break}l=g}}),18)}();break;case 5:!function(){g();var e=(o.mazeProperties.grid.length-1)/2*((o.mazeProperties.grid[0].length-1)/2),r=[1,1];(0,a.removeWall)(r[0],r[1]),o.mazeProperties.grid[r[0]][r[1]]=1,e--,o.mazeProperties.myInterval=window.setInterval((function(){if(0==e)return clearInterval(o.mazeProperties.myInterval),(0,a.clearGrid)(),o.mazeProperties.generating=!1,void s();for(;;){for(var t=[],i=(0,a.getNeighbours)(r,2),g=0;g<i.length;g++)-2!=(0,a.getNode)(i[g][0],i[g][1])&&t.push(i[g]);var l=t[n(0,t.length)];if(1!=o.mazeProperties.grid[l[0]][l[1]]){var m=[(r[0]+l[0])/2,(r[1]+l[1])/2];return(0,a.removeWall)(m[0],m[1]),(0,a.removeWall)(l[0],l[1]),o.mazeProperties.grid[l[0]][l[1]]=1,e--,void(r=l)}r=l}}),28)}();break;case 6:!function(){!function(){for(var e=0;e<o.mazeProperties.grid.length;e++)(0,a.addWall)(e,0),(0,a.addWall)(e,o.mazeProperties.grid[0].length-1);for(var r=0;r<o.mazeProperties.grid[0].length;r++)(0,a.addWall)(0,r),(0,a.addWall)(o.mazeProperties.grid.length-1,r)}();var e=0;o.mazeProperties.timeouts=[],function r(t,i,s,g){if(g-i>s-t){var l=n(t+1,s),m=n(i+2,g-1);(l-t)%2==0&&(l+=0==n(0,2)?1:-1),(m-i)%2==1&&(m+=0==n(0,2)?1:-1);for(var p=function(r){r!=l&&(e+=17,o.mazeProperties.timeouts.push(setTimeout((function(){(0,a.addWall)(r,m)}),e)))},P=t+1;P<s;P++)p(P);m-i>2&&r(t,i,s,m),g-m>2&&r(t,m,s,g)}else{var d=n(t+2,s-1),z=n(i+1,g);(d-t)%2==1&&(d+=0==n(0,2)?1:-1),(z-i)%2==0&&(z+=0==n(0,2)?1:-1);var v=function(r){r!=z&&(e+=17,o.mazeProperties.timeouts.push(setTimeout((function(){(0,a.addWall)(d,r)}),e)))};for(P=i+1;P<g;P++)v(P);d-t>2&&r(t,i,d,g),s-d>2&&r(d,i,s,g)}}(0,0,o.mazeProperties.grid.length-1,o.mazeProperties.grid[0].length-1),o.mazeProperties.timeouts.push(setTimeout((function(){o.mazeProperties.generating=!1,o.mazeProperties.timeouts=[]}),e))}()}}},153:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.maze_solvers=void 0;var a,i,o,s,n=t(200),g=t(757),l=!1,m=!1;function p(e,r){return Math.sqrt(Math.pow(r[0]-e[0],2)+Math.pow(r[1]-e[1],2))}function P(){g.mazeProperties.myInterval=window.setInterval((function(){if(m){if(s==o.length)return clearInterval(g.mazeProperties.myInterval),void console.log(o);s++}else++i==a.length&&(l?m=!0:clearInterval(g.mazeProperties.myInterval))}),10)}function d(){a=[],i=0,o=[],s=0,l=!1,m=!1;var e=[g.mazeProperties.startPos];g.mazeProperties.grid[g.mazeProperties.startPos[0]][g.mazeProperties.startPos[1]]=1;do{var r=(0,n.getNeighbours)(e[0],1);e.splice(0,1);for(var t=0;t<r.length;t++)if(0==(0,n.getNode)(r[t][0],r[t][1])){if(e.push(r[t]),g.mazeProperties.grid[r[t][0]][r[t][1]]=t+1,r[t][0]==g.mazeProperties.targetPos[0]&&r[t][1]==g.mazeProperties.targetPos[1]){l=!0;break}a.push(r[t])}}while(e.length>0&&!l);if(l){for(var p=g.mazeProperties.targetPos;p[0]!=g.mazeProperties.startPos[0]||p[1]!=g.mazeProperties.startPos[1];){switch(g.mazeProperties.grid[p[0]][p[1]]){case 1:p=[p[0],p[1]+1];break;case 2:p=[p[0]-1,p[1]];break;case 3:p=[p[0],p[1]-1];break;case 4:p=[p[0]+1,p[1]]}o.push(p)}o.pop(),o.reverse()}P()}r.maze_solvers=function(){switch(console.log("Starting maze solving"),(0,n.clearGrid)(),g.mazeProperties.isGridClean=!1,(0,n.clearGrid)(),g.selectedSolveAlgorithm){case 1:case 4:default:d();break;case 2:!function(){var e,r,t;a=[],i=0,o=[],s=0,l=!1,m=!1;var p=[g.mazeProperties.startPos,g.mazeProperties.targetPos];g.mazeProperties.grid[g.mazeProperties.targetPos[0]][g.mazeProperties.targetPos[1]]=1,g.mazeProperties.grid[g.mazeProperties.startPos[0]][g.mazeProperties.startPos[1]]=11;do{e=p[0];var d=(0,n.getNeighbours)(e,1);p.splice(0,1);for(var z=0;z<d.length;z++)if(0==(0,n.getNode)(d[z][0],d[z][1]))p.push(d[z]),g.mazeProperties.grid[e[0]][e[1]]<10?g.mazeProperties.grid[d[z][0]][d[z][1]]=z+1:g.mazeProperties.grid[d[z][0]][d[z][1]]=11+z,a.push(d[z]);else if((0,n.getNode)(d[z][0],d[z][1])>0){if(g.mazeProperties.grid[e[0]][e[1]]<10&&(0,n.getNode)(d[z][0],d[z][1])>10){r=e,t=d[z],l=!0;break}if(g.mazeProperties.grid[e[0]][e[1]]>10&&(0,n.getNode)(d[z][0],d[z][1])<10){r=d[z],t=e,l=!0;break}}}while(p.length>0&&!l);if(l){var v=[g.mazeProperties.targetPos,g.mazeProperties.startPos],u=[r,t];for(z=0;z<u.length;z++){for(var f=u[z];f[0]!=v[z][0]||f[1]!=v[z][1];)switch(o.push(f),g.mazeProperties.grid[f[0]][f[1]]-10*z){case 1:f=[f[0],f[1]+1];break;case 2:f=[f[0]-1,f[1]];break;case 3:f=[f[0],f[1]-1];break;case 4:f=[f[0]+1,f[1]]}0==z&&o.reverse()}o.reverse()}P()}();break;case 3:!function(){a=[],i=0,o=[],s=0,l=!1,m=!1;var e=[g.mazeProperties.startPos];g.mazeProperties.grid[g.mazeProperties.startPos[0]][g.mazeProperties.startPos[1]]=1;do{e.sort((function(e,r){return p(e,g.mazeProperties.targetPos)-p(r,g.mazeProperties.targetPos)}));var r=(0,n.getNeighbours)(e[0],1);e.splice(0,1);for(var t=0;t<r.length;t++)if(0==(0,n.getNode)(r[t][0],r[t][1])){if(e.push(r[t]),g.mazeProperties.grid[r[t][0]][r[t][1]]=t+1,r[t][0]==g.mazeProperties.targetPos[0]&&r[t][1]==g.mazeProperties.targetPos[1]){l=!0;break}a.push(r[t])}}while(e.length>0&&!l);if(l){for(var d=g.mazeProperties.targetPos;d[0]!=g.mazeProperties.startPos[0]||d[1]!=g.mazeProperties.startPos[1];){switch(g.mazeProperties.grid[d[0]][d[1]]){case 1:d=[d[0],d[1]+1];break;case 2:d=[d[0]-1,d[1]];break;case 3:d=[d[0],d[1]-1];break;case 4:d=[d[0]+1,d[1]]}o.push(d)}o.pop(),o.reverse()}P()}();break;case 5:!function(){a=[],i=0,o=[],s=0,l=!1,m=!1;var e=[g.mazeProperties.startPos],r=new Array(g.mazeProperties.grid.length).fill(0).map((function(){return new Array(g.mazeProperties.grid[0].length).fill(0)}));g.mazeProperties.grid[g.mazeProperties.startPos[0]][g.mazeProperties.startPos[1]]=1;do{e.sort((function(e,t){return r[e[0]][e[1]]+p(e,g.mazeProperties.targetPos)*Math.sqrt(2)-(r[t[0]][t[1]]+p(t,g.mazeProperties.targetPos)*Math.sqrt(2))}));var t=e[0],d=(0,n.getNeighbours)(t,1);e.splice(0,1);for(var z=0;z<d.length;z++)if(0==(0,n.getNode)(d[z][0],d[z][1])){if(e.push(d[z]),g.mazeProperties.grid[d[z][0]][d[z][1]]=z+1,r[d[z][0]][d[z][1]]=r[t[0]][t[1]]+1,d[z][0]==g.mazeProperties.targetPos[0]&&d[z][1]==g.mazeProperties.targetPos[1]){l=!0;break}a.push(d[z])}}while(e.length>0&&!l);if(l){for(var v=g.mazeProperties.targetPos;v[0]!=g.mazeProperties.startPos[0]||v[1]!=g.mazeProperties.startPos[1];){switch(g.mazeProperties.grid[v[0]][v[1]]){case 1:v=[v[0],v[1]+1];break;case 2:v=[v[0]-1,v[1]];break;case 3:v=[v[0],v[1]-1];break;case 4:v=[v[0]+1,v[1]]}o.push(v)}o.pop(),o.reverse()}P()}()}}},757:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.mazeProperties=r.selectedSolveAlgorithm=r.selectedGenAlgorithm=r.gridSizeY=r.gridSizeX=void 0,r.gridSizeX=21,r.gridSizeY=21,r.selectedGenAlgorithm=2,r.selectedSolveAlgorithm=1,r.mazeProperties={grid:void 0,startPos:void 0,targetPos:void 0,isGridClean:!0,myInterval:void 0,generating:!1,timeouts:[]}}},r={};function t(a){var i=r[a];if(void 0!==i)return i.exports;var o=r[a]={exports:{}};return e[a](o,o.exports,t),o.exports}t(689),t(153),t(178)})();
//# sourceMappingURL=bundle.js.map