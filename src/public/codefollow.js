
// basic handling of all codefollow actions
var ___external_eval = function( script ) { window.eval(script); };
(function() {

  // handles executing the tests
  var $this = this
    , $results = [ ]
    , $eval = ___external_eval

    // reading/testing helpers
    , $CodeFollowInstructionParser = function(e){var t=this,n=null,r=(e||"").split(/\n/g),i=[],s=null,o=/\stest\]$/,u=/^--.*$/,a=/^\[\w+[^\]]*\]\s*$/,f=/^\s*|\s*$/g,l=/^\[\w+/,c=/(\w+):([^\s|\]]+)*/,h=function(){return o.test(n)},p=function(){return u.test(n)},d=function(){return a.test(n)},v=function(e){n=e;if(p())return;else if(d())m();else g()},m=function(){s={data:""};i.push(s);y();b()},g=function(){if(!s)return;s.data+=(s.data?"\n":"")+n},y=function(){n=n.replace(l,function(e){s.type=e.substr(1)})},b=function(){s.test=h();while(c.test(n)){n=n.replace(c,function(e){var t=e.split(/:/),n=t[0],r=t[1];if(n)s[n]=r||"";return null})}},w=function(){for(var e in r)v(r[e])},E=function(){for(var e in i){var n=i[e];t[n.type]=t[n.type]||[];t[n.type].push(n)}},S=function(){w();E()};S()}
    , $CodeFollowReporter = function(e,t){t=t||function(){};var n=function(e){return(e||"").toString().replace(/\t|\n/g,"  ")};this.reportRunnerResults=function(e){for(var r in e.suites_){var i=e.suites_[r],s=n(i.description),o=i.children_;$results.push(s);for(var u in o){var a=o[u],f=a.results_,l=n(a.description),c=f.passedCount,h=f.failedCount,p=f.totalCount,d=c==p,v=[,l,c,p].join('\t');$results.push(v)}}t(e)}}

    // handles checking if this is a development
    // test or an actual test request
    , $test_attempt= /^\/\d+\/\d+\/[a-z0-9]+\//.test( window.location.pathname )

    // unique URL per attempt
    , $ticks = (new Date()).getTime()

    // the test itself
    , $test = null
    , $testing_framework = 'var isCommonJS=typeof window=="undefined"&&typeof exports=="object";var jasmine={};if(isCommonJS)exports.jasmine=jasmine;jasmine.unimplementedMethod_=function(){throw new Error("unimplemented method")};jasmine.undefined=jasmine.___undefined___;jasmine.VERBOSE=false;jasmine.DEFAULT_UPDATE_INTERVAL=250;jasmine.MAX_PRETTY_PRINT_DEPTH=40;jasmine.DEFAULT_TIMEOUT_INTERVAL=5e3;jasmine.CATCH_EXCEPTIONS=true;jasmine.getGlobal=function(){function e(){return this}return e()};jasmine.bindOriginal_=function(e,t){var n=e[t];if(n.apply){return function(){return n.apply(e,arguments)}}else{return jasmine.getGlobal()[t]}};jasmine.setTimeout=jasmine.bindOriginal_(jasmine.getGlobal(),"setTimeout");jasmine.clearTimeout=jasmine.bindOriginal_(jasmine.getGlobal(),"clearTimeout");jasmine.setInterval=jasmine.bindOriginal_(jasmine.getGlobal(),"setInterval");jasmine.clearInterval=jasmine.bindOriginal_(jasmine.getGlobal(),"clearInterval");jasmine.MessageResult=function(e){this.type="log";this.values=e;this.trace=new Error};jasmine.MessageResult.prototype.toString=function(){var e="";for(var t=0;t<this.values.length;t++){if(t>0)e+=" ";if(jasmine.isString_(this.values[t])){e+=this.values[t]}else{e+=jasmine.pp(this.values[t])}}return e};jasmine.ExpectationResult=function(e){this.type="expect";this.matcherName=e.matcherName;this.passed_=e.passed;this.expected=e.expected;this.actual=e.actual;this.message=this.passed_?"Passed.":e.message;var t=e.trace||new Error(this.message);this.trace=this.passed_?"":t};jasmine.ExpectationResult.prototype.toString=function(){return this.message};jasmine.ExpectationResult.prototype.passed=function(){return this.passed_};jasmine.getEnv=function(){var e=jasmine.currentEnv_=jasmine.currentEnv_||new jasmine.Env;return e};jasmine.isArray_=function(e){return jasmine.isA_("Array",e)};jasmine.isString_=function(e){return jasmine.isA_("String",e)};jasmine.isNumber_=function(e){return jasmine.isA_("Number",e)};jasmine.isA_=function(e,t){return Object.prototype.toString.apply(t)==="[object "+e+"]"};jasmine.pp=function(e){var t=new jasmine.StringPrettyPrinter;t.format(e);return t.string};jasmine.isDomNode=function(e){return e.nodeType>0};jasmine.any=function(e){return new jasmine.Matchers.Any(e)};jasmine.objectContaining=function(e){return new jasmine.Matchers.ObjectContaining(e)};jasmine.Spy=function(e){this.identity=e||"unknown";this.isSpy=true;this.plan=function(){};this.mostRecentCall={};this.argsForCall=[];this.calls=[]};jasmine.Spy.prototype.andCallThrough=function(){this.plan=this.originalValue;return this};jasmine.Spy.prototype.andReturn=function(e){this.plan=function(){return e};return this};jasmine.Spy.prototype.andThrow=function(e){this.plan=function(){throw e};return this};jasmine.Spy.prototype.andCallFake=function(e){this.plan=e;return this};jasmine.Spy.prototype.reset=function(){this.wasCalled=false;this.callCount=0;this.argsForCall=[];this.calls=[];this.mostRecentCall={}};jasmine.createSpy=function(e){var t=function(){t.wasCalled=true;t.callCount++;var e=jasmine.util.argsToArray(arguments);t.mostRecentCall.object=this;t.mostRecentCall.args=e;t.argsForCall.push(e);t.calls.push({object:this,args:e});return t.plan.apply(this,arguments)};var n=new jasmine.Spy(e);for(var r in n){t[r]=n[r]}t.reset();return t};jasmine.isSpy=function(e){return e&&e.isSpy};jasmine.createSpyObj=function(e,t){if(!jasmine.isArray_(t)||t.length===0){throw new Error("createSpyObj requires a non-empty array of method names to create spies for")}var n={};for(var r=0;r<t.length;r++){n[t[r]]=jasmine.createSpy(e+"."+t[r])}return n};jasmine.log=function(){var e=jasmine.getEnv().currentSpec;e.log.apply(e,arguments)};var spyOn=function(e,t){return jasmine.getEnv().currentSpec.spyOn(e,t)};if(isCommonJS)exports.spyOn=spyOn;var it=function(e,t){return jasmine.getEnv().it(e,t)};if(isCommonJS)exports.it=it;var xit=function(e,t){return jasmine.getEnv().xit(e,t)};if(isCommonJS)exports.xit=xit;var expect=function(e){return jasmine.getEnv().currentSpec.expect(e)};if(isCommonJS)exports.expect=expect;var runs=function(e){jasmine.getEnv().currentSpec.runs(e)};if(isCommonJS)exports.runs=runs;var waits=function(e){jasmine.getEnv().currentSpec.waits(e)};if(isCommonJS)exports.waits=waits;var waitsFor=function(e,t,n){jasmine.getEnv().currentSpec.waitsFor.apply(jasmine.getEnv().currentSpec,arguments)};if(isCommonJS)exports.waitsFor=waitsFor;var beforeEach=function(e){jasmine.getEnv().beforeEach(e)};if(isCommonJS)exports.beforeEach=beforeEach;var afterEach=function(e){jasmine.getEnv().afterEach(e)};if(isCommonJS)exports.afterEach=afterEach;var describe=function(e,t){return jasmine.getEnv().describe(e,t)};if(isCommonJS)exports.describe=describe;var xdescribe=function(e,t){return jasmine.getEnv().xdescribe(e,t)};if(isCommonJS)exports.xdescribe=xdescribe;jasmine.XmlHttpRequest=typeof XMLHttpRequest=="undefined"?function(){function e(e){try{return e()}catch(t){}return null}var t=e(function(){return new ActiveXObject("Msxml2.XMLHTTP.6.0")})||e(function(){return new ActiveXObject("Msxml2.XMLHTTP.3.0")})||e(function(){return new ActiveXObject("Msxml2.XMLHTTP")})||e(function(){return new ActiveXObject("Microsoft.XMLHTTP")});if(!t)throw new Error("This browser does not support XMLHttpRequest.");return t}:XMLHttpRequest;jasmine.util={};jasmine.util.inherit=function(e,t){var n=function(){};n.prototype=t.prototype;e.prototype=new n};jasmine.util.formatException=function(e){var t;if(e.line){t=e.line}else if(e.lineNumber){t=e.lineNumber}var n;if(e.sourceURL){n=e.sourceURL}else if(e.fileName){n=e.fileName}var r=e.name&&e.message?e.name+": "+e.message:e.toString();if(n&&t){r+=" in "+n+" (line "+t+")"}return r};jasmine.util.htmlEscape=function(e){if(!e)return e;return e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">")};jasmine.util.argsToArray=function(e){var t=[];for(var n=0;n<e.length;n++)t.push(e[n]);return t};jasmine.util.extend=function(e,t){for(var n in t)e[n]=t[n];return e};jasmine.Env=function(){this.currentSpec=null;this.currentSuite=null;this.currentRunner_=new jasmine.Runner(this);this.reporter=new jasmine.MultiReporter;this.updateInterval=jasmine.DEFAULT_UPDATE_INTERVAL;this.defaultTimeoutInterval=jasmine.DEFAULT_TIMEOUT_INTERVAL;this.lastUpdate=0;this.specFilter=function(){return true};this.nextSpecId_=0;this.nextSuiteId_=0;this.equalityTesters_=[];this.matchersClass=function(){jasmine.Matchers.apply(this,arguments)};jasmine.util.inherit(this.matchersClass,jasmine.Matchers);jasmine.Matchers.wrapInto_(jasmine.Matchers.prototype,this.matchersClass)};jasmine.Env.prototype.setTimeout=jasmine.setTimeout;jasmine.Env.prototype.clearTimeout=jasmine.clearTimeout;jasmine.Env.prototype.setInterval=jasmine.setInterval;jasmine.Env.prototype.clearInterval=jasmine.clearInterval;jasmine.Env.prototype.version=function(){if(jasmine.version_){return jasmine.version_}else{throw new Error("Version not set")}};jasmine.Env.prototype.versionString=function(){if(!jasmine.version_){return"version unknown"}var e=this.version();var t=e.major+"."+e.minor+"."+e.build;if(e.release_candidate){t+=".rc"+e.release_candidate}t+=" revision "+e.revision;return t};jasmine.Env.prototype.nextSpecId=function(){return this.nextSpecId_++};jasmine.Env.prototype.nextSuiteId=function(){return this.nextSuiteId_++};jasmine.Env.prototype.addReporter=function(e){this.reporter.addReporter(e)};jasmine.Env.prototype.execute=function(){this.currentRunner_.execute()};jasmine.Env.prototype.describe=function(e,t){var n=new jasmine.Suite(this,e,t,this.currentSuite);var r=this.currentSuite;if(r){r.add(n)}else{this.currentRunner_.add(n)}this.currentSuite=n;var i=null;try{t.call(n)}catch(s){i=s}if(i){this.it("encountered a declaration exception",function(){throw i})}this.currentSuite=r;return n};jasmine.Env.prototype.beforeEach=function(e){if(this.currentSuite){this.currentSuite.beforeEach(e)}else{this.currentRunner_.beforeEach(e)}};jasmine.Env.prototype.currentRunner=function(){return this.currentRunner_};jasmine.Env.prototype.afterEach=function(e){if(this.currentSuite){this.currentSuite.afterEach(e)}else{this.currentRunner_.afterEach(e)}};jasmine.Env.prototype.xdescribe=function(e,t){return{execute:function(){}}};jasmine.Env.prototype.it=function(e,t){var n=new jasmine.Spec(this,this.currentSuite,e);this.currentSuite.add(n);this.currentSpec=n;if(t){n.runs(t)}return n};jasmine.Env.prototype.xit=function(e,t){return{id:this.nextSpecId(),runs:function(){}}};jasmine.Env.prototype.compareRegExps_=function(e,t,n,r){if(e.source!=t.source)r.push("expected pattern /"+t.source+"/ is not equal to the pattern /"+e.source+"/");if(e.ignoreCase!=t.ignoreCase)r.push("expected modifier i was"+(t.ignoreCase?" ":" not ")+"set and does not equal the origin modifier");if(e.global!=t.global)r.push("expected modifier g was"+(t.global?" ":" not ")+"set and does not equal the origin modifier");if(e.multiline!=t.multiline)r.push("expected modifier m was"+(t.multiline?" ":" not ")+"set and does not equal the origin modifier");if(e.sticky!=t.sticky)r.push("expected modifier y was"+(t.sticky?" ":" not ")+"set and does not equal the origin modifier");return r.length===0};jasmine.Env.prototype.compareObjects_=function(e,t,n,r){if(e.__Jasmine_been_here_before__===t&&t.__Jasmine_been_here_before__===e){return true}e.__Jasmine_been_here_before__=t;t.__Jasmine_been_here_before__=e;var i=function(e,t){return e!==null&&e[t]!==jasmine.undefined};for(var s in t){if(!i(e,s)&&i(t,s)){n.push("expected has key \'"+s+"\', but missing from actual.")}}for(s in e){if(!i(t,s)&&i(e,s)){n.push("expected missing key \'"+s+"\', but present in actual.")}}for(s in t){if(s=="__Jasmine_been_here_before__")continue;if(!this.equals_(e[s],t[s],n,r)){r.push("\'"+s+"\' was \'"+(t[s]?jasmine.util.htmlEscape(t[s].toString()):t[s])+"\' in expected, but was \'"+(e[s]?jasmine.util.htmlEscape(e[s].toString()):e[s])+"\' in actual.")}}if(jasmine.isArray_(e)&&jasmine.isArray_(t)&&e.length!=t.length){r.push("arrays were not the same length")}delete e.__Jasmine_been_here_before__;delete t.__Jasmine_been_here_before__;return n.length===0&&r.length===0};jasmine.Env.prototype.equals_=function(e,t,n,r){n=n||[];r=r||[];for(var i=0;i<this.equalityTesters_.length;i++){var s=this.equalityTesters_[i];var o=s(e,t,this,n,r);if(o!==jasmine.undefined)return o}if(e===t)return true;if(e===jasmine.undefined||e===null||t===jasmine.undefined||t===null){return e==jasmine.undefined&&t==jasmine.undefined}if(jasmine.isDomNode(e)&&jasmine.isDomNode(t)){return e===t}if(e instanceof Date&&t instanceof Date){return e.getTime()==t.getTime()}if(e.jasmineMatches){return e.jasmineMatches(t)}if(t.jasmineMatches){return t.jasmineMatches(e)}if(e instanceof jasmine.Matchers.ObjectContaining){return e.matches(t)}if(t instanceof jasmine.Matchers.ObjectContaining){return t.matches(e)}if(jasmine.isString_(e)&&jasmine.isString_(t)){return e==t}if(jasmine.isNumber_(e)&&jasmine.isNumber_(t)){return e==t}if(e instanceof RegExp&&t instanceof RegExp){return this.compareRegExps_(e,t,n,r)}if(typeof e==="object"&&typeof t==="object"){return this.compareObjects_(e,t,n,r)}return e===t};jasmine.Env.prototype.contains_=function(e,t){if(jasmine.isArray_(e)){for(var n=0;n<e.length;n++){if(this.equals_(e[n],t))return true}return false}return e.indexOf(t)>=0};jasmine.Env.prototype.addEqualityTester=function(e){this.equalityTesters_.push(e)};jasmine.Reporter=function(){};jasmine.Reporter.prototype.reportRunnerStarting=function(e){};jasmine.Reporter.prototype.reportRunnerResults=function(e){};jasmine.Reporter.prototype.reportSuiteResults=function(e){};jasmine.Reporter.prototype.reportSpecStarting=function(e){};jasmine.Reporter.prototype.reportSpecResults=function(e){};jasmine.Reporter.prototype.log=function(e){};jasmine.Block=function(e,t,n){this.env=e;this.func=t;this.spec=n};jasmine.Block.prototype.execute=function(e){if(!jasmine.CATCH_EXCEPTIONS){this.func.apply(this.spec)}else{try{this.func.apply(this.spec)}catch(t){this.spec.fail(t)}}e()};jasmine.JsApiReporter=function(){this.started=false;this.finished=false;this.suites_=[];this.results_={}};jasmine.JsApiReporter.prototype.reportRunnerStarting=function(e){this.started=true;var t=e.topLevelSuites();for(var n=0;n<t.length;n++){var r=t[n];this.suites_.push(this.summarize_(r))}};jasmine.JsApiReporter.prototype.suites=function(){return this.suites_};jasmine.JsApiReporter.prototype.summarize_=function(e){var t=e instanceof jasmine.Suite;var n={id:e.id,name:e.description,type:t?"suite":"spec",children:[]};if(t){var r=e.children();for(var i=0;i<r.length;i++){n.children.push(this.summarize_(r[i]))}}return n};jasmine.JsApiReporter.prototype.results=function(){return this.results_};jasmine.JsApiReporter.prototype.resultsForSpec=function(e){return this.results_[e]};jasmine.JsApiReporter.prototype.reportRunnerResults=function(e){this.finished=true};jasmine.JsApiReporter.prototype.reportSuiteResults=function(e){};jasmine.JsApiReporter.prototype.reportSpecResults=function(e){this.results_[e.id]={messages:e.results().getItems(),result:e.results().failedCount>0?"failed":"passed"}};jasmine.JsApiReporter.prototype.log=function(e){};jasmine.JsApiReporter.prototype.resultsForSpecs=function(e){var t={};for(var n=0;n<e.length;n++){var r=e[n];t[r]=this.summarizeResult_(this.results_[r])}return t};jasmine.JsApiReporter.prototype.summarizeResult_=function(e){var t=[];var n=e.messages.length;for(var r=0;r<n;r++){var i=e.messages[r];t.push({text:i.type=="log"?i.toString():jasmine.undefined,passed:i.passed?i.passed():true,type:i.type,message:i.message,trace:{stack:i.passed&&!i.passed()?i.trace.stack:jasmine.undefined}})}return{result:e.result,messages:t}};jasmine.Matchers=function(e,t,n,r){this.env=e;this.actual=t;this.spec=n;this.isNot=r||false;this.reportWasCalled_=false};jasmine.Matchers.pp=function(e){throw new Error("jasmine.Matchers.pp() is no longer supported, please use jasmine.pp() instead!")};jasmine.Matchers.prototype.report=function(e,t,n){throw new Error("As of jasmine 0.11, custom matchers must be implemented differently -- please see jasmine docs")};jasmine.Matchers.wrapInto_=function(e,t){for(var n in e){if(n=="report")continue;var r=e[n];t.prototype[n]=jasmine.Matchers.matcherFn_(n,r)}};jasmine.Matchers.matcherFn_=function(e,t){return function(){var n=jasmine.util.argsToArray(arguments);var r=t.apply(this,arguments);if(this.isNot){r=!r}if(this.reportWasCalled_)return r;var i;if(!r){if(this.message){i=this.message.apply(this,arguments);if(jasmine.isArray_(i)){i=i[this.isNot?1:0]}}else{var s=e.replace(/[A-Z]/g,function(e){return" "+e.toLowerCase()});i="Expected "+jasmine.pp(this.actual)+(this.isNot?" not ":" ")+s;if(n.length>0){for(var o=0;o<n.length;o++){if(o>0)i+=",";i+=" "+jasmine.pp(n[o])}}i+="."}}var u=new jasmine.ExpectationResult({matcherName:e,passed:r,expected:n.length>1?n:n[0],actual:this.actual,message:i});this.spec.addMatcherResult(u);return jasmine.undefined}};jasmine.Matchers.prototype.toBe=function(e){return this.actual===e};jasmine.Matchers.prototype.toNotBe=function(e){return this.actual!==e};jasmine.Matchers.prototype.toEqual=function(e){return this.env.equals_(this.actual,e)};jasmine.Matchers.prototype.toNotEqual=function(e){return!this.env.equals_(this.actual,e)};jasmine.Matchers.prototype.toMatch=function(e){return(new RegExp(e)).test(this.actual)};jasmine.Matchers.prototype.toNotMatch=function(e){return!(new RegExp(e)).test(this.actual)};jasmine.Matchers.prototype.toBeDefined=function(){return this.actual!==jasmine.undefined};jasmine.Matchers.prototype.toBeUndefined=function(){return this.actual===jasmine.undefined};jasmine.Matchers.prototype.toBeNull=function(){return this.actual===null};jasmine.Matchers.prototype.toBeNaN=function(){this.message=function(){return["Expected "+jasmine.pp(this.actual)+" to be NaN."]};return this.actual!==this.actual};jasmine.Matchers.prototype.toBeTruthy=function(){return!!this.actual};jasmine.Matchers.prototype.toBeFalsy=function(){return!this.actual};jasmine.Matchers.prototype.toHaveBeenCalled=function(){if(arguments.length>0){throw new Error("toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith")}if(!jasmine.isSpy(this.actual)){throw new Error("Expected a spy, but got "+jasmine.pp(this.actual)+".")}this.message=function(){return["Expected spy "+this.actual.identity+" to have been called.","Expected spy "+this.actual.identity+" not to have been called."]};return this.actual.wasCalled};jasmine.Matchers.prototype.wasCalled=jasmine.Matchers.prototype.toHaveBeenCalled;jasmine.Matchers.prototype.wasNotCalled=function(){if(arguments.length>0){throw new Error("wasNotCalled does not take arguments")}if(!jasmine.isSpy(this.actual)){throw new Error("Expected a spy, but got "+jasmine.pp(this.actual)+".")}this.message=function(){return["Expected spy "+this.actual.identity+" to not have been called.","Expected spy "+this.actual.identity+" to have been called."]};return!this.actual.wasCalled};jasmine.Matchers.prototype.toHaveBeenCalledWith=function(){var e=jasmine.util.argsToArray(arguments);if(!jasmine.isSpy(this.actual)){throw new Error("Expected a spy, but got "+jasmine.pp(this.actual)+".")}this.message=function(){var t="Expected spy "+this.actual.identity+" not to have been called with "+jasmine.pp(e)+" but it was.";var n="";if(this.actual.callCount===0){n="Expected spy "+this.actual.identity+" to have been called with "+jasmine.pp(e)+" but it was never called."}else{n="Expected spy "+this.actual.identity+" to have been called with "+jasmine.pp(e)+" but actual calls were "+jasmine.pp(this.actual.argsForCall).replace(/^\[ | \]$/g,"")}return[n,t]};return this.env.contains_(this.actual.argsForCall,e)};jasmine.Matchers.prototype.wasCalledWith=jasmine.Matchers.prototype.toHaveBeenCalledWith;jasmine.Matchers.prototype.wasNotCalledWith=function(){var e=jasmine.util.argsToArray(arguments);if(!jasmine.isSpy(this.actual)){throw new Error("Expected a spy, but got "+jasmine.pp(this.actual)+".")}this.message=function(){return["Expected spy not to have been called with "+jasmine.pp(e)+" but it was","Expected spy to have been called with "+jasmine.pp(e)+" but it was"]};return!this.env.contains_(this.actual.argsForCall,e)};jasmine.Matchers.prototype.toContain=function(e){return this.env.contains_(this.actual,e)};jasmine.Matchers.prototype.toNotContain=function(e){return!this.env.contains_(this.actual,e)};jasmine.Matchers.prototype.toBeLessThan=function(e){return this.actual<e};jasmine.Matchers.prototype.toBeGreaterThan=function(e){return this.actual>e};jasmine.Matchers.prototype.toBeCloseTo=function(e,t){if(!(t===0)){t=t||2}return Math.abs(e-this.actual)<Math.pow(10,-t)/2};jasmine.Matchers.prototype.toThrow=function(e){var t=false;var n;if(typeof this.actual!="function"){throw new Error("Actual is not a function")}try{this.actual()}catch(r){n=r}if(n){t=e===jasmine.undefined||this.env.equals_(n.message||n,e.message||e)}var i=this.isNot?"not ":"";this.message=function(){if(n&&(e===jasmine.undefined||!this.env.equals_(n.message||n,e.message||e))){return["Expected function "+i+"to throw",e?e.message||e:"an exception",", but it threw",n.message||n].join(" ")}else{return"Expected function to throw an exception."}};return t};jasmine.Matchers.Any=function(e){this.expectedClass=e};jasmine.Matchers.Any.prototype.jasmineMatches=function(e){if(this.expectedClass==String){return typeof e=="string"||e instanceof String}if(this.expectedClass==Number){return typeof e=="number"||e instanceof Number}if(this.expectedClass==Function){return typeof e=="function"||e instanceof Function}if(this.expectedClass==Object){return typeof e=="object"}return e instanceof this.expectedClass};jasmine.Matchers.Any.prototype.jasmineToString=function(){return"<jasmine.any("+this.expectedClass+")>"};jasmine.Matchers.ObjectContaining=function(e){this.sample=e};jasmine.Matchers.ObjectContaining.prototype.jasmineMatches=function(e,t,n){t=t||[];n=n||[];var r=jasmine.getEnv();var i=function(e,t){return e!=null&&e[t]!==jasmine.undefined};for(var s in this.sample){if(!i(e,s)&&i(this.sample,s)){t.push("expected has key \'"+s+"\', but missing from actual.")}else if(!r.equals_(this.sample[s],e[s],t,n)){n.push("\'"+s+"\' was \'"+(e[s]?jasmine.util.htmlEscape(e[s].toString()):e[s])+"\' in expected, but was \'"+(this.sample[s]?jasmine.util.htmlEscape(this.sample[s].toString()):this.sample[s])+"\' in actual.")}}return t.length===0&&n.length===0};jasmine.Matchers.ObjectContaining.prototype.jasmineToString=function(){return"<jasmine.objectContaining("+jasmine.pp(this.sample)+")>"};jasmine.FakeTimer=function(){this.reset();var e=this;e.setTimeout=function(t,n){e.timeoutsMade++;e.scheduleFunction(e.timeoutsMade,t,n,false);return e.timeoutsMade};e.setInterval=function(t,n){e.timeoutsMade++;e.scheduleFunction(e.timeoutsMade,t,n,true);return e.timeoutsMade};e.clearTimeout=function(t){e.scheduledFunctions[t]=jasmine.undefined};e.clearInterval=function(t){e.scheduledFunctions[t]=jasmine.undefined}};jasmine.FakeTimer.prototype.reset=function(){this.timeoutsMade=0;this.scheduledFunctions={};this.nowMillis=0};jasmine.FakeTimer.prototype.tick=function(e){var t=this.nowMillis;var n=t+e;this.runFunctionsWithinRange(t,n);this.nowMillis=n};jasmine.FakeTimer.prototype.runFunctionsWithinRange=function(e,t){var n;var r=[];for(var i in this.scheduledFunctions){n=this.scheduledFunctions[i];if(n!=jasmine.undefined&&n.runAtMillis>=e&&n.runAtMillis<=t){r.push(n);this.scheduledFunctions[i]=jasmine.undefined}}if(r.length>0){r.sort(function(e,t){return e.runAtMillis-t.runAtMillis});for(var s=0;s<r.length;++s){try{var o=r[s];this.nowMillis=o.runAtMillis;o.funcToCall();if(o.recurring){this.scheduleFunction(o.timeoutKey,o.funcToCall,o.millis,true)}}catch(u){}}this.runFunctionsWithinRange(e,t)}};jasmine.FakeTimer.prototype.scheduleFunction=function(e,t,n,r){this.scheduledFunctions[e]={runAtMillis:this.nowMillis+n,funcToCall:t,recurring:r,timeoutKey:e,millis:n}};jasmine.Clock={defaultFakeTimer:new jasmine.FakeTimer,reset:function(){jasmine.Clock.assertInstalled();jasmine.Clock.defaultFakeTimer.reset()},tick:function(e){jasmine.Clock.assertInstalled();jasmine.Clock.defaultFakeTimer.tick(e)},runFunctionsWithinRange:function(e,t){jasmine.Clock.defaultFakeTimer.runFunctionsWithinRange(e,t)},scheduleFunction:function(e,t,n,r){jasmine.Clock.defaultFakeTimer.scheduleFunction(e,t,n,r)},useMock:function(){if(!jasmine.Clock.isInstalled()){var e=jasmine.getEnv().currentSpec;e.after(jasmine.Clock.uninstallMock);jasmine.Clock.installMock()}},installMock:function(){jasmine.Clock.installed=jasmine.Clock.defaultFakeTimer},uninstallMock:function(){jasmine.Clock.assertInstalled();jasmine.Clock.installed=jasmine.Clock.real},real:{setTimeout:jasmine.getGlobal().setTimeout,clearTimeout:jasmine.getGlobal().clearTimeout,setInterval:jasmine.getGlobal().setInterval,clearInterval:jasmine.getGlobal().clearInterval},assertInstalled:function(){if(!jasmine.Clock.isInstalled()){throw new Error("Mock clock is not installed, use jasmine.Clock.useMock()")}},isInstalled:function(){return jasmine.Clock.installed==jasmine.Clock.defaultFakeTimer},installed:null};jasmine.Clock.installed=jasmine.Clock.real;jasmine.getGlobal().setTimeout=function(e,t){if(jasmine.Clock.installed.setTimeout.apply){return jasmine.Clock.installed.setTimeout.apply(this,arguments)}else{return jasmine.Clock.installed.setTimeout(e,t)}};jasmine.getGlobal().setInterval=function(e,t){if(jasmine.Clock.installed.setInterval.apply){return jasmine.Clock.installed.setInterval.apply(this,arguments)}else{return jasmine.Clock.installed.setInterval(e,t)}};jasmine.getGlobal().clearTimeout=function(e){if(jasmine.Clock.installed.clearTimeout.apply){return jasmine.Clock.installed.clearTimeout.apply(this,arguments)}else{return jasmine.Clock.installed.clearTimeout(e)}};jasmine.getGlobal().clearInterval=function(e){if(jasmine.Clock.installed.clearTimeout.apply){return jasmine.Clock.installed.clearInterval.apply(this,arguments)}else{return jasmine.Clock.installed.clearInterval(e)}};jasmine.MultiReporter=function(){this.subReporters_=[]};jasmine.util.inherit(jasmine.MultiReporter,jasmine.Reporter);jasmine.MultiReporter.prototype.addReporter=function(e){this.subReporters_.push(e)};(function(){var e=["reportRunnerStarting","reportRunnerResults","reportSuiteResults","reportSpecStarting","reportSpecResults","log"];for(var t=0;t<e.length;t++){var n=e[t];jasmine.MultiReporter.prototype[n]=function(e){return function(){for(var t=0;t<this.subReporters_.length;t++){var n=this.subReporters_[t];if(n[e]){n[e].apply(n,arguments)}}}}(n)}})();jasmine.NestedResults=function(){this.totalCount=0;this.passedCount=0;this.failedCount=0;this.skipped=false;this.items_=[]};jasmine.NestedResults.prototype.rollupCounts=function(e){this.totalCount+=e.totalCount;this.passedCount+=e.passedCount;this.failedCount+=e.failedCount};jasmine.NestedResults.prototype.log=function(e){this.items_.push(new jasmine.MessageResult(e))};jasmine.NestedResults.prototype.getItems=function(){return this.items_};jasmine.NestedResults.prototype.addResult=function(e){if(e.type!="log"){if(e.items_){this.rollupCounts(e)}else{this.totalCount++;if(e.passed()){this.passedCount++}else{this.failedCount++}}}this.items_.push(e)};jasmine.NestedResults.prototype.passed=function(){return this.passedCount===this.totalCount};jasmine.PrettyPrinter=function(){this.ppNestLevel_=0};jasmine.PrettyPrinter.prototype.format=function(e){this.ppNestLevel_++;try{if(e===jasmine.undefined){this.emitScalar("undefined")}else if(e===null){this.emitScalar("null")}else if(e===jasmine.getGlobal()){this.emitScalar("<global>")}else if(e.jasmineToString){this.emitScalar(e.jasmineToString())}else if(typeof e==="string"){this.emitString(e)}else if(jasmine.isSpy(e)){this.emitScalar("spy on "+e.identity)}else if(e instanceof RegExp){this.emitScalar(e.toString())}else if(typeof e==="function"){this.emitScalar("Function")}else if(typeof e.nodeType==="number"){this.emitScalar("HTMLNode")}else if(e instanceof Date){this.emitScalar("Date("+e+")")}else if(e.__Jasmine_been_here_before__){this.emitScalar("<circular reference: "+(jasmine.isArray_(e)?"Array":"Object")+">")}else if(jasmine.isArray_(e)||typeof e=="object"){e.__Jasmine_been_here_before__=true;if(jasmine.isArray_(e)){this.emitArray(e)}else{this.emitObject(e)}delete e.__Jasmine_been_here_before__}else{this.emitScalar(e.toString())}}finally{this.ppNestLevel_--}};jasmine.PrettyPrinter.prototype.iterateObject=function(e,t){for(var n in e){if(!e.hasOwnProperty(n))continue;if(n=="__Jasmine_been_here_before__")continue;t(n,e.__lookupGetter__?e.__lookupGetter__(n)!==jasmine.undefined&&e.__lookupGetter__(n)!==null:false)}};jasmine.PrettyPrinter.prototype.emitArray=jasmine.unimplementedMethod_;jasmine.PrettyPrinter.prototype.emitObject=jasmine.unimplementedMethod_;jasmine.PrettyPrinter.prototype.emitScalar=jasmine.unimplementedMethod_;jasmine.PrettyPrinter.prototype.emitString=jasmine.unimplementedMethod_;jasmine.StringPrettyPrinter=function(){jasmine.PrettyPrinter.call(this);this.string=""};jasmine.util.inherit(jasmine.StringPrettyPrinter,jasmine.PrettyPrinter);jasmine.StringPrettyPrinter.prototype.emitScalar=function(e){this.append(e)};jasmine.StringPrettyPrinter.prototype.emitString=function(e){this.append("\'"+e+"\'")};jasmine.StringPrettyPrinter.prototype.emitArray=function(e){if(this.ppNestLevel_>jasmine.MAX_PRETTY_PRINT_DEPTH){this.append("Array");return}this.append("[ ");for(var t=0;t<e.length;t++){if(t>0){this.append(", ")}this.format(e[t])}this.append(" ]")};jasmine.StringPrettyPrinter.prototype.emitObject=function(e){if(this.ppNestLevel_>jasmine.MAX_PRETTY_PRINT_DEPTH){this.append("Object");return}var t=this;this.append("{ ");var n=true;this.iterateObject(e,function(r,i){if(n){n=false}else{t.append(", ")}t.append(r);t.append(" : ");if(i){t.append("<getter>")}else{t.format(e[r])}});this.append(" }")};jasmine.StringPrettyPrinter.prototype.append=function(e){this.string+=e};jasmine.Queue=function(e){this.env=e;this.ensured=[];this.blocks=[];this.running=false;this.index=0;this.offset=0;this.abort=false};jasmine.Queue.prototype.addBefore=function(e,t){if(t===jasmine.undefined){t=false}this.blocks.unshift(e);this.ensured.unshift(t)};jasmine.Queue.prototype.add=function(e,t){if(t===jasmine.undefined){t=false}this.blocks.push(e);this.ensured.push(t)};jasmine.Queue.prototype.insertNext=function(e,t){if(t===jasmine.undefined){t=false}this.ensured.splice(this.index+this.offset+1,0,t);this.blocks.splice(this.index+this.offset+1,0,e);this.offset++};jasmine.Queue.prototype.start=function(e){this.running=true;this.onComplete=e;this.next_()};jasmine.Queue.prototype.isRunning=function(){return this.running};jasmine.Queue.LOOP_DONT_RECURSE=true;jasmine.Queue.prototype.next_=function(){var e=this;var t=true;while(t){t=false;if(e.index<e.blocks.length&&!(this.abort&&!this.ensured[e.index])){var n=true;var r=false;var i=function(){if(jasmine.Queue.LOOP_DONT_RECURSE&&n){r=true;return}if(e.blocks[e.index].abort){e.abort=true}e.offset=0;e.index++;var i=(new Date).getTime();if(e.env.updateInterval&&i-e.env.lastUpdate>e.env.updateInterval){e.env.lastUpdate=i;e.env.setTimeout(function(){e.next_()},0)}else{if(jasmine.Queue.LOOP_DONT_RECURSE&&r){t=true}else{e.next_()}}};e.blocks[e.index].execute(i);n=false;if(r){i()}}else{e.running=false;if(e.onComplete){e.onComplete()}}}};jasmine.Queue.prototype.results=function(){var e=new jasmine.NestedResults;for(var t=0;t<this.blocks.length;t++){if(this.blocks[t].results){e.addResult(this.blocks[t].results())}}return e};jasmine.Runner=function(e){var t=this;t.env=e;t.queue=new jasmine.Queue(e);t.before_=[];t.after_=[];t.suites_=[]};jasmine.Runner.prototype.execute=function(){var e=this;if(e.env.reporter.reportRunnerStarting){e.env.reporter.reportRunnerStarting(this)}e.queue.start(function(){e.finishCallback()})};jasmine.Runner.prototype.beforeEach=function(e){e.typeName="beforeEach";this.before_.splice(0,0,e)};jasmine.Runner.prototype.afterEach=function(e){e.typeName="afterEach";this.after_.splice(0,0,e)};jasmine.Runner.prototype.finishCallback=function(){this.env.reporter.reportRunnerResults(this)};jasmine.Runner.prototype.addSuite=function(e){this.suites_.push(e)};jasmine.Runner.prototype.add=function(e){if(e instanceof jasmine.Suite){this.addSuite(e)}this.queue.add(e)};jasmine.Runner.prototype.specs=function(){var e=this.suites();var t=[];for(var n=0;n<e.length;n++){t=t.concat(e[n].specs())}return t};jasmine.Runner.prototype.suites=function(){return this.suites_};jasmine.Runner.prototype.topLevelSuites=function(){var e=[];for(var t=0;t<this.suites_.length;t++){if(!this.suites_[t].parentSuite){e.push(this.suites_[t])}}return e};jasmine.Runner.prototype.results=function(){return this.queue.results()};jasmine.Spec=function(e,t,n){if(!e){throw new Error("jasmine.Env() required")}if(!t){throw new Error("jasmine.Suite() required")}var r=this;r.id=e.nextSpecId?e.nextSpecId():null;r.env=e;r.suite=t;r.description=n;r.queue=new jasmine.Queue(e);r.afterCallbacks=[];r.spies_=[];r.results_=new jasmine.NestedResults;r.results_.description=n;r.matchersClass=null};jasmine.Spec.prototype.getFullName=function(){return this.suite.getFullName()+" "+this.description+"."};jasmine.Spec.prototype.results=function(){return this.results_};jasmine.Spec.prototype.log=function(){return this.results_.log(arguments)};jasmine.Spec.prototype.runs=function(e){var t=new jasmine.Block(this.env,e,this);this.addToQueue(t);return this};jasmine.Spec.prototype.addToQueue=function(e){if(this.queue.isRunning()){this.queue.insertNext(e)}else{this.queue.add(e)}};jasmine.Spec.prototype.addMatcherResult=function(e){this.results_.addResult(e)};jasmine.Spec.prototype.expect=function(e){var t=new(this.getMatchersClass_())(this.env,e,this);t.not=new(this.getMatchersClass_())(this.env,e,this,true);return t};jasmine.Spec.prototype.waits=function(e){var t=new jasmine.WaitsBlock(this.env,e,this);this.addToQueue(t);return this};jasmine.Spec.prototype.waitsFor=function(e,t,n){var r=null;var i=null;var s=null;for(var o=0;o<arguments.length;o++){var u=arguments[o];switch(typeof u){case"function":r=u;break;case"string":i=u;break;case"number":s=u;break}}var a=new jasmine.WaitsForBlock(this.env,s,r,i,this);this.addToQueue(a);return this};jasmine.Spec.prototype.fail=function(e){var t=new jasmine.ExpectationResult({passed:false,message:e?jasmine.util.formatException(e):"Exception",trace:{stack:e.stack}});this.results_.addResult(t)};jasmine.Spec.prototype.getMatchersClass_=function(){return this.matchersClass||this.env.matchersClass};jasmine.Spec.prototype.addMatchers=function(e){var t=this.getMatchersClass_();var n=function(){t.apply(this,arguments)};jasmine.util.inherit(n,t);jasmine.Matchers.wrapInto_(e,n);this.matchersClass=n};jasmine.Spec.prototype.finishCallback=function(){this.env.reporter.reportSpecResults(this)};jasmine.Spec.prototype.finish=function(e){this.removeAllSpies();this.finishCallback();if(e){e()}};jasmine.Spec.prototype.after=function(e){if(this.queue.isRunning()){this.queue.add(new jasmine.Block(this.env,e,this),true)}else{this.afterCallbacks.unshift(e)}};jasmine.Spec.prototype.execute=function(e){var t=this;if(!t.env.specFilter(t)){t.results_.skipped=true;t.finish(e);return}this.env.reporter.reportSpecStarting(this);t.env.currentSpec=t;t.addBeforesAndAftersToQueue();t.queue.start(function(){t.finish(e)})};jasmine.Spec.prototype.addBeforesAndAftersToQueue=function(){var e=this.env.currentRunner();var t;for(var n=this.suite;n;n=n.parentSuite){for(t=0;t<n.before_.length;t++){this.queue.addBefore(new jasmine.Block(this.env,n.before_[t],this))}}for(t=0;t<e.before_.length;t++){this.queue.addBefore(new jasmine.Block(this.env,e.before_[t],this))}for(t=0;t<this.afterCallbacks.length;t++){this.queue.add(new jasmine.Block(this.env,this.afterCallbacks[t],this),true)}for(n=this.suite;n;n=n.parentSuite){for(t=0;t<n.after_.length;t++){this.queue.add(new jasmine.Block(this.env,n.after_[t],this),true)}}for(t=0;t<e.after_.length;t++){this.queue.add(new jasmine.Block(this.env,e.after_[t],this),true)}};jasmine.Spec.prototype.explodes=function(){throw"explodes function should not have been called"};jasmine.Spec.prototype.spyOn=function(e,t,n){if(e==jasmine.undefined){throw"spyOn could not find an object to spy upon for "+t+"()"}if(!n&&e[t]===jasmine.undefined){throw t+"() method does not exist"}if(!n&&e[t]&&e[t].isSpy){throw new Error(t+" has already been spied upon")}var r=jasmine.createSpy(t);this.spies_.push(r);r.baseObj=e;r.methodName=t;r.originalValue=e[t];e[t]=r;return r};jasmine.Spec.prototype.removeAllSpies=function(){for(var e=0;e<this.spies_.length;e++){var t=this.spies_[e];t.baseObj[t.methodName]=t.originalValue}this.spies_=[]};jasmine.Suite=function(e,t,n,r){var i=this;i.id=e.nextSuiteId?e.nextSuiteId():null;i.description=t;i.queue=new jasmine.Queue(e);i.parentSuite=r;i.env=e;i.before_=[];i.after_=[];i.children_=[];i.suites_=[];i.specs_=[]};jasmine.Suite.prototype.getFullName=function(){var e=this.description;for(var t=this.parentSuite;t;t=t.parentSuite){e=t.description+" "+e}return e};jasmine.Suite.prototype.finish=function(e){this.env.reporter.reportSuiteResults(this);this.finished=true;if(typeof e=="function"){e()}};jasmine.Suite.prototype.beforeEach=function(e){e.typeName="beforeEach";this.before_.unshift(e)};jasmine.Suite.prototype.afterEach=function(e){e.typeName="afterEach";this.after_.unshift(e)};jasmine.Suite.prototype.results=function(){return this.queue.results()};jasmine.Suite.prototype.add=function(e){this.children_.push(e);if(e instanceof jasmine.Suite){this.suites_.push(e);this.env.currentRunner().addSuite(e)}else{this.specs_.push(e)}this.queue.add(e)};jasmine.Suite.prototype.specs=function(){return this.specs_};jasmine.Suite.prototype.suites=function(){return this.suites_};jasmine.Suite.prototype.children=function(){return this.children_};jasmine.Suite.prototype.execute=function(e){var t=this;this.queue.start(function(){t.finish(e)})};jasmine.WaitsBlock=function(e,t,n){this.timeout=t;jasmine.Block.call(this,e,null,n)};jasmine.util.inherit(jasmine.WaitsBlock,jasmine.Block);jasmine.WaitsBlock.prototype.execute=function(e){if(jasmine.VERBOSE){this.env.reporter.log(">> Jasmine waiting for "+this.timeout+" ms...")}this.env.setTimeout(function(){e()},this.timeout)};jasmine.WaitsForBlock=function(e,t,n,r,i){this.timeout=t||e.defaultTimeoutInterval;this.latchFunction=n;this.message=r;this.totalTimeSpentWaitingForLatch=0;jasmine.Block.call(this,e,null,i)};jasmine.util.inherit(jasmine.WaitsForBlock,jasmine.Block);jasmine.WaitsForBlock.TIMEOUT_INCREMENT=10;jasmine.WaitsForBlock.prototype.execute=function(e){if(jasmine.VERBOSE){this.env.reporter.log(">> Jasmine waiting for "+(this.message||"something to happen"))}var t;try{t=this.latchFunction.apply(this.spec)}catch(n){this.spec.fail(n);e();return}if(t){e()}else if(this.totalTimeSpentWaitingForLatch>=this.timeout){var r="timed out after "+this.timeout+" msec waiting for "+(this.message||"something to happen");this.spec.fail({name:"timeout",message:r});this.abort=true;e()}else{this.totalTimeSpentWaitingForLatch+=jasmine.WaitsForBlock.TIMEOUT_INCREMENT;var i=this;this.env.setTimeout(function(){i.execute(e)},jasmine.WaitsForBlock.TIMEOUT_INCREMENT)}};jasmine.version_={major:1,minor:3,build:1,revision:1354556913}'
    , $tests = [ ]

    // eval code outside of scope
    , $eval = ___external_eval

    // how long the test takes
    , $time = null
    , $console = console

    // tracking resources queued up for loading
    , $pending = 0

    // console messages
    , $messages = [ ]
    ,

    // shortcut for callbacks
    _= function() {
      var action = arguments[0]
        , args = [].slice.call(arguments, 1);
      return function() { return action.apply( $this, args ); }
    }

    // loggin messages
    error= function( message ) { add_message('error', message ); },
    add_message= function( type, message ) {
      $messages.push({ type: type, message: message });
    },

    // determines where to load files from
    path_to= function( path ) {

      // check if this is absolute
      if (/^\/|^https?\:\/\//.test(path)) return path;

      // treat as relative
      var root = window.location.href;

      // remove a file name, if any
      root = root.replace(/\/[^\/]*$/g, '');

      // append a trailing slash if needed
      if (!/\/$/.test(root)) root += '/';
      return root + path;
    },

    // prepares the test
    init= function() {
      if ($test_attempt) replace_console();

      // get the test to execute
      get( 'test', {
        load: function( data ) { $test = new $CodeFollowInstructionParser( data ); },
        done: load
      });
    },

    // loads a resource as text
    get= function( name, params ) {
      var path = [ path_to( name ), '?=', $ticks ].join('')
        , request = new XMLHttpRequest();

      // load in all resources as strings
      request.open('GET', path, false);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.onreadystatechange = function() {
        if (request.readyState != 4) return (params.error || function() { })();
        if (params.load) params.load( request.responseText );
        if (params.done) params.done();
      };

      //kick off the request
      request.send();
    },

    // next step in loading
    load= function() {

      // no test was found
      if ($test == null) return end();

      // load each external resource
      for (var z in $test.zone ) load_zone( $test.zone[z] );
      for (var i in $test.include ) load_include( $test.include[i] );

      // populate the user material
      apply_user_content();

      // lastly, load each of the test
      for (var t in $test.test) load_test( $test.test[t] );

      // execute each of the tests
      begin();
      execute( end );

    },

    // execute each of the test
    execute= function( complete ) {
      var code = [ $testing_framework ].concat( $tests ).join(';;')

        // handles executing all of the tests at once
        , execute = function() {
        
            // build the framework and code
            eval( code );

            // execute tests
            var env = jasmine.getEnv();
            env.updateInterval = 10;
            
            // log the results
            var reporter = new $CodeFollowReporter();
            env.addReporter( reporter );
            
            // watch for this to finish
            var finished = env.currentRunner().finishCallback;
            env.currentRunner().finishCallback = function () {
              finished.apply(this, arguments);
              complete();
            };

            // kick off the testing
            env.execute();
        };

        // start the app view
        if (window.addEventListener) window.addEventListener( 'load', execute, false );
        else window.attachEvent('onload', execute);
    },

    // loads the user submission
    apply_user_content= function() {
      get('input', {
        load: function( data ) {
          data = JSON.parse( data );

          // replace each content item returned
          for (var k in data.zones) {
            var item = data.zones[ k ];

            // execute if needed
            var target = document.getElementById( k );
            if ( target ) 
              target.innerHTML = item.content;
            else
              $eval( item.content );

          }
        }});
    },

    // avoids loading resources for test items
    skip_resource = function( item ) {
      return $test_attempt && item.test;
    },

    // adds CSS to the page
    load_zone= function( zone ) {
      if (skip_resource(zone)) return;
        
      // find and update the target
      var target = document.getElementById( zone['for'] )
      if ( target == null ) return;
      if (zone.remove_id) target.id = null;

      // load content if required
      if ( !zone.data && zone.source )
        get( zone.source, { load: function( data ) { zone.data = data; }} );

      // populate the area or run the script
      if ( /^script$/i.test( target.tagName ) ) $eval( zone.data );
      else target.innerHTML = zone.data;

    },

    // adds CSS to the page
    load_test= function( test ) {
      if ( test.data ) $tests.push( test.data );
      if ( test.source ) get( test.source, {
        load: function( data ) { $tests.push( data ); } 
      });
    },

    // updates a zone on the page
    load_include= function( include ) {
      if (skip_resource(include)) return;

      // it's a JS file
      if ( /\.js$/i.test( include.source ) )
        load_resource_as_script( include.source );

      // if it's a CSS file
      else if ( /\.css$/i.test( include.source ) )
        load_resource_as_css( include.source );

    },

    // loads an attaches a CSS file
    load_resource_as_css= function( source ) {
      get( source, { 
        load: function(data) {
          var element = document.createElement('style');
          element.type = 'text/css';

          // appy the style
          if (element.styleSheet) element.styleSheet.cssText = data;
          else element.appendChild(document.createTextNode(data));
          document.head.appendChild( element );
        }
      });
    },

    // loads an attaches a JavaScript file
    load_resource_as_script= function( source ) {
      get( source, {
        load: function(data) {
          var element = document.createElement('script');
          element.type = 'text/javascript';
          element.innerHTML = data;
          document.body.appendChild( element );
        }
      });
    },

    // user messages get captured
    replace_console= function() {
      window.console = {
        log: function() {
          var message = [].slice.call( arguments, 0 ).join(' ').replace(/(\s|\t|\n)+/g, ' ');
          add_message('console', message );
        }
      };
    },

    // causes the test to start
    begin= function() {
      $time = new Date();
    },

    // causes the test to close
    end= function() {
      var end = new Date()
        , output = [ ];

      // start writing the results
      output.push('== BEGIN ==');
      output = output.concat( $results );
      
      // additional test information
      output.push('== SUMMARY ==');
      output.push('time\t' + (end-$time).toString());

      // console messages
      for( var m in $messages )
        if ($messages[m].type == 'console')
          output.push('message\t' + $messages[m].message);

      // save for review
      output.push('== END ==');

      // write the final message
      var result = output.join('\n');
      $console.log( result );
    };

  init();
  
})();