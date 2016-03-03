(function(window, undefined) {
	var fn;

	function CalendarDefault() {}
	CalendarDefault.prototype = {
		weekStart: 0,
		error: function() {},
		callback: function() {},
		maxDate: '2016-04-05',
		minDate: '2016-02-29',
		weekText: ['日', '一', '二', '三', '四', '五', '六']
	};

	function Calendar(options) {
		var ops = options || {};
		//return;

		this.yearWrap = this.createElement('div');
		this.monthWrap = this.createElement('div', {
			'className': 5
		});
		this.dateWrap = this.createElement('div');
		var elements = [{
			yearWarp: {
				div: {}
			}
		}, ];
		this.createElements(this, elements);
		this.DATE = this.getDate();
		this.init();
	}
	Calendar.prototype = fn = {
		name: 'calendar',
		init: function() {
			this.create();
			this.render();
		},
		events: function() {

		},
		create: function() {
			this.append(this.yearWrap);
			this.append(this.monthWrap);
			this.append(this.dateWrap);
		},
		createElements: function(context, attr) {
			var _this = this,
				attrs = attr || [];
			for (var e = 0; e < attrs.length; e++) {
				for (var key in attrs[e]) {
					context[key] = _this.createElement(key, attrs[e][key]);
				}
			}
			return context;
		},

		update: function(options) {
			var _this = this,
				ops = options || {},
				dateObj = ops.date || _this.DATE,
				_year,
				_month,
				_date,
				days,
				firstDay,
				nowMonthDate, prevMonthDate, nextMonthDate = 1,
				nowDate, prevDate, nextDate,
				currentDate,
				dateObj,

				loop = function() {
					var element = this;
					(function() {
						element.onclick = function() {
							//alert(0);
						};
					})();
				},
				getNewDate = function(year, month, date) {
					var _date = new Date();
					_date.setYear(year);
					_date.setMonth(month);
					_date.setDate(date);
					return _date;
				};

			_year = dateObj.getFullYear();
			_month = dateObj.getMonth();
			_date = dateObj.getDate();
			days = _this.getMaxDates(_year, _month);
			firstDay = new Date(_year, _month, 1).getDay(), showMonth = _month + 1;

			//Clear Table
			_this.empty(_this.thead);
			_this.empty(_this.tbody);

			for (var i = 0; i < 6; i++) {

				this.tbody.insertRow(i);
				for (var j = 0; j < 7; j++) {
					var th, td = this.tbody.rows[i].insertCell(j),
						num = i * 7 + j,
						status = true,
						getMaxDateStatus, getMinDateStatus;
					nowMonthDate = num - firstDay + 1;
					prevMonthDate = Math.abs(firstDay - j - _this.getMaxDates(_year, _month - 1) - 1);

					//插件头部-星期
					if (!i && !j) {
						this.thead.insertRow(i);
					}
					if (!i) {
						th = this.thead.rows[i].insertCell(j);
						th.innerHTML = _this.weekText[j];
						//设置样式
						if (j === 5 || j === 6) { //周末
							_this.addClass(th, _this.name + '-weekend');
						}
					}
					//设置文本内容
					if (num < firstDay) { //上个月
						td.innerHTML = prevMonthDate;
						currentDate = getNewDate(_year, _month - 1, prevMonthDate);
					} else if (num >= days + firstDay) { //下个月
						td.innerHTML = nextMonthDate;
						nextMonthDate++;
						currentDate = getNewDate(_year, _month, nowMonthDate);
					} else { //本月
						td.innerHTML = nowMonthDate;
						currentDate = getNewDate(_year, _month, nowMonthDate);
					}


					getMaxDateStatus = _this.getDates(_this.getCurrentDate(currentDate), _this.maxDate) < 0;
					getMinDateStatus = _this.getDates(_this.getCurrentDate(currentDate), _this.minDate) > 0;

					if (_this.maxDate) {
						if (getMaxDateStatus) {
							status = false;
						} else {
							status = true;
						}
					}
					if (_this.minDate) {
						if (getMinDateStatus) {
							status = false;
						} else {
							status = true;
						}
					}
					if (_this.minDate && _this.maxDate) {
						if (getMaxDateStatus || getMinDateStatus) {
							status = false;
						} else {
							status = true;
						}
					}


					if (status) {

						(function() {
							td.onclick = function() {
								alert(0);
							};
						})();
					}


					//设置样式
					if (j === 0 || j === 6) { //周末
						_this.addClass(td, _this.name + '-weekend');
					}
					if (nowMonthDate === _date) {
						_this.addClass(td, _this.name + '-today');
					}
					if (num < firstDay || num >= days + firstDay) {
						_this.addClass(td, _this.name + '-non-current');
					} else {
						_this.addClass(td, _this.name + '-current');
					}
					if (!status) {
						_this.addClass(td, _this.name + '-disabled');
					} else {
						_this.addClass(td, _this.name + '-enabled');
					}


				}
			}
		},
		render: function() {
			var _this = this;

			function renderYear() {};

			function renderMonth() {
				var monthResult = [];
				var b = 2;
				monthResult.push('<table>');
				for (var i = 1; i <= 12; i++) {

					if (i % b !== 0) {
						monthResult.push('<tr>');
					}
					monthResult.push('<td>' + i + '月</td>');
					if (i % b == 0) {
						monthResult.push('</tr>');
					}
				}
				monthResult.push('</table>');
				return monthResult.join('');
			};

			function renderDate() {

				var elments = [{
					table: {
						className: _this.name
					}
				}, {
					thead: {
						className: _this.name
					}
				}, {
					tbody: {
						className: _this.name
					}
				}, {
					tfoot: {
						className: _this.name
					}
				}];
				_this.createElements(_this, elments);
				_this.append(_this.thead, _this.table);
				_this.append(_this.tfoot, _this.table);
				_this.append(_this.tbody, _this.table);


			};
			//this.monthWrap.innerHTML = renderMonth();
			renderDate();
			this.update();
			this.append(this.table);

		}
	};

	KW.extend(fn, new KW.Type);
	KW.extend(fn, new KW.Dom);
	KW.extend(fn, new KW.Date);
	KW.extend(fn, new KW.Event);
	KW.extend(fn, new CalendarDefault);
	var calendar = new Calendar();
	window.calendar = calendar;
})(this);