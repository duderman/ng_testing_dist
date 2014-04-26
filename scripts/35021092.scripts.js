(function(){"use strict";var a={}.hasOwnProperty,b=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};Date.prototype.getWeek=function(){var a,b;return a=new Date(this.getTime()),a.setHours(0,0,0,0),a.setDate(a.getDate()+3-(a.getDay()+6)%7),b=new Date(a.getFullYear(),0,4),1+Math.round(((a.getTime()-b.getTime())/864e5-3+(b.getDay()+6)%7)/7)},angular.module("ngTestingApp",["ngRoute"]).config(["$routeProvider",function(a){return a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html"}).otherwise({redirectTo:"/"})}]),angular.module("ngTestingApp").controller("MainCtrl",["$scope","Sections","ControlTypes",function(b,c,d){return b.sections=c.getAll(),b.currentSection=b.sections[0],b.isHasValidationError=function(b){var c,d;for(d in b)if(a.call(b,d)&&(c=b[d]))return c},b.getControlTypeUrl=function(a){return d.getByType(a)},b.incrementCurrentSection=function(){return c.changeValue(b.currentSection,"up")},b.decrementCurrentSection=function(){return c.changeValue(b.currentSection,"down")},b}]),angular.module("ngTestingApp").directive("dateInput",["dateFilter",function(a){return{require:"ngModel",template:'<input type="date"></input>',replace:!0,link:function(b,c,d,e){return e.$formatters.unshift(function(b){return a(b,"yyyy-MM-dd")}),e.$parsers.unshift(function(a){return new Date(a)})}}}]),angular.module("ngTestingApp").factory("ControlTypes",function(){var a;return a=["number","select","date","panel"],{getAll:function(){return a},getByType:function(c){return"views/controls/"+(b.call(a,c)>=0?c:"number")+".html"}}}),angular.module("ngTestingApp").factory("Sections",function(){var a,b;return b=new Date,a=[{id:"year",name:"Год",value:b.getFullYear()},{id:"quarter",name:"Квартал",value:"Первый",type:"select",availibleValues:["Первый","Второй","Третий","Четвертый"]},{id:"month",name:"Месяц",type:"select",value:"Январь",availibleValues:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]},{id:"week",name:"Неделя",value:b.getWeek(),range:{max:52,min:1}},{id:"day",name:"День",value:b,type:"date",range:{min:new Date("1900-01-01"),max:new Date("2100-01-01")}}],a[1].value=a[1].availibleValues[Math.ceil((b.getMonth()+1)/3)-1],a[2].value=a[2].availibleValues[b.getMonth()],{getAll:function(){return a},getById:function(b){var c,d,e,f;for(f=[],d=0,e=a.length;e>d;d++)c=a[d],c.id===b&&f.push(c);return f},changeValue:function(a,b){var c;switch(a.type||"number"){case"number":c=a.value+("down"===b?-1:1);break;case"date":c=new Date(a.value.getTime()+864e5*("down"===b?-1:1));break;case"select":c=a.availibleValues[a.availibleValues.indexOf(a.value)+("down"===b?-1:1)],null==c&&(c=a.value)}return null==a.range||null!=a.range&&a.range.min<=c&&c<=a.range.max?a.value=c:void 0}}})}).call(this);