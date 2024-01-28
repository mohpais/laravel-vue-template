import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import { createToast } from "mosha-vue-toastify";
import Swal from "sweetalert2";
import moment from "moment";

var _Value = {
  //"username": "",
  //"token": "",
  //"edxToken": "",
  //"email": "",
  //"profilePic": "",
  //"firstName": "",
  //"lastName": ""
};

var uriex = "data:application/vnd.ms-excel;base64,",
  templateex =
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
  base64ex = function (s) {
    return window.btoa(unescape(encodeURIComponent(s)));
  },
  formatex = function (s, c) {
    return s.replace(/{(\w+)}/g, function (m, p) {
      return c[p];
    });
  };

var CONST_TRUE = true,
  CONST_FALSE = false,
  _LWX = "ESS",
  _TOKEN = "_xa",
  _asciiBitAmt = 8,
  _defaultBaseNBitLen = 7,
  StringFromCharCode = String.fromCharCode,
  _mathPow = Math.pow,
  _mathFloor = Math.floor,
  _mathLog = Math.log,
  arrPush = (arr, newItem) => {
    arr.push(newItem);
  },
  charCodeAt = (src, idx) => {
    return src.charCodeAt(idx);
  },
  charAt = (src, idx) => {
    return src.charAt(idx);
  },
  ObjectPrototypeHasOwnPropertyCall = (context, prop) => {
    return Object.prototype.hasOwnProperty.call(context, prop);
  },
  _getSvrKey = () => {
    var tmp = _Value[_LWX];
    return _nBitDec(tmp); //better save encrypted key in array not string
  },
  getLength = (s) => {
    return s.length;
  },
  _genKey = (keyType) => {
    var _As = 65,
      _Ze = 91,
      _as = 97,
      _ze = 123,
      _0s = 48,
      _9e = 58,
      _QuestionMark_s = 63, //?
      _Colon_e = 59, //:
      _Number_Sign_s = 35, //#
      _Ampersand_e = 39, //Terminate before 39 (& actually 38)
      _Left_Parenthis_s = 40, //(
      _FullStop_e = 47, //Terminate before 47, FullStop actually 46
      _LeftSquareBracket_e = 92, //Terminate before 92, [ actually 91
      _RightSquareBracket_s = 93, //]
      _Low_Line_e = 96, //Terminate before 96, _ actually 95
      _Tilde_e = 127, //Terminate before 127, ~ actually 126
      _LatinAwGrave_s = 192,
      _LatinSmall_ae_e = 231, //Terminate before 231, ae actually 230
      _key = "",
      suffix = "",
      arrRange = [_As, _Ze, _as, _ze, _0s, _9e], //[[_As,_Ze],[_as,_ze],[_0s,_9e]],
      i = 0,
      j,
      k,
      l;
    if (keyType == 0) {
      // standard base 64
      suffix = "+/=";
    } else if (keyType == 1) {
      // non standard uri safe base 64
      suffix = "-_."; // standard uri safe using "+-$"
    } else if (keyType == 2) {
      // non standard base 64
      arrRange = [_as, _ze, _QuestionMark_s, _Ze, _0s, _Colon_e];
    } else if (keyType == 9) {
      // key was from server and session specific after successfull login
      arrRange = [];
      _key = _getSvrKey();
    } else {
      //own base 2 to base 128
      _key = "!";
      arrRange = [
        _Number_Sign_s,
        _Ampersand_e,
        _Left_Parenthis_s,
        _FullStop_e,
        _0s,
        _LeftSquareBracket_e,
        _RightSquareBracket_s,
        _Low_Line_e,
        _as,
        _Tilde_e,
        _LatinAwGrave_s,
        _LatinSmall_ae_e,
      ];
    }

    for (l = getLength(arrRange); i < l; i += 2) {
      for (j = arrRange[i], k = arrRange[i + 1]; j < k; j++) {
        _key += StringFromCharCode(j);
      }
    }
    return _key + suffix;
  },
  notIncludes = (array, value) => {
    return !array.includes(value);
  },
  _nBitEnc = (source, baseNBitLen, key) => {
    // console.log(source);
    //return _bNE(baseNBitLen || 6, source, key);
    baseNBitLen = baseNBitLen || _defaultBaseNBitLen;
    key = key || _genKey();
    var binData = 0,
      bitLen = 0,
      baseNBit = _mathPow(2, baseNBitLen) - 1,
      encResult = source.replace(/./g, function (v) {
        var encResultTmp = "";
        binData = (binData << _asciiBitAmt) + charCodeAt(v, 0); //v.charCodeAt(0);
        bitLen += _asciiBitAmt;
        while (bitLen >= baseNBitLen) {
          bitLen -= baseNBitLen;
          encResultTmp += key[(binData >>> bitLen) & baseNBit];
          //binData = binData & (_mathPow(2,bitLen)-1);
        }
        return encResultTmp;
      });
    return bitLen > 0
      ? encResult + key[(binData << (baseNBitLen - bitLen)) & baseNBit]
      : encResult;
  },
  _nBitDec = (source, baseNBitLen, key) => {
    //return _bND(baseNBitLen || 6, source, key);
    baseNBitLen = baseNBitLen || _defaultBaseNBitLen;
    var binData = 0,
      bitLen = 0;
    key = key || _genKey();
    return source.replace(/./g, function (v) {
      // debugger
      binData = (binData << baseNBitLen) + key.indexOf(v);
      bitLen += baseNBitLen;
      return bitLen < _asciiBitAmt
        ? ""
        : StringFromCharCode((binData >>> (bitLen -= _asciiBitAmt)) & 0xff);
    });
  };

