import directResolve from 'direct-resolve';
import aliasResolve from 'alias';

console.log('directResolve', directResolve);
console.log('aliasResolve', aliasResolve);

import('./render').then(exports => {
    exports.render()
})
