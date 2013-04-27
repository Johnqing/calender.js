(function(win, undefined){
    var doc = win.document,
        body = doc.body,
        floor = Math.floor,
    extend = function(define, source) {
        for (var property in source) define[property] = source[property];
        return define;
    },
    isYYear = function(year){
        if(year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)){
            return true;
        }
        return false;
    };
    var defaultConfig = {
        class: 'calender',
        eventType: 'click'
    };
    /**
     * Class
     * @param o
     * @constructor
     */
    var Calender = function(o){
        this.class = o.class;
        this.eventType = o.eventType;
        this.week = ['日', '一', '二', '三', '四', '五', '六']
        this.init();
    }
    Calender.prototype = {
        init: function(){
            var tb = this.createTb();
            var wrap = doc.createElement('div');
            wrap.className="ns_wrap";
            wrap.innerHTML = tb;
            body.appendChild(wrap);
        },
        /**
         * 当前时间信息
         * @returns {Object}
         */
        getCurDy: function(){
            var _date = {};
            var dateObj = new Date();
            _date.y = dateObj.getFullYear();
            _date.m = dateObj.getMonth() + 1;
            _date.d = dateObj.getDate();
            return _date;
        },
        /**
         * 获取第一天是周几
         * @returns {number}
         */
        getFirstIsDay: function(){
            var getCurDy = this.getCurDy();
            var dateObj = new Date(),
                firstIsDay;
            dateObj.setFullYear = getCurDy.y;
            dateObj.setMonth((getCurDy.m - 1), 0);
            firstIsDay = dateObj.getDay();
            firstIsDay = (firstIsDay === 6) ? 0 : (firstIsDay + 1);
            return firstIsDay;
        },
        /**
         * 获取当前月的天数
         * @returns {number}
         */
        getCurMonDay: function(){
            var getCurDy = this.getCurDy(),
                mon = getCurDy.m;
            var days = 30;
            if(mon === 1 || mon === 3 || mon === 5 || mon === 7 || mon === 8 || mon === 10 || mon === 12){
                days = 31;
            }else if(mon === 2){
                days = 28;
                if(isYYear(getCurDy.y)){
                    days = 29;
                }
            }
            return days;
        },
        /**
         * 获取行数
         * @returns {*}
         */
        getDateTb: function(){
            var line,
                days = this.getCurMonDay(),
                first = this.getFirstIsDay();
            var def = days + first - 7;
            var mod =  def%7;
            if(mod === 0){
                line = def/7+1;
            }else{
                line = floor(def/7) + 2;
            }
            return line;
        },
        createTb: function(){
            var cur = this.getCurDy(),
                day = 1,
                first = this.getFirstIsDay(),
                days = this.getCurMonDay(),
                line = this.getDateTb();

            var tb = '<table border="0" cellpadding="2" cellspacing="0" class="'+this.class+'">';
            //header
            tb += '<tr>';
            tb += '<th colspan="7" class="ns_mon">'+cur.m+'</th>';
            tb += '</tr>';
            //week
            tb += '<tr class="ns_week">';
            for(var i = 0; i < this.week.length; i++){
               tb += '<td align="center"><span>'+this.week[i]+'</span></td>';
            }
            tb += '</tr>';
            //list
            for(var j = 0; j < line; j++){
                tb += '<tr>';
                for(var i = 0; i< 7; i++){
                    if((i*j+i+j*7) < first){
                        tb += '<td align="center">&nbsp;</td>';
                    }else{
                        if(day <= days){
                            var curClass = day === cur.d ? 'current' : '';
                            tb += '<td align="center" id="'+day+'" class="'+curClass+'"><a href="###">'+day+'</a></td>';
                            day++;
                        }else{
                            tb += '<td align="center">&nbsp;</td>';
                        }
                    }
                }
                tb += '</tr>';
            }

            //end
            tb += '</table>';
            return tb;
        }
    }
    /**
     * 对外开放接口
     * @param o
     */
    win.calender = function(o){
        o = extend(defaultConfig, o);
        new Calender(o);
    }
}(this));