let helpers = {
  /**
   * base N bit per byte decrypt (base 64 bit decrypt)
   * @param {string} source encrypted source string
   * @param {number|string} edType decrypt type: -1, 0, 1, 2, 9 or key string
   * @param {number} nBitLen 6 for base 64, 7 for base 128, 5 for base 32, 4 for hexa decimal if passed key is "0123456789ABCDEF"
   * @example
   *  var myDecryptedString = Global.d(myEncryptedBase128String, 9) //using session dependend base64 key
   *  var myDecryptedString = Global.d(myEncryptedOwnBase64String) //using own base64 encrtption
   *  var myDecryptedString = Global.d(myEncryptedDefaultBase64String, 0) //using default base64 encrtption
   *  var myDecryptedString = Global.d(myEncryptedBase128String, -1, 7) //using default base128 encrtption
   */
  dec: (source, edType, nBitLen) => {
    if (!edType) {
      //default base 128 decrypt
      return _nBitDec(source);
    } else {
      //base 64 uri safe decrypt
      // debugger
      var n = Number.isInteger(edType);
      var t = Number.isInteger(edType) ? _genKey(edType) : edType;
      return _nBitDec(
        source,
        nBitLen || 6,
        Number.isInteger(edType) ? _genKey(edType) : edType
      );
    }
  },

  /**
   * base N bit per byte encrypt (base 64 bit encrypt)
   * @param {string} source encrypted source string
   * @param {number|string} edType decrypt type: -1, 0, 1, 2, 9 or key string
   * @param {number} nBitLen 6 for base 64, 7 for base 128, 5 for base 32, 4 for hexa decimal if passed key is "0123456789ABCDEF"
   * @example
   *  var myEncryptedString = Global.enc(mySourceString, 9) //using session dependend base64 key
   *  var myEncryptedString = Global.enc(mySourceString) //using own base64 encrtption
   *  var myEncryptedString = Global.enc(mySourceString, 0) //using default base64 encrtption
   *  var myEncryptedString = Global.enc(mySourceString, -1, 7) //using default base128 encrtption
   */
  enc: (source, edType, nBitLen) => {
    if (!edType) {
      //default base 128 encrypt
      return _nBitEnc(source);
    } else {
      //base 64 uri safe encrypt
      return _nBitEnc(
        source,
        nBitLen || 6,
        Number.isInteger(edType) ? _genKey(edType) : edType
      );
    }
  },

  /**
   * generate new UUID
   * @param {boolean} formated whether to format result
   * @returns {string} UUID in hexadecimal form
   */
  getUUID: (formated) => {
    var format = formated
      ? "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
      : "xxxxxxxxyxxx4xxxyxxxyxxxxxxxxxxx";
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); //use high-precision timer if available
    }
    return format.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 17 + (d = Math.floor((d * 9) / 7))) % 16 | 0;
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  },

  /**
   * generate random string
   * @param {number} resultLength
   * @param {number} keyType
   * @param {number} additionalVarLen
   * @returns {string} random string with length between resultLength and resultLength+additionalVarLen
   */
  rndStr: (resultLength, keyType, additionalVarLen) => {
    //var i=0, random = Math.random, round = Math.floor, result = '', key = _genKey(keyType || 1), keyLength=key.length;
    var i = 0,
      random = Math.random,
      round = Math.floor,
      result = "",
      key = _genKey(keyType || 1),
      keyLength = getLength(key);
    for (
      resultLength += additionalVarLen ? round(random() * additionalVarLen) : 0;
      i < resultLength;
      result += key[round(random() * keyLength)], i += 1
    );
    return result;
  },

  /**
   * trim string and add ...
   * @param {string} text source string
   * @param {number} maxLength maximum length
   * @returns {string} trimmed string with addition ...
   */
  cutText: function (text, maxLength) {
    if (!text) return "";

    if (getLength(text) > maxLength) {
      //if (text.length > maxLength) {
      return text.substring(0, maxLength).concat("...");
    } else {
      return text;
    }
  },

  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  deleteCookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },

  isTokenExpired: (tokenExp) => {
    const isExpired = new Date(tokenExp) * 1000 < Date.now() * 1000;
    if (!isExpired) {
      return false;
    }
    return true;
  },

  filteredData: (searchText = null, data, searchItem) => {
    if (searchText) {
      return data.filter((item) => {
        return searchText
          .toLowerCase()
          .split(" ")
          .every((value) => item[searchItem].toLowerCase().includes(value));
      });
    } else {
      return data;
    }
  },

  sort: (data, item, type) => {
    // data = data array, item = object want to sorting, type = asc/desc
    if (type === "desc") return data.sort((a, b) => b[item] - a[item]);
    else if (type === "asc") return data.sort((a, b) => a[item] - b[item]);
    else return 0;
  },

  checkDateTime: (loc = "Asia/Jakarta") => {
    let f = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
      second: "2-digit",
      timeZone: loc,
    });
    let temp = f.formatToParts(new Date("2022-11-26T09:30:00"));
    let parts = temp.reduce((acc, part) => {
      if (part.type != "literal") {
        acc[part.type] = part.value;
      }
      return acc;
    }, Object.create(null));

    // console.log(parts);
    return parts;

    // return parts.weekday != 'Sat' && parts.weekday != 'Sun' && parts.hour >= 8 && parts.hour < 17;
  },

  timeDuration: (start, end) => {
    var oDiff = new Object();

    let startDate = new Date(start);
    let endDate = new Date(end);

    //  Calculate Differences
    //  -------------------------------------------------------------------  //
    var nTotalDiff = endDate.getTime() - startDate.getTime();

    oDiff.days = Math.floor(nTotalDiff / 1000 / 60 / 60 / 24);
    nTotalDiff -= oDiff.days * 1000 * 60 * 60 * 24;

    oDiff.hours = Math.floor(nTotalDiff / 1000 / 60 / 60);
    nTotalDiff -= oDiff.hours * 1000 * 60 * 60;

    oDiff.minutes = Math.floor(nTotalDiff / 1000 / 60);
    nTotalDiff -= oDiff.minutes * 1000 * 60;

    oDiff.seconds = Math.floor(nTotalDiff / 1000);
    //  -------------------------------------------------------------------  //

    //  Format Duration
    //  -------------------------------------------------------------------  //
    //  Format Hours
    var hourtext = "00";
    if (oDiff.days > 0) {
      hourtext = String(oDiff.days);
    }
    if (hourtext.length == 1) {
      hourtext = "0" + hourtext;
    }

    //  Format Minutes
    var mintext = "00";
    if (oDiff.minutes > 0) {
      mintext = String(oDiff.minutes);
    }
    if (mintext.length == 1) {
      mintext = "0" + mintext;
    }

    //  Format Seconds
    var sectext = "00";
    if (oDiff.seconds > 0) {
      sectext = String(oDiff.seconds);
    }
    if (sectext.length == 1) {
      sectext = "0" + sectext;
    }

    //  Set Duration
    var sDuration = hourtext + ":" + mintext + ":" + sectext;
    oDiff.duration = sDuration;
    //  -------------------------------------------------------------------  //
    // console.log(oDiff);
    const { days, hours, minutes, seconds, duration } = oDiff;

    // return days > 0 ? days + ' ' + t('Days').toLowerCase() : ''
    return `${days > 0 ? days + " " + t("Days").toLowerCase() : ""}
              ${hours > 0 ? hours + " " + t("Hours").toLowerCase() : ""}
              ${minutes > 0 ? minutes + " " + t("Minutes").toLowerCase() : ""}
              ${
                seconds > 0
                  ? date_diff.getSeconds() + " " + t("Seconds").toLowerCase()
                  : ""
              }`;
  },

  changeLocale: (locale, type) => {
    localStorage.setItem("locale", locale);
    if (type === "dropdown") window.location.reload();
  },

  formatDate: (dateParams, dataType) => {
    if (
      dateParams === "-" ||
      dateParams === NaN ||
      dateParams === null ||
      dateParams === undefined
    )
      return "-";

    let date = new Date(dateParams);
    let tahun = date.getFullYear();
    let bulan = date.getMonth();
    let tanggal = date.getDate();
    let hari = date.getDay();

    let jam = date.getHours();
    let menit = date.getMinutes();
    let detik = date.getSeconds();
    switch (hari) {
      case 0:
        hari = "Minggu";
        break;
      case 1:
        hari = "Senin";
        break;
      case 2:
        hari = "Selasa";
        break;
      case 3:
        hari = "Rabu";
        break;
      case 4:
        hari = "Kamis";
        break;
      case 5:
        hari = "Jumat";
        break;
      case 6:
        hari = "Sabtu";
        break;
    }
    switch (bulan) {
      case 0:
        bulan = "January";
        break;
      case 1:
        bulan = "February";
        break;
      case 2:
        bulan = "March";
        break;
      case 3:
        bulan = "April";
        break;
      case 4:
        bulan = "May";
        break;
      case 5:
        bulan = "June";
        break;
      case 6:
        bulan = "July";
        break;
      case 7:
        bulan = "August";
        break;
      case 8:
        bulan = "September";
        break;
      case 9:
        bulan = "October";
        break;
      case 10:
        bulan = "November";
        break;
      case 11:
        bulan = "December";
        break;
    }

    let dp = new Date(dateParams);
    let options = {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    let showTimeOnly = dp.toLocaleString("en-US", options);
    let showDate = `${tanggal} ${bulan.substring(0, 3)} ${tahun}`;
    let showDayDate = `${hari.substring(0, 3)}, ${tanggal} ${bulan.substring(
      0,
      3
    )} ${tahun}`;

    let showDateTime = `${hari.substring(0, 3)}, ${tanggal} ${bulan.substring(
      0,
      3
    )} ${tahun}, ${showTimeOnly} WIB`;

    return dataType === "dateTime"
      ? showDateTime
      : dataType === "dateOnly"
      ? showDate
      : dataType === "dayDate"
      ? showDayDate
      : dataType === "timeOnly"
      ? showTimeOnly
      : showDateTime;
  },

  modal: {
    show: (id) => {
      let modal = new bootstrap.Modal(document.getElementById(id), {});
      modal.show();
    },
    hide: (id) => {
      let modalElement = document.getElementById(id);
      let modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    },
  },

  offCanvas: {
    show: (id) => {
      let offCanvas = new bootstrap.Offcanvas(document.getElementById(id), {});
      offCanvas.show();
    },
    hide: (id) => {
      let offCanvasElement = document.getElementById(id);
      let offCanvas = bootstrap.Offcanvas.getInstance(offCanvasElement);
      offCanvas.hide();
    },
  },

  toast: (type, msg, pos = "top-right") => {
    const opt = {
      type: type, //'info', 'danger', 'warning', 'success', 'default'
      // timeout: 10000, //number
      position: pos, //'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'
      showCloseButton: true, //boolean
      showIcon: true, //boolean
      transition: "bounce", //'bounce', 'zoom', 'slide'
      hideProgressBar: false, //boolean
      swipeClose: true, //boolean
      // toastBackgroundColor: "white", //string
      onClose: function () {
        //function
        // console.log("closed");
      },
    };
    return createToast(t(msg), opt);
  },
  confirmDeleteAction: async (msg) => {
    // Use SweetAlert2 for confirmation dialog
    const result = await Swal.fire({
      title: 'Confirmation',
      text: msg ?? 'Are you sure you want to delete this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    return result.isConfirmed;
  },
  alertToast: (type, msg) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: type,
      title: msg,
    });
  },

  alert: (type, msg, options) => {
    let types = [
      { type: "success", title: "Success!", iconColor: null },
      { type: "error", title: "Error!", iconColor: null },
      { type: "warning", title: "Warning!", iconColor: null },
      { type: "info", title: "Info!", iconColor: null },
      { type: "question", title: "Question?", iconColor: null },
    ];

    types.map((item) => {
      if (item.type === type) {
        const opt = Swal.mixin(options);
        opt.fire({
          icon: item.type,
          title:
            options !== undefined && options.title ? options.title : item.title,
          html: msg,
          confirmButtonColor: "#1A9640",
        });
      }
    });
  },

  alertSuccess: (title, isReload = false) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: title,
      showCancelButton: false,
      confirmButtonColor: "#1A9640",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed && isReload) {
        location.reload();
      }
    });
  },

  handleError: (error, msg = null) => {
    console.log(error);
    if (error.response) {
      let statusCode = error.response.status;
      switch (statusCode) {
        case 400:
          helpers.alertToast("error", ` Error ${msg}: Bad request`);
          break;
        case 401:
          helpers.alertToast("error", ` Error ${msg}: Unauthorized`);
          break;
        case 403:
          helpers.alertToast("error", `Error ${msg}: Forbidden`);
          break;
        case 404:
          helpers.alertToast("error", `Error ${msg}: Not found`);
          break;
        case 500:
          helpers.alertToast("error", ` Error ${msg}: Internal server error`);
          break;
        case 501:
          helpers.alertToast(
            "error",
            `Error ${msg}: The requested service is not available`
          );
          break;
        default:
          helpers.alertToast("error", `Unknown error ${msg}`);
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      helpers.alertToast("error", `Error: ${error.message}`);
    }
  },

  formatNumber: (value) => {
    if (typeof value === "number") {
      return (
        new Intl.NumberFormat("id-ID", {
          minimumFractionDigits: 0,
        }).format(value) || 0
      );
    } else {
      return value || 0;
    }
  },

  extractDate: (dateString) => {
    // Extract date (YYYY-MM-DD) from the datetime string
    return dateString.split("T")[0];
  },

  handleTime: (dateString) => {
    // Extract date (YYYY-MM-DD) from the datetime string
    let dateTime = moment(new Date(dateString)).format("YYYY-MM-DDTHH:mm:ss");
    return dateTime;
  },

  INTERSECTION: ({ arrOfArr }) => {
    return arrOfArr.reduce((a, b) => a.filter(c => b.includes(c)))
  },

  sortArrOfObj: ({ arr, key, order = 'DESC', dataType = 'string' }) => {
    function compare(a, b) {
      if (dataType === 'string') {
        if (a[key].toLowerCase() < b[key].toLowerCase()) {
          if (order === 'DESC')
            return 1
          else if (order === 'ASC')
            return -1
        }
        if (a[key].toLowerCase() > b[key].toLowerCase()) {
          if (order === 'DESC')
            return -1
          else if (order === 'ASC')
            return 1
        }
        return 0;
      }
      else if (dataType === 'float') {
        if (parseFloat(a[key]) < parseFloat(b[key])) {
          if (order === 'DESC')
            return 1
          else if (order === 'ASC')
            return -1
        }
        if (parseFloat(a[key]) > parseFloat(b[key])) {
          if (order === 'DESC')
            return -1
          else if (order === 'ASC')
            return 1
        }
        return 0;
      }
    }
  
    return arr.sort(compare);
  },

  isSubArray: (mainArray, subArray) => {
    for (let i = 0; i < mainArray.length - subArray.length + 1; i++) {
      let isMatch = true;
  
      for (let j = 0; j < subArray.length; j++) {
        if (mainArray[i + j] !== subArray[j]) {
          isMatch = false;
          break;
        }
      }
  
      if (isMatch) {
        return true;
      }
    }
  
    return false;
  },

  toTitleCase: (str) => {
    // return str.replace(/_/g, ' ').replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());
    return str
      .replace(/_/g, ' ')
      .replace(/\-/g, ' ') // Replace '-' with space
      .replace(/\b\w+\b/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  },

  // Function to check if an object in the array has a specific property
  hasProperty: (array, propertyName) => {
    // Using Array.some() to check if at least one object in the array has the property
    return array.some(obj => obj.hasOwnProperty(propertyName));
  },
  // Function to filter objects and include specific properties
  filterObjectsByProperty: (array, propertyName, additionalProperty) => {
    // Using Array.filter() to create a new array with modified objects
    return array
      .filter(obj => obj.hasOwnProperty(propertyName))
      .map(obj => ({ [propertyName]: obj[propertyName], status: additionalProperty }));
  }
};

export default helpers;