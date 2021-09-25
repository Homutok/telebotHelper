//'use strict';
/** @type {string} */
var $ua = window.navigator.userAgent;
/** @type {number} */
var $msie = $ua.indexOf("MSIE ");
var $special;
jQuery("html").hide();
(function($) {
  /**
   * @param {string} commaParam
   * @return {?}
   */
  $.fn.removeClassWild = function(commaParam) {
    return this.removeClass(function(index, layoutStr) {
      var _ddoc = commaParam.replace(/\*/g, "\\S+");
      return (layoutStr.match(new RegExp("\\b" + _ddoc + "", "g")) || []).join(" ");
    });
  };
  special = {
    Reset : function() {
      $special = {
        active : 1,
        color : 1,
        font_family : 1,
        font_size : 1,
        line_height : 1,
        letter_spacing : 1,
        images : 1
      };
      $.cookie("special", $special, {
        path : "/"
      });
    },
    Set : function() {
      $("html").removeClassWild("special-*").addClass("special-color-" + $special.color).addClass("special-font-size-" + $special.font_size).addClass("special-font-family-" + $special.font_family).addClass("special-line-height-" + $special.line_height).addClass("special-letter-spacing-" + $special.letter_spacing).addClass("special-images-" + $special.images);
      $("#special button").removeClass("active");
      $(".special-color button[value=" + $special.color + "]").addClass("active");
      $(".special-font-size button[value=" + $special.font_size + "]").addClass("active");
      $(".special-font-family button[value=" + $special.font_family + "]").addClass("active");
      $(".special-line-height button[value=" + $special.line_height + "]").addClass("active");
      $(".special-letter-spacing button[value=" + $special.letter_spacing + "]").addClass("active");
      $(".special-images button").val($special.images);
      special.ToggleImages();
    },
    ToggleImages : function() {
      $("img").each(function() {
        if ($special.images) {
          if ($(this).data("src")) {
            $(this).attr("src", $(this).data("src"));
          }
          if ($(this).data("srcset")) {
            $(this).attr("srcset", $(this).data("srcset"));
          }
        } else {
          $(this).data("src", $(this).attr("src"));
          if ($(this).attr("srcset")) {
            $(this).data("srcset", $(this).attr("srcset"));
          }
          $(this).removeAttr("src");
          if ($(this).attr("srcset")) {
            $(this).removeAttr("srcset");
          }
        }
      });
    },
    Off : function() {
        
      if ($("#specialButton").length) {
        $("html").removeClass("special").removeClassWild("special-*");
        $("i.special-audio").remove();
        if (responsiveVoice.isPlaying()) {
          responsiveVoice.cancel();
        }
        $("audio").remove();
        $("#special").remove();
        $.removeCookie("special", {
          path : "/"
        });
        $("#specialButton").show();
        $(".unspecial").show();
        $(".trdata").css('border-bottom', '');
        $(".techbut").css('width','250px');
        $(".sbtext").css('font-weight', 'normal');
        $(".nicebut").css('filter', 'invert(0%)');
      } else {
        if ($msie > 0) {
          /** @type {string} */
          var u = window.location + "";
          if (u.indexOf("template=") >= 0) {
            /** @type {string} */
            window.location = u.replace(/template=\d+/g, "template=0");
          } else {
            /** @type {string} */
            window.location = u + "?template=0";
          }
        } else {
          $.post(window.location.origin + window.location.pathname, {
            template : 0
          }, function() {
            /** @type {string} */
            window.location = window.location.origin + window.location.pathname;
          });
        }
      }
    },
    On : function() {
//      $("head").append($('<link rel="stylesheet" type="text/css" />').attr("href", "//lidrekon.ru/slep/css/special.min.css"));
      if (!$special) {
        special.Reset();
      }
      if ($("#specialButton").length) {
        /** @type {number} */
        $special.active = 1;
        $.cookie("special", $special, {
          path : "/"
        });
        $("#specialButton").hide();
        $(".unspecial").hide();
        $(".trdata").css('border-bottom', '1px solid black');
        $(".techbut").css('width',250*$special.font_size+'px');
        $(".sbtext").css('font-weight', 'bold');
        $(".nicebut").css('filter', 'invert(100%)');
      }
      $("html").addClass("special");
      $("body").prepend($($tpl));
      special.Set();
      $("#special button").on("click", function() {
        var key = $(this).parent().attr("class").replace("special-", "");
        if (key) {
          $("#special .special-" + key + " button").removeClass("active");
          switch(key) {
            case "color":
              /** @type {number} */
              $special.color = parseInt($(this).val());
              $(this).addClass("active");
              $("html").removeClassWild("special-" + key + "-*").addClass("special-" + key + "-" + $(this).val());
              $.cookie("special", $special, {
                path : "/"
              });
              break;
            case "font-size":
              /** @type {number} */
              $special.font_size = parseInt($(this).val());
              $(".techbut").css('width',250*$special.font_size+'px');
              $(this).addClass("active");
              $("html").removeClassWild("special-" + key + "-*").addClass("special-" + key + "-" + $(this).val());
              $.cookie("special", $special, {
                path : "/"
              });
              break;
            case "font-family":
              /** @type {number} */
              $special.font_family = parseInt($(this).val());
              $(this).addClass("active");
              $("html").removeClassWild("special-" + key + "-*").addClass("special-" + key + "-" + $(this).val());
              $.cookie("special", $special, {
                path : "/"
              });
              break;
            case "line-height":
              /** @type {number} */
              $special.line_height = parseInt($(this).val());
              $(this).addClass("active");
              $("html").removeClassWild("special-" + key + "-*").addClass("special-" + key + "-" + $(this).val());
              $.cookie("special", $special, {
                path : "/"
              });
              break;
            case "letter-spacing":
              /** @type {number} */
              $special.letter_spacing = parseInt($(this).val());
              $(this).addClass("active");
              $("html").removeClassWild("special-" + key + "-*").addClass("special-" + key + "-" + $(this).val());
              $.cookie("special", $special, {
                path : "/"
              });
              break;
            case "images":
              /** @type {number} */
              $special.images = $special.images ? 0 : 1;
              $(this).val($special.images);
              special.ToggleImages();
              $.cookie("special", $special, {
                path : "/"
              });
              break;
            case "audio":
              if ($(this).val() == 1) {
                $("i.special-audio").remove();
                if (responsiveVoice.isPlaying()) {
                  responsiveVoice.cancel();
                }
                $("p,h1,h2,h3,h4,h5,h6,li,dt,dd,.audiotext").off();
                $(this).val(0);
              } else {
                responsiveVoice.speak("\u0412\u043a\u043b\u044e\u0447\u0435\u043d\u043e \u043e\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u043d\u0438\u0435 \u0442\u0435\u043a\u0441\u0442\u0430.", "Russian Female");
                $(this).addClass("active");
                $(this).val(1);
                $("p,h1,h2,h3,h4,h5,h6,li,dt,dd,.audiotext").on("mouseover", function() {
                  if (responsiveVoice.isPlaying()) {
                    responsiveVoice.cancel();
                  }
                  responsiveVoice.speak($(this).text().trim(), "Russian Female");
                });
              }
              break;
            case "settings":
              $("#special-settings-body").slideToggle();
              break;
            case "settings-close":
              $("#special-settings-body").slideUp();
              break;
            case "reset":
              special.Reset();
              special.Set();
              $("#special-settings-body").slideUp();
              break;
            case "quit":
              special.Off();
              break;
          }
        }
      });
    }
  };
})(jQuery);
jQuery(function($) {
  /** @type {string} */
  $version = "1.3";
  /** @type {boolean} */
  $.cookie.json = true;
  $special = $.cookie("special");
  if ($("#specialButton").length) {
    /** @type {string} */
    $subversion = "lite";
    if ($special && $special.active) {
      special.On();
    }
    $("#specialButton").on("click", special.On);
  } else {
    /** @type {string} */
    $subversion = "pro";
    special.On();
  }
  console.info("Special version %s (%s).\nUser agent: %s", $version, $subversion, $ua);
  $("html").fadeIn(1E3);
});
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else {
    if (typeof exports === "object") {
      factory(require("jquery"));
    } else {
      factory(jQuery);
    }
  }
})(function($) {
  /**
   * @param {string} value
   * @return {?}
   */
  function encode(value) {
    return config.raw ? value : encodeURIComponent(value);
  }
  /**
   * @param {string} s
   * @return {?}
   */
  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }
  /**
   * @param {string} value
   * @return {?}
   */
  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }
  /**
   * @param {string} s
   * @return {?}
   */
  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }
    try {
      /** @type {string} */
      s = decodeURIComponent(s.replace(spaceRegexp, " "));
      return config.json ? JSON.parse(s) : s;
    } catch (e) {
    }
  }
  /**
   * @param {string} s
   * @param {string} converter
   * @return {?}
   */
  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }
  /** @type {!RegExp} */
  var spaceRegexp = /\+/g;
  /** @type {function(string, string, !Object): ?} */
  var config = $.cookie = function(key, value, options) {
    if (value !== undefined && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);
      if (typeof options.expires === "number") {
        /** @type {number} */
        var days = options.expires;
        /** @type {!Date} */
        var t = options.expires = new Date;
        t.setTime(+t + days * 864E5);
      }
      return document.cookie = [encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join("");
    }
    /** @type {(undefined|{})} */
    var result = key ? undefined : {};
    /** @type {!Array} */
    var rules_array = document.cookie ? document.cookie.split("; ") : [];
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    var l = rules_array.length;
    for (; i < l; i++) {
      var parts = rules_array[i].split("=");
      var name = decode(parts.shift());
      var cookie = parts.join("=");
      if (key && key === name) {
        result = read(cookie, value);
        break;
      }
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }
    return result;
  };
  config.defaults = {};
  /**
   * @param {string} name
   * @param {?} options
   * @return {?}
   */
  $.removeCookie = function(name, options) {
    if ($.cookie(name) === undefined) {
      return false;
    }
    $.cookie(name, "", $.extend({}, options, {
      expires : -1
    }));
    return !$.cookie(name);
  };
});
if ("undefined" != typeof responsiveVoice) {
  console.log("ResponsiveVoice already loaded");
  console.log(responsiveVoice);
} else {
  /**
   * @return {undefined}
   */
  var ResponsiveVoice = function() {
    var a$jscomp$0 = this;
    /** @type {string} */
    a$jscomp$0.version = "1.5.0";
    console.log("ResponsiveVoice r" + a$jscomp$0.version);
    /** @type {!Array} */
    a$jscomp$0.responsivevoices = [{
      name : "UK English Female",
      flag : "gb",
      gender : "f",
      voiceIDs : [3, 5, 1, 6, 7, 171, 201, 8]
    }, {
      name : "UK English Male",
      flag : "gb",
      gender : "m",
      voiceIDs : [0, 4, 2, 75, 202, 159, 6, 7]
    }, {
      name : "US English Female",
      flag : "us",
      gender : "f",
      voiceIDs : [39, 40, 41, 42, 43, 173, 205, 204, 235, 44]
    }, {
      name : "Arabic Male",
      flag : "ar",
      gender : "m",
      voiceIDs : [96, 95, 97, 196, 98],
      deprecated : true
    }, {
      name : "Arabic Female",
      flag : "ar",
      gender : "f",
      voiceIDs : [96, 95, 97, 196, 98]
    }, {
      name : "Armenian Male",
      flag : "hy",
      gender : "f",
      voiceIDs : [99]
    }, {
      name : "Australian Female",
      flag : "au",
      gender : "f",
      voiceIDs : [87, 86, 5, 201, 88]
    }, {
      name : "Brazilian Portuguese Female",
      flag : "br",
      gender : "f",
      voiceIDs : [245, 124, 123, 125, 186, 223, 126]
    }, {
      name : "Chinese Female",
      flag : "cn",
      gender : "f",
      voiceIDs : [249, 58, 59, 60, 155, 191, 231, 61]
    }, {
      name : "Chinese (Hong Kong) Female",
      flag : "hk",
      gender : "f",
      voiceIDs : [192, 193, 232, 250, 251, 252]
    }, {
      name : "Chinese Taiwan Female",
      flag : "tw",
      gender : "f",
      voiceIDs : [252, 194, 233, 253, 254, 255]
    }, {
      name : "Czech Female",
      flag : "cz",
      gender : "f",
      voiceIDs : [101, 100, 102, 197, 103]
    }, {
      name : "Danish Female",
      flag : "dk",
      gender : "f",
      voiceIDs : [105, 104, 106, 198, 107]
    }, {
      name : "Deutsch Female",
      flag : "de",
      gender : "f",
      voiceIDs : [27, 28, 29, 30, 31, 78, 170, 199, 32]
    }, {
      name : "Dutch Female",
      flag : "nl",
      gender : "f",
      voiceIDs : [243, 219, 84, 157, 158, 184, 45]
    }, {
      name : "Finnish Female",
      flag : "fi",
      gender : "f",
      voiceIDs : [90, 89, 91, 209, 92]
    }, {
      name : "French Female",
      flag : "fr",
      gender : "f",
      voiceIDs : [240, 21, 22, 23, 77, 178, 210, 26]
    }, {
      name : "Greek Female",
      flag : "gr",
      gender : "f",
      voiceIDs : [62, 63, 80, 200, 64]
    }, {
      name : "Hatian Creole Female",
      flag : "ht",
      gender : "f",
      voiceIDs : [109]
    }, {
      name : "Hindi Female",
      flag : "hi",
      gender : "f",
      voiceIDs : [247, 66, 154, 179, 213, 67]
    }, {
      name : "Hungarian Female",
      flag : "hu",
      gender : "f",
      voiceIDs : [9, 10, 81, 214, 11]
    }, {
      name : "Indonesian Female",
      flag : "id",
      gender : "f",
      voiceIDs : [241, 111, 112, 180, 215, 113]
    }, {
      name : "Italian Female",
      flag : "it",
      gender : "f",
      voiceIDs : [242, 33, 34, 35, 36, 37, 79, 181, 216, 38]
    }, {
      name : "Japanese Female",
      flag : "jp",
      gender : "f",
      voiceIDs : [248, 50, 51, 52, 153, 182, 217, 53]
    }, {
      name : "Korean Female",
      flag : "kr",
      gender : "f",
      voiceIDs : [54, 55, 56, 156, 183, 218, 57]
    }, {
      name : "Latin Female",
      flag : "va",
      gender : "f",
      voiceIDs : [114]
    }, {
      name : "Norwegian Female",
      flag : "no",
      gender : "f",
      voiceIDs : [72, 73, 221, 74]
    }, {
      name : "Polish Female",
      flag : "pl",
      gender : "f",
      voiceIDs : [244, 120, 119, 121, 185, 222, 122]
    }, {
      name : "Portuguese Female",
      flag : "br",
      gender : "f",
      voiceIDs : [128, 127, 129, 187, 224, 130]
    }, {
      name : "Romanian Male",
      flag : "ro",
      gender : "m",
      voiceIDs : [151, 150, 152, 225, 46]
    }, {
      name : "Russian Female",
      flag : "ru",
      gender : "f",
      voiceIDs : [246, 47, 48, 83, 188, 226, 49]
    }, {
      name : "Slovak Female",
      flag : "sk",
      gender : "f",
      voiceIDs : [133, 132, 134, 227, 135]
    }, {
      name : "Spanish Female",
      flag : "es",
      gender : "f",
      voiceIDs : [19, 238, 16, 17, 18, 20, 76, 174, 207, 15]
    }, {
      name : "Spanish Latin American Female",
      flag : "es",
      gender : "f",
      voiceIDs : [239, 137, 136, 138, 175, 208, 139]
    }, {
      name : "Swedish Female",
      flag : "sv",
      gender : "f",
      voiceIDs : [85, 148, 149, 228, 65]
    }, {
      name : "Tamil Male",
      flag : "hi",
      gender : "m",
      voiceIDs : [141]
    }, {
      name : "Thai Female",
      flag : "th",
      gender : "f",
      voiceIDs : [143, 142, 144, 189, 229, 145]
    }, {
      name : "Turkish Female",
      flag : "tr",
      gender : "f",
      voiceIDs : [69, 70, 82, 190, 230, 71]
    }, {
      name : "Afrikaans Male",
      flag : "af",
      gender : "m",
      voiceIDs : [93]
    }, {
      name : "Albanian Male",
      flag : "sq",
      gender : "m",
      voiceIDs : [94]
    }, {
      name : "Bosnian Male",
      flag : "bs",
      gender : "m",
      voiceIDs : [14]
    }, {
      name : "Catalan Male",
      flag : "catalonia",
      gender : "m",
      voiceIDs : [68]
    }, {
      name : "Croatian Male",
      flag : "hr",
      gender : "m",
      voiceIDs : [13]
    }, {
      name : "Czech Male",
      flag : "cz",
      gender : "m",
      voiceIDs : [161]
    }, {
      name : "Danish Male",
      flag : "da",
      gender : "m",
      voiceIDs : [162],
      deprecated : true
    }, {
      name : "Esperanto Male",
      flag : "eo",
      gender : "m",
      voiceIDs : [108]
    }, {
      name : "Finnish Male",
      flag : "fi",
      gender : "m",
      voiceIDs : [160],
      deprecated : true
    }, {
      name : "Greek Male",
      flag : "gr",
      gender : "m",
      voiceIDs : [163],
      deprecated : true
    }, {
      name : "Hungarian Male",
      flag : "hu",
      gender : "m",
      voiceIDs : [164]
    }, {
      name : "Icelandic Male",
      flag : "is",
      gender : "m",
      voiceIDs : [110]
    }, {
      name : "Latin Male",
      flag : "va",
      gender : "m",
      voiceIDs : [165],
      deprecated : true
    }, {
      name : "Latvian Male",
      flag : "lv",
      gender : "m",
      voiceIDs : [115]
    }, {
      name : "Macedonian Male",
      flag : "mk",
      gender : "m",
      voiceIDs : [116]
    }, {
      name : "Moldavian Male",
      flag : "md",
      gender : "m",
      voiceIDs : [117]
    }, {
      name : "Montenegrin Male",
      flag : "me",
      gender : "m",
      voiceIDs : [118]
    }, {
      name : "Norwegian Male",
      flag : "no",
      gender : "m",
      voiceIDs : [166]
    }, {
      name : "Serbian Male",
      flag : "sr",
      gender : "m",
      voiceIDs : [12]
    }, {
      name : "Serbo-Croatian Male",
      flag : "hr",
      gender : "m",
      voiceIDs : [131]
    }, {
      name : "Slovak Male",
      flag : "sk",
      gender : "m",
      voiceIDs : [167],
      deprecated : true
    }, {
      name : "Swahili Male",
      flag : "sw",
      gender : "m",
      voiceIDs : [140]
    }, {
      name : "Swedish Male",
      flag : "sv",
      gender : "m",
      voiceIDs : [168],
      deprecated : true
    }, {
      name : "Vietnamese Male",
      flag : "vi",
      gender : "m",
      voiceIDs : [146],
      deprecated : true
    }, {
      name : "Welsh Male",
      flag : "cy",
      gender : "m",
      voiceIDs : [147]
    }, {
      name : "US English Male",
      flag : "us",
      gender : "m",
      voiceIDs : [0, 4, 2, 6, 7, 75, 159, 234, 236, 237]
    }, {
      name : "Fallback UK Female",
      flag : "gb",
      gender : "f",
      voiceIDs : [8]
    }];
    /** @type {!Array} */
    a$jscomp$0.voicecollection = [{
      name : "Google UK English Male"
    }, {
      name : "Agnes"
    }, {
      name : "Daniel Compact"
    }, {
      name : "Google UK English Female"
    }, {
      name : "en-GB",
      rate : .25,
      pitch : 1
    }, {
      name : "en-AU",
      rate : .25,
      pitch : 1
    }, {
      name : "ingl\u00e9s Reino Unido"
    }, {
      name : "English United Kingdom"
    }, {
      name : "Fallback en-GB Female",
      lang : "en-GB",
      fallbackvoice : true
    }, {
      name : "Eszter Compact"
    }, {
      name : "hu-HU",
      rate : .4
    }, {
      name : "Fallback Hungarian",
      lang : "hu",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Fallback Serbian",
      lang : "sr",
      fallbackvoice : true
    }, {
      name : "Fallback Croatian",
      lang : "hr",
      fallbackvoice : true
    }, {
      name : "Fallback Bosnian",
      lang : "bs",
      fallbackvoice : true
    }, {
      name : "Fallback Spanish",
      lang : "es",
      fallbackvoice : true
    }, {
      name : "Spanish Spain"
    }, {
      name : "espa\u00f1ol Espa\u00f1a"
    }, {
      name : "Diego Compact",
      rate : .3
    }, {
      name : "Google Espa\u00f1ol"
    }, {
      name : "es-ES",
      rate : .2
    }, {
      name : "Google Fran\u00e7ais"
    }, {
      name : "French France"
    }, {
      name : "franc\u00e9s Francia"
    }, {
      name : "Virginie Compact",
      rate : .5
    }, {
      name : "fr-FR",
      rate : .25
    }, {
      name : "Fallback French",
      lang : "fr",
      fallbackvoice : true
    }, {
      name : "Google Deutsch"
    }, {
      name : "German Germany"
    }, {
      name : "alem\u00e1n Alemania"
    }, {
      name : "Yannick Compact",
      rate : .5
    }, {
      name : "de-DE",
      rate : .25
    }, {
      name : "Fallback Deutsch",
      lang : "de",
      fallbackvoice : true
    }, {
      name : "Google Italiano"
    }, {
      name : "Italian Italy"
    }, {
      name : "italiano Italia"
    }, {
      name : "Paolo Compact",
      rate : .5
    }, {
      name : "it-IT",
      rate : .25
    }, {
      name : "Fallback Italian",
      lang : "it",
      fallbackvoice : true
    }, {
      name : "Google US English",
      timerSpeed : 1
    }, {
      name : "English United States"
    }, {
      name : "ingl\u00e9s Estados Unidos"
    }, {
      name : "Vicki"
    }, {
      name : "en-US",
      rate : .2,
      pitch : 1,
      timerSpeed : 1.3
    }, {
      name : "Fallback English",
      lang : "en-US",
      fallbackvoice : true,
      timerSpeed : 0
    }, {
      name : "Fallback Dutch",
      lang : "nl",
      fallbackvoice : true,
      timerSpeed : 0
    }, {
      name : "Fallback Romanian",
      lang : "ro",
      fallbackvoice : true
    }, {
      name : "Milena Compact"
    }, {
      name : "ru-RU",
      rate : .25
    }, {
      name : "Fallback Russian",
      lang : "ru",
      fallbackvoice : true
    }, {
      name : "Google \u65e5\u672c\u4eba",
      timerSpeed : 1
    }, {
      name : "Kyoko Compact"
    }, {
      name : "ja-JP",
      rate : .25
    }, {
      name : "Fallback Japanese",
      lang : "ja",
      fallbackvoice : true
    }, {
      name : "Google \ud55c\uad6d\uc758",
      timerSpeed : 1
    }, {
      name : "Narae Compact"
    }, {
      name : "ko-KR",
      rate : .25
    }, {
      name : "Fallback Korean",
      lang : "ko",
      fallbackvoice : true
    }, {
      name : "Google \u4e2d\u56fd\u7684",
      timerSpeed : 1
    }, {
      name : "Ting-Ting Compact"
    }, {
      name : "zh-CN",
      rate : .25
    }, {
      name : "Fallback Chinese",
      lang : "zh-CN",
      fallbackvoice : true
    }, {
      name : "Alexandros Compact"
    }, {
      name : "el-GR",
      rate : .25
    }, {
      name : "Fallback Greek",
      lang : "el",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Fallback Swedish",
      lang : "sv",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "hi-IN",
      rate : .25
    }, {
      name : "Fallback Hindi",
      lang : "hi",
      fallbackvoice : true
    }, {
      name : "Fallback Catalan",
      lang : "ca",
      fallbackvoice : true
    }, {
      name : "Aylin Compact"
    }, {
      name : "tr-TR",
      rate : .25
    }, {
      name : "Fallback Turkish",
      lang : "tr",
      fallbackvoice : true
    }, {
      name : "Stine Compact"
    }, {
      name : "no-NO",
      rate : .25
    }, {
      name : "Fallback Norwegian",
      lang : "no",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Daniel"
    }, {
      name : "Monica"
    }, {
      name : "Amelie"
    }, {
      name : "Anna"
    }, {
      name : "Alice"
    }, {
      name : "Melina"
    }, {
      name : "Mariska"
    }, {
      name : "Yelda"
    }, {
      name : "Milena"
    }, {
      name : "Xander"
    }, {
      name : "Alva"
    }, {
      name : "Lee Compact"
    }, {
      name : "Karen"
    }, {
      name : "Fallback Australian",
      lang : "en-AU",
      fallbackvoice : true
    }, {
      name : "Mikko Compact"
    }, {
      name : "Satu"
    }, {
      name : "fi-FI",
      rate : .25
    }, {
      name : "Fallback Finnish",
      lang : "fi",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Fallback Afrikans",
      lang : "af",
      fallbackvoice : true
    }, {
      name : "Fallback Albanian",
      lang : "sq",
      fallbackvoice : true
    }, {
      name : "Maged Compact"
    }, {
      name : "Tarik"
    }, {
      name : "ar-SA",
      rate : .25
    }, {
      name : "Fallback Arabic",
      lang : "ar",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Fallback Armenian",
      lang : "hy",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Zuzana Compact"
    }, {
      name : "Zuzana"
    }, {
      name : "cs-CZ",
      rate : .25
    }, {
      name : "Fallback Czech",
      lang : "cs",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Ida Compact"
    }, {
      name : "Sara"
    }, {
      name : "da-DK",
      rate : .25
    }, {
      name : "Fallback Danish",
      lang : "da",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Fallback Esperanto",
      lang : "eo",
      fallbackvoice : true
    }, {
      name : "Fallback Hatian Creole",
      lang : "ht",
      fallbackvoice : true
    }, {
      name : "Fallback Icelandic",
      lang : "is",
      fallbackvoice : true
    }, {
      name : "Damayanti"
    }, {
      name : "id-ID",
      rate : .25
    }, {
      name : "Fallback Indonesian",
      lang : "id",
      fallbackvoice : true
    }, {
      name : "Fallback Latin",
      lang : "la",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Fallback Latvian",
      lang : "lv",
      fallbackvoice : true
    }, {
      name : "Fallback Macedonian",
      lang : "mk",
      fallbackvoice : true
    }, {
      name : "Fallback Moldavian",
      lang : "mo",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Fallback Montenegrin",
      lang : "sr-ME",
      fallbackvoice : true
    }, {
      name : "Agata Compact"
    }, {
      name : "Zosia"
    }, {
      name : "pl-PL",
      rate : .25
    }, {
      name : "Fallback Polish",
      lang : "pl",
      fallbackvoice : true
    }, {
      name : "Raquel Compact"
    }, {
      name : "Luciana"
    }, {
      name : "pt-BR",
      rate : .25
    }, {
      name : "Fallback Brazilian Portugese",
      lang : "pt-BR",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Joana Compact"
    }, {
      name : "Joana"
    }, {
      name : "pt-PT",
      rate : .25
    }, {
      name : "Fallback Portuguese",
      lang : "pt-PT",
      fallbackvoice : true
    }, {
      name : "Fallback Serbo-Croation",
      lang : "sh",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Laura Compact"
    }, {
      name : "Laura"
    }, {
      name : "sk-SK",
      rate : .25
    }, {
      name : "Fallback Slovak",
      lang : "sk",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Javier Compact"
    }, {
      name : "Paulina"
    }, {
      name : "es-MX",
      rate : .25
    }, {
      name : "Fallback Spanish (Latin American)",
      lang : "es-419",
      fallbackvoice : true,
      service : "g2"
    }, {
      name : "Fallback Swahili",
      lang : "sw",
      fallbackvoice : true
    }, {
      name : "Fallback Tamil",
      lang : "ta",
      fallbackvoice : true
    }, {
      name : "Narisa Compact"
    }, {
      name : "Kanya"
    }, {
      name : "th-TH",
      rate : .25
    }, {
      name : "Fallback Thai",
      lang : "th",
      fallbackvoice : true
    }, {
      name : "Fallback Vietnamese",
      lang : "vi",
      fallbackvoice : true
    }, {
      name : "Fallback Welsh",
      lang : "cy",
      fallbackvoice : true
    }, {
      name : "Oskar Compact"
    }, {
      name : "sv-SE",
      rate : .25
    }, {
      name : "Simona Compact"
    }, {
      name : "Ioana"
    }, {
      name : "ro-RO",
      rate : .25
    }, {
      name : "Kyoko"
    }, {
      name : "Lekha"
    }, {
      name : "Ting-Ting"
    }, {
      name : "Yuna"
    }, {
      name : "Xander Compact"
    }, {
      name : "nl-NL",
      rate : .25
    }, {
      name : "Fallback UK English Male",
      lang : "en-GB",
      fallbackvoice : true,
      service : "g1",
      voicename : "rjs"
    }, {
      name : "Finnish Male",
      lang : "fi",
      fallbackvoice : true,
      service : "g1",
      voicename : ""
    }, {
      name : "Czech Male",
      lang : "cs",
      fallbackvoice : true,
      service : "g1",
      voicename : ""
    }, {
      name : "Danish Male",
      lang : "da",
      fallbackvoice : true,
      service : "g1",
      voicename : ""
    }, {
      name : "Greek Male",
      lang : "el",
      fallbackvoice : true,
      service : "g1",
      voicename : "",
      rate : .25
    }, {
      name : "Hungarian Male",
      lang : "hu",
      fallbackvoice : true,
      service : "g1",
      voicename : ""
    }, {
      name : "Latin Male",
      lang : "la",
      fallbackvoice : true,
      service : "g1",
      voicename : ""
    }, {
      name : "Norwegian Male",
      lang : "no",
      fallbackvoice : true,
      service : "g1",
      voicename : ""
    }, {
      name : "Slovak Male",
      lang : "sk",
      fallbackvoice : true,
      service : "g1",
      voicename : ""
    }, {
      name : "Swedish Male",
      lang : "sv",
      fallbackvoice : true,
      service : "g1",
      voicename : ""
    }, {
      name : "Fallback US English Male",
      lang : "en",
      fallbackvoice : true,
      service : "tts-api",
      voicename : ""
    }, {
      name : "German Germany",
      lang : "de_DE"
    }, {
      name : "English United Kingdom",
      lang : "en_GB"
    }, {
      name : "English India",
      lang : "en_IN"
    }, {
      name : "English United States",
      lang : "en_US"
    }, {
      name : "Spanish Spain",
      lang : "es_ES"
    }, {
      name : "Spanish Mexico",
      lang : "es_MX"
    }, {
      name : "Spanish United States",
      lang : "es_US"
    }, {
      name : "French Belgium",
      lang : "fr_BE"
    }, {
      name : "French France",
      lang : "fr_FR"
    }, {
      name : "Hindi India",
      lang : "hi_IN"
    }, {
      name : "Indonesian Indonesia",
      lang : "in_ID"
    }, {
      name : "Italian Italy",
      lang : "it_IT"
    }, {
      name : "Japanese Japan",
      lang : "ja_JP"
    }, {
      name : "Korean South Korea",
      lang : "ko_KR"
    }, {
      name : "Dutch Netherlands",
      lang : "nl_NL"
    }, {
      name : "Polish Poland",
      lang : "pl_PL"
    }, {
      name : "Portuguese Brazil",
      lang : "pt_BR"
    }, {
      name : "Portuguese Portugal",
      lang : "pt_PT"
    }, {
      name : "Russian Russia",
      lang : "ru_RU"
    }, {
      name : "Thai Thailand",
      lang : "th_TH"
    }, {
      name : "Turkish Turkey",
      lang : "tr_TR"
    }, {
      name : "Chinese China",
      lang : "zh_CN_#Hans"
    }, {
      name : "Chinese Hong Kong",
      lang : "zh_HK_#Hans"
    }, {
      name : "Chinese Hong Kong",
      lang : "zh_HK_#Hant"
    }, {
      name : "Chinese Taiwan",
      lang : "zh_TW_#Hant"
    }, {
      name : "Alex"
    }, {
      name : "Maged",
      lang : "ar-SA"
    }, {
      name : "Zuzana",
      lang : "cs-CZ"
    }, {
      name : "Sara",
      lang : "da-DK"
    }, {
      name : "Anna",
      lang : "de-DE"
    }, {
      name : "Melina",
      lang : "el-GR"
    }, {
      name : "Karen",
      lang : "en-AU"
    }, {
      name : "Daniel",
      lang : "en-GB"
    }, {
      name : "Moira",
      lang : "en-IE"
    }, {
      name : "Samantha (Enhanced)",
      lang : "en-US"
    }, {
      name : "Samantha",
      lang : "en-US"
    }, {
      name : "Tessa",
      lang : "en-ZA"
    }, {
      name : "Monica",
      lang : "es-ES"
    }, {
      name : "Paulina",
      lang : "es-MX"
    }, {
      name : "Satu",
      lang : "fi-FI"
    }, {
      name : "Amelie",
      lang : "fr-CA"
    }, {
      name : "Thomas",
      lang : "fr-FR"
    }, {
      name : "Carmit",
      lang : "he-IL"
    }, {
      name : "Lekha",
      lang : "hi-IN"
    }, {
      name : "Mariska",
      lang : "hu-HU"
    }, {
      name : "Damayanti",
      lang : "id-ID"
    }, {
      name : "Alice",
      lang : "it-IT"
    }, {
      name : "Kyoko",
      lang : "ja-JP"
    }, {
      name : "Yuna",
      lang : "ko-KR"
    }, {
      name : "Ellen",
      lang : "nl-BE"
    }, {
      name : "Xander",
      lang : "nl-NL"
    }, {
      name : "Nora",
      lang : "no-NO"
    }, {
      name : "Zosia",
      lang : "pl-PL"
    }, {
      name : "Luciana",
      lang : "pt-BR"
    }, {
      name : "Joana",
      lang : "pt-PT"
    }, {
      name : "Ioana",
      lang : "ro-RO"
    }, {
      name : "Milena",
      lang : "ru-RU"
    }, {
      name : "Laura",
      lang : "sk-SK"
    }, {
      name : "Alva",
      lang : "sv-SE"
    }, {
      name : "Kanya",
      lang : "th-TH"
    }, {
      name : "Yelda",
      lang : "tr-TR"
    }, {
      name : "Ting-Ting",
      lang : "zh-CN"
    }, {
      name : "Sin-Ji",
      lang : "zh-HK"
    }, {
      name : "Mei-Jia",
      lang : "zh-TW"
    }, {
      name : "Microsoft David Mobile - English (United States)",
      lang : "en-US"
    }, {
      name : "Microsoft Zira Mobile - English (United States)",
      lang : "en-US"
    }, {
      name : "Microsoft Mark Mobile - English (United States)",
      lang : "en-US"
    }, {
      name : "native",
      lang : ""
    }, {
      name : "Google espa\u00f1ol"
    }, {
      name : "Google espa\u00f1ol de Estados Unidos"
    }, {
      name : "Google fran\u00e7ais"
    }, {
      name : "Google Bahasa Indonesia"
    }, {
      name : "Google italiano"
    }, {
      name : "Google Nederlands"
    }, {
      name : "Google polski"
    }, {
      name : "Google portugu\u00eas do Brasil"
    }, {
      name : "Google \u0440\u0443\u0441\u0441\u043a\u0438\u0439"
    }, {
      name : "Google \u0939\u093f\u0928\u094d\u0926\u0940"
    }, {
      name : "Google \u65e5\u672c\u8a9e"
    }, {
      name : "Google \u666e\u901a\u8bdd\uff08\u4e2d\u56fd\u5927\u9646\uff09"
    }, {
      name : "Google \u7ca4\u8a9e\uff08\u9999\u6e2f\uff09"
    }, {
      name : "zh-HK",
      rate : .25
    }, {
      name : "Fallback Chinese (Hong Kong) Female",
      lang : "zh-HK",
      fallbackvoice : true,
      service : "g1"
    }, {
      name : "Google \u7ca4\u8a9e\uff08\u9999\u6e2f\uff09"
    }, {
      name : "zh-TW",
      rate : .25
    }, {
      name : "Fallback Chinese (Taiwan) Female",
      lang : "zh-TW",
      fallbackvoice : true,
      service : "g1"
    }];
    /** @type {boolean} */
    a$jscomp$0.iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    /** @type {boolean} */
    a$jscomp$0.iOS9 = /(iphone|ipod|ipad).* os 9_/.test(navigator.userAgent.toLowerCase()) || /(iphone|ipod|ipad).* os 10_/.test(navigator.userAgent.toLowerCase());
    /** @type {boolean} */
    a$jscomp$0.is_chrome = -1 < navigator.userAgent.indexOf("Chrome");
    /** @type {boolean} */
    a$jscomp$0.is_safari = -1 < navigator.userAgent.indexOf("Safari");
    if (a$jscomp$0.is_chrome && a$jscomp$0.is_safari) {
      /** @type {boolean} */
      a$jscomp$0.is_safari = false;
    }
    /** @type {boolean} */
    a$jscomp$0.is_opera = !!window.opera || 0 <= navigator.userAgent.indexOf(" OPR/");
    /** @type {boolean} */
    a$jscomp$0.is_android = -1 < navigator.userAgent.toLowerCase().indexOf("android");
    /** @type {boolean} */
    a$jscomp$0.iOS_initialized = false;
    /** @type {boolean} */
    a$jscomp$0.iOS9_initialized = false;
    /** @type {!Array} */
    a$jscomp$0.cache_ios_voices = [{
      name : "he-IL",
      voiceURI : "he-IL",
      lang : "he-IL"
    }, {
      name : "th-TH",
      voiceURI : "th-TH",
      lang : "th-TH"
    }, {
      name : "pt-BR",
      voiceURI : "pt-BR",
      lang : "pt-BR"
    }, {
      name : "sk-SK",
      voiceURI : "sk-SK",
      lang : "sk-SK"
    }, {
      name : "fr-CA",
      voiceURI : "fr-CA",
      lang : "fr-CA"
    }, {
      name : "ro-RO",
      voiceURI : "ro-RO",
      lang : "ro-RO"
    }, {
      name : "no-NO",
      voiceURI : "no-NO",
      lang : "no-NO"
    }, {
      name : "fi-FI",
      voiceURI : "fi-FI",
      lang : "fi-FI"
    }, {
      name : "pl-PL",
      voiceURI : "pl-PL",
      lang : "pl-PL"
    }, {
      name : "de-DE",
      voiceURI : "de-DE",
      lang : "de-DE"
    }, {
      name : "nl-NL",
      voiceURI : "nl-NL",
      lang : "nl-NL"
    }, {
      name : "id-ID",
      voiceURI : "id-ID",
      lang : "id-ID"
    }, {
      name : "tr-TR",
      voiceURI : "tr-TR",
      lang : "tr-TR"
    }, {
      name : "it-IT",
      voiceURI : "it-IT",
      lang : "it-IT"
    }, {
      name : "pt-PT",
      voiceURI : "pt-PT",
      lang : "pt-PT"
    }, {
      name : "fr-FR",
      voiceURI : "fr-FR",
      lang : "fr-FR"
    }, {
      name : "ru-RU",
      voiceURI : "ru-RU",
      lang : "ru-RU"
    }, {
      name : "es-MX",
      voiceURI : "es-MX",
      lang : "es-MX"
    }, {
      name : "zh-HK",
      voiceURI : "zh-HK",
      lang : "zh-HK"
    }, {
      name : "sv-SE",
      voiceURI : "sv-SE",
      lang : "sv-SE"
    }, {
      name : "hu-HU",
      voiceURI : "hu-HU",
      lang : "hu-HU"
    }, {
      name : "zh-TW",
      voiceURI : "zh-TW",
      lang : "zh-TW"
    }, {
      name : "es-ES",
      voiceURI : "es-ES",
      lang : "es-ES"
    }, {
      name : "zh-CN",
      voiceURI : "zh-CN",
      lang : "zh-CN"
    }, {
      name : "nl-BE",
      voiceURI : "nl-BE",
      lang : "nl-BE"
    }, {
      name : "en-GB",
      voiceURI : "en-GB",
      lang : "en-GB"
    }, {
      name : "ar-SA",
      voiceURI : "ar-SA",
      lang : "ar-SA"
    }, {
      name : "ko-KR",
      voiceURI : "ko-KR",
      lang : "ko-KR"
    }, {
      name : "cs-CZ",
      voiceURI : "cs-CZ",
      lang : "cs-CZ"
    }, {
      name : "en-ZA",
      voiceURI : "en-ZA",
      lang : "en-ZA"
    }, {
      name : "en-AU",
      voiceURI : "en-AU",
      lang : "en-AU"
    }, {
      name : "da-DK",
      voiceURI : "da-DK",
      lang : "da-DK"
    }, {
      name : "en-US",
      voiceURI : "en-US",
      lang : "en-US"
    }, {
      name : "en-IE",
      voiceURI : "en-IE",
      lang : "en-IE"
    }, {
      name : "hi-IN",
      voiceURI : "hi-IN",
      lang : "hi-IN"
    }, {
      name : "el-GR",
      voiceURI : "el-GR",
      lang : "el-GR"
    }, {
      name : "ja-JP",
      voiceURI : "ja-JP",
      lang : "ja-JP"
    }];
    /** @type {!Array} */
    a$jscomp$0.cache_ios9_voices = [{
      name : "Maged",
      voiceURI : "com.apple.ttsbundle.Maged-compact",
      lang : "ar-SA",
      localService : true,
      "default" : true
    }, {
      name : "Zuzana",
      voiceURI : "com.apple.ttsbundle.Zuzana-compact",
      lang : "cs-CZ",
      localService : true,
      "default" : true
    }, {
      name : "Sara",
      voiceURI : "com.apple.ttsbundle.Sara-compact",
      lang : "da-DK",
      localService : true,
      "default" : true
    }, {
      name : "Anna",
      voiceURI : "com.apple.ttsbundle.Anna-compact",
      lang : "de-DE",
      localService : true,
      "default" : true
    }, {
      name : "Melina",
      voiceURI : "com.apple.ttsbundle.Melina-compact",
      lang : "el-GR",
      localService : true,
      "default" : true
    }, {
      name : "Karen",
      voiceURI : "com.apple.ttsbundle.Karen-compact",
      lang : "en-AU",
      localService : true,
      "default" : true
    }, {
      name : "Daniel",
      voiceURI : "com.apple.ttsbundle.Daniel-compact",
      lang : "en-GB",
      localService : true,
      "default" : true
    }, {
      name : "Moira",
      voiceURI : "com.apple.ttsbundle.Moira-compact",
      lang : "en-IE",
      localService : true,
      "default" : true
    }, {
      name : "Samantha (Enhanced)",
      voiceURI : "com.apple.ttsbundle.Samantha-premium",
      lang : "en-US",
      localService : true,
      "default" : true
    }, {
      name : "Samantha",
      voiceURI : "com.apple.ttsbundle.Samantha-compact",
      lang : "en-US",
      localService : true,
      "default" : true
    }, {
      name : "Tessa",
      voiceURI : "com.apple.ttsbundle.Tessa-compact",
      lang : "en-ZA",
      localService : true,
      "default" : true
    }, {
      name : "Monica",
      voiceURI : "com.apple.ttsbundle.Monica-compact",
      lang : "es-ES",
      localService : true,
      "default" : true
    }, {
      name : "Paulina",
      voiceURI : "com.apple.ttsbundle.Paulina-compact",
      lang : "es-MX",
      localService : true,
      "default" : true
    }, {
      name : "Satu",
      voiceURI : "com.apple.ttsbundle.Satu-compact",
      lang : "fi-FI",
      localService : true,
      "default" : true
    }, {
      name : "Amelie",
      voiceURI : "com.apple.ttsbundle.Amelie-compact",
      lang : "fr-CA",
      localService : true,
      "default" : true
    }, {
      name : "Thomas",
      voiceURI : "com.apple.ttsbundle.Thomas-compact",
      lang : "fr-FR",
      localService : true,
      "default" : true
    }, {
      name : "Carmit",
      voiceURI : "com.apple.ttsbundle.Carmit-compact",
      lang : "he-IL",
      localService : true,
      "default" : true
    }, {
      name : "Lekha",
      voiceURI : "com.apple.ttsbundle.Lekha-compact",
      lang : "hi-IN",
      localService : true,
      "default" : true
    }, {
      name : "Mariska",
      voiceURI : "com.apple.ttsbundle.Mariska-compact",
      lang : "hu-HU",
      localService : true,
      "default" : true
    }, {
      name : "Damayanti",
      voiceURI : "com.apple.ttsbundle.Damayanti-compact",
      lang : "id-ID",
      localService : true,
      "default" : true
    }, {
      name : "Alice",
      voiceURI : "com.apple.ttsbundle.Alice-compact",
      lang : "it-IT",
      localService : true,
      "default" : true
    }, {
      name : "Kyoko",
      voiceURI : "com.apple.ttsbundle.Kyoko-compact",
      lang : "ja-JP",
      localService : true,
      "default" : true
    }, {
      name : "Yuna",
      voiceURI : "com.apple.ttsbundle.Yuna-compact",
      lang : "ko-KR",
      localService : true,
      "default" : true
    }, {
      name : "Ellen",
      voiceURI : "com.apple.ttsbundle.Ellen-compact",
      lang : "nl-BE",
      localService : true,
      "default" : true
    }, {
      name : "Xander",
      voiceURI : "com.apple.ttsbundle.Xander-compact",
      lang : "nl-NL",
      localService : true,
      "default" : true
    }, {
      name : "Nora",
      voiceURI : "com.apple.ttsbundle.Nora-compact",
      lang : "no-NO",
      localService : true,
      "default" : true
    }, {
      name : "Zosia",
      voiceURI : "com.apple.ttsbundle.Zosia-compact",
      lang : "pl-PL",
      localService : true,
      "default" : true
    }, {
      name : "Luciana",
      voiceURI : "com.apple.ttsbundle.Luciana-compact",
      lang : "pt-BR",
      localService : true,
      "default" : true
    }, {
      name : "Joana",
      voiceURI : "com.apple.ttsbundle.Joana-compact",
      lang : "pt-PT",
      localService : true,
      "default" : true
    }, {
      name : "Ioana",
      voiceURI : "com.apple.ttsbundle.Ioana-compact",
      lang : "ro-RO",
      localService : true,
      "default" : true
    }, {
      name : "Milena",
      voiceURI : "com.apple.ttsbundle.Milena-compact",
      lang : "ru-RU",
      localService : true,
      "default" : true
    }, {
      name : "Laura",
      voiceURI : "com.apple.ttsbundle.Laura-compact",
      lang : "sk-SK",
      localService : true,
      "default" : true
    }, {
      name : "Alva",
      voiceURI : "com.apple.ttsbundle.Alva-compact",
      lang : "sv-SE",
      localService : true,
      "default" : true
    }, {
      name : "Kanya",
      voiceURI : "com.apple.ttsbundle.Kanya-compact",
      lang : "th-TH",
      localService : true,
      "default" : true
    }, {
      name : "Yelda",
      voiceURI : "com.apple.ttsbundle.Yelda-compact",
      lang : "tr-TR",
      localService : true,
      "default" : true
    }, {
      name : "Ting-Ting",
      voiceURI : "com.apple.ttsbundle.Ting-Ting-compact",
      lang : "zh-CN",
      localService : true,
      "default" : true
    }, {
      name : "Sin-Ji",
      voiceURI : "com.apple.ttsbundle.Sin-Ji-compact",
      lang : "zh-HK",
      localService : true,
      "default" : true
    }, {
      name : "Mei-Jia",
      voiceURI : "com.apple.ttsbundle.Mei-Jia-compact",
      lang : "zh-TW",
      localService : true,
      "default" : true
    }];
    /** @type {null} */
    a$jscomp$0.systemvoices = null;
    /** @type {number} */
    a$jscomp$0.CHARACTER_LIMIT = 100;
    /** @type {number} */
    a$jscomp$0.VOICESUPPORT_ATTEMPTLIMIT = 5;
    /** @type {number} */
    a$jscomp$0.voicesupport_attempts = 0;
    /** @type {boolean} */
    a$jscomp$0.fallbackMode = false;
    /** @type {number} */
    a$jscomp$0.WORDS_PER_MINUTE = 130;
    /** @type {null} */
    a$jscomp$0.fallback_parts = null;
    /** @type {number} */
    a$jscomp$0.fallback_part_index = 0;
    /** @type {null} */
    a$jscomp$0.fallback_audio = null;
    /** @type {number} */
    a$jscomp$0.fallback_playbackrate = 1;
    /** @type {number} */
    a$jscomp$0.def_fallback_playbackrate = a$jscomp$0.fallback_playbackrate;
    /** @type {!Array} */
    a$jscomp$0.fallback_audiopool = [];
    /** @type {null} */
    a$jscomp$0.msgparameters = null;
    /** @type {null} */
    a$jscomp$0.timeoutId = null;
    /** @type {!Array} */
    a$jscomp$0.OnLoad_callbacks = [];
    /** @type {boolean} */
    a$jscomp$0.useTimer = false;
    /** @type {!Array} */
    a$jscomp$0.utterances = [];
    /**
     * @param {?} a$jscomp$1
     * @return {?}
     */
    a$jscomp$0.tstCompiled = function(a$jscomp$1) {
      return eval("typeof xy === 'undefined'");
    };
    /** @type {string} */
    a$jscomp$0.fallbackServicePath = "https://code.responsivevoice.org/" + (a$jscomp$0.tstCompiled() ? "" : "develop/") + "getvoice.php";
    a$jscomp$0.default_rv = a$jscomp$0.responsivevoices[0];
    /** @type {boolean} */
    a$jscomp$0.debug = false;
    /**
     * @param {string} data
     * @return {undefined}
     */
    a$jscomp$0.log = function(data) {
      if (a$jscomp$0.debug) {
        console.log(data);
      }
    };
    /**
     * @return {undefined}
     */
    a$jscomp$0.init = function() {
      if (a$jscomp$0.is_android) {
        /** @type {boolean} */
        a$jscomp$0.useTimer = true;
      }
      if (a$jscomp$0.is_opera || "undefined" === typeof speechSynthesis) {
        console.log("RV: Voice synthesis not supported");
        a$jscomp$0.enableFallbackMode();
      } else {
        setTimeout(function() {
          /** @type {number} */
          var chat_retry = setInterval(function() {
            var bT = window.speechSynthesis.getVoices();
            if (0 != bT.length || null != a$jscomp$0.systemvoices && 0 != a$jscomp$0.systemvoices.length) {
              console.log("RV: Voice support ready");
              a$jscomp$0.systemVoicesReady(bT);
              clearInterval(chat_retry);
            } else {
              console.log("Voice support NOT ready");
              a$jscomp$0.voicesupport_attempts++;
              if (a$jscomp$0.voicesupport_attempts > a$jscomp$0.VOICESUPPORT_ATTEMPTLIMIT) {
                clearInterval(chat_retry);
                if (null != window.speechSynthesis) {
                  if (a$jscomp$0.iOS) {
                    if (a$jscomp$0.iOS9) {
                      a$jscomp$0.systemVoicesReady(a$jscomp$0.cache_ios9_voices);
                    } else {
                      a$jscomp$0.systemVoicesReady(a$jscomp$0.cache_ios_voices);
                    }
                    console.log("RV: Voice support ready (cached)");
                  } else {
                    console.log("RV: speechSynthesis present but no system voices found");
                    a$jscomp$0.enableFallbackMode();
                  }
                } else {
                  a$jscomp$0.enableFallbackMode();
                }
              }
            }
          }, 100);
        }, 100);
      }
      a$jscomp$0.Dispatch("OnLoad");
    };
    /**
     * @param {string} b
     * @return {undefined}
     */
    a$jscomp$0.systemVoicesReady = function(b) {
      /** @type {string} */
      a$jscomp$0.systemvoices = b;
      a$jscomp$0.mapRVs();
      if (null != a$jscomp$0.OnVoiceReady) {
        a$jscomp$0.OnVoiceReady.call();
      }
      a$jscomp$0.Dispatch("OnReady");
      if (window.hasOwnProperty("dispatchEvent")) {
        window.dispatchEvent(new Event("ResponsiveVoice_OnReady"));
      }
    };
    /**
     * @return {undefined}
     */
    a$jscomp$0.enableFallbackMode = function() {
      /** @type {boolean} */
      a$jscomp$0.fallbackMode = true;
      console.log("RV: Enabling fallback mode");
      a$jscomp$0.mapRVs();
      if (null != a$jscomp$0.OnVoiceReady) {
        a$jscomp$0.OnVoiceReady.call();
      }
      a$jscomp$0.Dispatch("OnReady");
      if (window.hasOwnProperty("dispatchEvent")) {
        window.dispatchEvent(new Event("ResponsiveVoice_OnReady"));
      }
    };
    /**
     * @return {?}
     */
    a$jscomp$0.getVoices = function() {
      /** @type {!Array} */
      var udappContracts = [];
      /** @type {number} */
      var column = 0;
      for (; column < a$jscomp$0.responsivevoices.length; column++) {
        udappContracts.push({
          name : a$jscomp$0.responsivevoices[column].name
        });
      }
      return udappContracts;
    };
    /**
     * @param {string} text
     * @param {string} str
     * @param {!Object} options
     * @return {undefined}
     */
    a$jscomp$0.speak = function(text, str, options) {
      if (a$jscomp$0.iOS9 && !a$jscomp$0.iOS9_initialized) {
        a$jscomp$0.log("Initializing ios9");
        setTimeout(function() {
          a$jscomp$0.speak(text, str, options);
        }, 100);
        a$jscomp$0.clickEvent();
        /** @type {boolean} */
        a$jscomp$0.iOS9_initialized = true;
      } else {
        if (a$jscomp$0.isPlaying()) {
          a$jscomp$0.log("Cancelling previous speech");
          a$jscomp$0.cancel();
        }
        if (a$jscomp$0.fallbackMode && 0 < a$jscomp$0.fallback_audiopool.length) {
          a$jscomp$0.clearFallbackPool();
        }
        text = text.replace(/["`]/gm, "'");
        a$jscomp$0.msgparameters = options || {};
        /** @type {string} */
        a$jscomp$0.msgtext = text;
        /** @type {string} */
        a$jscomp$0.msgvoicename = str;
        /** @type {boolean} */
        a$jscomp$0.onstartFired = false;
        /** @type {!Array} */
        var data = [];
        if (text.length > a$jscomp$0.CHARACTER_LIMIT) {
          /** @type {string} */
          var self = text;
          for (; self.length > a$jscomp$0.CHARACTER_LIMIT;) {
            var i = self.search(/[:!?.;]+/);
            /** @type {string} */
            var d = "";
            if (-1 == i || i >= a$jscomp$0.CHARACTER_LIMIT) {
              i = self.search(/[,]+/);
            }
            if (-1 == i && -1 == self.search(" ")) {
              /** @type {number} */
              i = 99;
            }
            if (-1 == i || i >= a$jscomp$0.CHARACTER_LIMIT) {
              var s = self.split(" ");
              /** @type {number} */
              i = 0;
              for (; i < s.length && !(d.length + s[i].length + 1 > a$jscomp$0.CHARACTER_LIMIT); i++) {
                /** @type {string} */
                d = d + ((0 != i ? " " : "") + s[i]);
              }
            } else {
              d = self.substr(0, i + 1);
            }
            self = self.substr(d.length, self.length - d.length);
            data.push(d);
          }
          if (0 < self.length) {
            data.push(self);
          }
        } else {
          data.push(text);
        }
        /** @type {!Array} */
        a$jscomp$0.multipartText = data;
        i = null == str ? a$jscomp$0.default_rv : a$jscomp$0.getResponsiveVoice(str);
        if (true === i.deprecated) {
          console.warn("ResponsiveVoice: Voice " + i.name + " is deprecated and will be removed in future releases");
        }
        self = {};
        if (null != i.mappedProfile) {
          self = i.mappedProfile;
        } else {
          if (self.systemvoice = a$jscomp$0.getMatchedVoice(i), self.collectionvoice = {}, null == self.systemvoice) {
            console.log("RV: ERROR: No voice found for: " + str);
            return;
          }
        }
        a$jscomp$0.msgprofile = self;
        /** @type {!Array} */
        a$jscomp$0.utterances = [];
        /** @type {number} */
        i = 0;
        for (; i < data.length; i++) {
          if (a$jscomp$0.fallbackMode) {
            a$jscomp$0.fallback_playbackrate = a$jscomp$0.def_fallback_playbackrate;
            d = a$jscomp$0.selectBest([self.collectionvoice.pitch, self.systemvoice.pitch, 1]);
            s = a$jscomp$0.selectBest([a$jscomp$0.iOS9 ? 1 : null, self.collectionvoice.rate, self.systemvoice.rate, 1]);
            var nValue = a$jscomp$0.selectBest([self.collectionvoice.volume, self.systemvoice.volume, 1]);
            var train1or;
            if (null != options) {
              /** @type {number} */
              d = d * (null != options.pitch ? options.pitch : 1);
              /** @type {number} */
              s = s * (null != options.rate ? options.rate : 1);
              /** @type {number} */
              nValue = nValue * (null != options.volume ? options.volume : 1);
              train1or = options.extraParams || null;
            }
            /** @type {number} */
            d = d / 2;
            /** @type {number} */
            s = s / 2;
            /** @type {number} */
            nValue = nValue * 2;
            /** @type {number} */
            d = Math.min(Math.max(d, 0), 1);
            /** @type {number} */
            s = Math.min(Math.max(s, 0), 1);
            /** @type {number} */
            nValue = Math.min(Math.max(nValue, 0), 1);
            /** @type {string} */
            d = a$jscomp$0.fallbackServicePath + "?t=" + encodeURIComponent(data[i]) + "&tl=" + (self.collectionvoice.lang || self.systemvoice.lang || "en-US") + "&sv=" + (self.collectionvoice.service || self.systemvoice.service || "") + "&vn=" + (self.collectionvoice.voicename || self.systemvoice.voicename || "") + "&pitch=" + d.toString() + "&rate=" + s.toString() + "&vol=" + nValue.toString();
            if (train1or) {
              /** @type {string} */
              d = d + ("&extraParams=" + JSON.stringify(train1or));
            }
            /** @type {!Element} */
            s = document.createElement("AUDIO");
            /** @type {string} */
            s.src = d;
            s.playbackRate = a$jscomp$0.fallback_playbackrate;
            /** @type {string} */
            s.preload = "auto";
            s.load();
            a$jscomp$0.fallback_parts.push(s);
          } else {
            a$jscomp$0.log("Using SpeechSynthesis");
            d = new SpeechSynthesisUtterance;
            d.voiceURI = self.systemvoice.voiceURI;
            d.volume = a$jscomp$0.selectBest([self.collectionvoice.volume, self.systemvoice.volume, 1]);
            d.rate = a$jscomp$0.selectBest([a$jscomp$0.iOS9 ? 1 : null, self.collectionvoice.rate, self.systemvoice.rate, 1]);
            d.pitch = a$jscomp$0.selectBest([self.collectionvoice.pitch, self.systemvoice.pitch, 1]);
            d.text = data[i];
            d.lang = a$jscomp$0.selectBest([self.collectionvoice.lang, self.systemvoice.lang]);
            /** @type {number} */
            d.rvIndex = i;
            /** @type {number} */
            d.rvTotal = data.length;
            if (0 == i) {
              /** @type {function(): undefined} */
              d.onstart = a$jscomp$0.speech_onstart;
            }
            /** @type {boolean} */
            a$jscomp$0.msgparameters.onendcalled = false;
            if (null != options) {
              d.voice = "undefined" !== typeof options.voice ? options.voice : self.systemvoice;
              if (i < data.length - 1 && 1 < data.length) {
                /** @type {function(number): undefined} */
                d.onend = a$jscomp$0.onPartEnd;
                if (d.hasOwnProperty("addEventListener")) {
                  d.addEventListener("end", a$jscomp$0.onPartEnd);
                }
              } else {
                /** @type {function(): undefined} */
                d.onend = a$jscomp$0.speech_onend;
                if (d.hasOwnProperty("addEventListener")) {
                  d.addEventListener("end", a$jscomp$0.speech_onend);
                }
              }
              d.onerror = options.onerror || function(b) {
                a$jscomp$0.log("RV: Unknow Error");
                a$jscomp$0.log(b);
              };
              d.onpause = options.onpause;
              d.onresume = options.onresume;
              d.onmark = options.onmark;
              d.onboundary = options.onboundary || a$jscomp$0.onboundary;
              d.pitch = null != options.pitch ? options.pitch : d.pitch;
              /** @type {number} */
              d.rate = a$jscomp$0.iOS ? (null != options.rate ? options.rate * options.rate : 1) * d.rate : (null != options.rate ? options.rate : 1) * d.rate;
              d.volume = null != options.volume ? options.volume : d.volume;
            } else {
              a$jscomp$0.log("No Params received for current Utterance");
              d.voice = self.systemvoice;
              /** @type {function(): undefined} */
              d.onend = a$jscomp$0.speech_onend;
              /** @type {function(?): undefined} */
              d.onboundary = a$jscomp$0.onboundary;
              /**
               * @param {string} num
               * @return {undefined}
               */
              d.onerror = function(num) {
                a$jscomp$0.log("RV: Unknow Error");
                a$jscomp$0.log(num);
              };
            }
            a$jscomp$0.utterances.push(d);
            if (0 == i) {
              a$jscomp$0.currentMsg = d;
            }
            console.log(d);
            a$jscomp$0.tts_speak(d);
          }
        }
        if (a$jscomp$0.fallbackMode) {
          /** @type {number} */
          a$jscomp$0.fallback_part_index = 0;
          a$jscomp$0.fallback_startPart();
        }
      }
    };
    /**
     * @param {string} time
     * @param {!Function} cb
     * @return {undefined}
     */
    a$jscomp$0.startTimeout = function(time, cb) {
      var res = a$jscomp$0.msgprofile.collectionvoice.timerSpeed;
      if (null == a$jscomp$0.msgprofile.collectionvoice.timerSpeed) {
        /** @type {number} */
        res = 1;
      }
      if (!(0 >= res)) {
        /** @type {number} */
        a$jscomp$0.timeoutId = setTimeout(cb, a$jscomp$0.getEstimatedTimeLength(time, res));
        a$jscomp$0.log("Timeout ID: " + a$jscomp$0.timeoutId);
      }
    };
    /**
     * @return {undefined}
     */
    a$jscomp$0.checkAndCancelTimeout = function() {
      if (null != a$jscomp$0.timeoutId) {
        clearTimeout(a$jscomp$0.timeoutId);
        /** @type {null} */
        a$jscomp$0.timeoutId = null;
      }
    };
    /**
     * @return {undefined}
     */
    a$jscomp$0.speech_timedout = function() {
      a$jscomp$0.cancel();
      /** @type {boolean} */
      a$jscomp$0.cancelled = false;
      a$jscomp$0.speech_onend();
    };
    /**
     * @return {undefined}
     */
    a$jscomp$0.speech_onend = function() {
      a$jscomp$0.checkAndCancelTimeout();
      if (true === a$jscomp$0.cancelled) {
        /** @type {boolean} */
        a$jscomp$0.cancelled = false;
      } else {
        a$jscomp$0.log("on end fired");
        if (null != a$jscomp$0.msgparameters && null != a$jscomp$0.msgparameters.onend && 1 != a$jscomp$0.msgparameters.onendcalled) {
          a$jscomp$0.log("Speech on end called  -" + a$jscomp$0.msgtext);
          /** @type {boolean} */
          a$jscomp$0.msgparameters.onendcalled = true;
          a$jscomp$0.msgparameters.onend();
        }
      }
    };
    /**
     * @return {undefined}
     */
    a$jscomp$0.speech_onstart = function() {
      if (!a$jscomp$0.onstartFired) {
        /** @type {boolean} */
        a$jscomp$0.onstartFired = true;
        a$jscomp$0.log("Speech start");
        if (a$jscomp$0.iOS || a$jscomp$0.is_safari || a$jscomp$0.useTimer) {
          if (!a$jscomp$0.fallbackMode) {
            a$jscomp$0.startTimeout(a$jscomp$0.msgtext, a$jscomp$0.speech_timedout);
          }
        }
        /** @type {boolean} */
        a$jscomp$0.msgparameters.onendcalled = false;
        if (null != a$jscomp$0.msgparameters && null != a$jscomp$0.msgparameters.onstart) {
          a$jscomp$0.msgparameters.onstart();
        }
      }
    };
    /**
     * @return {undefined}
     */
    a$jscomp$0.fallback_startPart = function() {
      if (0 == a$jscomp$0.fallback_part_index) {
        a$jscomp$0.speech_onstart();
      }
      a$jscomp$0.fallback_audio = a$jscomp$0.fallback_parts[a$jscomp$0.fallback_part_index];
      if (null == a$jscomp$0.fallback_audio) {
        a$jscomp$0.log("RV: Fallback Audio is not available");
      } else {
        var v = a$jscomp$0.fallback_audio;
        a$jscomp$0.fallback_audiopool.push(v);
        setTimeout(function() {
          v.playbackRate = a$jscomp$0.fallback_playbackrate;
        }, 50);
        /**
         * @return {undefined}
         */
        v.onloadedmetadata = function() {
          v.play();
          v.playbackRate = a$jscomp$0.fallback_playbackrate;
        };
        if (a$jscomp$0.fallback_errors) {
          a$jscomp$0.log("RV: Speech cancelled due to errors");
          a$jscomp$0.speech_onend();
        }
        a$jscomp$0.fallback_audio.play();
        a$jscomp$0.fallback_audio.addEventListener("ended", a$jscomp$0.fallback_finishPart);
        if (a$jscomp$0.useTimer) {
          a$jscomp$0.startTimeout(a$jscomp$0.multipartText[a$jscomp$0.fallback_part_index], a$jscomp$0.fallback_finishPart);
        }
      }
    };
    /**
     * @return {?}
     */
    a$jscomp$0.isFallbackAudioPlaying = function() {
      var i;
      /** @type {number} */
      i = 0;
      for (; i < a$jscomp$0.fallback_audiopool.length; i++) {
        if (!a$jscomp$0.fallback_audiopool[i].paused) {
          return true;
        }
      }
      return false;
    };
    /**
     * @param {?} b
     * @return {undefined}
     */
    a$jscomp$0.fallback_finishPart = function(b) {
      if (a$jscomp$0.isFallbackAudioPlaying()) {
        a$jscomp$0.checkAndCancelTimeout();
        /** @type {number} */
        a$jscomp$0.timeoutId = setTimeout(a$jscomp$0.fallback_finishPart, 1e3 * (a$jscomp$0.fallback_audio.duration - a$jscomp$0.fallback_audio.currentTime));
      } else {
        a$jscomp$0.checkAndCancelTimeout();
        if (a$jscomp$0.fallback_part_index < a$jscomp$0.fallback_parts.length - 1) {
          a$jscomp$0.fallback_part_index++;
          a$jscomp$0.fallback_startPart();
        } else {
          a$jscomp$0.speech_onend();
        }
      }
    };
    /**
     * @return {undefined}
     */
    a$jscomp$0.cancel = function() {
      a$jscomp$0.checkAndCancelTimeout();
      if (a$jscomp$0.fallbackMode) {
        if (null != a$jscomp$0.fallback_audio) {
          a$jscomp$0.fallback_audio.pause();
        }
        a$jscomp$0.clearFallbackPool();
      } else {
        /** @type {boolean} */
        a$jscomp$0.cancelled = true;
        speechSynthesis.cancel();
      }
    };
    /**
     * @return {?}
     */
    a$jscomp$0.voiceSupport = function() {
      return "speechSynthesis" in window;
    };
    /**
     * @param {?} b
     * @return {undefined}
     */
    a$jscomp$0.OnFinishedPlaying = function(b) {
      if (null != a$jscomp$0.msgparameters && null != a$jscomp$0.msgparameters.onend) {
        a$jscomp$0.msgparameters.onend();
      }
    };
    /**
     * @param {number} b
     * @return {undefined}
     */
    a$jscomp$0.setDefaultVoice = function(b) {
      b = a$jscomp$0.getResponsiveVoice(b);
      if (null != b) {
        /** @type {number} */
        a$jscomp$0.default_rv = b;
      }
    };
    /**
     * @return {undefined}
     */
    a$jscomp$0.mapRVs = function() {
      /** @type {number} */
      var branchIndex = 0;
      for (; branchIndex < a$jscomp$0.responsivevoices.length; branchIndex++) {
        var rpbListKeysResp = a$jscomp$0.responsivevoices[branchIndex];
        /** @type {number} */
        var i = 0;
        for (; i < rpbListKeysResp.voiceIDs.length; i++) {
          var month = a$jscomp$0.voicecollection[rpbListKeysResp.voiceIDs[i]];
          if (1 != month.fallbackvoice) {
            var f = a$jscomp$0.getSystemVoice(month.name);
            if (null != f) {
              rpbListKeysResp.mappedProfile = {
                systemvoice : f,
                collectionvoice : month
              };
              break;
            }
          } else {
            rpbListKeysResp.mappedProfile = {
              systemvoice : {},
              collectionvoice : month
            };
            break;
          }
        }
      }
    };
    /**
     * @param {?} b
     * @return {?}
     */
    a$jscomp$0.getMatchedVoice = function(b) {
      /** @type {number} */
      var i = 0;
      for (; i < b.voiceIDs.length; i++) {
        var e = a$jscomp$0.getSystemVoice(a$jscomp$0.voicecollection[b.voiceIDs[i]].name);
        if (null != e) {
          return e;
        }
      }
      return null;
    };
    /**
     * @param {string} str2
     * @return {?}
     */
    a$jscomp$0.getSystemVoice = function(str2) {
      /** @type {string} */
      var _end2 = String.fromCharCode(160);
      str2 = str2.replace(new RegExp("\\s+|" + _end2, "g"), "");
      if ("undefined" === typeof a$jscomp$0.systemvoices || null === a$jscomp$0.systemvoices) {
        return null;
      }
      /** @type {number} */
      var column = 0;
      for (; column < a$jscomp$0.systemvoices.length; column++) {
        if (0 === a$jscomp$0.systemvoices[column].name.replace(new RegExp("\\s+|" + _end2, "g"), "").localeCompare(str2)) {
          return a$jscomp$0.systemvoices[column];
        }
      }
      return null;
    };
    /**
     * @param {!Object} val
     * @return {?}
     */
    a$jscomp$0.getResponsiveVoice = function(val) {
      /** @type {number} */
      var column = 0;
      for (; column < a$jscomp$0.responsivevoices.length; column++) {
        if (a$jscomp$0.responsivevoices[column].name == val) {
          return true === a$jscomp$0.responsivevoices[column].mappedProfile.collectionvoice.fallbackvoice || true === a$jscomp$0.fallbackMode ? (a$jscomp$0.fallbackMode = true, a$jscomp$0.fallback_parts = []) : a$jscomp$0.fallbackMode = false, a$jscomp$0.responsivevoices[column];
        }
      }
      return null;
    };
    /**
     * @param {string} k
     * @return {?}
     */
    a$jscomp$0.Dispatch = function(k) {
      if (a$jscomp$0.hasOwnProperty(k + "_callbacks") && null != a$jscomp$0[k + "_callbacks"] && 0 < a$jscomp$0[k + "_callbacks"].length) {
        var ar = a$jscomp$0[k + "_callbacks"];
        /** @type {number} */
        var i = 0;
        for (; i < ar.length; i++) {
          ar[i]();
        }
        return true;
      }
      /** @type {string} */
      var key = k + "_callbacks_timeout";
      /** @type {string} */
      var j = k + "_callbacks_timeoutCount";
      if (!a$jscomp$0.hasOwnProperty(key)) {
        /** @type {number} */
        a$jscomp$0[j] = 10;
        /** @type {number} */
        a$jscomp$0[key] = setInterval(function() {
          --a$jscomp$0[j];
          if (a$jscomp$0.Dispatch(k) || 0 > a$jscomp$0[j]) {
            clearTimeout(a$jscomp$0[key]);
          }
        }, 50);
      }
      return false;
    };
    /**
     * @param {string} e
     * @param {!Function} id
     * @return {undefined}
     */
    a$jscomp$0.AddEventListener = function(e, id) {
      if (!a$jscomp$0.hasOwnProperty(e + "_callbacks")) {
        /** @type {!Array} */
        a$jscomp$0[e + "_callbacks"] = [];
      }
      a$jscomp$0[e + "_callbacks"].push(id);
    };
    /** @type {function(string, !Function): undefined} */
    a$jscomp$0.addEventListener = a$jscomp$0.AddEventListener;
    /**
     * @return {undefined}
     */
    a$jscomp$0.clickEvent = function() {
      if (a$jscomp$0.iOS && !a$jscomp$0.iOS_initialized) {
        a$jscomp$0.log("Initializing iOS click event");
        var message = new SpeechSynthesisUtterance(" ");
        speechSynthesis.speak(message);
        /** @type {boolean} */
        a$jscomp$0.iOS_initialized = true;
      }
    };
    /**
     * @return {?}
     */
    a$jscomp$0.isPlaying = function() {
      return a$jscomp$0.fallbackMode ? null != a$jscomp$0.fallback_audio && !a$jscomp$0.fallback_audio.ended && !a$jscomp$0.fallback_audio.paused : speechSynthesis.speaking;
    };
    /**
     * @return {undefined}
     */
    a$jscomp$0.clearFallbackPool = function() {
      /** @type {number} */
      var i = 0;
      for (; i < a$jscomp$0.fallback_audiopool.length; i++) {
        if (null != a$jscomp$0.fallback_audiopool[i]) {
          a$jscomp$0.fallback_audiopool[i].pause();
          /** @type {string} */
          a$jscomp$0.fallback_audiopool[i].src = "";
        }
      }
      /** @type {!Array} */
      a$jscomp$0.fallback_audiopool = [];
    };
    if ("complete" === document.readyState) {
      a$jscomp$0.init();
    } else {
      document.addEventListener("DOMContentLoaded", function() {
        a$jscomp$0.init();
      });
    }
    /**
     * @param {!Array} serverElements
     * @return {?}
     */
    a$jscomp$0.selectBest = function(serverElements) {
      /** @type {number} */
      var i = 0;
      for (; i < serverElements.length; i++) {
        if (null != serverElements[i]) {
          return serverElements[i];
        }
      }
      return null;
    };
    /**
     * @return {undefined}
     */
    a$jscomp$0.pause = function() {
      if (a$jscomp$0.fallbackMode) {
        if (null != a$jscomp$0.fallback_audio) {
          a$jscomp$0.fallback_audio.pause();
        }
      } else {
        speechSynthesis.pause();
      }
    };
    /**
     * @return {undefined}
     */
    a$jscomp$0.resume = function() {
      if (a$jscomp$0.fallbackMode) {
        if (null != a$jscomp$0.fallback_audio) {
          a$jscomp$0.fallback_audio.play();
        }
      } else {
        speechSynthesis.resume();
      }
    };
    /**
     * @param {string} message
     * @return {undefined}
     */
    a$jscomp$0.tts_speak = function(message) {
      setTimeout(function() {
        /** @type {boolean} */
        a$jscomp$0.cancelled = false;
        speechSynthesis.speak(message);
      }, .01);
    };
    /**
     * @param {number} value
     * @return {undefined}
     */
    a$jscomp$0.setVolume = function(value) {
      if (a$jscomp$0.isPlaying()) {
        if (a$jscomp$0.fallbackMode) {
          /** @type {number} */
          var i = 0;
          for (; i < a$jscomp$0.fallback_parts.length; i++) {
            /** @type {number} */
            a$jscomp$0.fallback_parts[i].volume = value;
          }
          /** @type {number} */
          i = 0;
          for (; i < a$jscomp$0.fallback_audiopool.length; i++) {
            /** @type {number} */
            a$jscomp$0.fallback_audiopool[i].volume = value;
          }
          /** @type {number} */
          a$jscomp$0.fallback_audio.volume = value;
        } else {
          /** @type {number} */
          i = 0;
          for (; i < a$jscomp$0.utterances.length; i++) {
            /** @type {number} */
            a$jscomp$0.utterances[i].volume = value;
          }
        }
      }
    };
    /**
     * @param {number} options
     * @return {undefined}
     */
    a$jscomp$0.onPartEnd = function(options) {
      if (null != a$jscomp$0.msgparameters && null != a$jscomp$0.msgparameters.onchuckend) {
        a$jscomp$0.msgparameters.onchuckend();
      }
      a$jscomp$0.Dispatch("OnPartEnd");
      options = a$jscomp$0.utterances.indexOf(options.utterance);
      a$jscomp$0.currentMsg = a$jscomp$0.utterances[options + 1];
    };
    /**
     * @param {?} event
     * @return {undefined}
     */
    a$jscomp$0.onboundary = function(event) {
      a$jscomp$0.log("On Boundary");
      if (a$jscomp$0.iOS && !a$jscomp$0.onstartFired) {
        a$jscomp$0.speech_onstart();
      }
    };
    /**
     * @param {!Object} v
     * @return {?}
     */
    a$jscomp$0.numToWords = function(v) {
      /**
       * @param {!NodeList} arr
       * @return {?}
       */
      function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
          /** @type {number} */
          var i = 0;
          /** @type {!Array} */
          var arr2 = Array(arr.length);
          for (; i < arr.length; i++) {
            arr2[i] = arr[i];
          }
          return arr2;
        }
        return Array.from(arr);
      }
      var array_in_struct = function() {
        return function(arr, data_length) {
          if (Array.isArray(arr)) {
            return arr;
          }
          if (Symbol.iterator in Object(arr)) {
            /** @type {!Array} */
            var _arr = [];
            /** @type {boolean} */
            var _n = true;
            /** @type {boolean} */
            var e = false;
            var f = void 0;
            try {
              var _i = arr[Symbol.iterator]();
              var _s;
              for (; !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !data_length || _arr.length !== data_length); _n = true) {
              }
            } catch (DEFAULT_FILE) {
              /** @type {boolean} */
              e = true;
              f = DEFAULT_FILE;
            } finally {
              try {
                if (!_n && _i["return"]) {
                  _i["return"]();
                }
              } finally {
                if (e) {
                  throw f;
                }
              }
            }
            return _arr;
          }
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        };
      }();
      /**
       * @param {!NodeList} ops
       * @return {?}
       */
      var scope = function(ops) {
        return 0 === ops.length;
      };
      /**
       * @param {number} a
       * @return {?}
       */
      var get = function(a) {
        return function(b) {
          return b.slice(0, a);
        };
      };
      /**
       * @param {number} component
       * @return {?}
       */
      var fn = function(component) {
        return function(b) {
          return b.slice(component);
        };
      };
      /**
       * @param {string} data
       * @return {?}
       */
      var seed = function(data) {
        return data.slice(0).reverse();
      };
      /**
       * @param {!Function} callback
       * @return {?}
       */
      var compile = function(callback) {
        return function(method) {
          return function(url) {
            return callback(method(url));
          };
        };
      };
      /**
       * @param {?} shouldRemoveScope
       * @return {?}
       */
      var element = function(shouldRemoveScope) {
        return !shouldRemoveScope;
      };
      /**
       * @param {number} x
       * @return {?}
       */
      var stripBOM = function update(x) {
        return function(ctx) {
          return scope(ctx) ? [] : [get(x)(ctx)].concat(_toConsumableArray(update(x)(fn(x)(ctx))));
        };
      };
      /** @type {!Array<string>} */
      var suffixes = " one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
      /** @type {!Array<string>} */
      var prefixes = "  twenty thirty forty fifty sixty seventy eighty ninety".split(" ");
      /** @type {!Array<string>} */
      var thisShape = " thousand million billion trillion quadrillion quintillion sextillion septillion octillion nonillion".split(" ");
      /**
       * @param {?} a
       * @return {?}
       */
      var fullPathToScript = function(a) {
        var b = array_in_struct(a, 3);
        a = b[0];
        var i = b[1];
        b = b[2];
        return [0 === (Number(b) || 0) ? "" : suffixes[b] + " hundred ", 0 === (Number(a) || 0) ? prefixes[i] : prefixes[i] && prefixes[i] + "-" || "", suffixes[i + a] || suffixes[a]].join("");
      };
      /**
       * @param {string} s
       * @param {?} i
       * @return {?}
       */
      var b = function(s, i) {
        return "" === s ? s : s + " " + thisShape[i];
      };
      return "number" === typeof v ? a$jscomp$0.numToWords(String(v)) : "0" === v ? "zero" : compile(stripBOM(3))(seed)(Array.from(v)).map(fullPathToScript).map(b).filter(compile(element)(scope)).reverse().join(" ").trim();
    };
    /**
     * @param {string} string
     * @return {?}
     */
    a$jscomp$0.getWords = function(string) {
      var result = string.split(/\s+/);
      /** @type {number} */
      var i = 0;
      for (; i < result.length; i++) {
        if (null != (string = result[i].toString().match(/\d+/))) {
          result.splice(i, 1);
          a$jscomp$0.numToWords(+string[0]).split(/\s+/).map(function(overriddenMethodNames) {
            result.push(overriddenMethodNames);
          });
        }
      }
      return result;
    };
    /**
     * @param {string} input
     * @param {number} decision
     * @return {?}
     */
    a$jscomp$0.getEstimatedTimeLength = function(input, decision) {
      var e = a$jscomp$0.getWords(input);
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var START_POINT = a$jscomp$0.fallbackMode ? 1300 : 700;
      decision = decision || 1;
      e.map(function(empty, b) {
        i = i + (empty.toString().match(/[^ ]/gim) || empty).length;
      });
      var totalLen = e.length;
      /** @type {number} */
      var tgtLen = 60 / a$jscomp$0.WORDS_PER_MINUTE * decision * 1E3 * totalLen;
      if (5 > totalLen) {
        /** @type {number} */
        tgtLen = decision * (START_POINT + 50 * i);
      }
      a$jscomp$0.log("Estimated time length: " + tgtLen + " ms, words: [" + e + "], charsCount: " + i);
      return tgtLen;
    };
  };
  var responsiveVoice = new ResponsiveVoice;
}
/** @type {string} */
var $tpl = '<div id="special"><div class="special-panel"><div class="special-font-size"><span>\u0428\u0440\u0438\u0444\u0442:</span> <button title="\u041c\u0430\u043b\u0435\u043d\u044c\u043a\u0438\u0439 \u0448\u0440\u0438\u0444\u0442" value="1"><i>A</i></button> <button title="\u0421\u0440\u0435\u0434\u043d\u0438\u0439 \u0448\u0440\u0438\u0444\u0442" value="2"><i>A</i></button> <button title="\u0411\u043e\u043b\u044c\u0448\u043e\u0439 \u0448\u0440\u0438\u0444\u0442" value="3"><i>A</i></button></div><div class="special-color"><span>\u0426\u0432\u0435\u0442:</span> <button title="\u0426\u0432\u0435\u0442 \u0447\u0435\u0440\u043d\u044b\u043c \u043f\u043e \u0431\u0435\u043b\u043e\u043c\u0443" value="1"><i>\u0426</i></button> <button title="\u0426\u0432\u0435\u0442 \u0431\u0435\u043b\u044b\u043c \u043f\u043e \u0447\u0435\u0440\u043d\u043e\u043c\u0443" value="2"><i>\u0426</i></button> <button title="\u0426\u0432\u0435\u0442 \u0441\u0438\u043d\u0438\u043c \u043f\u043e \u0433\u043e\u043b\u0443\u0431\u043e\u043c\u0443" value="3" i=""><i>\u0426</i></button></div><div class="special-images"><span>\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f:</span> <button title="\u0412\u044b\u043a\u043b\u044e\u0447\u0438\u0442\u044c/\u0432\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f"><i></i></button></div><div class="special-audio"><span>\u0417\u0432\u0443\u043a:</span> <button title="\u0412\u043a\u043b\u044e\u0447\u0438\u0442\u044c/\u0432\u044b\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0432\u043e\u0441\u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u0438\u0435 \u0442\u0435\u043a\u0441\u0442\u0430" value="0"><i></i></button></div><div class="special-settings"><span>\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438:</span> <button title="\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438"><i></i></button></div><div class="special-quit"><span>\u041e\u0431\u044b\u0447\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f:</span> <button title="\u041e\u0431\u044b\u0447\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f \u0441\u0430\u0439\u0442\u0430"><i></i></button></div></div><div id="special-settings-body"><hr/><h2>\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0448\u0440\u0438\u0444\u0442\u0430:</h2><div class="special-font-family"><span>\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0440\u0438\u0444\u0442:</span> <button value="1"><i>Arial</i></button> <button value="2"><i>Times</i></button></div><div class="special-letter-spacing"><span>\u0418\u043d\u0442\u0435\u0440\u0432\u0430\u043b \u043c\u0435\u0436\u0434\u0443 \u0431\u0443\u043a\u0432\u0430\u043c\u0438 (<em>\u041a\u0435\u0440\u043d\u0438\u043d\u0433</em>):</span> <button value="1"><i>\u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u044b\u0439</i></button> <button value="2"><i>\u0421\u0440\u0435\u0434\u043d\u0438\u0439</i></button> <button value="3"><i>\u0411\u043e\u043b\u044c\u0448\u043e\u0439</i></button></div><div class="special-line-height"><span>\u0418\u043d\u0442\u0435\u0440\u0432\u0430\u043b \u043c\u0435\u0436\u0434\u0443 \u0441\u0442\u0440\u043e\u043a\u0430\u043c\u0438:</span> <button value="1"><i>\u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u044b\u0439<br/>\u0438\u043d\u0442\u0435\u0440\u0432\u0430\u043b</i></button> <button value="2"><i>\u041f\u043e\u043b\u0443\u0442\u043e\u0440\u043d\u044b\u0439<br/>\u0438\u043d\u0442\u0435\u0440\u0432\u0430\u043b</i></button> <button value="3"><i>\u0414\u0432\u043e\u0439\u043d\u043e\u0439<br/>\u0438\u043d\u0442\u0435\u0440\u0432\u0430\u043b</i></button></div><h2>\u0412\u044b\u0431\u043e\u0440 \u0446\u0432\u0435\u0442\u043e\u0432\u043e\u0439 \u0441\u0445\u0435\u043c\u044b:</h2><div class="special-color"><button value="1"><i>\u0427\u0435\u0440\u043d\u044b\u043c<br/>\u043f\u043e \u0431\u0435\u043b\u043e\u043c\u0443</i></button> <button value="2"><i>\u0411\u0435\u043b\u044b\u043c<br/>\u043f\u043e \u0447\u0435\u0440\u043d\u043e\u043c\u0443</i></button> <button value="3"><i>\u0422\u0435\u043c\u043d\u043e-\u0441\u0438\u043d\u0438\u043c<br/>\u043f\u043e \u0433\u043e\u043b\u0443\u0431\u043e\u043c\u0443</i></button> <button value="4"><i>\u041a\u043e\u0440\u0438\u0447\u043d\u0435\u0432\u044b\u043c<br/>\u043f\u043e \u0431\u0435\u0436\u0435\u0432\u043e\u043c\u0443</i></button> <button value="5"><i>\u0417\u0435\u043b\u0435\u043d\u044b\u043c<br/>\u043f\u043e \u0442\u0435\u043c\u043d\u043e-\u043a\u043e\u0440\u0447\u043d\u0435\u0432\u043e\u043c\u0443</i></button></div><hr/><div class="special-reset"><button><i>\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e</i></button></div><div class="special-settings-close"><button><i>\u0417\u0430\u043a\u0440\u044b\u0442\u044c</i></button></div></div></div>';
